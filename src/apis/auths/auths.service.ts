import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import * as jwt from 'jsonwebtoken';
import { Cache } from 'cache-manager';
import { UsersService } from '../users/users.service';
/**
 * Auth Service
 */
@Injectable()
export class AuthsService {
  constructor(
    private readonly jwtService: JwtService, //
    private readonly mailerService: MailerService, //
    // private readonly usersService: UsersService, //
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  getAccessToken({ user }) {
    return this.jwtService.sign(
      { email: user.email, sub: user.id },
      { secret: 'myAccessKey', expiresIn: '1h' },
    );
  }

  setRefreshToken({ user, res, req }) {
    const refreshToken = this.jwtService.sign(
      { email: user.email, sub: user.id },
      { secret: process.env.JWT_REFRESH_SECRET, expiresIn: '2w' },
    );

    const allowedOrigins = process.env.CORS_URLS.split(', ');
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
    );
    res.setHeader(
      'Set-Cookie',
      `refreshToken=${refreshToken}; path=/; domain=.snkserver.shop; SameSite=None; Secure; httpOnly;`,
    );
  }

  /**
   * Verify Tokens : JWT 을 이용한 토큰 검증
   * @param accessToken 입력받은 Access Token
   * @param refreshToken 입력받은 Refresh Token
   * @returns 인증완료된 AT, RT
   */
  verifyTokens({ accessToken, refreshToken }) {
    try {
      const validAccessToken = jwt.verify(
        accessToken,
        process.env.JWT_ACCESS_SECRET,
      );
      const validRefreshToken = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET,
      );
      if (
        typeof validAccessToken === 'object' &&
        typeof validRefreshToken === 'object'
      ) {
        return { validAccessToken, validRefreshToken };
      } else {
        throw new Error(`Token의 payload값이 객체 형태로 반환되지 않았습니다.
          accessToken 내용 : ${validAccessToken}
          refreshToken 내용 : ${validRefreshToken}`);
      }
    } catch (error) {
      throw new UnauthorizedException(error.response.message);
    }
  }

  /**
   * Send Mail Token : 임의 생성된 4자리 숫자를 메일로 전송
   * @param email 입력받은 메일주소
   * @returns 전송 성공 여부
   */
  async sendMailToken({ email }) {
    const token = String(Math.floor(Math.random() * 10 ** 4)).padStart(4, '0');

    let result = false;
    await this.mailerService
      .sendMail({
        to: email,
        from: 'noreply@dangder.com',
        subject: '[Snorkeling] 메일 인증번호가 발급되었습니다.',
        template: '/snklpoint/src/commons/mailTemplates/layouts/layout', // The `.pug` or `.hbs` extension is appended automatically.
        context: {
          // Data to be sent to template engine.
          code: token,
        },
      })
      .then(() => {
        result = true;
      })
      .catch((e) => {
        result = false;
        console.log(e);
      });

    // 유저의 계정 : 생성된 토큰 - key : value 값으로 Redis 저장.
    await this.cacheManager.set(email, token, {
      ttl: 180, // 3분
    });
    return result;
  }

  /**
   * Send Mail Token : Redis에 저장된 토큰값을 비교
   * @param email 입력받은 메일주소
   * @param code 입력받은 인증코드
   * @returns 저장된 값과 입력받은 코드의 일치 여부
   */
  async validateMailToken({ email, code }) {
    const result = await this.cacheManager.get(email);
    return result === code;
  }
}

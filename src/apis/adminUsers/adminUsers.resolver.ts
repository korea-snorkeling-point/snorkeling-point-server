import {
  CACHE_MANAGER,
  Inject,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { IContext } from 'src/commons/type/context';
import { AdminUsersService } from './adminUsers.service';
import * as bcrypt from 'bcrypt';
import {
  GqlAuthAdminAccessGuard,
  GqlAuthAdminRefreshGuard,
} from 'src/commons/auth/gql-auth.guard';
import { Cache } from 'cache-manager';
import { AdminUser } from './entities/adminUser.entity';
import { CreateAdminUserInput } from './dto/createAdminUser.input';
@Resolver()
export class AdminUsersResolver {
  constructor(
    private readonly adminUsersService: AdminUsersService, //
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}
  /**
   * Admin User Login API
   * @type [`Mutation`]
   * @param account 관리자 유저 계정
   * @param password 관리자계정 비밀번호
   * @param Context 현재 접속한 유저의 Req, Res
   * @returns
   */
  @Mutation(() => String, { description: 'Return : 발급된 Admin AccessToken' })
  async adminLogin(
    @Args('account', { description: '관리자 계정' }) account: string, //
    @Args('password', { description: '관리자 계정 비밀번호' }) password: string,
    @Context() Context: IContext,
  ) {
    const adminUser = await this.adminUsersService.findOne({ account });
    if (!adminUser)
      throw new UnprocessableEntityException('존재하지 않는 계정입니다.');
    const isAuth = await bcrypt.compare(password, adminUser.password);
    if (!isAuth)
      throw new UnprocessableEntityException('비밀번호가 일치하지 않습니다.');

    this.adminUsersService.setAdminRefreshToken({
      adminUser,
      res: Context.res,
      req: Context.req,
    });

    return this.adminUsersService.getAdminAccessToken({ adminUser });
  }

  /**
   * Restore Admin Access Token API
   * @type [`Mutation`]
   * @param context 현재 접속한 유저의 정보
   * @returns 재발급된 Admin AccessToken
   */
  @UseGuards(GqlAuthAdminRefreshGuard)
  @Mutation(() => String, { description: 'Return : 재발급된 AdminAccessToken' })
  restoreAdminAccessToken(
    @Context() context: IContext, //
  ) {
    return this.adminUsersService.getAdminAccessToken({
      adminUser: context.req.user,
    });
  }

  /**
   * Admin User Logout API
   * @type [`Mutation`]
   * @param context 현재 접속한 유저의 정보
   * @returns 로그아웃 성공여부
   */
  @UseGuards(GqlAuthAdminAccessGuard)
  @Mutation(() => Boolean, {
    description: 'Return : Admin User 로그아웃 성공여부 (true / false)',
  })
  async adminLogout(
    @Context() context: IContext, //
  ) {
    console.log(context.req.headers.authorization);
    const accessToken = context.req.headers.authorization.replace(
      'Bearer ',
      '',
    );
    const refreshToken = context.req.headers.cookie.replace(
      'refreshToken=',
      '',
    );

    const { validAccessToken, validRefreshToken } =
      this.adminUsersService.verifyAdminTokens({
        accessToken,
        refreshToken,
      });

    const now = new Date().getTime();
    const accessTokenTtl =
      validAccessToken.exp - Number(String(now).slice(0, -3));
    const refreshTokenTtl =
      validRefreshToken.exp - Number(String(now).slice(0, -3));

    let result = true;
    try {
      // Redis에 토큰 저장 (redis - blacklist 생성)
      await this.cacheManager.set(
        `accessToken:${accessToken}`,
        'accessToken', //
        { ttl: accessTokenTtl },
      );
      await this.cacheManager.set(
        `refreshToken:${refreshToken}`,
        'refreshToken',
        { ttl: refreshTokenTtl },
      );
    } catch (e) {
      result = false;
      console.log(e);
    }

    return result;
  }

  @Mutation(() => AdminUser, { description: 'Return : 생성된 adminUser 정보' })
  async createAdminUser(
    @Args('createAdminUserInput') createAdminUserInput: CreateAdminUserInput,
  ) {
    return await this.adminUsersService.create(createAdminUserInput);
  }

  /**
   * Delete Admin User
   * @type [`Mutation`]
   * @param account 관리자 계정
   * @returns 계정 삭제 여부
   */
  @Mutation(() => Boolean, { description: 'Return : 계정 삭제 여부' })
  deleteAdminUser(
    @Args('account', { description: '삭제할 계정' }) account: string, //
  ) {
    return this.adminUsersService.delete({ account });
  }
}

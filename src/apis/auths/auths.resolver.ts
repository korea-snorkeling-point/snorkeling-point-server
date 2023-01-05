import { UnprocessableEntityException } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UsersService } from '../users/users.service';
import { AuthsService } from './auths.service';
import { IContext } from 'src/commons/type/context';
import * as bcrypt from 'bcrypt';

@Resolver()
export class AuthsResolver {
  constructor(
    private readonly usersService: UsersService, //
    private readonly authsService: AuthsService, //
  ) {}

  @Mutation(() => String)
  async login(
    @Args('email', { description: '로그인 할 회원 이메일 정보' }) email: string, //
    @Args('password', { description: '로그인 할 회원 비밀번호' })
    password: string,
    @Args('context') Context: IContext,
  ) {
    const user = await this.usersService.findOne({ email });
    if (!user) throw new UnprocessableEntityException('이메일이 없습니다.');

    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth) throw new UnprocessableEntityException('암호가 틀렸습니다.');

    this.authsService.setRefreshToken({
      user,
      res: Context.res,
      req: Context.req,
    });

    return this.authsService.getAccessToken({ user });
  }
}

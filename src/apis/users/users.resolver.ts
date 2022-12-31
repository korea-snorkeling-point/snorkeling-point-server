import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/createUser.input';
import { UpdateUserInput } from './dto/updateUser.input';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService, //
  ) {}

  @Query(() => [User], { description: '회원 조회' })
  async fetchAllUsers() {
    return this.usersService.findAll();
  }

  @Query(() => User, { description: '회원 한명 조회' })
  async fetchOneUser(
    @Args('email', { description: '가입한 이메일 정보' }) email: string, //
  ) {
    return this.usersService.findOne({ email });
  }
  @Mutation(() => User, { description: '회원가입' })
  async createUser(
    @Args('createUserInput', { description: '회원 가입 정보 입력' })
    createUserInput: CreateUserInput,
  ) {
    return this.usersService.create(createUserInput);
  }

  @Mutation(() => User, { description: '회원 정보 수정' })
  async updateUser(
    @Args('updateUserInput', { description: '수정할 회원 정보' })
    updateUserInput: UpdateUserInput,
  ) {
    return this.usersService.update(updateUserInput);
  }

  @Mutation(() => Boolean, {
    description: 'Return : deletedAt(유저 정보 삭제된 시간)',
  })
  deleteUser(
    @Args('email', { description: '회원의 계정(메일주소)' }) email: string, //
  ) {
    return this.usersService.delete({ email });
  }
}

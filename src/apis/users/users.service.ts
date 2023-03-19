import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findAll() {
    const result = await this.usersRepository.find();
    return result;
  }

  async findOne({ email }) {
    const result = await this.usersRepository.findOne({
      where: { email: email },
      relations: { payments: true },
    });

    return result;
  }

  async check({ nickname }) {
    const result = await this.usersRepository.findOne({
      where: { nickname },
    });
    return result ? true : false;
  }

  async create(createUserInput) {
    const user = await this.usersRepository.findOne({
      where: { email: createUserInput.email },
    });
    if (user) {
      throw new ConflictException('이미 등록된 이메일입니다.');
    }

    const salt = process.env.BCRYPT_USER_SALT;

    const hashedPassword = await bcrypt.hash(
      createUserInput.password,
      Number(salt),
    );
    const result = await this.usersRepository.save({
      ...createUserInput,
      password: hashedPassword,
    });
    return result;
  }

  async update(updateUserInput) {
    const user = await this.usersRepository.findOne({
      where: { email: updateUserInput.email },
    });
    if (!user)
      throw new ConflictException(
        '해당하는 회원 정보가 없습니다. 이메일을 확인해주세요.',
      );
    const salt = process.env.BCRYPT_USER_SALT;
    const hashedPassword = await bcrypt.hash(
      updateUserInput.password,
      Number(salt),
    );

    const result = await this.usersRepository.save({
      ...user,
      ...updateUserInput,
      password: hashedPassword,
    });
    return result;
  }

  async delete({ email }) {
    const result = await this.usersRepository.softDelete({ email });
    return result.affected ? true : false;
  }
}

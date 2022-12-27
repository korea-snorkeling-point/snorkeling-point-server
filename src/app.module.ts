import { CacheModule, Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';

import { AppController } from './app.controller';

// apis
import { AdminUsersModule } from './apis/adminUsers/adminUsers.module';
import { AuthsModule } from './apis/auths/auths.module';
import { BuddyBoardsModule } from './apis/buddyBoards/buddyBoards.module';
import { BuddyChatMessagesModule } from './apis/buddyChatMessages/buddyChatMessages.module';
import { BuddyChatRoomsModule } from './apis/buddyChatRooms/buddyChatRooms.module';
import { BuddyPartiesModule } from './apis/buddyParties/buddyParties.module';
import { FilesModule } from './apis/files/files.module';
import { IamportsModule } from './apis/imports/imports.module';
import { PaymentsModule } from './apis/payments/payments.module';
import { ProductsModule } from './apis/products/products.module';
import { SnkBoardsModule } from './apis/snkBoards/snkBoards.module';
import { SnkBoardsImagesModule } from './apis/snkBoardsImages/snkBoardsImages.module';
import { SnkBoardsTagsModule } from './apis/snkBoardsTags/snkBoardsTags.module';
import { UsersModule } from './apis/users/users.module';

import { ChatModule } from './gateways/chat/chat.module';

@Module({
  imports: [
    AdminUsersModule,
    AuthsModule,
    BuddyBoardsModule,
    BuddyChatMessagesModule,
    BuddyChatRoomsModule,
    BuddyPartiesModule,
    FilesModule,
    IamportsModule,
    PaymentsModule,
    ProductsModule,
    SnkBoardsModule,
    SnkBoardsImagesModule,
    SnkBoardsTagsModule,
    UsersModule,
    ChatModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
      context: ({ req, res }) => ({ req, res }),
      // CORS 추가
      cors: {
        origin: process.env.CORS_URLS.split(', '),
        credential: true,
      },
      // 배포 시 설정
      // debug: false,
      // playground: false,
    }),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      entities: [__dirname + '/apis/**/*.entity.*'],
      synchronize: true,
      logging: true,
      charset: 'utf8mb4', // emoji 저장을 위한 charset
    }),
    // redis 연결을 위한 CacheModule 추가
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      url: process.env.CACHE_REDIS_URL,
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

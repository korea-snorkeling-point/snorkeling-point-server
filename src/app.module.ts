import { CacheModule, Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';

import { AppController } from './app.controller';

@Module({
  imports: [
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

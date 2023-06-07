import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { StockModule } from './stock/stock.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 3333,
      username: 'postgres',
      password: 'postgres_password',
      database: 'postgres',
      entities: [],
      synchronize: true,
    }),
    UsersModule,
    StockModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

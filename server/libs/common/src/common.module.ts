import { Global, Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from '@libs/db';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 使configModule在任何位置都可以使用
    }),
    JwtModule.registerAsync({
      useFactory() {
        return {
          secret: process.env.SECRET,
        };
      },
    }),
    DbModule,
  ],
  providers: [CommonService],
  exports: [CommonService, JwtModule],
})
export class CommonModule {}

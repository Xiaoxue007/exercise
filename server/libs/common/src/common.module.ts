import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from '@libs/db';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 使configModule在任何位置都可以使用
    }),
    DbModule,
  ],
  providers: [CommonService],
  exports: [CommonService],
})
export class CommonModule {}

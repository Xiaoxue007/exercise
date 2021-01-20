import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { EpisodesModule } from './episodes/episodes.module';
import { MulterModule } from '@nestjs/platform-express';
import { CommonModule } from '../../../libs/common/src';
import { CompsModule } from './comps/comps.module';
import { CategoriesModule } from './categories/categories.module';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const MAO = require('multer-aliyun-oss');

@Module({
  imports: [
    CommonModule,
    MulterModule.registerAsync({
      useFactory() {
        return {
          storage: MAO({
            config: {
              region: process.env.OSS_REGION,
              accessKeyId: process.env.OSS_ACCESS_KEY_ID,
              accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET,
              bucket: process.env.OSS_BUCKET,
            },
          }),
        };
      },
    }),
    UsersModule,
    CoursesModule,
    EpisodesModule,
    CompsModule,
    CategoriesModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}

import { Global, Module } from '@nestjs/common';
import { DbService } from './db.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from '@libs/db/models/user.model';
import { model } from 'mongoose';
import { Course } from '@libs/db/models/course.model';
import { Episode } from '@libs/db/models/episode.model';
// 导入导出所有的模型让他们在所有的地方都能使用
const models = TypegooseModule.forFeature([User, Course, Episode]);

// 数据库的连接都写在这个公共的库中

@Global()
@Module({
  imports: [
    TypegooseModule.forRootAsync({
      useFactory() {
        return {
          uri: process.env.DB,
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
          useFindAndModify: false,
        };
      },
    }),
    // TypegooseModule.forRoot('mongodb://localhost/exercise', {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    //   useCreateIndex: true,
    //   useFindAndModify: false,
    // }),
    models,
  ],
  providers: [DbService],
  exports: [DbService, models],
})
export class DbModule {}

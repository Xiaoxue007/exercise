import { modelOptions, prop, Ref } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { Episode } from '@libs/db/models/episode.model';
import { model } from 'mongoose';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Course {
  // 告诉swagger借口的描述
  @ApiProperty({ description: '系列名称' })
  // 告诉数据库字段的类型
  @prop()
  name: string;

  @ApiProperty({ description: '封面图' })
  @prop()
  cover: string;

  // @ApiProperty({description:'每一集'})
  // @prop({ref: ()=>Episode})
  // episode: Ref<Episode>[]
}

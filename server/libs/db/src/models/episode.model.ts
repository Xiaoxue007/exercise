import { modelOptions, prop, Ref } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { Course } from '@libs/db/models/course.model';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Episode {
  // 告诉swagger借口的描述
  @ApiProperty({ description: '名称' })
  // 告诉数据库字段的类型
  @prop()
  name: string;

  @ApiProperty({ description: '文件(视频)' })
  @prop()
  file: string;

  @ApiProperty({ description: '所属系列' })
  @prop({ ref: () => Course })
  course: Ref<Course>;
}

import { modelOptions, prop, Ref } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '@libs/db/models/user.model';
import { Course } from '@libs/db/models/course.model';
import { Episode } from '@libs/db/models/episode.model';
import { Comp } from '@libs/db/models/comp.model';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Action {
  // 告诉swagger借口的描述
  @ApiProperty({ description: '用户' })
  // 告诉数据库字段的类型
  @prop({ ref: () => User })
  user: Ref<User>;

  @ApiProperty({ description: '操作哪张数据表' })
  @prop({ enum: ['Course', 'Episode', 'Comp', 'Comment'] })
  type: string;

  @ApiProperty({ description: '操作对象的id' })
  @prop({ refPath: 'type' })
  object: Ref<Course | Episode | Comp | Comment>;

  @ApiProperty({ description: '操作名称' })
  @prop({ enum: ['like', 'collect'] })
  name: string;
}

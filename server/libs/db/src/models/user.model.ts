import { modelOptions, prop } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';

// 记录模型创建和更新时间
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class User {
  // 告诉swagger借口的描述
  @ApiProperty({ description: '用户名' })
  // 告诉数据库字段的类型
  @prop()
  username: string;

  @ApiProperty({ description: '密码' })
  @prop()
  password: string;
}

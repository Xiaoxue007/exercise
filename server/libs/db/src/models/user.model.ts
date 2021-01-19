import { modelOptions, prop } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { hashSync } from 'bcryptjs';
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
  @prop({
    unique: true,
  })
  username: string;

  @ApiProperty({ description: '密码' })
  @prop({
    // 表示在藏柜的数据库查询语句中，不主动返回该属性
    select: false,
    // 将散列之后的值存入数据库
    get(val) {
      return val;
    },
    set(val) {
      return val ? hashSync(val) : val;
    },
  })
  password: string;

  @ApiProperty({ description: '手机号' })
  @prop({
    select: false,
  })
  phoneNum: string;

  // @ApiProperty({ description: '头像' })
  // @prop()
  // avatar: string;
}

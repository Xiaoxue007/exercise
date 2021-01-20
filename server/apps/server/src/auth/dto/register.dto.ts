// 定义数据传输的类(注册时需要的字段)
import { Prop } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @Prop({ unique: true })
  @ApiProperty({ description: '用户名' })
  username: string;
  @ApiProperty({ description: '密码' })
  password: string;
  @ApiProperty({ description: '手机号' })
  phoneNum: string;
}

import { Controller, Get } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '@libs/db/models/user.model';
import { Crud } from 'nestjs-mongoose-crud';
import { ApiTags } from '@nestjs/swagger';

@Crud({
  model: User,
})
@ApiTags('用户')
@Controller('users')
export class UsersController {
  // 注入模型
  constructor(@InjectModel(User) private readonly model) {}

  @Get('field')
  field() {
    return {
      name: '用户',
      forms: [
        { prop: 'username', label: '用户名' },
        { prop: 'password', label: '密码' },
      ],
      data: {
        username: '',
        password: '',
      },
    };
  }

  @Get('form')
  form() {
    return {
      title: '用户管理',
      name: '用户',
      fields: {
        _id: { label: 'ID' },
        username: {
          label: '用户名',
          sortable: true,
          search: true,
          regex: true,
        },
        password: { label: '密码' },
      },
    };
  }
}

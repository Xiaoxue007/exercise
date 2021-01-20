import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '@libs/db/models/user.model';
import { DocumentType, Prop, ReturnModelType } from '@typegoose/typegoose';
import { AuthGuard } from '@nestjs/passport';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { CurrentUser } from './current-user.decorator';

@Controller('auth')
@ApiTags('用户')
export class AuthController {
  // 注入用户模型,因为注册时要把请求体内容录入到用户数据库
  constructor(
    private jwtService: JwtService,
    @InjectModel(User) private userModel: ReturnModelType<typeof User>,
  ) {}

  // 注册接口
  @Post('register')
  @ApiOperation({ summary: '注册' })
  // @Body表示请求体的内容等同于express里的req.body
  async register(@Body() dto: RegisterDto) {
    // 解构对象
    const { username, password, phoneNum } = dto;

    const cnt = await this.userModel.countDocuments({ username: username });

    if(cnt >= 1)
      throw new BadRequestException('该用户名已被占用');

    // 向用户的数据库中进行录入
    const user = await this.userModel.create({
      username: username,
      password: password,
      phoneNum: phoneNum,
    });
    return user;
  }

  // 登录接口,最重要的是获取token
  @Post('login')
  @ApiOperation({ summary: '登录' })
  @UseGuards(AuthGuard('local'))
  // @Body表示请求体的内容等同于express里的req.body
  async login(@Body() dto: LoginDto, @CurrentUser() user: DocumentType<User>) {
    return {
      token: this.jwtService.sign(String(user._id)),
    };
  }

  // 查看个人信息
  @Get('user')
  @ApiOperation({ summary: '获取客户信息' })
  @UseGuards(AuthGuard('jwt'))
  // 表示这个接口需要传递token
  @ApiBearerAuth()
  // async user(@Req() req) {
  //   return req.user;
  // }
  async user(@CurrentUser() user: DocumentType<User>) {
    return user;
  }

  @Post('logout')
  @ApiOperation({ summary: '退出登录' })
  async logout() {
    return;
  }
}

import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Action } from '@libs/db/models/action.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { CurrentUser } from '../auth/current-user.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('actions')
export class ActionsController {
  constructor(
    @InjectModel(Action) private actionModel: ReturnModelType<typeof Action>,
  ) {}

  @Get('status')
  // 表示需要用jwt策略来获取用户信息
  @UseGuards(AuthGuard('jwt'))
  async getStatus(@Query() dto, @CurrentUser() user) {
    dto.user = user._id;
    const count = await this.actionModel.countDocuments(dto);
    return {
      status: count > 0,
    };
  }

  @Post('toggle')
  @UseGuards(AuthGuard('jwt'))
  async toggle(@Body() dto, @CurrentUser() user) {
    dto.user = user._id;
    const res = await this.getStatus(dto, user);
    if (res.status) await this.actionModel.deleteMany(dto);
    else await this.actionModel.create(dto);

    return await this.getStatus(dto, user);
  }

  @Get('count')
  async getCount(@Query() dto) {
    const cnt = await this.actionModel.countDocuments(dto);
    return cnt;
  }
}

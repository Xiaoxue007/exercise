import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Comment } from '@libs/db/models/comment.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../auth/current-user.decorator';

@Controller('comments')
export class CommentsController {
  constructor(
    @InjectModel(Comment) private commentModel: ReturnModelType<typeof Comment>,
  ) {}

  @Get()
  async index(@Query() query) {
    const params = JSON.parse(query.where);
    return await this.commentModel.find().populate('user').where(params).sort('-createdAt').setOptions(params);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() dto, @CurrentUser() user) {
    dto.user = user._id;
    const tmp = await this.commentModel.create(dto);
    await this.commentModel.updateOne(
      { _id: tmp.object },
      { $push: { reply: tmp._id } },
    );
    return tmp;
    // return await this.commentModel.create(dto);
  }
}

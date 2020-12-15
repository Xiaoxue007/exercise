import { Controller, Get } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Episode } from '@libs/db/models/episode.model';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from 'nestjs-mongoose-crud';
import { User } from '@libs/db/models/user.model';
import { Course } from '@libs/db/models/course.model';
import { ReturnModelType } from '@typegoose/typegoose';

@Crud({
  model: Episode,
})
@ApiTags('每一集视频')
@Controller('episodes')
export class EpisodesController {
  constructor(
    @InjectModel(Episode)
    private readonly model: ReturnModelType<typeof Episode>,
    @InjectModel(Course)
    private readonly courseModel: ReturnModelType<typeof Course>,
  ) {}

  @Get('field')
  async field() {
    const courses = (await this.courseModel.find()).map((v) => ({
      label: v.name,
      value: v._id,
    }));

    return {
      name: '剧集',
      forms: [
        { prop: 'name', label: '剧集名称' },
        { prop: 'course', label: '所属系列', type: 'select', select: courses },
        { prop: 'file', label: '文件上传', type: 'upload' },
      ],
      data: {
        name: '',
        course: '',
        file: '',
      },
    };
  }

  @Get('form')
  async form() {
    return {
      title: '剧集管理',
      name: '剧集',
      fields: {
        _id: { label: 'ID' },
        name: { label: '剧集名称', sortable: true, search: true, regex: true },
        file: { label: '文件', type: 'video' },
        course: { label: '所属系列', type: 'label' },
      },
    };
  }
}

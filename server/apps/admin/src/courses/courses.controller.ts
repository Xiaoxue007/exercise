import { Controller, Get } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud';
import { Course } from '@libs/db/models/course.model';
import { InjectModel } from 'nestjs-typegoose';
import { ApiTags } from '@nestjs/swagger';

@Crud({
  model: Course,
})
@ApiTags('系列视频课程')
@Controller('courses')
export class CoursesController {
  constructor(@InjectModel(Course) private readonly model) {}

  @Get('field')
  field() {
    return {
      name: '系列',
      forms: [
        { prop: 'name', label: '系列名称' },
        { prop: 'cover', label: '封面图', type: 'uploadImg' },
      ],
      data: {
        name: '',
        cover: '',
      },
    };
  }

  @Get('form')
  form() {
    return {
      title: '系列管理',
      name: '系列',
      fields: {
        _id: { label: 'ID' },
        name: { label: '课程名称', sortable: true, search: true, regex: true },
        cover: { label: '封面图', type: 'img' },
      },
    };
  }
}

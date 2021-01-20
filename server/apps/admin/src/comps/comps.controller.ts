import { Controller, Get } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud';
import { Comp } from '@libs/db/models/comp.model';
import { ApiTags } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Category } from '@libs/db/models/category.model';

@Crud({
  model: Comp,
})
@ApiTags('竞赛')
@Controller('comps')
export class CompsController {
  constructor(
    @InjectModel(Comp) private model: ReturnModelType<typeof Comp>,
    @InjectModel(Category)
    private categoryModel: ReturnModelType<typeof Category>,
  ) {}

  @Get('field')
  async field() {
    const categories = (await this.categoryModel.find()).map((v) => {
      return {
        label: v.name,
        value: v._id,
      };
    });

    return {
      name: '竞赛',
      forms: [
        { prop: 'name', label: '竞赛名称'},
        { prop: 'level', label: '级别'},
        { prop: 'obj', label: '参赛对象'},
        { prop: 'fee', label: '报名费'},
        {
          prop: 'type',
          label: '类型',
          type: 'select',
          select: [
            { label: '个人赛', value: '个人赛' },
            { label: '组队赛', value: '组队赛' },
          ],
        },
        {
          prop: 'category',
          label: '竞赛类别',
          type: 'select',
          select: categories,
          sMulti: true,
        },
        { prop: 'rDateSt', label: '报名开始', type: 'dateTime' },
        { prop: 'rDateEd', label: '报名结束', type: 'dateTime' },
        { prop: 'mDateSt', label: '比赛开始', type: 'dateTime'},
        { prop: 'mDateEd', label: '比赛结束', type: 'dateTime'},
        { prop: 'award', label: '评奖' },
        { prop: 'sponsor', label: '主办方' },
        { prop: 'cover', label: '方图', type: 'uploadImg' },
        { prop: 'banner', label: '横幅', type: 'uploadImg' },
        { prop: 'content', label: '详情', type: 'textContent' },
      ],
      data: {
        name: '',
        level: '',
        obj: '',
        type: '',
        fee: '',
        rDateSt: '',
        rDateEd: '',
        mDateSt: '',
        mDateEd: '',
        award: '',
        category: '',
        sponsor: '',
        cover: '',
        banner: '',
        content: '',
      },
    };
  }

  @Get('form')
  async form() {
    return {
      title: '竞赛管理',
      name: '竞赛',
      fields: {
        _id: { label: 'ID' },
        name: { label: '竞赛名称', sortable: true, search: true, regex: true },
        cover: { label: '封面（方形）', type: 'img' },
      },
    };
  }
}

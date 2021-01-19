import { Controller, Get } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud';
import { Category } from '@libs/db/models/category.model';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import {ApiTags} from "@nestjs/swagger";

@Crud({
  model: Category,
})
@ApiTags('分类')
@Controller('categories')
export class CategoriesController {
  constructor(
    @InjectModel(Category)
    private readonly model: ReturnModelType<typeof Category>,
  ) {}

  @Get('field')
  async field() {

    const parents = (await this.model.find()).map((v) => ({
      label: v.name,
      value: v._id,
    }));

    return {
      name: '分类',
      forms: [
        { prop: 'parent', label: '父级分类', type: 'select', select: parents },
        { prop: 'name', label: '分类名称' },
      ],
      data: {
        name: '',
      },
    };
  }

  @Get('form')
  async form() {
    return {
      title: '分类管理',
      name: '分类',
      fields: {
        _id: { label: 'ID' },
        name: { label: '分类名称', sortable: true, search: true, regex: true },
        parent: { label: '父级分类', type: 'label' },
      },
    };
  }
}

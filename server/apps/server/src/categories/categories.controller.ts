import { Controller, Get, Query } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud';
import { Category } from '@libs/db/models/category.model';
import { ApiTags } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';

// @Crud({
//   model: Category,
//   routes: {
//     create: false,
//     update: false,
//     delete: false,
//   },
// })
@ApiTags('分类')
@Controller('categories')
export class CategoriesController {
  constructor(
    @InjectModel(Category) private model: ReturnModelType<typeof Category>,
  ) {}

  @Get('')
  async index(@Query() query) {
    const params = JSON.parse(query.where);
    const form = await this.model.findOne().where(params);
    const data = await this.model.find().where({ parent: form._id });

    const array = [];
    for (const el of data) {
      const tmp = await this.model.find().where({ parent: el._id });
      const res = {
        name: el.name,
        _id: el._id,
        cats: tmp.map((el) => {
          return {
            name: el.name,
            _id: el._id,
          };
        }),
      };
      array.push(res);
    }

    return array;
  }
}

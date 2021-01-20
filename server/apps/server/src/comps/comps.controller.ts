import { Controller, Get, Query } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Comp } from '@libs/db/models/comp.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from 'nestjs-mongoose-crud';

@Crud({
  model: Comp,
  routes: {
    create: false,
    update: false,
    delete: false,
  },
})
@ApiTags('竞赛')
@Controller('comps')
export class CompsController {
  constructor(@InjectModel(Comp) private model: ReturnModelType<typeof Comp>) {}

  @Get('findByCat')
  async index(@Query() query) {
    const params = JSON.parse(query.where);
    return await this.model.find().where( {category: { $elemMatch: {$eq:params.catId}}});
  }


}

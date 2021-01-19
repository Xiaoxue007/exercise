import { modelOptions, prop, Ref } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Category {
  @ApiProperty({ description: '父级分类' })
  @prop({ required: false, ref: () => Category })
  parent?: Ref<Category>;

  @ApiProperty({ description: '分类名称' })
  @prop()
  name: string;
}

import { modelOptions, prop, Ref } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from './category.model';

// 记录模型创建和更新时间
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Comp {
  @ApiProperty({ description: '卡片封面' })
  @prop()
  cover: string;

  @ApiProperty({ description: '竞赛名称' })
  @prop()
  name: string;

  @ApiProperty({ description: '竞赛banner' })
  @prop()
  banner: string;

  @ApiProperty({ description: '详情' })
  @prop()
  content: string;

  @ApiProperty({ description: '级别' })
  @prop()
  level: string;

  @ApiProperty({ description: '参赛对象' })
  @prop()
  obj: string;

  @ApiProperty({ description: '报名费' })
  @prop()
  fee: string;

  @ApiProperty({ description: '类型' })
  @prop()
  type: string;

  @ApiProperty({ description: '报名开始时间' })
  @prop()
  rDateSt: Date;

  @ApiProperty({ description: '报名结束时间' })
  @prop()
  rDateEd: Date;

  @ApiProperty({ description: '比赛开始时间' })
  @prop()
  mDateSt: Date;

  @ApiProperty({ description: '比赛结束时间' })
  @prop()
  mDateEd: Date;

  @ApiProperty({ description: '评奖' })
  @prop()
  award: string;

  @ApiProperty({ description: '竞赛类别' })
  @prop({ ref: () => Category })
  category: Ref<Category>[];

  @ApiProperty({ description: '主办方' })
  @prop()
  sponsor: string;
}

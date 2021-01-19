import { Module } from '@nestjs/common';
import { CompsController } from './comps.controller';

@Module({
  controllers: [CompsController]
})
export class CompsModule {}

import { Module } from '@nestjs/common';

import { BitrixModule } from './bitrix/bitrix.module';

@Module({
  imports: [
    BitrixModule,
  ],
})
export class BitrixMainModule {}
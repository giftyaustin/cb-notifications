import { Module } from '@nestjs/common';
import { ChatsGateway } from './chats.gateway';

@Module({
  imports: [],

  providers: [ChatsGateway],
  controllers: [],
  exports: [],
})
export class ChatsModule {}

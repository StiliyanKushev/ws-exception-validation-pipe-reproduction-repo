import { Module } from '@nestjs/common';
import { WsGateway } from './ws/ws.gateway';

@Module({
  imports: [],
  controllers: [],
  providers: [WsGateway],
})
export class AppModule {}

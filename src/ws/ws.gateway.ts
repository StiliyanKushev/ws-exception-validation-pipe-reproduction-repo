import { UsePipes, ValidationPipe } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { MessageDto } from './dto/message-dto';

// @Catch()
// export class WsExceptionsFilter extends BaseWsExceptionFilter {
//   catch(exception: unknown, host: ArgumentsHost) {
//     if (exception instanceof HttpException) {
//       super.catch(new WsException(exception.getResponse()), host);
//     } else {
//       super.catch(exception, host);
//     }
//   }
// }

// @UseFilters(WsExceptionsFilter)
@UsePipes(
  new ValidationPipe({
    transform: true,
    forbidUnknownValues: true,
    forbidNonWhitelisted: true,
    whitelist: true,
  }),
)
@WebSocketGateway()
export class WsGateway {
  @SubscribeMessage('message')
  handleMessage(@MessageBody() messageDto: MessageDto) {
    return messageDto;
  }
}

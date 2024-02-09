import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import io, { Socket } from 'socket.io-client';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let ioClient: Socket;
  let app: INestApplication;

  beforeAll(async () => {
    app = await NestFactory.create(AppModule, { logger: false });
    await app.listen(3000);

    ioClient = io('http://localhost:3000', {
      reconnection: true,
      forceNew: true,
      transports: ['websocket'],
    });

    return new Promise<void>(async (resolve) => {
      ioClient.on('connect', () => {
        resolve();
      });
    });
  });

  afterAll((done) => {
    if (ioClient.connected) {
      ioClient.disconnect();
    }
    app.close().then(done);
  });

  it('should throw ws exception', async () => {
    ioClient.emit('message', {
      someNumber: 'not_a_number',
    });

    return new Promise<void>((resolve, reject) => {
      ioClient.on('exception', (e) => {
        try {
          expect(e.message).not.toEqual('Internal server error');
        } catch (e) {
          reject(e);
        }
        resolve();
      });
    });
  });
});

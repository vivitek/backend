import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet())
  app.enableCors()
  const options = new DocumentBuilder().setTitle('Vivi').setDescription("Vivi's api doc").setVersion("2.0.0").addBearerAuth().build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup("api", app, document)
  await app.listen(3000);
}
bootstrap();

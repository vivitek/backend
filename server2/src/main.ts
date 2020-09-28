import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as helmet from 'helmet';
import {RedocOptions, RedocModule} from 'nestjs-redoc'
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet())
  app.enableCors()
  const options = new DocumentBuilder().setTitle('Vivi').setDescription("Vivi's api doc").setVersion("2.0.0").addBearerAuth().build()
  const document = SwaggerModule.createDocument(app, options)
  const redocOptions: RedocOptions = {
    title:"Vivi",
    sortPropsAlphabetically: true,
    hideDownloadButton: false,
    hideHostname: false
  }
  SwaggerModule.setup("api", app, document)
  await RedocModule.setup("/docs", app, document, redocOptions)
  await app.listen(3000);
}
bootstrap();

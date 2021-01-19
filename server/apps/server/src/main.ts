import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 允许跨域
  app.enableCors();
  // DocumentBuilder是一个辅助类，有助于结构的基本文件SwaggerModule。它包含几种方法，可用于设置诸如标题，描述，版本等属性。
  const options = new DocumentBuilder()
    .setTitle('视频网站-前端API')
    .setDescription('供网站和服务端调用的服务端API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  // 为了创建完整的文档（具有定义的HTTP路由）createDocument()方法带有两个参数，分别是应用程序实例和基本Swagger选项
  const document = SwaggerModule.createDocument(app, options);
  // 创建文档的url,它依次接受（1）装入Swagger的路径，（2）应用程序实例, （3）描述Nest应用程序的文档。
  SwaggerModule.setup('api-docs', app, document);

  const PORT = process.env.SERVER_PORT || 3001;
  await app.listen(PORT);
  // 打开就可以看到用crud生成的5个借口
  console.log(`http://localhost:${PORT}/api-docs`);
}
bootstrap();

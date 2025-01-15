import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { DataProviderModule } from './data-provider/data-provider.module';
import { SeederService } from './data-provider/seeds/seeder.service';
import * as rTracer from 'cls-rtracer';
async function bootstrap() {
  const appCtx = await NestFactory.createApplicationContext(DataProviderModule);
  const seeder = appCtx.get(SeederService);
  await seeder.seed();
  await appCtx.close();
  

  const app = await NestFactory.create(AppModule,{
    cors: true,
    bufferLogs: true
  });
  app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: true, forbidNonWhitelisted: true, whitelist: true }));
  app.use(rTracer.expressMiddleware());
  app.enableShutdownHooks();

  const swaggerconfig = new DocumentBuilder()
    .setTitle('Product API')
    .setDescription('Product API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerconfig);
  SwaggerModule.setup('', app, document);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

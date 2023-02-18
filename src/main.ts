import { CorsConfig } from './config/cors.config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

import { resolve } from 'path';
import { writeFileSync, createWriteStream } from 'fs';
import { get } from 'http';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // swagger setup
  const config = new DocumentBuilder()
    .setTitle('Backend Generator')
    .setDescription('Documentation API Test')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document, {
    customSiteTitle: 'Backend Generator',
    customCss:
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
    customfavIcon: 'https://avatars.githubusercontent.com/u/6936373?s=200&v=4',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
    ],
    // customJsStr: `window.onload = function() {
    //   // Build a system
    //   const ui = SwaggerUIBundle({
    //     url: "/swagger-static/swagger.json",
    //     dom_id: '#swagger-ui',
    //     deepLinking: true,
    //     presets: [
    //       SwaggerUIBundle.presets.apis,
    //       SwaggerUIBundle.SwaggerUIStandalonePreset
    //     ],
    //     plugins: [
    //       SwaggerUIBundle.plugins.DownloadUrl
    //     ],
    //     layout: "StandaloneLayout"
    //   })
    //   window.ui = ui
    // }`,
  });
  const cors = { ...CorsConfig };
  app.enableCors(cors);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.setGlobalPrefix('api/v1');
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(5000);
  const serverUrl = 'https://nest-generator-drab.vercel.app';
  const NODE_ENV = 'development';
  // if (NODE_ENV === 'development') {
  //   // write swagger ui files
  //   const pathToSwaggerStaticFolder = resolve(process.cwd(), 'swagger-static');

  //   // write swagger json file
  //   const pathToSwaggerJson = resolve(
  //     pathToSwaggerStaticFolder,
  //     'swagger.json',
  //   );
  //   const swaggerJson = JSON.stringify(document, null, 2);
  //   writeFileSync(pathToSwaggerJson, swaggerJson);
  //   console.log(`Swagger JSON file written to: '/swagger-static/swagger.json'`);
  // }
}
bootstrap();

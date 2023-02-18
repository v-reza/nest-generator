import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersModule } from './resource/users/users.module';
import { AuthService } from './resource/auth/auth.service';
import { AuthController } from './resource/auth/auth.controller';
import { AuthModule } from './resource/auth/auth.module';
import { DataSource } from 'typeorm';
import { ProjectsModule } from './resource/projects/projects.module';
import { ConfigurationsModule } from './resource/configurations/configurations.module';
import { IdatabasesModule } from './resource/idatabases/idatabases.module';
import { IframeworksModule } from './resource/iframeworks/iframeworks.module';
import { UniqueRule } from './validation/rule/UniqueRule';
import { RestApiModule } from './resource/rest_api/rest_api.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '147.139.182.64',
      port: 3306,
      username: 'dev-gen',
      password: '%zP%6Ns!Rem?KRn',
      database: 'generator',
      entities: [__dirname + '/**/*.entity{.ts,.js}',],
      synchronize: true
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'swagger-static'),
      serveRoot: process.env.NODE_ENV === 'development' ? '/' : '/swagger',
    }),
    UsersModule,
    ProjectsModule,
    ConfigurationsModule,
    AuthModule,
    IdatabasesModule,
    IframeworksModule,
    UniqueRule,
    // RestApiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { 
  constructor(private dataSource: DataSource) {}
}

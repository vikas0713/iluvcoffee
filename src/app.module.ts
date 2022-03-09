import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeeController } from './coffee/coffee.controller';
import { CoffeeService } from './coffee/coffee.service';
import { CoffeeModule } from './coffee/coffee.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [CoffeeModule, TypeOrmModule.forRoot({
    type: 'postgres', // type of our database
      host: 'localhost', // database host
      port: 5431, // database host
      username: 'postgres', // username
      password: 'root', // user password
      database: 'postgres', // name of our database,
      autoLoadEntities: true, // models will be loaded automatically 
      synchronize: true, // your entities will be synced with the database(recommended: disable in prod)
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

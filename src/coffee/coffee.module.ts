import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeORMError } from 'typeorm';
import { CoffeeController } from './coffee.controller';
import { CoffeeService } from './coffee.service';
import { Coffee } from './entities/cofee.entity';
import { Flavour } from './entities/flavour.entity';

@Module({imports: [TypeOrmModule.forFeature([Coffee, Flavour])], controllers: [CoffeeController], providers:[CoffeeService]})
export class CoffeeModule {}

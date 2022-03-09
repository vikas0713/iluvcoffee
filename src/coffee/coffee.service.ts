import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCofeeDto } from './dto/create-cofee.dto';
import { UpdateCofeeDto } from './dto/update-cofee.dto';
import { Coffee } from './entities/cofee.entity';
import { Flavour } from './entities/flavour.entity';

@Injectable()
export class CoffeeService {
    constructor(
        @InjectRepository(Coffee)
        private readonly coffeeRepository: Repository<Coffee>,
        @InjectRepository(Flavour)
        private readonly flavourRepository: Repository<Flavour>,
    ){}

    findAll() {
        return this.coffeeRepository.find({relations:['flavours']});
    }

    async findOne(id: string) {
        const coffee = await this.coffeeRepository.findOne(id, {relations:['flavours']});
        if (!coffee){
            throw new NotFoundException('Coffee not found!');
        }
        return coffee
    }

    async create(createCoffeeDto: CreateCofeeDto) {
        const flavours = await Promise.all(
            createCoffeeDto.flavours.map(name => this.preloadFlavourByName(name))
        )
        const coffee = this.coffeeRepository.create({
            ...createCoffeeDto, 
            flavours,
        });
        return this.coffeeRepository.save(coffee)
    }

    async update(id: string, updateCoffeeDto: UpdateCofeeDto) {
        const flavours = updateCoffeeDto.flavours && (await Promise.all(
            updateCoffeeDto.flavours.map(name=> this.preloadFlavourByName(name))
        ));
        const existingCoffee = await this.coffeeRepository.preload({
            id: +id,
            ...updateCoffeeDto,
            flavours
        });
        if (!existingCoffee){
            throw new NotFoundException('Coffee not found');
        }
        return this.coffeeRepository.save(existingCoffee);
    }

    async remove(id: string) {
         const coffee = await this.coffeeRepository.findOne(id);
         return this.coffeeRepository.remove(coffee)
    }

    private async preloadFlavourByName(name: string){
        const existingFlavor = await this.flavourRepository.findOne({ name });
        if (existingFlavor) {
            return existingFlavor;
        }
        return this.flavourRepository.create({ name });
    }
}

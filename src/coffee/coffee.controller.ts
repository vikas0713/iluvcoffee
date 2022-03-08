import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Patch, Post, Query } from '@nestjs/common';
import { CoffeeService } from './coffee.service';
import { CreateCofeeDto } from './dto/create-cofee.dto';
import { UpdateCofeeDto } from './dto/update-cofee.dto';

@Controller('coffee')
export class CoffeeController {
    constructor(private readonly coffeeService: CoffeeService){}

    @Get('flavours')
    findAll(@Query() paginationQuery) {
        const {limit, offset} = paginationQuery;
        return this.coffeeService.findAll();
    }
    @Get(':id')
    findOne(@Param('id') id: string) {
        const coffee = this.coffeeService.findOne(id);
        if (!coffee){
            throw new NotFoundException(`Coffee ${id} not found`)
        }
        return this.coffeeService.findOne(id);
    }

    @Post()
    create(@Body() createCoffeeDto: CreateCofeeDto) {
        return this.coffeeService.create(createCoffeeDto);
    }

    @Patch(':id')
    update(@Param('id') id:string, updateCoffeeDto: UpdateCofeeDto){
        return this.coffeeService.update(id, updateCoffeeDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.coffeeService.remove(id);
    }
}

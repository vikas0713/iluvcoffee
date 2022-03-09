import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Coffee } from "./cofee.entity";

@Entity('flavour')
export class Flavour{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(type=> Coffee, coffee=>coffee.flavours)
    coffees: Coffee[];
}

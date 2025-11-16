import { Demo } from './domain/demo';
import { CreateDemoDto } from './dto/create-demo.dto';
import { UpdateDemoDto } from './dto/update-demo.dto';
export declare class DemoService {
    private items;
    findAll(): Demo[];
    create(dto: CreateDemoDto, ownerId?: string): Demo;
    findOne(id: string): Demo;
    update(id: string, dto: UpdateDemoDto): Demo;
    remove(id: string): void;
}

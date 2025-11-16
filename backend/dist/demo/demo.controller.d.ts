import { DemoService } from './demo.service';
import { CreateDemoDto } from './dto/create-demo.dto';
import { UpdateDemoDto } from './dto/update-demo.dto';
import { Demo } from './domain/demo';
export declare class DemoController {
    private readonly service;
    constructor(service: DemoService);
    findAll(): Demo[];
    findOne(id: string): Demo;
    create(dto: CreateDemoDto, req: any): Demo;
    update(id: string, dto: UpdateDemoDto): Demo;
    remove(id: string): void;
}

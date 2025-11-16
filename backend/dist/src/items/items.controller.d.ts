import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
export declare class ItemsController {
    private readonly service;
    constructor(service: ItemsService);
    findAll(): {
        id: number;
        title: string;
        description?: string | null;
        createdAt: string;
        createdBy?: number;
    }[];
    create(dto: CreateItemDto, req: any): {
        id: number;
        title: string;
        description?: string | null;
        createdAt: string;
        createdBy?: number;
    };
    update(id: number, dto: UpdateItemDto, req: any): {
        id: number;
        title: string;
        description?: string | null;
        createdAt: string;
        createdBy?: number;
    };
    remove(id: number): Promise<void>;
}

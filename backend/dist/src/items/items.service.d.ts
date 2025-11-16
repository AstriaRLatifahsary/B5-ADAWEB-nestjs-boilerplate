type Item = {
    id: number;
    title: string;
    description?: string | null;
    createdAt: string;
    createdBy?: number;
};
export declare class ItemsService {
    private items;
    private nextId;
    findAll(): Item[];
    create(data: {
        title: string;
        description?: string;
    }, userId?: number): Item;
    findById(id: number): Item | null;
    update(id: number, data: {
        title?: string;
        description?: string;
    }, userId?: number): Item | null;
    remove(id: number): boolean;
}
export {};

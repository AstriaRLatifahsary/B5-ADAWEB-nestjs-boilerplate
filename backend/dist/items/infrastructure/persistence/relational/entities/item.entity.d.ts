import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
export declare class ItemEntity extends EntityRelationalHelper {
    id: number;
    title: string;
    description?: string | null;
    createdAt: Date;
    createdBy?: number | null;
}

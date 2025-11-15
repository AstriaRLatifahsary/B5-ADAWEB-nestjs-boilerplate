import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
export declare class SessionEntity extends EntityRelationalHelper {
    id: number;
    user: UserEntity;
    hash: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}

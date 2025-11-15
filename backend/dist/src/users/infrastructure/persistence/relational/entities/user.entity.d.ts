import { RoleEntity } from '../../../../../roles/infrastructure/persistence/relational/entities/role.entity';
import { StatusEntity } from '../../../../../statuses/infrastructure/persistence/relational/entities/status.entity';
import { FileEntity } from '../../../../../files/infrastructure/persistence/relational/entities/file.entity';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
export declare class UserEntity extends EntityRelationalHelper {
    id: number;
    email: string | null;
    password?: string;
    provider: string;
    socialId?: string | null;
    firstName: string | null;
    lastName: string | null;
    photo?: FileEntity | null;
    role?: RoleEntity | null;
    status?: StatusEntity;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}

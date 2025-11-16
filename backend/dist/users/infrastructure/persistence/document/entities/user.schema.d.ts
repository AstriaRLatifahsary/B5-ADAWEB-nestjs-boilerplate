import { HydratedDocument } from 'mongoose';
import { FileSchemaClass } from '../../../../../files/infrastructure/persistence/document/entities/file.schema';
import { EntityDocumentHelper } from '../../../../../utils/document-entity-helper';
import { StatusSchema } from '../../../../../statuses/infrastructure/persistence/document/entities/status.schema';
import { RoleSchema } from '../../../../../roles/infrastructure/persistence/document/entities/role.schema';
export type UserSchemaDocument = HydratedDocument<UserSchemaClass>;
export declare class UserSchemaClass extends EntityDocumentHelper {
    email: string | null;
    password?: string;
    provider: string;
    socialId?: string | null;
    firstName: string | null;
    lastName: string | null;
    photo?: FileSchemaClass | null;
    role?: RoleSchema | null;
    status?: StatusSchema;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
export declare const UserSchema: import("mongoose").Schema<UserSchemaClass, import("mongoose").Model<UserSchemaClass, any, any, any, import("mongoose").Document<unknown, any, UserSchemaClass, any, {}> & UserSchemaClass & Required<{
    _id: string;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, UserSchemaClass, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<UserSchemaClass>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<UserSchemaClass> & Required<{
    _id: string;
}> & {
    __v: number;
}>;

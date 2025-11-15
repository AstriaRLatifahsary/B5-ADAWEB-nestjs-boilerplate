import mongoose, { HydratedDocument } from 'mongoose';
import { UserSchemaClass } from '../../../../../users/infrastructure/persistence/document/entities/user.schema';
import { EntityDocumentHelper } from '../../../../../utils/document-entity-helper';
export type SessionSchemaDocument = HydratedDocument<SessionSchemaClass>;
export declare class SessionSchemaClass extends EntityDocumentHelper {
    user: UserSchemaClass;
    hash: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
export declare const SessionSchema: mongoose.Schema<SessionSchemaClass, mongoose.Model<SessionSchemaClass, any, any, any, mongoose.Document<unknown, any, SessionSchemaClass, any, {}> & SessionSchemaClass & Required<{
    _id: string;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, SessionSchemaClass, mongoose.Document<unknown, {}, mongoose.FlatRecord<SessionSchemaClass>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<SessionSchemaClass> & Required<{
    _id: string;
}> & {
    __v: number;
}>;

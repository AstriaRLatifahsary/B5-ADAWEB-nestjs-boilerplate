import { HydratedDocument } from 'mongoose';
import { EntityDocumentHelper } from '../../../../../utils/document-entity-helper';
export type FileSchemaDocument = HydratedDocument<FileSchemaClass>;
export declare class FileSchemaClass extends EntityDocumentHelper {
    path: string;
}
export declare const FileSchema: import("mongoose").Schema<FileSchemaClass, import("mongoose").Model<FileSchemaClass, any, any, any, import("mongoose").Document<unknown, any, FileSchemaClass, any, {}> & FileSchemaClass & Required<{
    _id: string;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, FileSchemaClass, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<FileSchemaClass>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<FileSchemaClass> & Required<{
    _id: string;
}> & {
    __v: number;
}>;

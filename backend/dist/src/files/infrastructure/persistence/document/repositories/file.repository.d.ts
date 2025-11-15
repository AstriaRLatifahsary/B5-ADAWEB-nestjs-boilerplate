import { FileRepository } from '../../file.repository';
import { FileSchemaClass } from '../entities/file.schema';
import { Model } from 'mongoose';
import { FileType } from '../../../../domain/file';
import { NullableType } from '../../../../../utils/types/nullable.type';
export declare class FileDocumentRepository implements FileRepository {
    private fileModel;
    constructor(fileModel: Model<FileSchemaClass>);
    create(data: Omit<FileType, 'id'>): Promise<FileType>;
    findById(id: FileType['id']): Promise<NullableType<FileType>>;
    findByIds(ids: FileType['id'][]): Promise<FileType[]>;
}

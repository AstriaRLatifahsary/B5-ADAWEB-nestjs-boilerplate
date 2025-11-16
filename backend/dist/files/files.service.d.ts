import { FileRepository } from './infrastructure/persistence/file.repository';
import { FileType } from './domain/file';
import { NullableType } from '../utils/types/nullable.type';
export declare class FilesService {
    private readonly fileRepository;
    constructor(fileRepository: FileRepository);
    findById(id: FileType['id']): Promise<NullableType<FileType>>;
    findByIds(ids: FileType['id'][]): Promise<FileType[]>;
}

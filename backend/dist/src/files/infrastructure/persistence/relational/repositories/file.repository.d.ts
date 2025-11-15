import { FileEntity } from '../entities/file.entity';
import { Repository } from 'typeorm';
import { FileRepository } from '../../file.repository';
import { FileType } from '../../../../domain/file';
import { NullableType } from '../../../../../utils/types/nullable.type';
export declare class FileRelationalRepository implements FileRepository {
    private readonly fileRepository;
    constructor(fileRepository: Repository<FileEntity>);
    create(data: FileType): Promise<FileType>;
    findById(id: FileType['id']): Promise<NullableType<FileType>>;
    findByIds(ids: FileType['id'][]): Promise<FileType[]>;
}

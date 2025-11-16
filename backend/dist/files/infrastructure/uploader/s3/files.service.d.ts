import { FileRepository } from '../../persistence/file.repository';
import { FileType } from '../../../domain/file';
export declare class FilesS3Service {
    private readonly fileRepository;
    constructor(fileRepository: FileRepository);
    create(file: Express.MulterS3.File): Promise<{
        file: FileType;
    }>;
}

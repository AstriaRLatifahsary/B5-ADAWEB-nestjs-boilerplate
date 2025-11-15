import { ConfigService } from '@nestjs/config';
import { FileRepository } from '../../persistence/file.repository';
import { AllConfigType } from '../../../../config/config.type';
import { FileType } from '../../../domain/file';
export declare class FilesLocalService {
    private readonly configService;
    private readonly fileRepository;
    constructor(configService: ConfigService<AllConfigType>, fileRepository: FileRepository);
    create(file: Express.Multer.File): Promise<{
        file: FileType;
    }>;
}

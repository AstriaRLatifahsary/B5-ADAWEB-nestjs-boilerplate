import { FileRepository } from '../../persistence/file.repository';
import { FileUploadDto } from './dto/file.dto';
import { ConfigService } from '@nestjs/config';
import { FileType } from '../../../domain/file';
import { AllConfigType } from '../../../../config/config.type';
export declare class FilesS3PresignedService {
    private readonly fileRepository;
    private readonly configService;
    private s3;
    constructor(fileRepository: FileRepository, configService: ConfigService<AllConfigType>);
    create(file: FileUploadDto): Promise<{
        file: FileType;
        uploadSignedUrl: string;
    }>;
}

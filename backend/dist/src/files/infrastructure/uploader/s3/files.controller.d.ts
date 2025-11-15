import { FilesS3Service } from './files.service';
import { FileResponseDto } from './dto/file-response.dto';
export declare class FilesS3Controller {
    private readonly filesService;
    constructor(filesService: FilesS3Service);
    uploadFile(file: Express.MulterS3.File): Promise<FileResponseDto>;
}

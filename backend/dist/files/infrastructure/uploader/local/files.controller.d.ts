import { FilesLocalService } from './files.service';
import { FileResponseDto } from './dto/file-response.dto';
export declare class FilesLocalController {
    private readonly filesService;
    constructor(filesService: FilesLocalService);
    uploadFile(file: Express.Multer.File): Promise<FileResponseDto>;
    download(path: any, response: any): any;
}

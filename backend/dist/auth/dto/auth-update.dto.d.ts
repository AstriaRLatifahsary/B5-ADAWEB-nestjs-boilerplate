import { FileDto } from '../../files/dto/file.dto';
export declare class AuthUpdateDto {
    photo?: FileDto | null;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    oldPassword?: string;
}

import { FileDto } from '../../files/dto/file.dto';
import { RoleDto } from '../../roles/dto/role.dto';
import { StatusDto } from '../../statuses/dto/status.dto';
export declare class CreateUserDto {
    email: string | null;
    password?: string;
    provider?: string;
    socialId?: string | null;
    firstName: string | null;
    lastName: string | null;
    photo?: FileDto | null;
    role?: RoleDto | null;
    status?: StatusDto;
}

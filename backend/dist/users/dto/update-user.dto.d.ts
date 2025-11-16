import { CreateUserDto } from './create-user.dto';
import { FileDto } from '../../files/dto/file.dto';
import { RoleDto } from '../../roles/dto/role.dto';
import { StatusDto } from '../../statuses/dto/status.dto';
declare const UpdateUserDto_base: import("@nestjs/common").Type<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
    email?: string | null;
    password?: string;
    provider?: string;
    socialId?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    photo?: FileDto | null;
    role?: RoleDto | null;
    status?: StatusDto;
}
export {};

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InfinityPaginationResponseDto } from '../utils/dto/infinity-pagination-response.dto';
import { NullableType } from '../utils/types/nullable.type';
import { QueryUserDto } from './dto/query-user.dto';
import { User } from './domain/user';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createProfileDto: CreateUserDto): Promise<User>;
    findAll(query: QueryUserDto): Promise<InfinityPaginationResponseDto<User>>;
    findOne(id: User['id']): Promise<NullableType<User>>;
    update(id: User['id'], updateProfileDto: UpdateUserDto): Promise<User | null>;
    remove(id: User['id']): Promise<void>;
}

import { CreateUserDto } from './dto/create-user.dto';
import { NullableType } from '../utils/types/nullable.type';
import { FilterUserDto, SortUserDto } from './dto/query-user.dto';
import { UserRepository } from './infrastructure/persistence/user.repository';
import { User } from './domain/user';
import { FilesService } from '../files/files.service';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private readonly usersRepository;
    private readonly filesService;
    constructor(usersRepository: UserRepository, filesService: FilesService);
    create(createUserDto: CreateUserDto): Promise<User>;
    findManyWithPagination({ filterOptions, sortOptions, paginationOptions, }: {
        filterOptions?: FilterUserDto | null;
        sortOptions?: SortUserDto[] | null;
        paginationOptions: IPaginationOptions;
    }): Promise<User[]>;
    findById(id: User['id']): Promise<NullableType<User>>;
    findByIds(ids: User['id'][]): Promise<User[]>;
    findByEmail(email: User['email']): Promise<NullableType<User>>;
    findBySocialIdAndProvider({ socialId, provider, }: {
        socialId: User['socialId'];
        provider: User['provider'];
    }): Promise<NullableType<User>>;
    update(id: User['id'], updateUserDto: UpdateUserDto): Promise<User | null>;
    remove(id: User['id']): Promise<void>;
}

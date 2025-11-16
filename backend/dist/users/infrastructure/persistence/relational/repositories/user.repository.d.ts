import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { FilterUserDto, SortUserDto } from '../../../../dto/query-user.dto';
import { User } from '../../../../domain/user';
import { UserRepository } from '../../user.repository';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
export declare class UsersRelationalRepository implements UserRepository {
    private readonly usersRepository;
    constructor(usersRepository: Repository<UserEntity>);
    create(data: User): Promise<User>;
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
    update(id: User['id'], payload: Partial<User>): Promise<User>;
    remove(id: User['id']): Promise<void>;
}

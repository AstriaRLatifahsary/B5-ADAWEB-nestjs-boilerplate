import { Repository } from 'typeorm';
import { SessionEntity } from '../entities/session.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { SessionRepository } from '../../session.repository';
import { Session } from '../../../../domain/session';
import { User } from '../../../../../users/domain/user';
export declare class SessionRelationalRepository implements SessionRepository {
    private readonly sessionRepository;
    constructor(sessionRepository: Repository<SessionEntity>);
    findById(id: Session['id']): Promise<NullableType<Session>>;
    create(data: Session): Promise<Session>;
    update(id: Session['id'], payload: Partial<Omit<Session, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>>): Promise<Session | null>;
    deleteById(id: Session['id']): Promise<void>;
    deleteByUserId(conditions: {
        userId: User['id'];
    }): Promise<void>;
    deleteByUserIdWithExclude(conditions: {
        userId: User['id'];
        excludeSessionId: Session['id'];
    }): Promise<void>;
}

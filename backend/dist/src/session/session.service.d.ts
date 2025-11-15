import { SessionRepository } from './infrastructure/persistence/session.repository';
import { Session } from './domain/session';
import { User } from '../users/domain/user';
import { NullableType } from '../utils/types/nullable.type';
export declare class SessionService {
    private readonly sessionRepository;
    constructor(sessionRepository: SessionRepository);
    findById(id: Session['id']): Promise<NullableType<Session>>;
    create(data: Omit<Session, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Promise<Session>;
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

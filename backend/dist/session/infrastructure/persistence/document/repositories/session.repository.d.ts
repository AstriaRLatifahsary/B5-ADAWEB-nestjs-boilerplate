import { NullableType } from '../../../../../utils/types/nullable.type';
import { SessionRepository } from '../../session.repository';
import { Session } from '../../../../domain/session';
import { SessionSchemaClass } from '../entities/session.schema';
import { Model } from 'mongoose';
import { User } from '../../../../../users/domain/user';
export declare class SessionDocumentRepository implements SessionRepository {
    private sessionModel;
    constructor(sessionModel: Model<SessionSchemaClass>);
    findById(id: Session['id']): Promise<NullableType<Session>>;
    create(data: Session): Promise<Session>;
    update(id: Session['id'], payload: Partial<Session>): Promise<Session | null>;
    deleteById(id: Session['id']): Promise<void>;
    deleteByUserId({ userId }: {
        userId: User['id'];
    }): Promise<void>;
    deleteByUserIdWithExclude({ userId, excludeSessionId, }: {
        userId: User['id'];
        excludeSessionId: Session['id'];
    }): Promise<void>;
}

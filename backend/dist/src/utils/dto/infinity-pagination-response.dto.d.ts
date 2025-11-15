import { Type } from '@nestjs/common';
export declare class InfinityPaginationResponseDto<T> {
    data: T[];
    hasNextPage: boolean;
}
export declare function InfinityPaginationResponse<T>(classReference: Type<T>): abstract new () => {
    data: T[];
    hasNextPage: boolean;
};

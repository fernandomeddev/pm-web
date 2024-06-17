export interface ICacheHandler {
    get<T>(key: string): T | undefined;
    set<T>(key: string, value: T, ttl?: number): void 
};

interface ICacheManager {
    default?: ICacheHandler
}

export const CacheManager: ICacheManager = {}
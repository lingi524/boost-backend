export interface Dao<T> {
    getAll: () => Promise<T[]>
    getById: (id: string)  => Promise<T>
    create: (item: T) => Promise<void>
    update: (item: T) => Promise<void>
    delete: (id: string) => Promise<void>
}

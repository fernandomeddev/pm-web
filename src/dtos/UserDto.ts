export interface UserDto {
    id?: string;
    name: string;
    email: string;
    hashedPassword?: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}
import type { Product, User } from "./types";

export interface MessageResponse {
    statusCode: number;
    message: string;
    data: object;
    success: boolean;
}
export interface UserResponse extends MessageResponse {
    data: User;
}
export interface ProductResponse extends MessageResponse {
    data: Product[];
}
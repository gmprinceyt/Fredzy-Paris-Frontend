import type { User } from "./types";

export interface UserReducerInitailState  {
    user: User | null;
    loading: boolean;
}
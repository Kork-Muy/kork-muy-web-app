import type { IUserDto } from "~/models/dto/user/IUser.dto";

export interface ILoginResponse {
    access_token: string;
    refresh_token: string;
    user: IUserDto;
}
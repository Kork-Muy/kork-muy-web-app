import type { IUserDto } from "~/models/dto/user/IUser.dto";

export interface ILoginResponse {
    user: IUserDto;
}
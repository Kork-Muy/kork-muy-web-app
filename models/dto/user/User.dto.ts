import type { IUserDto } from "./IUser.dto";

export class UserDto implements IUserDto {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    avatar: string;

    constructor(data: IUserDto) {
        this.id = data.id;
        this.firstname = data.firstname;
        this.lastname = data.lastname;
        this.email = data.email;
        this.avatar = data.avatar;
    }

    get fullName(): string {
        return `${this.firstname} ${this.lastname}`;
    }
}
export interface ILoginRequest {
    email: string;
    password: string;
}

export class LoginRequest implements ILoginRequest {
    email: string;
    password: string;

    constructor(data: ILoginRequest) {
        this.email = data.email;
        this.password = data.password;
    }

    public toString(): string {
        return JSON.stringify(this);
    }
}
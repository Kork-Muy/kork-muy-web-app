export interface IRegisterRequest {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
}

export class RegisterRequest implements IRegisterRequest {
    email: string;
    password: string;
    firstname: string;
    lastname: string;

    constructor(data: IRegisterRequest) {
        this.email = data.email;
        this.password = data.password;
        this.firstname = data.firstname;
        this.lastname = data.lastname;
    }

    // private hashPassword(password: string): string {
    //     return bcrypt.hashSync(password, 10);
    // }

    public toString(): string {
        return JSON.stringify(this);
    }
}
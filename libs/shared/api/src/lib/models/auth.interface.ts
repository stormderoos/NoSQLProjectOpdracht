export interface IUserCredentials {
    email: string;
    password: string;
}

export interface IUserRegistration extends IUserCredentials {
    username: string;
}

export interface IToken {
    token: string;
}

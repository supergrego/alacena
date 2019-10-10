export interface User {
    amount: number;
    email: string;
    uid: string;
    displayName?: string;
    photoUrl?: string;
    roles: Roles;
}

export interface Roles {
    admin?: boolean;
    caller?: boolean;
    accountant?: boolean;
    firstFloor?:boolean;
}

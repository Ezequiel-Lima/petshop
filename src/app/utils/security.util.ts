import { User } from "../models/user.model";

export class Security {
    public static set(user: User, token: string) {
        const data = JSON.stringify(user);

        sessionStorage.setItem('petshopuser', btoa(data));
        sessionStorage.setItem('petshoptoken', token);
    }

    public static setUser(user: User) {
        const data = JSON.stringify(user);
        sessionStorage.setItem('petshopuser', btoa(data));
    }

    public static setToken(token: string) {
        sessionStorage.setItem('petshoptoken', token);
    }

    public static getUser(): User {
        const data = sessionStorage.getItem('petshopuser');
        if (data) {
            return JSON.parse(atob(data));
        } else {
            return null as any;
        }
    }

    public static getToken(): string {
        const data = sessionStorage.getItem('petshoptoken');
        if (data) {
            return data;
        } else {
            return null as any;
        }
    }

    public static hasToken(): boolean {
        if (this.getToken())
            return true;
        else
            return false;
    }

    public static clear() {
        sessionStorage.removeItem('petshopuser');
        sessionStorage.removeItem('petshoptoken');
    }
}

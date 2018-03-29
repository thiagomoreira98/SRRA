import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { UiCookie } from "ng-smn-ui";
import { environment } from "../../../../environments/environment";
import { LoginService } from '../../../views/auth/login/login.service';

let user: any = {};
let token: string;
let menu: any[];

// const COOKIE_NAME: any = {
//     authentication: `${environment.SYSTEM_PREFIX}Authentication`,
//     keepConnect: `${environment.SYSTEM_PREFIX}KeepConnect`
// };

const COOKIE_NAME = 'srra';

@Injectable()
export class UserService {

    constructor() {
    }

    public static get() {
        return {
            user,
            token
        };
    }

    public static getUser() {
        return user;
    }

    public static setUser(newUser) {
        user = newUser;
        user.cor = '#009688';
    }

    public static setMenu(newMenu) {
        menu = newMenu;
    }

    public static getMenu() {
        return menu;
    }

    public static getToken() {
        return UiCookie.get(COOKIE_NAME);
    }

    public static setToken(newToken) {
        token = newToken;
        this.setCookie(token);
    }

    public static getCookie() {
        return UiCookie.get(COOKIE_NAME)
    }

    public static setCookie(token) {
        UiCookie.set(COOKIE_NAME, token, 0.3, '/');
    }

    public static remove() {
        user = null;
        token = null;
        UiCookie.delete(COOKIE_NAME);
    }
}
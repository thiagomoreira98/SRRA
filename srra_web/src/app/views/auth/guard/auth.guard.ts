import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UiSnackbar } from 'ng-smn-ui';
import { UserService } from "../../../core/utils/user/user.service";
// import { ApiService } from "../../../core/api/api.service";
import { environment } from "../../../../environments/environment";
import { LoginService } from '../login/login.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private loginService: LoginService) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        let usuario = UserService.getUser();

        if (usuario.id) {
            return true;
        } else {
            return this.remakeLogin();
        }
    }

    remakeLogin(): any {
        return new Promise<boolean>(resolve => {
            const cookie = UserService.getCookie();

            if (cookie) {
                let headers = new HttpHeaders({
                    'Authentication': cookie
                });

                this.loginService.refazerLogin(headers).subscribe((res: any) => {
                    UserService.setToken(res.content.token);
                    UserService.setMenu(res.content.opcoesMenu);
                    UserService.setUser(res.content.usuario);
                    resolve(true);
                }), (res: any) => {
                    this.handleError(res);
                    resolve(false);
                };
            }
            else {
                this.handleError({ _status: 401 });
                resolve(false);
            }
        });
    }

    handleError(res): any {
        switch (res._status) {
            case 401:
                let text: string;
                switch (res.executionCode) {
                    case 2:
                        text = 'Parece que sua senha está incorreta, tente refazer o login';
                        break;
                    case 3:
                        text = 'Seu usuário está bloqueado';
                        break;
                    case 4:
                        text = 'Sua senha expirou, tente refazer o login';
                        break;
                    case 5:
                        text = 'Você está bloqueado à acessar neste horário';
                        break;
                    default:
                        text = 'Seu login expirou. Refaça o login novamente';
                        break;
                }

                UiSnackbar.show({
                    text,
                    actionText: 'OK',
                    action: close => close()
                });
                this.router.navigate(['/login']);
                break;
            case 403:
                this.router.navigate(['/forbidden']);
                break;
            case 404:
                UiSnackbar.show({
                    text: 'Não conseguimos encontrar seu usuário, tente refazer o login',
                    actionText: 'OK',
                    action: close => close()
                });
                this.router.navigate(['/login']);
                break;
        }
    }
}
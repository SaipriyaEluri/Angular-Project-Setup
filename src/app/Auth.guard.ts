import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from './Services/Auth.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private Authguardservice: AuthService, private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const isAuthenticated: any = this.Authguardservice.isAuthenticated();
        // console.log(isAuthenticated, 'isAuthenticated');

        const authData = this.Authguardservice.getAuthData();
        let url: string = state.url;

        if (!isAuthenticated) {
            this.router.navigateByUrl("/auth/login");
        }

        if (authData && authData?.role != "SuperAdmin" && url) {
            if (url.includes('/super-admin')) {
                if (authData.role == 'Admin') {
                    this.router.navigateByUrl('/admin/common/summary');
                } else if (authData.role == 'Project Head') {
                    this.router.navigateByUrl('/project-head/common/summary');
                } else if (authData.role == 'Internal QC Head') {
                    this.router.navigateByUrl('/internal-qc-head/common/summary');
                } else if (authData.role == 'Unit Incharge') {
                    this.router.navigateByUrl('/unit-incharge/common/summary');
                } else if (authData.role == 'External QC Head') {
                    this.router.navigateByUrl('/external-qc-head/projects');
                } else if (authData.role == 'Validator') {
                    this.router.navigateByUrl('/qc-team/validation');
                } else if (authData.role == 'Management') {
                    this.router.navigateByUrl('/management/common/summary');
                } else if (authData.role === "Inspector" || authData.role === "Validator") {
                    this.router.navigateByUrl('/qc-team/inspection');
                } else if (authData.role === "External Inspector" || authData.role === "External Validator") {
                    this.router.navigateByUrl('/qc-team/external-projects-list');
                }
                return false;
            }

            if (authData?.role=="Unit Incharge" && !url.includes('/unit-incharge')) {
                this.router.navigateByUrl('/unit-incharge/common/summary');
                return false;
            }
            if (authData?.role=="project-head" && !url.includes('/project-head')) {
                this.router.navigateByUrl('/project-head/common/summary');
                return false;
            }

            if (authData?.role=="project-head" && !url.includes('/admin')) {
                this.router.navigateByUrl('/admin/common/summary');
                return false;
            }

            if (authData?.role=="Management" && !url.includes('/management')) {
                this.router.navigateByUrl('/management/common/summary');
                return false;
            }

            if ((authData.role === "Inspector" || authData?.role=="Validator") && !url.includes('/qc-team')) {
                this.router.navigateByUrl('/qc-team/validation');
                return false;
            }

            if ((authData.role === "External Inspector" || authData.role === "External Validator") && !url.includes('/qc-team')) {
                this.router.navigateByUrl('/qc-team/external-projects-list');
                return false;
            }
        }
        return isAuthenticated;
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.Authguardservice.isAuthenticated();
    }
}
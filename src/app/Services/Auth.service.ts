import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from "rxjs";
import { FormControl, FormGroup } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { NewUserModel } from './InterfacesModels';
import { Location } from '@angular/common';

// var CryptoJS = require("crypto-js");

export interface SHAIRED_DATA {
    type: string;
    data: any;
}

@Injectable({
    providedIn: 'root',
  })
export class AuthService {
    emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    public STORAGE_KEY = environment.STORAGE_KEY;
    public baseUrl = environment.baseUrl;
    private _todo = new BehaviorSubject<SHAIRED_DATA[]>([]);
    readonly todos$ = this._todo.asObservable();
    private todos: SHAIRED_DATA[] = [];
    private messageSource = new BehaviorSubject({});
    currentMessage: any = {};
    isInChildNavigation: boolean = false;
    apartmnetPlusVillaCountCallApi: number = 0;

    constructor(private http: HttpClient, private router: Router, private bPoint: BreakpointObserver, public location: Location) {
        this.currentMessage = this.messageSource.asObservable();
        if (localStorage.getItem(environment.LOCATION_HISTORY)) {
            let v: any = JSON.parse(localStorage.getItem(environment.LOCATION_HISTORY) || '{}');
            this._todo.next(Object.assign([], v));
        }
        // this.getPropertyDetailsByAdminId();
    }




    /**@GET_TOKEN */
    async isAuthenticated() {
        const auth: any = await this.getAuthToken();
        if (auth) return true;
        return false;
    }

    /**@getAuthToken */
    getAuthToken(): any {
        const auth: any = this.getAuthData();
        if (auth && auth?.token) {
            return auth?.token;
        }
        return false;
    }

    /**@getAuthDATA */
    getAuthData() {
        let temp: any = localStorage.getItem(this.STORAGE_KEY);
        temp = (temp ? this.decryption(temp) : null);
        if (temp) {
            const auth: any = JSON.parse(temp);
            return auth;
        }
        return null;
    }

    /**@ENCRYPTION_KEY */
    public encryption(ciphertext: any) {
        return CryptoJS.AES.encrypt(JSON.stringify(ciphertext), environment.SALT_SECRET).toString();
    }

    /**@DECRYPTION_KEY */
    public decryption(ciphertext: any) {
        return CryptoJS.AES.decrypt(ciphertext, environment.SALT_SECRET).toString(CryptoJS.enc.Utf8);
    }

    async delay(time: number) {
        return new Promise(resolve => { setTimeout(() => { resolve(true) }, (time || 1000)); })
    }


    /**@BACK_NAVIGATION */
    public goBack() {
        this.location.back();
    }

    /**@NAVIGATE_TO */
    public navigateTo(routerUrl: string) {
        this.router.navigate([routerUrl])
    }

    /**@GET_CURRENT_RIUTE_NAME */
    public getCurrentRouteName() {
        return this.router.url;
    }

    /**@REFRESH_COMPONENTS */
    public refresh() {
        let routerUrl = this.router.url;
        try {
            this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
                this.router.navigate([routerUrl]);
            });
        } catch (error) {

        }
    }

    /**@SIGN_IN_USER */
    signIn(body: any) {
        return this.http.post(`${this.baseUrl}/projectinfo-snagr/login`, body);
    }

    /**@FORGOT_PASSWORD_WITH_ID_or_EMAIL */
    forgotPassword(body: any) {
        return this.http.post(`${this.baseUrl}/projectinfo-snagr/forgotPassword`, body);
    }

    /**@FORGOT_PASSWORD_WITH_ID_or_EMAIL */
    verifyOtp(body: any) {
        return this.http.post(`${this.baseUrl}/projectinfo-snagr/verifyOtpForgotPwd`, body);
    }

    // /**@SIGN_UP_USER */
    // createPassword(body: any) {
    //     return this.http.post(`${this.baseUrl}/auth/signup/verify`, body);
    // }

    // /**@SEND_EMAIL_FOR_FORGOT_PASSWORD */
    // sendEmailForForgotPassword(body: any) {
    //     return this.http.post(`${this.baseUrl}/user/sendOtpTomail`, body);
    // }

    /**@GET_PROJECT_INFO_BY_ID_LIST */
    getPropertyDetailsByRole(role: string, projectType: string, externalType?:string) {
        let that = this;
        return new Promise(function (resolveDone, rejectDone) {
            const auth: any = that.getAuthData();
            if (auth && auth?._id) {
                let apiName: string = "";
                console.log(role,'role============')
                if (role == 'Admin') {
                    apiName = `getPropertyDetailsByAdminId/${auth?._id}`;
                } else if (role === 'Inspector' || role==='Validator') {
                    apiName = `getCotractDetailsById_inspector${projectType == 'Villas' ? '?projectType=Villas' : ''}`;
                } else if (role === 'External Inspector' || role==="External Validator") {
                    apiName = `getCotractDetailsById_externalInspectionTeam${projectType == 'Villas' ? '?projectType=Villas' : ''}`;
                } else if(externalType==='login-external-user'){
                    apiName = `getCotractDetailsById_externalteam?pageNo=1&perPage=10`;
                } else {
                    apiName = `getCotractDetailsById${projectType == 'Villas' ? '?projectType=Villas' : ''}`;
                }

                that.apartmnetPlusVillaCountCallApi++;
                that.http.get(`${that.baseUrl}/projectinfo-snagr/${apiName}`).subscribe({
                    next: (res: any) => {
                        if (res && res.status && res.statusCode) {
                            let auth: any;
                            if (res.data && role == 'Admin') {
                                auth = that.encryption(res.data);
                            } else {
                                auth = that.encryption({
                                    projectType: res.data[0].projectType,
                                    projectName: res.data[0].projectName,
                                    projectId: res.data[0].projectId,
                                    developerLogo: res.developerLogo,
                                    _id: res.data[0].projectId,

                                });
                            }

                            localStorage.setItem(`${environment.STORAGE_KEY}/projectInfo`, auth);
                            resolveDone({ data: res.data, status: 200 });
                        }
                    }, error: (err: any) => {
                        if (projectType == 'Apartments + Villas') {
                            if (that.apartmnetPlusVillaCountCallApi == 1) {
                                that.getPropertyDetailsByRole(role, 'Villas');
                            }
                        }
                        resolveDone(err);
                    }
                });
            }
        });
    }

    /**@GET_PROJECT_INFO */
    get getProjectInfo() {
        if (localStorage.getItem(`${environment.STORAGE_KEY}/projectInfo`)) {
            return JSON.parse(this.decryption(localStorage.getItem(`${environment.STORAGE_KEY}/projectInfo`)));
        } else {
            return null;
        }
    }

    /**@SHARED_MESSAGE */
    changeMessage(message: SHAIRED_DATA) {
        this.messageSource.next(message);
    }

    /**@CREATE_NEW_MESSAGE */
    createMessage(item: SHAIRED_DATA) {
        let obj: any = {};
        if (this._todo.value) {
            obj = this._todo.value;
        }
        obj[item.type] = item.data;
        this._todo.next(Object.assign([], obj));
        localStorage.setItem(environment.LOCATION_HISTORY, JSON.stringify(Object.assign({}, obj)));
    }

    /**@DELETE_EXISTING_MESSAGE */
    removeMessage(sno: number) {
        for (const key in this._todo.value) {
            var i = Object.keys(this._todo.value).indexOf(key);
            if (i === sno) {
                this.todos.splice(i, 1);
                this._todo.next(Object.assign([], this.todos));
            }
        }
        localStorage.setItem(environment.LOCATION_HISTORY, JSON.stringify(Object.assign({}, this._todo.value)));
    }

    /**
     * Marks all controls in a form group as touched
     * @param formGroup - The form group to touch
    */
    markFormGroupTouched(formGroup: FormGroup) {
        (<any>Object).values(formGroup.controls).forEach((control: any) => {
            control.markAsTouched();
            if (control.controls) {
                this.markFormGroupTouched(control);
            }
        });
    }

    /**
     * Marks all controls in a form group as unTouched, reset & remove error
     * @param formGroup - The form group to touch
     */
    markUnTouchedAndReset(formGroup: FormGroup) {
        formGroup.reset();
        formGroup.markAsPristine({ onlySelf: true });
        formGroup.markAsUntouched({ onlySelf: true });
        (<any>Object).keys(formGroup.controls).map((field: any) => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) { control.setErrors(null); }
        });
    }

    get getBreakPoints() {
        return this.bPoint.observe(Breakpoints.XSmall);
    }

    getStateAndCityList() {
        return this.http.get('./assets/JSON/allStateAndCity.json');
    }

    private contractorNameSource = new BehaviorSubject<string>('');
    contractorName$ = this.contractorNameSource.asObservable();
  
    updateContractorName(name: string): void {
      this.contractorNameSource.next(name);
    }

    resetContractorName(): void {
        this.contractorNameSource.next('');
      }
}
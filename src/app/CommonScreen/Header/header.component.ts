import { Component, Input, OnInit, Injectable } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common'
import { AuthService } from './../../Services/Auth.service';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import { MuiDialogService } from 'src/app/Services/MuiDialog.service';
// import { sideMenuListObj } from './../../Layouts/app-layout.constants';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() titleName: string | undefined;
  @Input() headerType: string | undefined;
  @Input() contractorName: string | undefined;
  isbackNavigation: boolean = false;
  currentBackNavigationIndex: number = -1;
  @Output() onToggleSidebar = new EventEmitter<any>();
  // sideMenuListObj = JSON.parse(JSON.stringify(sideMenuListObj)) || []
  authData: any = {};
  userImg: string = "assets/Images/avatar.png"
  isSuperAdminProjectSelected: boolean = false;
  routerEventsSubscription: Subscription | undefined;
  constructor(private router: Router, private service: AuthService, private location: Location,
    private muiDialog: MuiDialogService,
  ) {


    // router.events.subscribe((val:any ) => {
    //   switch (val.url) {
    //     case '/audit-form':
    //       this.titleName='Audit Form';
    //       break;

    //     case '/audit-form':
    //       this.titleName='Audit Form';
    //       break;

    //     default:
    //       break;
    //   }
    // });


    this.authData = this.service.getAuthData();
    console.log(this.authData, 'authData============')
    this.service.todos$.subscribe(async (value: any) => {
      const res = await this.service.delay(100);
      if (res) {
        let i = 0;
        for (const key in value) {
          const routeName = this.service.getCurrentRouteName();
          const el: any = value[key];
          if (key == routeName && el?.isBackNavigation == true) {
            this.currentBackNavigationIndex = i;
            this.isbackNavigation = true;
            if (el?.displayName) this.titleName = el?.displayName;
          }
          i++;
        }
      }
    });
  }

  ngOnInit(): void {


  }

  ngOnChanges() {
    if (this.router.url == '/super-admin/contract-list' || this.router.url == '/super-admin/new-contract' || this.router.url == '/super-admin/dashboard' || this.router.url == '/super-admin/external-user-list') {
      this.isSuperAdminProjectSelected = false;
    } else {
      this.isSuperAdminProjectSelected = true;
    }

  }

  onToggle() {
    this.onToggleSidebar.emit({ action: 'Toggle' });
    const navBar: any = document.querySelector('.header-nav-bar') as HTMLElement;
    if (navBar) {
      let stle = window.getComputedStyle(navBar);
      if (stle['left'] == '100px') {
        // navBar.style.left=0;
      }
    }

  }

  async back() {
    this.location.back();
    this.service.removeMessage(this.currentBackNavigationIndex);
    this.currentBackNavigationIndex = -1;
    this.service.changeMessage({ type: 'REFRESH_SIDEMENU', data: true });
    const res = await this.service.delay(200);
    if (res) this.getHeaderTitleName();
  }

  getHeaderTitleName() {
    // for (let i = 0; i < this.sideMenuListObj.length; i++) {
    //   if(this.router.url==this.sideMenuListObj[i].link){
    //     this.titleName=(this.sideMenuListObj[i].displayName);
    //     this.isbackNavigation=false;
    //   }
    // }
  }

  changePassword() {
    this.authData = this.service.getAuthData();
    if (this.authData) {
      if (this.authData.role == 'Admin') {
        this.service.navigateTo('/admin/common/change-password');
      } else if (this.authData.role == 'Project Head') {
        this.service.navigateTo('/project-head/common/change-password');
      } else if (this.authData.role == 'Internal QC Head') {
        this.service.navigateTo('/internal-qc-head/common/change-password');
      } else if (this.authData.role == 'Unit Incharge') {
        this.service.navigateTo('/unit-incharge/common/change-password');
      } else if (this.authData.role == 'External QC Head') {
        this.service.navigateTo('/external-qc-head/common/change-password');
      } else if (this.authData.role == 'Validator') {
        this.service.navigateTo('/qc-team/common/change-password');
      } else if (this.authData.role == 'Management') {
        this.service.navigateTo('/management/common/change-password');
      } else if (this.authData.role === "Inspector" || this.authData.role === "Validator") {
        this.service.navigateTo('/qc-team/change-password');
      } else if (this.authData.role === "External Inspector" || this.authData.role === "External Validator") {
        this.service.navigateTo('/qc-team/change-password');
      } else if (this.authData.role == 'SuperAdmin') {
        this.service.navigateTo('/super-admin/common/change-password');
      }
    }
  }

  logout() {
    localStorage.removeItem(environment.STORAGE_KEY);
    localStorage.clear();
    sessionStorage.clear();
    localStorage.setItem('logoutEvent', 'true');
    localStorage.removeItem('loginEvent');
    this.service.navigateTo('/auth/login');

    // const config={
    //   icon: 'assets/Imgs/PNG/logout.png',
    //   title: 'Logout',
    //   message: 'Are you sure you want to Logout?',
    //   confirmCaption: 'Yes, Logout',
    //   cancelCaption: 'Cancel',
    //   confirmBtnColor: '#DC2626'
    // }
    // this.muiDialog.confirm(config).subscribe((yes) => {
    //   if (yes) {
    //     localStorage.removeItem(environment.STORAGE_KEY);
    //     localStorage.clear();
    //     sessionStorage.clear();
    //     localStorage.setItem('logoutEvent', 'true');
    //     localStorage.removeItem('loginEvent');
    //     this.service.navigateTo('/auth/login');
    //   }
    //   if (!yes) console.log('The user said NO');
    // });
  }

  /**@GET_PROJECT_INFO */
  get getProjectInfo() {
    if (localStorage.getItem(`${environment.STORAGE_KEY}/projectInfo`)) {

      return JSON.parse(this.service.decryption(localStorage.getItem(`${environment.STORAGE_KEY}/projectInfo`)));
    } else {
      return null;
    }
  }
}

import { Component, OnInit, EventEmitter, Input, Output, isDevMode, ViewChild } from '@angular/core';
// import { sideMenuListObj } from './../../Layouts/app-layout.constants';

import { Router, ActivatedRoute, NavigationStart, NavigationEnd } from '@angular/router';
import { AuthService } from './../../Services/Auth.service'
import { MuiDialogService } from '../../Services/MuiDialog.service'
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})

export class SideMenuComponent implements OnInit {
  @Output() onChangeRoutes = new EventEmitter<any>();
  @Input() sideMenuListObj: any = [];
  routerEventsSubscription: Subscription | undefined;
  isSuperAdminProjectSelected: boolean = false;
  showSubmenu: number = -1;
  @Input() showFullBar: boolean = true;
  defaultImage: string = 'assets/Imgs/Default/snagar-sidemenu.png';
  sidebarLogo: string = "assets/Imgs/Default/snagar-sidemenu.png";
  activeUrl: string | undefined;
  submenuActivateIndexNo: number = -1;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private toastService: MuiDialogService, private service: AuthService) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.activeUrl = this.router.url;
    });

    if (sessionStorage.getItem(`${environment.STORAGE_KEY}/showSubmenu`)) {
      this.showSubmenu = Number(sessionStorage.getItem(`${environment.STORAGE_KEY}/showSubmenu`));
    }

    this.service.currentMessage.subscribe((value: any) => {
      if (value?.type == 'REFRESH_SIDEMENU') {
        (async () => {
          const res = await this.service.delay(200);
          if (res) { this.ngOnInit(); }
        })();
      }

      if (value?.type == 'EXTERNAL_QC_PROJECT_SELECTED') {
        (async () => {
          const res = await this.service.delay(200);
          if (res) { this.ngOnInit(); }
        })();
      }

      if (value?.type == 'EXTERNAL_QC_TEAM_PROJECT_SELECTED') {
        (async () => {
          const res = await this.service.delay(200);
          if (res) { this.ngOnInit(); }
        })();
      }

    })
  }

  get isInspectElementOpened() {
    if ((window.screen.height - window.innerHeight) > 160) {
      return true;
    } else {
      return false;
    }
  }

  ngOnInit(): void {
    setTimeout(() => {
      for (let i = 0; i < this.sideMenuListObj.length; i++) {
        if (this.router.url == this.sideMenuListObj[i].link) {
          this.onChangeRoutes.emit({ ...this.sideMenuListObj[i], onLoad: (window.innerWidth > 1200 ? true : false) });
        }
      }
    }, 300);

    this.handleChangeRoutes('fresh');
    this.routerEventsSubscription = this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.handleChangeRoutes(event);
      }
    });

    const savedSubmenu = sessionStorage.getItem(`${environment.STORAGE_KEY}/showSubmenu`);
    console.log(savedSubmenu,'saved sub menu')
    if (savedSubmenu !== null) {
        this.showSubmenu = +savedSubmenu;
        this.submenuActivateIndexNo = +savedSubmenu;
        this.showFullBar = true; // Keep sidebar open
    }
    // Detect active route and highlight parent
    this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
            this.highlightParentMenu();
        }
    });

    // Check if any submenu is active on page load
    this.highlightParentMenu();
  }


  handleChangeRoutes(event: any) {
    if (this.router.url && this.router.url.includes('super-admin')) {
      let split: any = this.router.url.split('/');
      split = split.filter((n: any) => n);

      if (this.router.url === '/super-admin/new-contract/project-setup') {
        this.sideMenuListObj[2].visibility = true;
        this.sideMenuListObj[4].visibility = false;
      } else {
        this.sideMenuListObj[2].visibility = false;
        // this.switchProjectTypes();
      }

      if (this.router.url == '/super-admin/common/contract-details' || this.router.url == '/super-admin/common/inventory-details' || this.router.url == '/super-admin/common/inventory-details-villa' || this.router.url == '/super-admin/common/summary' || this.router.url == '/super-admin/common/villa-summary' || this.router.url == '/super-admin/contractor-category' || this.router.url == '/super-admin/common/team-details' || this.router.url == '/super-admin/common/payment-details' || this.router.url == '/super-admin/common/payment-details-villa' || this.router.url == '/super-admin/new-contract/data-management/view-details' || this.router.url == '/super-admin/external-QC-head-allocation' || this.router.url == '/super-admin/external-QC-head-villa') {
        this.sideMenuListObj[4].visibility = false;
        for (let i = 5; i < this.sideMenuListObj.length; i++) {
          this.sideMenuListObj[i].visibility = true;
        }
        this.isSuperAdminProjectSelected = true;
      } else {
        this.isSuperAdminProjectSelected = false;
        this.sideMenuListObj[4].visibility = false;
        for (let i = 5; i < (this.sideMenuListObj.length - 1); i++) {
          this.sideMenuListObj[i].visibility = false;
        }
      }

      if (this.router.url == '/super-admin/edit-contract') {
        this.sideMenuListObj[4].visibility = true;
        for (let i = 5; i < this.sideMenuListObj.length; i++) {
          if (i !== 13) {
            this.sideMenuListObj[i].visibility = false;
          }
        }
      }
    } else if (this.router.url && this.router.url.includes('/unit/')) {
      this.isSuperAdminProjectSelected = false;
      if (this.router.url == '/unit/inspection/inspection-report' || this.router.url == '/unit/inspection/summary' || this.router.url == '/unit/inspection/quality-check' || this.router.url == '/unit/inspection/area-check' || this.router.url == '/unit/inspection/material-check' || this.router.url == '/unit/inspection/dimension-check' || this.router.url == '/unit/inspection/brand-check' || this.router.url == '/unit/inspection/summary-villa' || this.router.url == '/unit/inspection/quality-check-villa' || this.router.url == '/unit/inspection/area-check-villa' || this.router.url == '/unit/inspection/material-check-villa' || this.router.url == '/unit/inspection/dimension-check-villa' || this.router.url == '/unit/inspection/brand-check-villa') {
        for (let i = 2; i < this.sideMenuListObj.length; i++) {
          this.sideMenuListObj[i].visibility = true;
        }
      } else {
        for (let i = 2; i < this.sideMenuListObj.length; i++) {
          this.sideMenuListObj[i].visibility = false;
        }
      }
    } else if (this.router.url && this.router.url.includes('/external-qc-head/')) {
      if (this.router.url === '/external-qc-head/projects') {
        this.sideMenuListObj[0].visibility = true;
        for (let i = 1; i < this.sideMenuListObj.length; i++) {
          this.sideMenuListObj[i].visibility = false;
        }
      } else {
        for (let i = 1; i < this.sideMenuListObj.length; i++) {
          this.sideMenuListObj[i].visibility = true;
        }
      }
      // this.switchProjectTypes();
    } else if (this.router.url && this.router.url.includes('/qc-team/')) {
      if (this.router.url === '/qc-team/external-projects-list') {
        this.sideMenuListObj[0].visibility = true;
        for (let i = 1; i < this.sideMenuListObj.length; i++) {
          this.sideMenuListObj[i].visibility = false;
        }
      } else {
        for (let i = 1; i < this.sideMenuListObj.length; i++) {
          this.sideMenuListObj[i].visibility = true;
        }
      }
      // this.switchProjectTypes();
    }


    if (this.router.url === '/unit-incharge/assign-unit-inspection' || this.router.url === '/unit-incharge/assign-unit-reInspection' || this.router.url === '/unit-incharge/villa-assign-unit-inspection' || this.router.url === '/unit-incharge/villa-assign-unit-reInspection') {
      this.sideMenuListObj[3].visibility = true;
      this.sideMenuListObj[4].visibility = true;
    } else {

      // this.switchProjectTypes();
    }

  }

  onChange(v: any, i: number) {
    this.showSubmenu = i;
    this.submenuActivateIndexNo = -1;
    sessionStorage.setItem(`${environment.STORAGE_KEY}/showSubmenu`, `${i}`);
    this.onChangeRoutes.emit(v);

    if (v.subMenu && v.subMenu.length) {
        // Open sidebar if navigating to submenu
        this.showFullBar = true;
        this.router.navigate([v.subMenu[0].link]);
    } else {
        this.router.navigate([v.link]);
    }

    if (!this.showFullBar) {
        if (v.subMenu && v.subMenu.length) {
            this.toggleMenu(i);
        }
    } else if (v.subMenu && v.subMenu.length) {
        this.submenuActivateIndexNo = i;
    }
}


highlightParentMenu() {
  const currentRoute = this.router.url; // Get the current URL

  // Find the parent menu item whose submenu contains the current route
  const parentIndex = this.sideMenuListObj.findIndex((menu: { subMenu: any[]; }) =>
      menu.subMenu && menu.subMenu.some(sub => currentRoute.includes(sub.link))
  );

  if (parentIndex !== -1) {
      this.showSubmenu = parentIndex;  // Expand submenu
      this.submenuActivateIndexNo = parentIndex;  // Highlight parent menu
      this.showFullBar = true; // Open sidebar
      sessionStorage.setItem(`${environment.STORAGE_KEY}/showSubmenu`, `${parentIndex}`);
  }
}


  onChangeSubMenu(sub: any, index: number) {
    this.submenuActivateIndexNo = index;
  }

  // switchProjectTypes() {
  //   let that = this;
  //   if (localStorage.getItem(this.service.STORAGE_KEY)) {
  //     if (this.router.url && this.router.url.includes('super-admin')) {
  //       if (this.service.getProjectInfo && this.service.getProjectInfo['propertyType'] == "Apartments + Villas") {
  //         this.sideMenuListObj[6]['subMenu'] = [
  //           { displayName: 'Apartment', link: '/super-admin/common/summary' },
  //           { displayName: 'Villa', link: '/super-admin/common/villa-summary' }
  //         ];
  //         this.sideMenuListObj[7]['subMenu'] = [
  //           { displayName: 'Apartment', link: '/super-admin/common/inventory-details' },
  //           { displayName: 'Villa', link: '/super-admin/common/inventory-details-villa' }
  //         ];
  //         this.sideMenuListObj[10]['subMenu'] = [
  //           { displayName: 'Apartment', link: '/super-admin/common/payment-details' },
  //           { displayName: 'Villa', link: '/super-admin/common/payment-details-villa' }
  //         ];
  //         this.sideMenuListObj[12]['subMenu'] = [
  //           { displayName: 'Apartment', link: '/super-admin/external-QC-head-allocation' },
  //           { displayName: 'Villa', link: '/super-admin/external-QC-head-villa' }
  //         ];
  //       } else if (this.service.getProjectInfo && this.service.getProjectInfo['propertyType'] == "Villas") {
  //         this.sideMenuListObj[6]['link'] = '/super-admin/common/villa-summary';
  //         this.sideMenuListObj[7]['link'] = '/super-admin/common/inventory-details-villa';
  //         this.sideMenuListObj[10]['link'] = '/super-admin/common/payment-details-villa';
  //         this.sideMenuListObj[12]['link'] = '/super-admin/external-QC-head-villa';
  //         this.sideMenuListObj[6]['subMenu'] = [];
  //         this.sideMenuListObj[7]['subMenu'] = [];
  //         this.sideMenuListObj[10]['subMenu'] = [];
  //         this.sideMenuListObj[12]['subMenu'] = [];
  //       } else {
  //         this.sideMenuListObj[6]['subMenu'] = [];
  //         this.sideMenuListObj[7]['subMenu'] = [];
  //         this.sideMenuListObj[10]['subMenu'] = [];
  //         this.sideMenuListObj[12]['subMenu'] = [];
  //         this.sideMenuListObj[6]['link'] = '/super-admin/common/summary';
  //         this.sideMenuListObj[7]['link'] = '/super-admin/common/inventory-details';
  //         this.sideMenuListObj[10]['link'] = '/super-admin/common/payment-details';
  //         this.sideMenuListObj[12]['link'] = '/super-admin/external-QC-head-allocation';
  //       }
  //     } else if (this.router.url && this.router.url.includes('external-qc-head')) {
  //       if (that.getProjectInfo && that.getProjectInfo['propertyType'] == "Apartments + Villas") {
  //         this.sideMenuListObj[1]['subMenu'] = [
  //           { displayName: 'Apartment', link: '/external-qc-head/common/summary' },
  //           { displayName: 'Villa', link: '/external-qc-head/common/villa-summary' }
  //         ];
  //         this.sideMenuListObj[2]['subMenu'] = [
  //           { displayName: 'Apartment', link: '/external-qc-head/external-qc-team-unit-allocation' },
  //           { displayName: 'Villa', link: '/external-qc-head/external-qc-team-unit-allocation-villa' }
  //         ];
  //         this.sideMenuListObj[3]['subMenu'] = [
  //           { displayName: 'Apartment', link: '/external-qc-head/common/inventory-details' },
  //           { displayName: 'Villa', link: '/external-qc-head/common/inventory-details-villa' }
  //         ];
  //       } else if (that.getProjectInfo && that.getProjectInfo['propertyType'] == "Villas") {


  //         this.sideMenuListObj[1]['link'] = '/external-qc-head/common/villa-summary';
  //         this.sideMenuListObj[2]['link'] = '/external-qc-head/common/inventory-details-villa';


  //         this.sideMenuListObj[3]['link'] = '/external-qc-head/assign-external-qc-team-Inspection-villa';
  //         this.sideMenuListObj[3].subMenu[0]['link'] = '/external-qc-head/assign-external-qc-team-Inspection-villa';
  //         this.sideMenuListObj[3].subMenu[1]['link'] = '/external-qc-head/assign-external-qc-team-ReInspection-villa';
  //       }
  //       else if (that.getProjectInfo && that.getProjectInfo['propertyType'] == "Apartments") {
  //         this.sideMenuListObj[1]['link'] = '/external-qc-head/common/summary';
  //         this.sideMenuListObj[2]['link'] = '/external-qc-head/common/inventory-details';
  //         this.sideMenuListObj[3]['link'] = '/external-qc-head/assign-external-qc-team-Inspection';
  //         this.sideMenuListObj[3].subMenu[0]['link'] = '/external-qc-head/assign-external-qc-team-Inspection';
  //         this.sideMenuListObj[3].subMenu[1]['link'] = '/external-qc-head/assign-external-qc-team-ReInspection';

  //         // this.sideMenuListObj[4]['link'] = '/external-qc-head/assign-external-qc-team-Inspection';
  //         // this.sideMenuListObj[5]['link'] = '/external-qc-head/assign-external-qc-team-ReInspection';
  //       }

  //     } else if (this.router.url && this.router.url.includes('qc-team')) {
  //       console.log("summary triggered4")

  //       const auth: any = this.service.getAuthData();
  //       if (auth.role == 'External Inspector' || auth.role == 'External Validator') {
  //         if (that.getProjectInfo && that.getProjectInfo['propertyType'] == "Apartments + Villas") {
  //           this.sideMenuListObj[1]['subMenu'] = [
  //             { displayName: 'Apartment', link: '/qc-team/inspection' },
  //             { displayName: 'Villa', link: '/qc-team/inspection-villa' }
  //           ];
  //           this.sideMenuListObj[2]['subMenu'] = [
  //             { displayName: 'Apartment', link: '/qc-team/re-inspection' },
  //             { displayName: 'Villa', link: '/qc-team/re-inspection-villa' }
  //           ];
  //           this.sideMenuListObj[3]['subMenu'] = [
  //             { displayName: 'Apartment', link: '/qc-team/validation' },
  //             { displayName: 'Villa', link: '/qc-team/validation-villa' }
  //           ];
  //         } else if (that.getProjectInfo && that.getProjectInfo['propertyType'] == "Villas") {
  //           this.sideMenuListObj[1]['link'] = '/qc-team/inspection-villa';
  //           this.sideMenuListObj[2]['link'] = '/qc-team/re-inspection-villa';
  //           this.sideMenuListObj[3]['link'] = '/qc-team/validation-villa';
  //         } else {
  //           this.sideMenuListObj[1]['link'] = '/qc-team/inspection';
  //           this.sideMenuListObj[2]['link'] = '/qc-team/re-inspection';
  //           this.sideMenuListObj[3]['link'] = '/qc-team/validation';
  //         }
  //       }
  //     }
  //   }
  // }


  ngOnDestroy() {
    // Unsubscribe from router events to avoid memory leaks
    if (this.routerEventsSubscription) {
      this.routerEventsSubscription.unsubscribe();
    }
  }

  logout() {
    localStorage.removeItem(environment.STORAGE_KEY);
    localStorage.removeItem(environment.STORAGE_KEY + '/LOCATION_HISTORY');
    sessionStorage.clear();
    localStorage.clear();
    this.service.navigateTo('/login');
    // this.toastService.openSnackBar('You have been successfully signed out', 'Success');
  }

  /**@GET_PROJECT_INFO */
  get getProjectInfo() {
    if (localStorage.getItem(`${environment.STORAGE_KEY}/projectInfo`)) {
      return JSON.parse(this.service.decryption(localStorage.getItem(`${environment.STORAGE_KEY}/projectInfo`)));
    } else {
      return null;
    }
  }

  toggleMenu(index: number) {
    document.getElementById(`submenu-id-${index}`)?.click();
  }
}
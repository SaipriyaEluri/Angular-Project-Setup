import { Component, ViewChild, HostListener, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from '../Services/Auth.service';
import { GetUserModel } from '../Services/InterfacesModels';

@Component({
  selector: 'admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayout implements OnInit {
  opened = true;
  activeThemeName: string = 'lightTheme';
  @ViewChild('sidenav', { static: true }) sidenav!: MatSidenav;
  sideMenuListObj: any = []
  defaultImage: string = 'assets/Images/logo.png';
  sidebarLogo: string = "assets/Images/logo.png";
  defaultSmallImage : string = "assets/Images/logo-sm.png";
  SmallsidebarLogo : string = "assets/Images/logo-sm.png";
  isMiniSidebar: boolean = false;
  selectedOption: string = '';
  selectedProject: string = '';
  isSideMenu: boolean = true;
  isNotificationOpened: boolean = false;
  projectId: string = "";
  userData: any;
  public getScreenHeight: number = 0;
  // menuDataList: any=[];
  ActiveTitleCard: string = "Verify Form"
  contractorName: string = "test"
  isCollepsed: boolean = false;
  authData: GetUserModel = {
    userName: '',
    phone: '',
    email: '',
    address: undefined,
    addressName: undefined,
    managerId: undefined,
    managerName: undefined,
    userRole: '',
    userRoleId: 0,
    status: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    _id: ''
  };
  // authData: GetUserModel = (enquiryList as any).default.authData;

  showFullBar: boolean = true;
  isCollapsed: boolean = false;
  sidebarWidth:number = 225;
  isNormalSideMode: boolean = true;
  isOverlayMode: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    this.authData = this.authService.getAuthData();
    this.sideMenuListObj = [
      
      {
        id: 1,
        displayName: 'Dashboard',
        link: '/admin/dashboard',
        icon: 'dashboard',
        visibility: true
      },
      {
        id: 2,
        displayName: 'FTP/SFTP',
        link: '/admin/ftp-list',
        icon: 'file_copy',
        visibility: true
      },
    
      {
        id: 3,
        displayName: 'Schedulers',
        link: '/admin/schedulers',
        icon: 'schedule',
        visibility: true
      },
    
    ]

  }

  ngOnInit() {
    // this.menuDataList = this.sideMenuListObj;
    this.getScreenHeight = window.innerHeight - 2;
    this.selectedOption = this.router.url.split('/')[1];
    this.selectedProject = this.router.url.split('/')[2];
    let that = this;
    this.authService.todos$.subscribe((res: any) => {
      if (res && res?.projectId) {
        // this.projectId = res.projectId;
        if (that.authData && that.authData?.userRole == 'SuperAdmin') {

        }
      }
    })

    if (localStorage.getItem(this.authService.STORAGE_KEY)) {
      this.userData = JSON.parse(this.authService.decryption(localStorage.getItem(this.authService.STORAGE_KEY)))
      if (this.userData && this.userData['projectType'] == "Apartments + Villas") {
        this.sideMenuListObj[0]['subMenu'] = [
          { displayName: 'Apartment', link: '/admin/common/summary' },
          { displayName: 'Villa', link: '/admin/common/villa-summary' }
        ];
        this.sideMenuListObj[3]['subMenu'] = [
          { displayName: 'Apartment', link: '/admin/common/inventory-details' },
          { displayName: 'Villa', link: '/admin/common/inventory-details-villa' }
        ];
        this.sideMenuListObj[4]['subMenu'] = [
          { displayName: 'Apartment', link: '/admin/common/payment-details' },
          { displayName: 'Villa', link: '/admin/common/payment-details-villa' }
        ];
        this.sideMenuListObj[6]['subMenu'] = [
          { displayName: 'Apartment', link: '/admin/common/unit-allocation' },
          { displayName: 'Villa', link: '/admin/common/unit-allocation-villa' }
        ];
      } else if (this.userData && this.userData['projectType'] == "Villas") {
        this.sideMenuListObj[0]['link'] = '/admin/common/villa-summary';
        this.sideMenuListObj[2]['link'] = '/admin/common/inventory-details-villa';
        this.sideMenuListObj[4]['link'] = '/admin/common/payment-details-villa';
        this.sideMenuListObj[5]['link'] = '/admin/common/unit-allocation-villa';
      }
    }

    if (window.innerWidth < 768) {
      this.sidenav['fixedTopGap'] = 55;
      this.opened = false;
    } else {
      this.sidenav['fixedTopGap'] = 55;
      this.opened = true;
    }

    if (window.innerWidth <= 992 && window.innerWidth >= 425) {
      this.sidenav['fixedTopGap'] = 55;
      this.opened = false;
    }
  }

  toggleSidebar() {
    this.isCollepsed = !this.isCollepsed;
    this.sidenav.toggle();
  }

  onChangeRoutes(v: any) {
    if (this.opened == true && !v?.onLoad) {
      if (window.innerWidth <= 425) {
        this.sidenav.toggle();
      }
    } else if (v?.onLoad) {
      // this.isCollepsed = !this.isCollepsed;
    }

    if (this.authService.getProjectInfo && this.authService.getProjectInfo?.projectName) {
      this.contractorName = this.authService.getProjectInfo?.projectName;
    }

  }

  selectOption(value: string) {
    // if (this.userData != undefined && this.userData != null) {
    //   this.selectedOption = value;
    //   this.service.navigateTo(`${value}/${this.projectId}`);
    // } else {
    //   let obj: any = {}
    //   obj.screen = value;
    //   obj.projectId = this.projectId;
    //   const auth = this.service.encryption((obj));
    //   this.router.navigateByUrl("/login");
    // }
  }


  /**@OnSearchButton */
  onSearchButton() {
    this.authService.navigateTo(`search-project`);
  }

  /**@TOOGGLE_NOTIFICATION */
  toggleNotification() {
    this.isNotificationOpened = !this.isNotificationOpened;
  }

  logout() {
    this.router.navigateByUrl("/login");
    localStorage.clear();
    sessionStorage.clear();
  }

  onSizeChange(event: any) {
    this.getScreenHeight = (event.target.innerHight - 2);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isCollepsed = false;
    if (event.target.innerWidth <= 992 && event.target.innerWidth >= 425) {
      this.sidenav['fixedTopGap'] = 55;
      this.opened = false;
    } else if (event.target.innerWidth < 769) {
      this.sidenav['fixedTopGap'] = 55;
      this.opened = false;
    } else {
      this.sidenav['fixedTopGap'] = 55
      this.opened = true;
    }
  }

  isBiggerScreen() {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width < 768) {
      return true;
    } else {
      return false;
    }
  }

  //**Active Ttile Card */
  ActiveTtile(title: string) {
    this.ActiveTitleCard = title
  }

  closePopup() {
    // this.dialog
  }

  onToggle(status?: boolean) {
    // Toggle isCollapsed state
    this.isCollapsed = !this.isCollapsed;
  
    // Toggle the showFullBar property based on the optional 'status' parameter
    if (status !== undefined) {
      this.showFullBar = status;
    } else {
      this.showFullBar = !this.showFullBar;
    }
  
    const width = window.innerWidth;
    // Update sidebar width and mode based on screen width
    if (width >= 768) {
      // Desktop view
      this.sidebarWidth = this.showFullBar ? 225 : 80;
      this.isNormalSideMode = this.showFullBar;
      this.isOverlayMode = false;
    } else {
      // Mobile view
      this.sidebarWidth = this.showFullBar ? 225 : 80;
      this.isNormalSideMode = false;
      this.isOverlayMode = this.sidebarWidth === 225;
    }
  }


}
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
// import { LazyLoadImageModule } from 'ng-lazyload-image';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import {ShairedModule} from './../Components/ShairedComponentsModule';
import { AdminRoutingModule } from './admin-routing.module';

import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
// import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatRadioModule} from '@angular/material/radio';
// import { UnitAllocationComponent } from './UnitAllocation/unit-allocation.component';
import { registerLocaleData } from '@angular/common';
import localeIndia from '@angular/common/locales/en-IN';
import { MatMenuModule } from '@angular/material/menu';
import {MatTabsModule} from '@angular/material/tabs';
import { AdminLayout } from "./admin-layout.component";
import { FtpListComponent } from './FTP-List/ftp-list.component'
import { MyHttpInterceptor } from '../Services/http.interceptor';
import { AuthService } from '../Services/Auth.service';
import { AdminApiService } from '../Services/AdminApi.service';
import { SideMenuComponent } from '../CommonScreen/SideMenu/side-menu.component';
import { MatListModule } from '@angular/material/list';
import { SvgIcon } from '../CommonScreen/SvgIcon';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { HeaderComponent } from '../CommonScreen/Header/header.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { NoDataComponent } from '../CommonScreen/NoData/no-data.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


// Register the Indian locale
registerLocaleData(localeIndia);
@NgModule({
  declarations: [
    AdminLayout,
    FtpListComponent,
    SideMenuComponent,
    HeaderComponent,
    SvgIcon,
    NoDataComponent
  ],
  imports: [
    CommonModule,HttpClientModule,AdminRoutingModule,MatMenuModule,MatTabsModule,MatListModule,LazyLoadImageModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSidenavModule,MatToolbarModule,MatFormFieldModule,MatInputModule,MatExpansionModule, ReactiveFormsModule,FormsModule,MatIconModule,MatDialogModule,MatTableModule,MatButtonModule,MatPaginatorModule,MatSelectModule,MatDatepickerModule,MatNativeDateModule,MatAutocompleteModule,MatRadioModule
  ],
  providers:[{ provide: HTTP_INTERCEPTORS, useClass: MyHttpInterceptor, multi: true },AuthService, AdminApiService, { provide: LOCALE_ID, useValue: 'en-IN' }],
})
export class AdminModule { }

import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
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
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';
import {MatMenuModule} from '@angular/material/menu';

import { AuthService } from '../Services/Auth.service';
import { MuiDialogService } from '../Services/MuiDialog.service';
import { AdminApiService } from '../Services/AdminApi.service';

import { MyHttpInterceptor } from '../Services/http.interceptor';
import { CommonScreenModule } from '../CommonScreen/common-screen.module';

// import { UnitAllocationComponent } from './UnitAllocation/unit-allocation.component';
import { registerLocaleData } from '@angular/common';
import localeIndia from '@angular/common/locales/en-IN';

import { MatTooltipModule } from '@angular/material/tooltip';

import { MatRadioModule } from '@angular/material/radio';
import { UsersLayout } from './users-layout.component';
import { UsersRoutingModule } from './users-routing.module';
import { UsersListComponent } from './Users-List/users-list.component';
// import { ContractorStatusReviewerComponent } from './ContractorStatusReviewer/contractor-status-reviewer.component';
// import { ContractorPerformanceComponent } from './ContractorPerformance/contractor-performance.component';

// Register the Indian locale
registerLocaleData(localeIndia);
@NgModule({
  declarations: [
    UsersLayout,
    UsersListComponent,
   
    // ContractorStatusReviewerComponent,
    // ContractorPerformanceComponent,
    // UnitAllocationComponent
  ],
  imports: [
    CommonModule,HttpClientModule,UsersRoutingModule,
    MatSidenavModule,MatToolbarModule,MatFormFieldModule,MatInputModule,MatExpansionModule, ReactiveFormsModule,FormsModule,MatIconModule,MatDialogModule,MatTableModule,MatButtonModule,MatPaginatorModule,MatSelectModule,MatDatepickerModule,MatNativeDateModule,MatCheckboxModule, MatTabsModule, MatMenuModule,
    MatTooltipModule,MatRadioModule,CommonScreenModule
  ],
  providers:[{ provide: HTTP_INTERCEPTORS, useClass: MyHttpInterceptor, multi: true },AuthService, MuiDialogService, AdminApiService, { provide: LOCALE_ID, useValue: 'en-IN' }],
})
export class UserLayoutModule { }

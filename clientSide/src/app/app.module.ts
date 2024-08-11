import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule, MatNavList } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { ProductHistoryComponent } from './Components/product-history/product-history.component';
import { ProductManagementComponent } from './Components/product-management/product-management.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from './Services/notification.service';
import { AuthenticationService } from './Services/authentication.service';
import { AppRoutingModule, routes } from './app.routes';
import { AuthInterceptor } from './auth.interceptor';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { LayoutComponent } from './Shared/layout/layout.component';
import { HeaderComponent } from './Shared/header/header.component';
import { MainComponent } from './Components/main/main.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatRadioModule} from '@angular/material/radio';
import { MatSortModule } from '@angular/material/sort';
import { RouterLinkActiveExactDirectiveDirective } from './Components/main/router-link-active-exact-directive.directive';
import { StateChangeDialogComponent } from './Components/product-history/state-change-dialog/state-change-dialog.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AddProductComponent } from './Components/product-management/add-product/add-product.component';
import { EditProductComponent } from './Components/product-management/edit-product/edit-product.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProductHistoryComponent,
    ProductManagementComponent,
    DashboardComponent,
    LayoutComponent,
    HeaderComponent,
    MainComponent,
    RouterLinkActiveExactDirectiveDirective,
    StateChangeDialogComponent,
    AddProductComponent,
    EditProductComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    NgbModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatNavList,
    ReactiveFormsModule,
    MatGridListModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule
  ],
  providers: [NotificationService, AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

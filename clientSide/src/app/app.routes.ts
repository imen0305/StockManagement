import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { AuthGuard } from './AuthGuard';
import { ProductHistoryComponent } from './Components/product-history/product-history.component';
import { ProductManagementComponent } from './Components/product-management/product-management.component';
import { LayoutComponent } from './Shared/layout/layout.component';
import { AddProductComponent } from './Components/product-management/add-product/add-product.component';
import { EditProductComponent } from './Components/product-management/edit-product/edit-product.component';


export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
   { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'history', component: ProductHistoryComponent, canActivate: [AuthGuard] },
    { path: 'managementProduct', component: ProductManagementComponent, canActivate: [AuthGuard] },

    { path: 'managementProduct/addProduct', component: AddProductComponent, canActivate: [AuthGuard] },
    { path: 'managementProduct/editProduct/:id', component: EditProductComponent, canActivate: [AuthGuard] },


];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }

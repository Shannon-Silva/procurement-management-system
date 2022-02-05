import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/users/users.component';
import { AuthGuardService } from './services/auth-guard.service';
import { LoginComponent } from './components/users/login/login.component';
import { RegisterComponent } from './components/users/register/register.component';
import { AuthService } from './services/auth.service';
import { ItemAddComponent } from './components/item-add/item-add.component';
import { ViewItemsComponent } from './components/view-items/view-items.component';
import { SupplierAddComponent } from './components/supplier-add/supplier-add.component';
import { SupplierViewComponent } from './components/supplier-view/supplier-view.component';
import { FormsModule } from '@angular/forms';
import { PurchaseRequestViewComponent } from './components/purchase-request-view/purchase-request-view.component';
import { PurchaseOrderViewComponent } from './components/purchase-order-view/purchase-order-view.component';
import { PurchaseOrderCreateComponent } from './components/purchase-order-create/purchase-order-create.component';
import { UserAccountComponent } from './components/user-account/user-account.component';
import { ViewUsersComponent } from './components/users-view/users-view.component';
import { GrnViewComponent } from './components/grn-view/grn-view.component';
import { ForgotPasswordComponent } from './components/forgotPassword/forgotPassword.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'forgotPassword', component: ForgotPasswordComponent},
  {
    path: 'login', component: UserComponent,
    children: [{ path: '', component: LoginComponent }]
  },
  { path: 'about', component: AboutComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'items',
        children: [
          { path: 'add', component: ItemAddComponent },
          { path: 'view', component: ViewItemsComponent }
        ]
      },
      {
        path: 'suppliers',
        children: [
          { path: 'add', component: SupplierAddComponent },
          { path: 'view', component: SupplierViewComponent }
        ]
      },
      {
        path: 'requests',
        children: [
          { path: 'view', component: PurchaseRequestViewComponent }
        ]
      },
      {
        path: 'orders',
        children: [
          { path: 'create', component: PurchaseOrderCreateComponent },
          { path: 'view', component: PurchaseOrderViewComponent }
        ]
      },
      {
        path: 'users',
        children: [
          { path: 'profile', component: UserAccountComponent },
          { path: 'view', component: ViewUsersComponent },
          { path: 'register', component: RegisterComponent }
        ]
      },
      {
        path: 'grn',
        children: [
          { path: 'view', component: GrnViewComponent }
        ]
      },
      {
        path: 'account',
        children: [
          { path: 'profile', component: UserAccountComponent },
          { path: 'view', component: ViewUsersComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [RouterModule],
  providers: [
    AuthGuardService,
    AuthService
  ]
})
export class AppRoutingModule { }

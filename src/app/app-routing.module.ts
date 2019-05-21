import { SelectAccountComponent } from './select-account/select-account.component';
import { AdminMessageComponent } from './admin-message/admin-message.component';
import { AdminAuthGuard } from './services/admin-auth-guard.service';

import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { PartnersComponent } from './partners/partners.component';
import { AboutComponent } from './about/about.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { PasswordresetComponent } from './passwordreset/passwordreset.component';
import { CustomersComponent } from './customers/customers.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ServicesComponent } from './services/services.component';
import { AuthGuardService } from './services/auth-guard.service';
import { InboxComponent } from './inbox/inbox.component';
import { ImlMembersComponent } from './iml-members/iml-members.component';
import { InvestorsComponent } from './investors/investors.component';
import { InvestorsGuard } from './services/investors-guard.service';
import { PaymentComponent } from './payment/payment.component';
import { InvestorsDashboardComponent } from './investors-dashboard/investors-dashboard.component';
import { EnrollDashbaordComponent } from './enroll-dashbaord/enroll-dashbaord.component';
import { Enrollguard } from './services/enrollguard.service';

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'customers', component: CustomersComponent},
  {path: 'login', component: LoginComponent},
  // {path: '**', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'partners', component: PartnersComponent},
  {path: 'services', component: ServicesComponent},
  {path: 'about', component: AboutComponent},
  {path: 'passwordreset', component: PasswordresetComponent},

  {path: 'user/select/account', component: SelectAccountComponent, canActivate: [AuthGuardService] },
  {path: 'welcome', component: WelcomeComponent,  canActivate: [AuthGuardService] },
  {path: 'user/dashboard', component: UserdashboardComponent, canActivate: [AuthGuardService]},
  {path: 'user/inbox', component: InboxComponent, canActivate: [AuthGuardService]},
  {path: 'user/payment', component: PaymentComponent, canActivate: [AuthGuardService]},
  {path: 'user/imlmembrs', component: ImlMembersComponent, canActivate: [AuthGuardService]},


  //moneymine enroll
  {path: 'user/imlenroll/dashboard', component: EnrollDashbaordComponent,
   canActivate: [AuthGuardService, Enrollguard]},

  // investors
  {path: 'user/investors', component: InvestorsComponent, canActivate: [AuthGuardService, InvestorsGuard]},
  {path: 'user/investors/dashboard', component: InvestorsDashboardComponent, canActivate: [AuthGuardService, InvestorsGuard]},

  {path: 'admin/dashboard', component: AdminDashboardComponent,
   canActivate: [AuthGuardService, AdminAuthGuard] },
  {path: 'admin/messages', component: AdminMessageComponent,
   canActivate: [AuthGuardService, AdminAuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

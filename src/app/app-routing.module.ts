import { PayoutComponent } from './payout/payout.component';
import { ReportComponent } from './report/report.component';
import { AdminCashoutComponent } from './admin-cashout/admin-cashout.component';
import { MessageComponent } from './../message/message.component';
import { BankdetailsComponent } from './src/app/components/bankdetails/bankdetails.component';
import { AdminmanageUsersComponent } from './adminmanage-users/adminmanage-users.component';
import { AdminSettingsComponent } from './admin-settings/admin-settings.component';
import { AdminnotificationComponent } from './adminnotification/adminnotification.component';
import { FaqComponent } from './faq/faq.component';
import { HelpComponent } from './help/help.component';
import { ContactComponent } from './contact/contact.component';
import { AdminMessageComponent } from './admin-message/admin-message.component';
import { AdminAuthGuard } from './services/admin-auth-guard.service';

import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { PartnersComponent } from './partners/partners.component';
import { AboutComponent } from './about/about.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { PasswordresetComponent } from './passwordreset/passwordreset.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ServicesComponent } from './services/services.component';
import { AuthGuardService } from './services/auth-guard.service';
import { InvestorsComponent } from './investors/investors.component';
import { InvestorsGuard } from './services/investors-guard.service';
import { PaymentComponent } from './payment/payment.component';
import { Enrollguard } from './services/enrollguard.service';
import { PoliciyComponent } from './policiy/policiy.component';
import { AccountTypeComponent } from './account-type/account-type.component';
import { UserProfileComponent } from './customers/profile.component';
import { AdmintransactionComponent } from './admintransaction/admintransaction.component';
import { UserCashoutComponent } from './user-cashout/user-cashout.component';

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'partners', component: PartnersComponent},
  {path: 'services', component: ServicesComponent},
  {path: 'policy', component: PoliciyComponent},
  {path: 'about', component: AboutComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'help', component: HelpComponent},
  {path: 'faq-section', component: FaqComponent},
  {path: 'account/type', component: AccountTypeComponent},
  {path: 'passwordreset', component: PasswordresetComponent},


  {path: 'user/profile', component: UserProfileComponent, canActivate: [AuthGuardService]},
  {path: 'user/bank-details', component: BankdetailsComponent, canActivate: [AuthGuardService]},
  {path: 'welcome', component: WelcomeComponent ,  canActivate: [AuthGuardService]},
  {path: 'user/dashboard', component: UserdashboardComponent,  canActivate: [AuthGuardService]},
  {path: 'user/payment', component: PaymentComponent,  canActivate: [AuthGuardService]},
  {path: 'user/bankdetails', component: BankdetailsComponent,  canActivate: [AuthGuardService]},
  {path: 'user/message', component: MessageComponent,  canActivate: [AuthGuardService]},


  {path: 'user/investors', component: InvestorsComponent,  canActivate: [AuthGuardService]},

  {path: 'admin/dashboard', component: AdminDashboardComponent
   , canActivate: [AuthGuardService, AdminAuthGuard]},
  {path: 'admin/cashouts', component: AdminCashoutComponent
   , canActivate: [AuthGuardService, AdminAuthGuard]},
  {path: 'admin/messages', component: AdminMessageComponent
   ,  canActivate: [AuthGuardService, AdminAuthGuard] },
  {path: 'admin/transaction', component: AdmintransactionComponent
   ,  canActivate: [AuthGuardService, AdminAuthGuard] },
  {path: 'admin/notification', component: AdminnotificationComponent
   ,  canActivate: [AuthGuardService, AdminAuthGuard] },
  {path: 'admin/settings', component: AdminSettingsComponent
   ,  canActivate: [AuthGuardService, AdminAuthGuard] },
  {path: 'admin/manage-users', component: AdminmanageUsersComponent
   ,  canActivate: [AuthGuardService, AdminAuthGuard] },
  {path: 'admin/report', component: ReportComponent
   ,  canActivate: [AuthGuardService, AdminAuthGuard] },
  {path: 'admin/payout', component: PayoutComponent
   ,  canActivate: [AuthGuardService, AdminAuthGuard] },
  {path: 'admin/cashout-users', component: UserCashoutComponent
   ,  canActivate: [AuthGuardService, AdminAuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

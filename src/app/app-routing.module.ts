import { FaqComponent } from './faq/faq.component';
import { HelpComponent } from './help/help.component';
import { ContactComponent } from './contact/contact.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { UserUpdateComponent } from './user-update/user-update.component';
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
import { InboxComponent } from './inbox/inbox.component';
import { ImlMembersComponent } from './iml-members/iml-members.component';
import { InvestorsComponent } from './investors/investors.component';
import { InvestorsGuard } from './services/investors-guard.service';
import { PaymentComponent } from './payment/payment.component';
import { InvestorsDashboardComponent } from './investors-dashboard/investors-dashboard.component';
import { EnrollDashbaordComponent } from './enroll-dashbaord/enroll-dashbaord.component';
import { Enrollguard } from './services/enrollguard.service';
import { PoliciyComponent } from './policiy/policiy.component';
import { SuccessfulComponent } from './successful/successful.component';
import { AccountTypeComponent } from './account-type/account-type.component';
import { UserProfileComponent } from './customers/profile.component';

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'user/profile', component: UserProfileComponent},
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
  {path: 'verify-email', component: VerifyEmailComponent},
  {path: 'passwordreset', component: PasswordresetComponent},
  {path: 'user/update/details', component: UserUpdateComponent },


  {path: 'successful', component: SuccessfulComponent, canActivate: [AuthGuardService]},
  {path: 'welcome', component: WelcomeComponent ,  canActivate: [AuthGuardService]},
  {path: 'user/dashboard', component: UserdashboardComponent,  canActivate: [AuthGuardService]},
  {path: 'user/inbox', component: InboxComponent,  canActivate: [AuthGuardService]},
  {path: 'user/payment', component: PaymentComponent,  canActivate: [AuthGuardService]},
  {path: 'user/imlmembrs', component: ImlMembersComponent,  canActivate: [AuthGuardService]},
  {path: 'user/imlenroll/dashboard', component: EnrollDashbaordComponent,
  canActivate: [AuthGuardService]},

  {path: 'user/investors', component: InvestorsComponent,  canActivate: [AuthGuardService]},
  {path: 'user/investors/dashboard', component: InvestorsDashboardComponent,  canActivate: [AuthGuardService]},

  {path: 'admin/dashboard', component: AdminDashboardComponent
   , canActivate: [AuthGuardService, AdminAuthGuard]},
  {path: 'admin/messages', component: AdminMessageComponent
   ,  canActivate: [AuthGuardService, AdminAuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

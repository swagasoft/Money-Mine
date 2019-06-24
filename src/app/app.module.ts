
import { UsersService } from './services/users.service';
import { AuthService } from './services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import {NgbModule, NgbModalConfig, NgbModal} from '@ng-bootstrap/ng-bootstrap';
// import {AngularFireModule} from 'firebase/firestore'


import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AngularFireModule} from 'angularfire2';
import { environment } from 'src/environments/environment';
import {AngularFireAuthModule} from 'angularfire2/auth';


import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
// import {RouterModule} from '@angular/router';

import { HttpClientModule} from '@angular/common/http';


import {FormsModule} from '@angular/forms';
import  {MDBBootstrapModule} from 'angular-bootstrap-md';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { UserProfileComponent } from './customers/customers.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { PasswordresetComponent } from './passwordreset/passwordreset.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { PartnersComponent } from './partners/partners.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { InboxComponent } from './inbox/inbox.component';
import { AdminMessageComponent } from './admin-message/admin-message.component';
import { InvestorsComponent } from './investors/investors.component';
import { ImlMembersComponent } from './iml-members/iml-members.component';
import { InvestorsGuard } from './services/investors-guard.service';
import { PaymentComponent } from './payment/payment.component';
import { InvestorsDashboardComponent } from './investors-dashboard/investors-dashboard.component';
import { EnrollDashbaordComponent } from './enroll-dashbaord/enroll-dashbaord.component';
import { Enrollguard } from './services/enrollguard.service';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from './material.module';
import { UserUpdateComponent } from './user-update/user-update.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import {ToastrModule} from 'ngx-toastr';
import { PoliciyComponent } from './policiy/policiy.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Angular4PaystackModule } from 'angular4-paystack';
import { MatIconModule } from '@angular/material';
import { SuccessfulComponent } from './successful/successful.component';
import { from } from 'rxjs';
import { ContactComponent } from './contact/contact.component';
import { HelpComponent } from './help/help.component';
import { AccountTypeComponent } from './account-type/account-type.component';
import { FaqComponent } from './faq/faq.component';





@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    UserProfileComponent,
    FavoriteComponent,
    LoginComponent,
    RegisterComponent,
    WelcomeComponent,
    PasswordresetComponent,
    HomepageComponent,
    AdminDashboardComponent,
    AboutComponent,
    ServicesComponent,
    PartnersComponent,
    UserdashboardComponent,
    InboxComponent,
    AdminMessageComponent,
    InvestorsComponent,
    ImlMembersComponent,
    PaymentComponent,
    InvestorsDashboardComponent,
    EnrollDashbaordComponent,
    HeaderComponent,
    UserUpdateComponent,
    VerifyEmailComponent,
    PoliciyComponent,
    SuccessfulComponent,
    ContactComponent,
    HelpComponent,
    AccountTypeComponent,
    FaqComponent,



  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    MatIconModule,
    MatDialogModule,
    MaterialModule,
    MatButtonModule,
    AngularFirestoreModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgbModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase,'MONEY-MINE'),
    AngularFireDatabaseModule,
    MDBBootstrapModule.forRoot(),
    AngularFireAuthModule,
    Angular4PaystackModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    Angular4PaystackModule,
    AngularFontAwesomeModule,

  ],
  providers: [AuthGuardService, UsersService, AdminAuthGuard,
    Enrollguard,NgbModalConfig, NgbModal,
    InvestorsGuard,
     AuthService, AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }

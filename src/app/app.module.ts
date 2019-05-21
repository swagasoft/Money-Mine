
import { UsersService } from './services/users.service';
import { AuthService } from './services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import { environment } from 'src/environments/environment';
import {AngularFireAuthModule} from 'angularfire2/auth';


import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
// import {RouterModule} from '@angular/router';
import { MatTableModule, MatSelectModule, MatOptionModule, MatFormFieldModule, MatCardModule} from '@angular/material';
import { MatInputModule} from '@angular/material';
import { HttpClientModule} from '@angular/common/http';


import {FormsModule} from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { CustomersComponent } from './customers/customers.component';
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
import { SelectAccountComponent } from './select-account/select-account.component';
import { HeaderComponent } from './header/header.component';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    CustomersComponent,
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
    SelectAccountComponent,
    HeaderComponent,



  ],
  imports: [
    BrowserModule,
    MatSelectModule,
    MatOptionModule,
    MatFormFieldModule,
    MatCardModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ReactiveFormsModule,



  ],
  providers: [AuthGuardService, UsersService, AdminAuthGuard,
    Enrollguard,
    InvestorsGuard,
     AuthService, AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }

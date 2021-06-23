import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { SharedModule } from '@shared/shared.module';
import { HomeComponent } from '@app/home/home.component';
import { AboutComponent } from '@app/about/about.component';
import { QRCodeModule } from 'angularx-qrcode';
import {NgxPopperjsModule} from 'ngx-popperjs';

// tenants
import { TenantsComponent } from '@app/tenants/tenants.component';
import { CreateTenantDialogComponent } from './tenants/create-tenant/create-tenant-dialog.component';
import { EditTenantDialogComponent } from './tenants/edit-tenant/edit-tenant-dialog.component';
// roles
import { RolesComponent } from '@app/roles/roles.component';
import { CreateRoleDialogComponent } from './roles/create-role/create-role-dialog.component';
import { EditRoleDialogComponent } from './roles/edit-role/edit-role-dialog.component';
// users
import { UsersComponent } from '@app/users/users.component';
import { CreateUserDialogComponent } from '@app/users/create-user/create-user-dialog.component';
import { EditUserDialogComponent } from '@app/users/edit-user/edit-user-dialog.component';
import { ChangePasswordComponent } from './users/change-password/change-password.component';
import { ResetPasswordDialogComponent } from './users/reset-password/reset-password.component';
// layout
import { HeaderComponent } from './layout/header.component';
import { HeaderLeftNavbarComponent } from './layout/header-left-navbar.component';
import { HeaderLanguageMenuComponent } from './layout/header-language-menu.component';
import { HeaderUserMenuComponent } from './layout/header-user-menu.component';
import { FooterComponent } from './layout/footer.component';
import { SidebarComponent } from './layout/sidebar.component';
import { SidebarLogoComponent } from './layout/sidebar-logo.component';
import { SidebarUserPanelComponent } from './layout/sidebar-user-panel.component';
import { SidebarMenuComponent } from './layout/sidebar-menu.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { CreateAppointmentDialogComponent } from './appointments/create-appointment/create-appointment-dialog.component';
import { EditAppointmentDialogComponent } from './appointments/edit-appointment/edit-appointment-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { DonationsComponent } from './donations/donations.component';
import { EditDonationDialogComponent } from './donations/edit-donation-dialog/edit-donation-dialog.component';
import { CreateDonationDialogComponent } from './donations/create-donation-dialog/create-donation-dialog.component';
import { ShowDonationQRCodeDialogComponent } from './donations/show-donation-qrcode-dialog/show-donation-qrcode-dialog.component';
import { CreateTransfusionDialogComponent } from './transfusions/create-transfusion-dialog/create-transfusion-dialog.component';
import { EditTransfusionDialogComponent } from './transfusions/edit-transfusion-dialog/edit-transfusion-dialog.component';
import { TransfusionsComponent } from './transfusions/transfusions.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { QrScannerComponent } from './qr-scanner/qr-scanner.component';
import {ChartModule} from 'primeng/chart';
import { DonorRequirementsComponent } from './donor-requirements/donor-requirements.component';
import { BloodUsageComponent } from './blood-usage/blood-usage.component';
import { TestsCarriedComponent } from './tests-carried/tests-carried.component';
import { BenefitsComponent } from './benefits/benefits.component';
import { DonationModalComponent } from './transfusions/donation-modal/donation-modal.component';
import { AchievementsComponent } from './achievements/achievements.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    // tenants
    TenantsComponent,
    CreateTenantDialogComponent,
    EditTenantDialogComponent,
    // roles
    RolesComponent,
    CreateRoleDialogComponent,
    EditRoleDialogComponent,
    // users
    UsersComponent,
    CreateUserDialogComponent,
    EditUserDialogComponent,
    ChangePasswordComponent,
    ResetPasswordDialogComponent,
    // layout
    HeaderComponent,
    HeaderLeftNavbarComponent,
    HeaderLanguageMenuComponent,
    HeaderUserMenuComponent,
    FooterComponent,
    SidebarComponent,
    SidebarLogoComponent,
    SidebarUserPanelComponent,
    SidebarMenuComponent,
    AppointmentsComponent,
    CreateAppointmentDialogComponent,
    EditAppointmentDialogComponent,
    DonationsComponent,
    CreateDonationDialogComponent,
    EditDonationDialogComponent,
    EditDonationDialogComponent,
    CreateDonationDialogComponent,
    ShowDonationQRCodeDialogComponent,
    TransfusionsComponent,
    CreateTransfusionDialogComponent,
    EditTransfusionDialogComponent,
    QrScannerComponent,
    DonorRequirementsComponent,
    BloodUsageComponent,
    TestsCarriedComponent,
    BenefitsComponent,
    DonationModalComponent,
    AchievementsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ModalModule.forChild(),
    BsDropdownModule,
    CollapseModule,
    AppRoutingModule,
    TabsModule,
    ServiceProxyModule,
    SharedModule,
    NgxPaginationModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    QRCodeModule,
    ZXingScannerModule,
    ChartModule,
    NgxPopperjsModule
  ],
  providers: [QrScannerComponent],
  entryComponents: [
    // tenants
    CreateTenantDialogComponent,
    EditTenantDialogComponent,
    // roles
    CreateRoleDialogComponent,
    EditRoleDialogComponent,
    // users
    CreateUserDialogComponent,
    EditUserDialogComponent,
    ResetPasswordDialogComponent,
  ],
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { UsersComponent } from './users/users.component';
import { TenantsComponent } from './tenants/tenants.component';
import { RolesComponent } from 'app/roles/roles.component';
import { ChangePasswordComponent } from './users/change-password/change-password.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { DonationsComponent } from './donations/donations.component';
import { TransfusionsComponent} from './transfusions/transfusions.component';
import { DonorRequirementsComponent } from './donor-requirements/donor-requirements.component';
import { BloodUsageComponent } from './blood-usage/blood-usage.component';
import { TestsCarriedComponent } from './tests-carried/tests-carried.component';
import { BenefitsComponent } from './benefits/benefits.component';
import { AchievementsComponent } from './achievements/achievements.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: AppComponent,
                children: [
                    { path: 'home', component: HomeComponent,  canActivate: [AppRouteGuard] },
                    { path: 'requirements', component: DonorRequirementsComponent,  canActivate: [AppRouteGuard] },
                    { path: 'how-blood-is-used', component: BloodUsageComponent,  canActivate: [AppRouteGuard] },
                    { path: 'tests', component: TestsCarriedComponent,  canActivate: [AppRouteGuard] },
                    { path: 'benefits', component: BenefitsComponent,  canActivate: [AppRouteGuard] },
                    { path: 'users', component: UsersComponent, data: { permission: 'Pages.Users' }, canActivate: [AppRouteGuard] },
                    { path: 'roles', component: RolesComponent, data: { permission: 'Pages.Roles' }, canActivate: [AppRouteGuard] },
                    { path: 'tenants', component: TenantsComponent, data: { permission: 'Pages.Tenants' }, canActivate: [AppRouteGuard] },
                    { path: 'about', component: AboutComponent },
                    { path: 'update-password', component: ChangePasswordComponent },
                    { path: 'appointments', component: AppointmentsComponent, data: { permission: 'Appointments.Get' }, canActivate: [AppRouteGuard] },
                    { path: 'donations', component: DonationsComponent, data: { permission: 'Donations.Get' }, canActivate: [AppRouteGuard] },
                    { path: 'transfusions', component: TransfusionsComponent, data: { permission: 'Transfusions.Get' }, canActivate: [AppRouteGuard] },
                    { path: 'achievements', component: AchievementsComponent, data: { permission: 'Donor' }, canActivate: [AppRouteGuard] },
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }

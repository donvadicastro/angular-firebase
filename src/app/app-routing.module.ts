import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SignUpComponent} from "./auth/sign-up/sign-up.component";
import {SignInComponent} from "./auth/sign-in/sign-in.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AuthGuard} from "./auth.guard";
import {ListComponent} from "./management/list/list.component";
import {EditComponent} from "./management/edit/edit.component";

@NgModule({
  imports: [RouterModule.forRoot([
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'sign-in', component: SignInComponent },
    { path: 'sign-up', component: SignUpComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'management/list', component: ListComponent, canActivate: [AuthGuard] },
    { path: 'management/edit/:id', component: EditComponent, canActivate: [AuthGuard] },
    { path: 'management/new', component: EditComponent, canActivate: [AuthGuard] },
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

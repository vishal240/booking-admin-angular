import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardGuard } from './auth/authguard.guard';
import { ForgotComponent } from './auth/forgot/forgot.component';
import { LoginComponent } from './auth/login/login.component';
import { UnAuthguardGuard } from './auth/unauthguard.guard';
import { ContentComponent } from './shared/components/content/content.component';
import { content } from './shared/routes/routes';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [UnAuthguardGuard]
  },
  {
    path: 'forgot',
    component: ForgotComponent,
    canActivate: [UnAuthguardGuard]
  },
  {
    path: '',
    redirectTo: 'dashboard/default',
    pathMatch: 'full'
  },
  {
    path: '',
    component: ContentComponent,
    children: content,
    canActivate: [AuthguardGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

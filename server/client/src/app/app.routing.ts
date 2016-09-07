import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/index';
import { HomeComponent } from './home/index';
import { AuthGuard } from './_guards/index';

import { DashboardComponent }      from './dashboard.component';
import { HeroesComponent }      from './heroes.component';
import { HeroDetailComponent } from './hero-detail.component';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    //{ path: '**', redirectTo: '' },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]  },
    { path: 'heroes', component: HeroesComponent, canActivate: [AuthGuard]  },
    { path: 'detail/:id', component: HeroDetailComponent, canActivate: [AuthGuard]  },
];

export const routing = RouterModule.forRoot(appRoutes);

// { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    
    
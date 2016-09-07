var router_1 = require('@angular/router');
var index_1 = require('./login/index');
var index_2 = require('./home/index');
var index_3 = require('./_guards/index');
var dashboard_component_1 = require('./dashboard.component');
var heroes_component_1 = require('./heroes.component');
var hero_detail_component_1 = require('./hero-detail.component');
var appRoutes = [
    { path: 'login', component: index_1.LoginComponent },
    { path: '', component: index_2.HomeComponent, canActivate: [index_3.AuthGuard] },
    //{ path: '**', redirectTo: '' },
    { path: 'dashboard', component: dashboard_component_1.DashboardComponent, canActivate: [index_3.AuthGuard] },
    { path: 'heroes', component: heroes_component_1.HeroesComponent, canActivate: [index_3.AuthGuard] },
    { path: 'detail/:id', component: hero_detail_component_1.HeroDetailComponent, canActivate: [index_3.AuthGuard] },
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
// { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

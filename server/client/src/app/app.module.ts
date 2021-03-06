import { NgModule }               from '@angular/core';
import { BrowserModule }          from '@angular/platform-browser';
import { FormsModule }            from '@angular/forms';
import { HttpModule, 
         BaseRequestOptions 
       }                          from '@angular/http';

// Imports for loading & configuring the in-memory web api
import { XHRBackend }              from '@angular/http';
import { InMemoryBackendService, 
         SEED_DATA 
       }                           from 'angular2-in-memory-web-api';
import { InMemoryDataService }     from './in-memory-data.service';

import { MdCoreModule }   from '@angular2-material/core';
import { MdIconModule }   from '@angular2-material/icon';
import { MdButtonModule } from '@angular2-material/button';

import { AppComponent }   from './app.component';
import { routing }        from './app.routing';

import { AuthGuard }             from './_guards/index';
import { AuthenticationService,
         PrivatBankApiService, 
         UserService }           from './services/index';
import { LoginComponent }        from './login/index';  
import { HomeComponent }         from './home/index';

import { HeroesComponent }      from './heroes.component';
import { DashboardComponent }   from './dashboard.component';
import { HeroDetailComponent }  from './hero-detail.component';
import { HeroService }          from './hero.service';
import { HeroSearchComponent }  from './hero-search.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpModule,
    MdCoreModule,
    MdIconModule,
    MdButtonModule
  ],
  declarations: [
    AppComponent,
    HeroesComponent,
    DashboardComponent,
    HeroDetailComponent,
    HeroSearchComponent,
    LoginComponent,
    HomeComponent
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    PrivatBankApiService,
    UserService,
    BaseRequestOptions,

    HeroService
    // { provide: XHRBackend, useClass: InMemoryBackendService }, // in-mem server
    // { provide: SEED_DATA,  useClass: InMemoryDataService }     // in-mem server data
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
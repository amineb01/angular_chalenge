import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { DemandesTableComponent } from './demandes-table/demandes-table.component';
import { MaterialModule } from './material';
import { AdminInterfaceComponent } from './admin-interface/admin-interface.component';
import { TablePaginationComponent } from './demandes-table/table-pagination/table-pagination.component';
import { LoginComponent } from './login/login.component';
import { AuthentificationService } from './shared/services/authentification.service';
import { RouterModule, Route } from '@angular/router';
import { HttpModule } from '@angular/http';
import { RoutesModule } from './routes';
import { UserInterfaceComponent } from './user-interface/user-interface.component';
import { DemandesService } from './shared/services/demandes.service';


@NgModule({
  declarations: [
    AppComponent,
    DemandesTableComponent,
    AdminInterfaceComponent,
    TablePaginationComponent,
    LoginComponent,
    UserInterfaceComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RoutesModule,
    HttpModule 
    
  ],
  providers: [AuthentificationService,DemandesService],
  bootstrap: [AppComponent]
})
export class AppModule { }

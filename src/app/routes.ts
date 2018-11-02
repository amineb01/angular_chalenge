import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Route } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminInterfaceComponent } from './admin-interface/admin-interface.component';
import { AuthGuard } from './shared/services/auth.guard';
import { AuthAdminGuard } from './shared/services/authAdmin.guard';
import { UserInterfaceComponent } from 'src/app/user-interface/user-interface.component';




const appRoutes: Route[] = [
    { path: "", component: LoginComponent },
    { path: "admin", component: AdminInterfaceComponent, canActivate: [AuthGuard,AuthAdminGuard] },
    { path: "user", component: UserInterfaceComponent, canActivate: [AuthGuard] }

];

@NgModule({

    imports: [
        RouterModule.forRoot(
            appRoutes,
            { useHash: true }
        )
    ],
    exports: [
        RouterModule
    ]
    ,
    providers: [AuthGuard,AuthAdminGuard]
})
export class RoutesModule { }







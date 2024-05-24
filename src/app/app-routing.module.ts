import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Error404PageComponent } from "./shared/pages/error404-page/error404-page.component";
import { canMatchGuard, canActivatedGuard } from "./auth/guards/auth.guard";
import { canActivatedPublicGuard } from "./auth/guards/public.guard";

// Modulos

const routes: Routes = [

  {
    path: 'auth',
    loadChildren: () => import( './auth/auth.module' ).then( m => m.AuthModule ),
    canActivate: [ canActivatedPublicGuard ],
    canMatch: [ canActivatedPublicGuard ]
  },
  {
    path: 'heroes',
    loadChildren: () => import( './heroes/heroes.module' ).then( m => m.HeroesModule ),
    canActivate: [ canActivatedGuard ],
    canMatch: [ canMatchGuard ]
  },
  {
    path: '404',
    component: Error404PageComponent
  },
  {
    path: '',
    redirectTo: 'heroes',
    pathMatch: "full"
  },
  {
    path: '**',
    redirectTo: '404'
  }
]

@NgModule( {
  imports: [
    RouterModule.forRoot( routes ),
  ],
  exports: [ RouterModule ],
  declarations: [],
} )
export class AppRoutingModule {
}

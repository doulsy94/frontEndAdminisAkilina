import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommentaireComponent } from './commentaire/commentaire.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IdeeComponent } from './idee/idee.component';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { VocalComponent } from './vocal/vocal.component';
import { PermissionService } from './_services/permission.service';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'connexion', pathMatch: 'full'
  },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'dashboard', component: DashboardComponent,canActivate: [PermissionService] },
  { path: 'utilisateur', component: UtilisateurComponent,canActivate: [PermissionService] },
  { path: 'idee', component: IdeeComponent,canActivate: [PermissionService] },
  { path: 'vocal', component: VocalComponent,canActivate: [PermissionService] },
  { path: 'commentaire', component: CommentaireComponent,canActivate: [PermissionService] },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

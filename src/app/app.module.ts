import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { MenuComponent } from './menu/menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { CommentaireComponent } from './commentaire/commentaire.component';
import { VocalComponent } from './vocal/vocal.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { IdeeComponent } from './idee/idee.component';

@NgModule({
  declarations: [
    AppComponent,
    ConnexionComponent,
    MenuComponent,
    DashboardComponent,
    NavbarComponent,
    FooterComponent,
    UtilisateurComponent,
    IdeeComponent,
    CommentaireComponent,
    VocalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

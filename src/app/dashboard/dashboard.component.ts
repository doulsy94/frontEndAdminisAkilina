import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IdeeService } from '../_services/idee.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

import { UsersService } from '../_services/users.service';
import { MinistereService } from '../_services/ministere.service';
import { CommentaireService } from '../_services/commentaire.service';
import { TokenStorageService } from '../_services/token-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  showAdminBoard: any;
  currentUser: any;
  isLoggedIn: any;
  role: any;
  username: any;
  eventBusService: any;
  roles: string[] = [];
  menuBureau: boolean = true;
  menuMobile: boolean = false;
  searchText: any
  p: any;
  p1:any;   
  id_user: any
  responsive= true
  

  //VARIABLE CONTENANT LES INFORMATIONS DES MINISTERES RECUPERER
  ministere: any;

  //VARIABLE CONTENANT LES INFORMATIONS DES IDEES RECUPERER
  idee: any;

  //VARIABLE CONTENANT LES INFORMATIONS DES COMMENTAIRES PAR IDEES RECUPERER
  commentaire: any;

  //VARIABLE CONTENANT LES INFORMATIONS DES COMMENTAIRES PAR IDEES RECUPERER
  users: any;

  //DECLARATION DES DIFFERENTS ATTRIBUT DE LA TABLE MINISTERE POUR MODIFIER
  libelle: any;
  description: any;
  image: any;

  // Les variables
  nbMinis: any;
  nbIdee: any;
  nbComment: any;
  nbUser: any;

  isNoTrueR!: boolean;
  isTrueR!: boolean;


  constructor(
    public breakpointObserver: BreakpointObserver,
    private route: Router, 
    private tokenStorage: TokenStorageService,
    private ideeService: IdeeService,
    private usersService: UsersService,
    private ministereService: MinistereService,
    private commentaireService: CommentaireService,


   ) { }

  actualise(): void {
    setInterval(() => { }, 100, clearInterval(1500));
  }

  ngOnInit(): void {

    this.id_user = this.tokenStorage.getUser().id_user;


        //METHODE PERMETTANT DE RECUPERER LA LISTE DES MINISTERE
        this.ministereService.listerMinistere().subscribe((data) => {
          this.ministere = data;
          this.nbMinis = this.ministere.length;
          console.log(data);
        });
    
        //METHODE PERMETTANT DE RECUPERER LA LISTE DES IDEES
        this.ideeService.listerIdee().subscribe((data) => {
          this.idee = data;
          this.nbIdee = this.idee.length;
          console.log(data);
        });
    
        //METHODE PERMETTANT DE RECUPERER LA LISTE DES COMMENTAIRES
        this.commentaireService.listerCommentaire().subscribe((data) => {
          this.commentaire = data;
          this.nbComment = this.commentaire.length;
          console.log(data);
        });
    
        //METHODE PERMETTANT DE RECUPERER LA LISTE DES USERS
        this.usersService.listerUser().subscribe((data) => {
          this.users = data;
          this.nbUser = this.users.length;
          console.log(data);
        });

    this.breakpointObserver
      .observe(['(max-width: 767px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.menuBureau = false;
          this.menuMobile = true;
          this.actualise();
        } else {
          this.menuBureau = true;
          this.menuMobile = false;
          this.actualise();
        }
      });  
      if (this.tokenStorage.isLoggedIn()) {
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
      }

      this.currentUser = this.tokenStorage.getUser();
      console.table(this.currentUser);
      var moi = this.currentUser.id;
  
      console.log("je suis id user" + moi);

      this.isLoggedIn = this.tokenStorage.isLoggedIn();
  
      if (this.isLoggedIn) {
        const user = this.tokenStorage.getUser();
        this.roles = user.roles;
  
        this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
  
        this.username = user.username;
      }
  
  }

//METHODE PERMETTANT DE RECUPERER L'IMAGE DE LA REGION
recuperationImageMinistere(event: any) {

  this.image = event.target["files"][0];
  console.log(this.image)

}

  //METHODE PERMETTANT D'ENVOYER LES VALEUR DE L'IMAGE AU SERVICE
  ajouterMinistere() {
    this.ministereService.ajouterMinistere(
      this.image,
       this.libelle,
      this.description,
   
    ).subscribe({
      next: data => {
        console.log(data);
     
        this.popUpM();
        //this.reloadPage();
      }, error: err => {
      
      }
    })

  }

  popUpM(){
  Swal.fire({
    position: 'center',

    text: 'Ministere ajouter avec success!!',
    icon: 'success',
    heightAuto: false,
    showConfirmButton: true,
    confirmButtonText: 'OK',
    confirmButtonColor: '#0857b5',
    showDenyButton: false,
    showCancelButton: false,
    allowOutsideClick: false,
  }).then((result) => {
    if (result.isConfirmed) {
      this.reloadPage();
    }
  });
}

// Methode permettanr de supprimer un ministere
  supprimer(id_ministere: any) {
    this.popUp(id_ministere);
  }
  
  popUp(id_ministere: any) {
    Swal.fire({
      position: 'center',
  
      text: 'Voulez vous vraiment supprimer ?',
      icon: 'warning',
      heightAuto: false,
      showConfirmButton: true,
      confirmButtonText: 'Oui',
      confirmButtonColor: '#0857b5',
      showDenyButton: false,
      showCancelButton: true,
      cancelButtonText: 'Non',
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        this.ministereService
          .supprimerMinistere(id_ministere, this.id_user)
          .subscribe((data) => {
            //location.reload();
            console.log('okkk');
          });
  
        Swal.fire({
          position: 'center',
  
          text: 'Ministere supprimer avec success!!',
          icon: 'success',
          heightAuto: false,
          showConfirmButton: true,
          confirmButtonText: 'OK',
          confirmButtonColor: '#0857b5',
          showDenyButton: false,
          showCancelButton: false,
          allowOutsideClick: false,
        }).then((result) => {
          if (result.isConfirmed) {
            this.reloadPage();
          }
        });
      }
    });
  }

  title = 'Malienw Akilina';
  afficheMenuMobile() {
    this.menuBureau = true;
    this.menuMobile = false;
  }


  reloadPage(): void {
    window.location.reload();
  }

  logout(): void{
    this.tokenStorage.signOut();
    this.route.navigateByUrl('connexion')
    window.location.reload();
  }
}



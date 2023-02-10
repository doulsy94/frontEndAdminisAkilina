import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { IdeeService } from '../_services/idee.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { UsersService } from '../_services/users.service';

@Component({
  selector: 'app-idee',
  templateUrl: './idee.component.html',
  styleUrls: ['./idee.component.css']
})
export class IdeeComponent implements OnInit{

   //VARIABLE CONTENANT LES INFORMATIONS DES IDEES RECUPERER
   idee: any;

   //VARIABLE CONTENANT LES INFORMATIONS DES IDEES RECUPERER
   users: any;


  //DECLARATION DES DIFFERENTS ATTRIBUT DE LA TABLE IDEE
  contenu: any;
  likes: any
  dislikes: any
  date: any


  //DECLARATION DES DIFFERENTS ATTRIBUT DE LA TABLE USER
  username: any;
  email: any;
  numero: any;
  addresse: any;


  p:any;
  menuBureau: boolean = true;
  menuMobile: boolean = false;
  user: any;
  id_user: any
  searchText: any;
  responsive= true


  constructor(
    public breakpointObserver: BreakpointObserver,
    private ideeService: IdeeService,
    private usersService: UsersService,
    private storageService: TokenStorageService,

   ) { }

   actualise(): void {
    this.usersService.listerUser().subscribe(data => {
      this.user = data;
      console.table(this.user);
      // console.table(this.user.roles[1])
    });
    setInterval(
      () => {
      }, 100, clearInterval(1500));
  }

  ngOnInit(): void {

    this.id_user = this.storageService.getUser().id_user;


     //METHODE PERMETTANT DE RECUPERER LA LISTE DES IDEES
     this.ideeService.listerIdee().subscribe(data => {
      this.idee = data;     
      console.log("data==================================================",JSON.stringify(this.idee));
      console.log(data)
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

  }

  supprimer(id_idee: any) {
    this.popUp(id_idee);
  }
  
  popUp(id_idee: any) {
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
        this.ideeService
          .supprimerIdee(id_idee, this.id_user)
          .subscribe((data) => {
            //location.reload();
            console.log('okkk');
          });
  
        Swal.fire({
          position: 'center',
  
          text: 'Idee supprimer avec success!!',
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
  
  reloadPage(): void {
    window.location.reload();
  }
  
  afficheMenuMobile() {
    this.menuBureau = true;
    this.menuMobile = false;
  }

}



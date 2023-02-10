import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { TokenStorageService } from '../_services/token-storage.service';
import { UsersService } from '../_services/users.service';
import { VocalService } from '../_services/vocal.service';

@Component({
  selector: 'app-vocal',
  templateUrl: './vocal.component.html',
  styleUrls: ['./vocal.component.css']
})
export class VocalComponent implements OnInit{
  searchText: any;
  p:any;
  menuBureau: boolean = true;
  menuMobile: boolean = false;
  user: any;
  vocal: any
  id_user: any
  responsive= true


  constructor(
    public breakpointObserver: BreakpointObserver,
    private usersService: UsersService,
    private vocalService: VocalService,
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
       this.vocalService.listerVocal().subscribe(data => {
        this.vocal = data;     
        console.log("data==================================================",JSON.stringify(this.vocal));
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

  supprimer(id: any) {
    this.popUp(id);
  }
  
  popUp(id: any) {
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
        this.vocalService
          .supprimerVocal(id, this.id_user)
          .subscribe((data) => {
            //location.reload();
            console.log('okkk');
          });
  
        Swal.fire({
          position: 'center',
  
          text: 'Vocal supprimer avec success!!',
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

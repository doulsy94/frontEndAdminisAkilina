import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UsersService } from '../_services/users.service';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css']
})
export class UtilisateurComponent implements OnInit {
 
  p:any;
  menuBureau: boolean = true;
  menuMobile: boolean = false;
  user: any;
  searchText: any;
  responsive= true


  constructor(
    public breakpointObserver: BreakpointObserver,
    private usersService: UsersService,
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


  supprimer(id_user: any) {
    this.popUp(id_user);
  }
  
  popUp(id_user: any) {
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
        this.usersService
          .supprimerUsers(id_user)
          .subscribe((data) => {
            //location.reload();
            console.log('okkk');
          });
  
        Swal.fire({
          position: 'center',
  
          text: 'Utilisateur supprimer avec success!!',
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

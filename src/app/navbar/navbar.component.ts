import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NotificationService } from '../_services/notification.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { UsersService } from '../_services/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  implements OnInit {
  user: any
  imageuser: any
  username: any
  numero: any;
  email: any;
  addresse: any;
  id_user: any
  id_notification: any;
  ministere: any;
  createur: any;
  notif: any;
  imagecreateur: any;



  ngOnInit(): void {

    this.notification.listerNotification().subscribe((data) => {
      this.notif = data;
      this.ministere = data.ministere;
      this.createur = data.createur;
      // this.imagecreateur = data[0].imagecreateur
      console.log(data);
    });

    this.id_user=this.tokenStorage.getUser().id_user;
    console.log("identifiant" +this.id_user)

    this.usersService.listerUserParId(this.id_user).subscribe(data =>{
      console.log("data: " +JSON.stringify(data))
      this.username = data.username;
      this.numero = data.numero;
      this.email = data.email;
      this.addresse = data.addresse;
      this.imageuser = data.imageuser;      
      });

  }

  constructor(
    public breakpointObserver: BreakpointObserver,
    private route: Router, 
    private tokenStorage: TokenStorageService,
    private usersService: UsersService,
    private notification: NotificationService
   ) { }

   //METHODE PERMETTANT DE RECUPERER L'IMAGE DU MINISTERE
   recuperationImageUser(event: any) {

    this.imageuser = event.target["files"][0];
    console.log(this.imageuser)

  }

  reloadPage(): void {
    window.location.reload();
  }

  logout(): void{
    this.tokenStorage.signOut();
    this.route.navigateByUrl('connexion')
 
  }

  popUpMod() {
    Swal.fire({
      position: 'center',

      text: 'Information modifier avec success!!',
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

   // Methode permettant de modifier un user
   modifierUser(user: any) {
    this.popUpMod();
    this.usersService.modifierUserParId(this.id_user, user).subscribe((data) => {
      console.log('data: ' + JSON.stringify(data));
    });
  }

}

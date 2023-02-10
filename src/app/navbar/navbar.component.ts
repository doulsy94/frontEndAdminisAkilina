import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  id_user: any
  constructor(
    public breakpointObserver: BreakpointObserver,
    private route: Router, 
    private tokenStorage: TokenStorageService,
    private usersService: UsersService,
   ) { }

  ngOnInit(): void {

    this.id_user=this.tokenStorage.getUser().id_user;
    console.log("identifiant" +this.id_user)

    this.usersService.listerUserParId(this.id_user).subscribe(data =>{
      console.log("data: " +JSON.stringify(data))
      this.username = data.username;
      // this.numero = data.numero;
      // this.email = data.email;
      // this.addresse = data.addresse;
      this.imageuser = data.imageuser;
       
      })

  }

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

}

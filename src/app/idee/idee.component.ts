import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
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

  constructor(
    public breakpointObserver: BreakpointObserver,
    private ideeService: IdeeService,
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
  afficheMenuMobile() {
    this.menuBureau = true;
    this.menuMobile = false;
  }

}



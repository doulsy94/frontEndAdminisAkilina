import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { CommentaireService } from '../_services/commentaire.service';
import { IdeeService } from '../_services/idee.service';
import { UsersService } from '../_services/users.service';

@Component({
  selector: 'app-commentaire',
  templateUrl: './commentaire.component.html',
  styleUrls: ['./commentaire.component.css']
})
export class CommentaireComponent implements OnInit{
  users: any;
  idee: any;
  p:any;
  menuBureau: boolean = true;
  menuMobile: boolean = false;
  user: any;
  idcommentaire: any
  comment: any
  contenu: any
  imageuser: any

  constructor(
    public breakpointObserver: BreakpointObserver,
    private ideeService: IdeeService,
    private usersService: UsersService,
    private commentaire: CommentaireService,

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

    this.commentaire
    .listerCommentaire()
    .subscribe((data) => {
      this.comment = data;
      console.log("data================",JSON.stringify(this.comment));
     console.log(data)
    });

    //METHODE PERMETTANT DE RECUPERER LA LISTE DES IDEES
    this.ideeService.listerIdee().subscribe(data => {
     this.idee = data;     
     console.log("data================",JSON.stringify(this.idee));
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

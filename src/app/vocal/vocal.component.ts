import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { IdeeService } from '../_services/idee.service';
import { UsersService } from '../_services/users.service';
import { VocalService } from '../_services/vocal.service';

@Component({
  selector: 'app-vocal',
  templateUrl: './vocal.component.html',
  styleUrls: ['./vocal.component.css']
})
export class VocalComponent implements OnInit{

  p:any;
  menuBureau: boolean = true;
  menuMobile: boolean = false;
  user: any;
  vocal: any

  constructor(
    public breakpointObserver: BreakpointObserver,
    private usersService: UsersService,
    private vocalService: VocalService
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

  afficheMenuMobile() {
    this.menuBureau = true;
    this.menuMobile = false;
  }

}

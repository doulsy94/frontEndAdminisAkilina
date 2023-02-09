import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit{
  form: any = {
    emailOrNumero: null,
    password: null
  };

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  currentUser: any;
  role: any;
  showAdminBoard: any;
  showModeratorBoard: any;
  username: any;

  eventBusService: any;
  
  roles: string[] = [];
  modal: any;
  constructor(
    private authService: AuthService, 
    private tokenStorage: TokenStorageService, 
    private router: Router
    ) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(): void {
    const { emailOrNumero, password } = this.form;

    this.authService.login(emailOrNumero, password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
       
        this.router.navigate(['/dashboard'])
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );

  }
  reloadPage(): void {
    window.location.reload();
  }

}
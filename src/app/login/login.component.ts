import {Component, OnInit} from '@angular/core';
import {AuthService} from '../service/auth.service';
import {TokenStorageService} from '../service/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService, private tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {
    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorageService.getUser().roles;
    }
  }

  onSubmit(): void {
    this.authService.login(this.form).subscribe(data => {
      this.tokenStorageService.saveToken(data.accessToken);
      this.tokenStorageService.saveUser(data);

      this.isLoginFailed = false;
      this.isLoggedIn = true;
      this.roles = this.tokenStorageService.getUser().roles;
      this.reloadPage();
    }, error => {
      this.errorMessage = error.error.message;
      this.isLoginFailed = true;
    });
  }

  reloadPage(): void {
    location.reload();
  }
}

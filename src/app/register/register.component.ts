import {Component, OnInit} from '@angular/core';
import {AuthService} from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.authService.register(this.form).subscribe(
      data => {
        console.log(data);
        this.isSignUpFailed = false;
        this.isSuccessful = true;
      }, error => {
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

}

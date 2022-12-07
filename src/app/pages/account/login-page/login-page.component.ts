import { Security } from './../../../utils/security.util';
import { DataService } from './../../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidator } from 'src/app/validators/custom.validator';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  public form: FormGroup;
  public loading = false;

  constructor(
    private router: Router,
    private service: DataService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      username: ['', Validators.compose([
        Validators.minLength(11),
        Validators.maxLength(11),
        Validators.required,
        CustomValidator.isCpf()
      ])],
      password: ['', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.required
      ])]
    });
  }

  ngOnInit(): void {
    const token = Security.getToken();
    if (token) {
      this.loading = true;
      this
        .service
        .refreshToken()
        .subscribe((data: any) => {
          this.setUser(data.customer, data.token);
          this.loading = false;
        },
          (err) => {
            sessionStorage.clear();
            this.loading = false;
          }
        );
    }
  }

  submit() {
    this.loading = true;
    this
      .service
      .authenticate(this.form.value)
      .subscribe((data: any) => {
        this.setUser(data.customer, data.token);
        this.loading = false;
      },
        (err) => {
          console.log(err);
          this.loading = false;
        }
      );
  }

  setUser(user: User, token: string) {
    Security.set(user, token);
    this.router.navigate(['/']);
  }

}

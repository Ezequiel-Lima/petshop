import { DataService } from './../../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  public form: FormGroup;
  public busy: Boolean = false;

  constructor(
    private service: DataService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      username: ['', Validators.compose([
        Validators.minLength(11),
        Validators.maxLength(11),
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.required
      ])]
    });
  }

  ngOnInit(): void {
    const token = sessionStorage.getItem('petshop.token');
    if (token) {
      this.busy = true;
      this
        .service
        .refreshToken()
        .subscribe((data: any) => {
          sessionStorage.setItem('petshop.token', data.token)
          this.busy = false;
        },
          (err) => {
            sessionStorage.clear();
            this.busy = false;
          }
        );
    }
  }

  submit() {
    this.busy = true;
    this
      .service
      .authenticate(this.form.value)
      .subscribe((data: any) => {
        console.log(data)
        sessionStorage.setItem('petshop.token', data.token)
        this.busy = false;
      },
        (err) => {
          console.log(err);
          this.busy = false;
        }
      );
  }

}

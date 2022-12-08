import { CustomValidator } from './../../../validators/custom.validator';
import { DataService } from './../../../services/data.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {
  public form: FormGroup;
  public loading: boolean = false;

  constructor(
    private router: Router,
    private service: DataService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(80),
        Validators.required
      ])],
      document: ['', Validators.compose([
        Validators.minLength(11),
        Validators.maxLength(11),
        Validators.required,
        CustomValidator.isCpf()
      ])],
      email: ['', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(120),
        Validators.required,
        CustomValidator.EmailValidator
      ])],
      password: ['', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.required
      ])]
    })
  }

  ngOnInit(): void {
  }

  submit() {
    this.loading = true;
    this
      .service
      .create(this.form.value)
      .subscribe((data: any) => {
        this.loading = false;
        this.toastr.success(data.message, 'Bem-vindo!');
        this.router.navigate(['/login']);
      },
        (err: any) => {
          console.log(err);
          this.toastr.error('Falha na Requisição');
          this.loading = false;
        }
      );
  }

}

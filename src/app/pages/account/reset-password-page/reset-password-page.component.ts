import { DataService } from './../../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomValidator } from 'src/app/validators/custom.validator';

@Component({
  selector: 'app-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  styleUrls: ['./reset-password-page.component.css']
})
export class ResetPasswordPageComponent implements OnInit {
  public form: FormGroup;
  public loading: boolean = false;

  constructor(
    private router: Router,
    private service: DataService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      document: ['', Validators.compose([
        Validators.minLength(11),
        Validators.maxLength(11),
        Validators.required,
        CustomValidator.isCpf()
      ])]
    })
  }

  ngOnInit(): void {
  }

  submit() {
    this.loading = true;
    this
      .service
      .resetPassword(this.form.value)
      .subscribe((data: any) => {
        this.loading = false;
        this.toastr.success(data.message, 'Senha Restaurada!');
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

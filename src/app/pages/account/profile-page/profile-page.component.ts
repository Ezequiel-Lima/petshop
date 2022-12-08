import { ToastrService } from 'ngx-toastr';
import { CustomValidator } from 'src/app/validators/custom.validator';
import { DataService } from './../../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  public form: FormGroup;
  public loading = false;

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
      document: [{ value: '', disabled: true}],
      email: ['', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(120),
        Validators.required,
        CustomValidator.EmailValidator
      ])]
    });
  }

  ngOnInit(): void {
    this.loading = true;
    this.form.disabled;
    this.service.getProfile().subscribe((data: any) => {
      this.loading = false;
      this.form.controls['name'].setValue(data.name);
      this.form.controls['document'].setValue(data.document);
      this.form.controls['email'].setValue(data.email);
    },
    (err) => {
      console.log(err);
      this.loading = false;
    })
  }

  submit() {
    this.loading = true;
    this
    .service
    .updateProfile(this.form.value)
    .subscribe((data: any) => {
      this.loading = false;
      this.toastr.success(data.message, 'Atualização Completa!');
    },
    (err) => {
      console.log(err);
      this.loading = false;
      this.toastr.error('Falha Na Atualização');
    })
  }

}

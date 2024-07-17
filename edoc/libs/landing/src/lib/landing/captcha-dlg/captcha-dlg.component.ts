// import { RegisterService } from './../../../../../../apps/lucy/src/app/_services/register.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'tenr-captcha-dlg',
  templateUrl: './captcha-dlg.component.html',
  styleUrls: ['./captcha-dlg.component.css']
})
export class CaptchaDlgComponent implements OnInit {
  successFlag = false;
  errorFlag = false;
  isValidCaptcha = true;
  captchaForm = this.fb.group({
    captchaInput: '',
    verifyCaptcha: '',
    email: ['', Validators.required]
  })
  bgcolor: string;
  letters = '0123456789ABCDEF';
  constructor(
    private fb: FormBuilder,
    // private apiService: RegisterService,
    @Inject(MAT_DIALOG_DATA) public data,
  ) { }

  ngOnInit() {
    this.generateCaptcha();
    this.getRandomColor();
  }

  generateCaptcha() {
    var alpha = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z');
    var i;
    for (i = 0; i < 5; i++) {
      var a = alpha[Math.floor(Math.random() * alpha.length)];
      var b = alpha[Math.floor(Math.random() * alpha.length)];
      var c = alpha[Math.floor(Math.random() * alpha.length)];
      var d = alpha[Math.floor(Math.random() * alpha.length)];
      var e = alpha[Math.floor(Math.random() * alpha.length)];
      var f = alpha[Math.floor(Math.random() * alpha.length)];
      var g = alpha[Math.floor(Math.random() * alpha.length)];
    }
    var code = a + '' + b + '' + '' + c + '' + d + '' + '' + e + '' + '' + f ;
    this.captchaForm.get('captchaInput').setValue(code);
    this.getRandomColor();
  }

  getRandomColor() {
    var o = Math.round, r = Math.random, s = 255;
    this.bgcolor = 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + '0.6' + ')';
  }

  inputvalue() {
    this.errorFlag = false;
    this.successFlag = false;
  }

  CheckValidCaptcha() {
    var string1 = this.captchaForm.get('captchaInput').value;
    var string2 = this.captchaForm.get('verifyCaptcha').value;
    if (string1 == string2) {
      this.errorFlag = false;
      this.successFlag = true;
      this.isValidCaptcha = false;
      return true;
    }
    else {
      this.errorFlag = true;
      this.successFlag = false;
      return false;
    }
  }

  closeDialog() {

  }

  submitForm() {
    if (this.captchaForm.valid) {
      if (this.captchaForm.pristine) { return }
      // this.apiService.validateEmailId(this.captchaForm.get('email').value).subscribe(data => {
      //   if (data) {
      //     this.data.redirectLucy();
      //   }
      // }, (err) => {
      //   if (err) {
      //     this.captchaForm.setErrors({
      //       invalidEmail: true
      //     })
      //   }
      // })
    }
  }
}

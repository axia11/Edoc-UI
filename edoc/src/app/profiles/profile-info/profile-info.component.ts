import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SnackbarService } from 'src/app/shared/_services/snackbar.service';
import { ProfilesService } from '../_service/profiles.service';
import { CountryCodeService } from 'src/app/_services/countryCode.service';


@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit {


  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('profilePhoto') profilePhoto: ElementRef;
  fileToUpload: File | null = null;
  isEdit;
  isView;
  addTestBtn: boolean;
  disableEdit = true;
  enableDelete = true;
  hideSave = false;
  arrItem = [];
  urlPath;
  maxDate = new Date();
  Gender = ['Male', 'Female', 'Others'];
  bGroup = ['A+', 'A-', 'B+', 'B-', 'AB+', 'O+', 'O-'];
  charValidator = /^[a-zA-Z ]+$/;
  profileDetails = [];
  hideChageBtn: boolean = true;
  disableLogin = false;
  selectedOption = '+91';
  lastDate;
  countrycode;
  countryCodeList = [];
  filterCountryCodeList = [];
  apiLoads = false;
  userName: string = localStorage.getItem('firstName');
  isEditing: boolean = false;
  emailid: any;
  constructor(
    private apiService: ProfilesService,
    private fb: FormBuilder,
    private sb: SnackbarService,
    private ccs: CountryCodeService,
  ) { }

  ngOnInit(): void {
    this.lastDate = new Date();
    this.ccs.getAllCountryCode().subscribe(countryCodes => {
      this.countryCodeList = countryCodes;
    });
    this.apiService.getProfileDetails().subscribe(res => {
      this.profileForm.patchValue(res.Result);
      this.urlPath = res.Result.profilepath;
      this.userName = res.Result.firstname + res.Result.lastname;
      this.emailid= res.Result.usermail
      this.countrycode = res.Result.countrycode;
      this.profileDetails.push(res.Result);
      this.arrItem.push(res.Result);
      this.apiService.profilePath = this.arrItem[0].profilePath;
      this.apiLoads = true;

      this.profileForm.disable();
    });
  }

  profileForm = this.fb.group({
    firstname: [null, [Validators.pattern("^[a-zA-Z ]+$")]],
    lastname: [null, [Validators.pattern("^[a-zA-Z ]+$")]],
    usermail: { value: null, disabled: true },
    altemail: [null, [Validators.required]],
    contactnumber: [null, [Validators.required, Validators.pattern(/^[0-9]{10,10}$/)]],
    dob: null,
    gender: null,
    bloodgrp: null,
    countrycode: null,
    password: null,
  });

  filterCountry(evt) {
    this.filterCountryCodeList = evt
  }

  saveProfileItem() {
    if (this.profileForm.valid) {
      if (this.profileForm.pristine) { return; }
      this.disableLogin = true;
      this.apiService.updateProfileData(this.profileForm.getRawValue()).subscribe(res => {
        this.disableLogin = false;
        this.sb.open('Profile Updated Successfully', 'bg-green');
        this.isEditing = false;
        this.profileForm.disable();
      });
    }
  }

  cancel() {
    this.isEditing = false;
    this.profileForm.disable();
  }
  enableEditing() {
    this.isEditing = true;
    this.profileForm.enable()
  }
  updatePhoto(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.fileToUpload = input.files[0];
      this.hideChageBtn = false;
    }
  }



  saveProfilePhoto(): void {
    if (this.fileToUpload) {
      this.apiService.uploadProfilePhoto(this.fileToUpload).subscribe(
        res => {
          this.sb.open('Profile Updated Successfully', 'bg-green');
          this.apiService.getProfileDetails().subscribe(
            res => {
              this.urlPath = res.Result.profilepath;
              this.hideChageBtn = true;
            },
          );
        },
      );
    } else {
      this.sb.open('No file selected', 'bg-red');
    }
  }



}

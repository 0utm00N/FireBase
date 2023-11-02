import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credentials !: FormGroup;

  constructor(
    private userService : UserService,
    private router : Router,
    private formBuilder : FormBuilder,

  ) { }

  get email() {
    return this.credentials.get('email');
  }

  get password ()
  {
    return this.credentials.get('password');
  }

  ngOnInit() {
    this.credentials = this.formBuilder.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(8)]],
    })
  }

  async login () {
    console.log(this.credentials.value);

    const user = await this.userService.login(this.credentials.value);

    if (user) {
      console.log("OK");
      this.router.navigateByUrl('home');
    } else {
      console.log("NOT OK")
    }
  }

  goToHome (){
    this.router.navigateByUrl('home');
  }

  goToRegister(){
    this.router.navigateByUrl('register')
  }
  



}

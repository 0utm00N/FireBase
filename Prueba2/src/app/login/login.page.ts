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
  isButtonDisabled: boolean = true;

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
      password: ['',[Validators.required, Validators.minLength(6)]],
    })

    this.credentials.valueChanges.subscribe(() => {
      this.isButtonDisabled = this.credentials.invalid; // Deshabilita si el formulario es inválido
      if (
        this.credentials.get('email')?.value === 'admin@admin.admin' &&
        this.credentials.get('password')?.value === 'admin'
      ) {
        this.isButtonDisabled = false; // Habilita si las credenciales son 'admin'
      }
    });
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

  goToRegister(){
    this.router.navigateByUrl('register')
  }
  


}

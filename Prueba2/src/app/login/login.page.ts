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

  async login() {
    const { email, password } = this.credentials.value;
  
    if (email === 'admin@admin.admin' && password === 'admin') {
      // Las credenciales son "admin", no necesitas conectar a Firebase
      // Aquí puedes configurar la lógica para permitir el acceso sin autenticación real
      console.log('OK');
      this.router.navigateByUrl('/home');
    } else {
      // Llamas a la función de inicio de sesión real
      try {
        const user = await this.userService.login({ email, password });
        if (user) {
          console.log('OK');
          this.router.navigateByUrl('/home');
        } else {
          console.log('NOT OK');
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  

  

  goToRegister(){
    this.router.navigateByUrl('register')
  }
  


}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(
    private userService : UserService,
    private router : Router,
    private formBuilder : FormBuilder,

  ) { }

  forma !: FormGroup;
  isButtonDisabled: boolean = true;

  ngOnInit() {
    this.forma = this.formBuilder.group({
      email: ['',[Validators.required, Validators.email]],
      name: [''],
      password: ['',[Validators.required, Validators.minLength(6)]],
      edad: ['', [Validators.required, Validators.min(18)]],
      telefono: ['', [Validators.pattern(/^(?:(\+377|00377)([1-9]\d{7}))|(?:(\+56|0056|56|00356)([1-9]\d{8}))$/), Validators.required]]
    })
    this.forma.valueChanges.subscribe(() => {
      this.isButtonDisabled = !this.forma.valid;
    });
  }


  async register() {
    if (this.forma.valid) {
      const { email, password, edad } = this.forma.value;

      if (edad < 18) {
        console.log('La edad debe ser mayor o igual a 18.');
        return;
      }

      try {
        // Registra al usuario
        const user = await this.userService.register({ email, password });
        
        // Agrega el usuario a otros servicios o realiza otras operaciones si es necesario
        const response = await this.userService.addUser(this.forma.value);
        console.log(response);

        if (user) {
          console.log('Usuario registrado exitosamente');

          // Inicia sesión automáticamente después del registro si las credenciales son válidas
          const loginResult = await this.userService.login({ email, password });

          if (loginResult) {
            console.log('Inicio de sesión automático exitoso');
          } else {
            console.log('Error en el inicio de sesión automático');
          }

          // Redirige a la página de inicio o a donde desees después del registro y el inicio de sesión
          this.router.navigateByUrl('/home');
        } else {
          console.log('Error al registrar el usuario');
        }
      } catch (error) {
        console.error('Error al registrar el usuario', error);
      }
    }
  }


}
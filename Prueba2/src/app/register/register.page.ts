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
      telefono: ['', [Validators.pattern(/^(?:(\+377|00377)([1-9]\d{7}))|(?:(\+56|0056|56|00356)([1-9]\d{8}))$/)]]
    })
    this.forma.valueChanges.subscribe(() => {
      this.isButtonDisabled = !this.forma.valid;
    });
  }


  async register() {
    if (this.forma.valid) {
      const { email, password, edad} = this.forma.value;
  
      if (edad < 18) {
        console.log('La edad debe ser mayor o igual a 18.');
        return;
      }
  
      try {
        const user = await this.userService.register({ email, password });
        const response = await this.userService.addUser(this.forma.value);
        console.log(response)
  
        if (user) {
          console.log('usuario registrado exitosamente');
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

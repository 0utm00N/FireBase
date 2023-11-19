import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { User } from '../user';
import { Auth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  user: User = {
    email: '',
    name: '',
    password: '', 
    edad: 0,
    telefono: ''
  };

  userForm: FormGroup;

  constructor(private userService: UserService, 
    private router: Router, 
    private auth: Auth,
    private fb: FormBuilder) {

      this.userForm = this.fb.group({
        name: ['',[Validators.required]],
        edad: ['', [Validators.required, Validators.min(18)]],
        telefono: ['', [Validators.pattern(/^(?:(\+377|00377)([1-9]\d{7}))|(?:(\+56|0056|56|00356)([1-9]\d{8}))$/)]]
      });
    }

  ngOnInit() {
    // Obtén el usuario actualmente autenticado
    const userAuth = this.auth.currentUser;

    if (userAuth) {
      const userEmail = userAuth.email;

      if (userEmail) {
        this.userService.getUser(userEmail).subscribe(users => {
          // Supongamos que solo debería haber un usuario con el mismo correo electrónico
          if (users && users.length > 0) {
            this.user = users[0];
          } else {
            // Manejo en caso de que no se encuentre ningún usuario
            console.error('Usuario no encontrado');
          }
        });
      }
    }
  }

  logout() {
    this.userService.logout().then(() => {
      this.router.navigateByUrl('/login');
    });
  }

  updateUser() {

    if (this.userForm.valid) {
      // Actualiza los datos del usuario con los valores del formulario
      this.user = { ...this.user, ...this.userForm.value };
  
      // Llama a la función editUser del servicio para actualizar los datos en Firestore
      const userEmail = this.auth.currentUser?.email; // Obtén el correo electrónico del usuario autenticado
  
      if (userEmail) {
        // Verifica si el documento existe antes de intentar actualizarlo
        this.userService.getUser(userEmail).subscribe(users => {
          if (users && users.length > 0) {
            // El documento existe, procede con la actualización
            this.userService.editUser(this.user).then(() => {
              console.log('Datos del usuario actualizados con éxito');
            }).catch(error => {
              console.error('Error al actualizar datos del usuario', error);
            });
          } else {
            // El documento no existe, maneja esta situación según tu lógica
            console.error('Documento no encontrado para el usuario con correo electrónico', userEmail);
          }
        });
      } else {
        console.error('No se pudo obtener el correo electrónico del usuario autenticado');
      }
    }
  }




}

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

  credentials !: FormGroup;

  ngOnInit() {
    this.credentials = this.formBuilder.group({
      email: ['',[Validators.required, Validators.email]],
      name: [''],
      password: ['',[Validators.required, Validators.minLength(8)]],
      edad: ['', [Validators.required, Validators.min(18)]],
      telefono: ['', [Validators.pattern(/^(?:\+34|0034|34|00377|377|0033|33)?\d{9}$/)]]

    })
  }

  async register () {
    console.log(this.credentials.value);

    const { email, password } = this.credentials.value;

    const user = await this.userService.register({ email, password });
    const response = await this.userService.addUser(this.credentials.value);
    console.log(response)

    if (user) {
      console.log("OK");
      this.router.navigateByUrl("/login");
    } else {
      console.log("NOT OK")
    }
  }

}

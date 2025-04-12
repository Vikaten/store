import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {MatAnchor, MatButton} from '@angular/material/button';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {IResponceAuthWithMess} from '../../../models/auth.model'

@Component({
  selector: 'app-login-page',
  imports: [
    RouterLink,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    MatFormField,
    MatAnchor,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})

export class LoginPageComponent implements OnInit {
  public loginForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    const formData = this.loginForm.value;
    const payload = {
      email: formData.email,
      password: formData.password,
    };

    this.http.post<IResponceAuthWithMess>("http://localhost:3000/api/login", payload)
      .subscribe({
        next: res => {
          alert('Successful!');
          this.loginForm.reset();
          if (res.user.role === "admin") {
            this.router.navigate(['/database']);
          }
          else {
            this.router.navigate(['/home']);
          }
        },
        error: err => {
          if (err.status === 401) {
            alert('Invalid username or password');
          } else {
            alert('Server error');
          }
          console.error(err);
        }
      })
  }
}

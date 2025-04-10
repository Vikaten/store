import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {MatAnchor, MatButton} from '@angular/material/button';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

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
  public usersList: string[] = [];
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

    this.http.post("http://localhost:3000/api/login", payload)
      .subscribe({
        next: res => {
          alert('Successful!');
          this.loginForm.reset();
          this.router.navigate(['/home']);
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

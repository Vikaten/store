import {Component, OnInit} from '@angular/core';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {FormGroup, FormBuilder, FormsModule, ReactiveFormsModule, Validators, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup-up-page',
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    MatButton,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './signup-up-page.component.html',
  styleUrl: './signup-up-page.component.scss'
})
export class SignupUpPageComponent implements OnInit {
  public signUpForm!: FormGroup;
  public usersList: string[] = [];
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      name: ['', Validators.required],
      birthday: ['', Validators.required],
      number: ['', [Validators.required, Validators.pattern('[1-9]*')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  signUp() {
    try {
      const formData = this.signUpForm.value;
      let birthday = '';

      const date = new Date(formData.birthday);
        if (!isNaN(date.getTime())) {
          birthday = date.toISOString().split('T')[0]
        }
        else {
          throw new Error('Date is invalid');
        }

      const payload = {
        name: formData.name,
        birthday: new Date(formData.birthday).toISOString().split('T')[0], // Format the date
        number: formData.number,
        email: formData.email,
        password: formData.password,
      };

      this.http.post("http://localhost:3000/api/signupUsersList", payload)
        .subscribe({
          next: res => {
            alert('Signup successfully!');
            this.signUpForm.reset();
            this.router.navigate(["/login"]);
          },
          error: err => {
            if (err.status === 401) {
              alert('Invalid data');
            } else {
              alert('Server error');
            }
            console.error(err);
          }
        });
    }
    catch(error) {
      alert(error);
    }
  }
}

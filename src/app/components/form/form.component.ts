import {Component, Inject, OnInit} from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContainer,
  MatDialogContent,
  MatDialogTitle,
  MAT_DIALOG_DATA, MatDialog, MatDialogRef
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatInput, MatInputModule} from '@angular/material/input';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import { MatFormFieldModule } from "@angular/material/form-field";


@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    NgForOf,
    MatFormFieldModule,
    MatInputModule,
    NgIf
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit {
  form!: FormGroup;
  columns: string[];
  displayedColumns: string[] = [];

   constructor(
     public dialog: MatDialog,
     public formBuilder: FormBuilder,
     @Inject(MAT_DIALOG_DATA) data: any) {
     this.columns = data.columns;
   }

  ngOnInit() {
    const group: any = {};
    const noIncludesFields = ['product_id', 'supplier_id', 'client_id', 'worker_id'];
    this.displayedColumns = this.columns.filter(column => !noIncludesFields.includes(column));
    console.log(this.displayedColumns);
    this.displayedColumns.forEach(col => {
        group[col] = ['',Validators.required];
    });

    this.form = this.formBuilder.group(group);
  }

  submit() {
    console.log('📝 Form submitted:', this.form.value);
  }
}

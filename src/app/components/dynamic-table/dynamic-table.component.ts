import {Component, NgModule, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import {MatIcon} from '@angular/material/icon';
import {FormComponent} from '../form/form.component';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-dynamic-table',
  imports: [
    NgForOf,
    NgIf,
    MatTable,
    MatRow,
    MatHeaderRow,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRowDef,
    MatRowDef,
    MatIcon,
    ReactiveFormsModule,
  ],
  templateUrl: './dynamic-table.component.html',
  styleUrl: './dynamic-table.component.scss'
})
export class DynamicTableComponent implements OnInit {
  currentTable = '';
  tableData: any[] = [];
  columns: string[] = [];
  private dialogRef: MatDialogRef<unknown, any> | undefined;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const type = params.get('type');
      if (type) {
        this.currentTable = type;
        this.fetchData(type)
      }
    })
  }

  fetchData(type: string) {
    this.http.get<any[]>(`http://localhost:3000/api/${type}`).subscribe({
      next: data => {
        this.tableData = data;
        console.log('💾 Данные с сервера:', data);
        this.columns = data.length ? Object.keys(data[0]) : [];
      },
      error: err => {
        console.error(err);
        this.columns = [];
        this.tableData =[];
      }
    })
  }

  formatCell(rowElement: any, column: string) {
    if (column.includes("birthday")) {
      return new Date(rowElement).toLocaleDateString();
    }
    else {
      return rowElement;
    }

  }

  addNewNote() {
    const dialogRef = this.dialog.open(FormComponent, {
      height: 'auto',
      width: '800px',
      data: {
        columns: this.columns,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("res" + result)
      if (result) {
        const payload = {
            ...result
        };
        console.log(result);
        this.sendData(this.currentTable, payload);
      }
    })
  }

  sendData(type: string, payload: any) {
    console.log('Payload для отправки:', payload);
    this.http.post(`http://localhost:3000/api/${type}`, payload)
      .subscribe({
        next: res => {
          alert('Successfully!');
          this.fetchData(type);
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
}

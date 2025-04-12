import {Component, OnInit} from '@angular/core';
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
import {DataSource} from '@angular/cdk/table';
import {Observable} from 'rxjs';

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
    MatRowDef
  ],
  templateUrl: './dynamic-table.component.html',
  styleUrl: './dynamic-table.component.scss'
})
export class DynamicTableComponent implements OnInit {
  currentTable = '';
  tableData: any[] = [];
  columns: string[] = [];

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

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
}

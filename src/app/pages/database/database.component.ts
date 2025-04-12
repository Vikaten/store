import { Component } from '@angular/core';
import {ToolbarComponent} from '../../components/toolbar/toolbar.component';
import {DynamicTableComponent} from '../../components/dynamic-table/dynamic-table.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-database',
  imports: [
    ToolbarComponent,
    RouterOutlet
  ],
  templateUrl: './database.component.html',
  styleUrl: './database.component.scss'
})
export class DatabaseComponent {

}

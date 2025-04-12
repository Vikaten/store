import { Component } from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {MatIcon} from '@angular/material/icon';
import {RouterModule, RouterLink} from '@angular/router';

@Component({
  selector: 'app-toolbar',
  imports: [
    MatIcon,
    RouterLink,
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
}

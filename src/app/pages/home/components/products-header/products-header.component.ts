import { Component, Output, EventEmitter } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-products-header',
  imports: [MatButton, MatCard, MatMenuTrigger, MatMenu, MatMenuItem, MatIcon],
  templateUrl: './products-header.component.html',
  styleUrl: './products-header.component.scss',
})
export class ProductsHeaderComponent {
  @Output() columnsCountChange = new EventEmitter<number>();
  sort = 'desc';
  itemsShowCount = 12;

  onSortUpdates(newSort: string) {
    this.sort = newSort;
  }

  onItemsUpdates(count: number) {
    this.itemsShowCount = count;
  }

  onColumnsUpdated(colsNum: number) {
    this.columnsCountChange.emit(colsNum);
  }
}

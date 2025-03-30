import { Component, Output, EventEmitter } from '@angular/core';
import {
  MatExpansionPanel,
  MatExpansionPanelTitle,
  MatExpansionPanelHeader,
} from '@angular/material/expansion';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-filters',
  imports: [
    MatExpansionPanel,
    MatSelectionList,
    MatExpansionPanelTitle,
    MatExpansionPanelHeader,
    MatListOption,
    NgForOf,
    NgIf,
  ],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss',
})
export class FiltersComponent {
  @Output() showCategory: EventEmitter<string> = new EventEmitter<string>();
  categories = ['clothers', 'sports'];

  onShowCategory(category: string): void {
    this.showCategory.emit(category);
  }
}

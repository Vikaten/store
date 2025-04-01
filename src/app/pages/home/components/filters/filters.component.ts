import {Component, Output, EventEmitter, OnInit, OnDestroy} from '@angular/core';
import {
  MatExpansionPanel,
  MatExpansionPanelTitle,
  MatExpansionPanelHeader,
} from '@angular/material/expansion';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import { NgForOf, NgIf } from '@angular/common';
import {StoreService} from '../../../../services/store.service';
import {Subscription} from 'rxjs';

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
export class FiltersComponent implements OnInit, OnDestroy {
  @Output() showCategory: EventEmitter<string> = new EventEmitter<string>();
  categoriesSubscription: Subscription | undefined;
  categories: string | undefined;

  constructor(private storeService: StoreService,) { }

  ngOnInit() {
    this.categoriesSubscription = this.storeService.getAllCategories()
      .subscribe((response) => {
        this.categories = response;
      });
  }

  onShowCategory(category: string): void {
    this.showCategory.emit(category);
  }

  ngOnDestroy() {
    if(this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe();
    }
  }
}

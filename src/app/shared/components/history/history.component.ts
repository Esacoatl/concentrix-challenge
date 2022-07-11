import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { CompressionState } from '../../redux/state/compression.state';
import { InputTypes } from '../main-input/InputTypes';
import {
  compressionSelector,
  uncompressionSelector,
} from '../../redux/selectors/compression.selector';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit, OnDestroy {
  /** */
  @Input() historyType: any;
  public historyTitle: string = '';
  public historySub: Subscription = new Subscription();
  recordItems: string[] = [];

  constructor(private _store: Store<CompressionState>) {}

  ngOnInit(): void {
    /** validate compress or uncompress */
    switch (this.historyType) {
      case InputTypes.COMPRESS:
        this.historyTitle = 'Compression history';
        this.compressionSelect();
        break;
      case InputTypes.UNCOMPRESS:
        this.historyTitle = 'Uncompression history';
        this.uncompressionSelect();
        break;
      default:
        break;
    }
  }

  /** Method to retrive compress history from State */
  compressionSelect() {
    this.historySub = this._store
      .pipe(select(compressionSelector))
      .subscribe((response) => {
        this.recordItems = [];
        response.map((element: any) => {
          this.recordItems.push(
            `${element.initChars} ---> ${element.resultChars}`
          );
        });
        this.recordItems.reverse();
      });
  }

  /** Method to retrive uncompress history from State */
  uncompressionSelect() {
    this.historySub = this._store
      .pipe(select(uncompressionSelector))
      .subscribe((response) => {
        this.recordItems = [];
        response.map((element: any) => {
          this.recordItems.push(
            `${element.initChars} ---> ${element.resultChars}`
          );
        });
        this.recordItems.reverse();
      });
  }

  /** copy text method */
  copyToClipboard(item: string): void {
    navigator.clipboard.writeText(item);
  }

  ngOnDestroy(): void {
    /** unsubscribe from Store */
    this.historySub.unsubscribe();
  }
}

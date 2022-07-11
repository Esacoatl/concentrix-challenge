import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  ActionTypes,
  PutCompressionHistoryAction,
  PutUncompressionHistoryAction,
} from '../actions/compression.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CompressionService } from '../../services/compression.service';
import {
  compressionSelector,
  uncompressionSelector,
} from '../..//redux/selectors/compression.selector';
import { CompressionState } from '../state/compression.state';
import { select, Store } from '@ngrx/store';
import { HistoryModel } from '../../models/history.model';

@Injectable()
export class CompressionEffects {
  constructor(
    private _compressionService: CompressionService,
    private _actions: Actions,
    private _store: Store<CompressionState>
  ) {}

  /** Effect for string compression */
  CompressAction$ = createEffect(() =>
    this._actions.pipe(
      ofType(ActionTypes.COMPRESS_ACTION),
      map((action: any) => action),
      switchMap((value) =>
        this._compressionService.compressMethod(value).pipe(
          map((response) => {
            let historyArray: HistoryModel[] = [];
            this._store
              .pipe(select(compressionSelector))
              .subscribe((response2) => {
                historyArray = response2;
                historyArray = JSON.parse(JSON.stringify(historyArray));
                historyArray.push({
                  initChars: value.payload,
                  resultChars: response,
                });
              });
            return PutCompressionHistoryAction(historyArray);
          })
        )
      )
    )
  );

  /** Effect for uncompress of the string*/
  UncompressAction$ = createEffect(() =>
    this._actions.pipe(
      ofType(ActionTypes.UNCOMPRESS_ACTION),
      map((action: any) => action),
      switchMap((value) =>
        this._compressionService.uncompressMethod(value).pipe(
          map((response) => {
            let historyArray: HistoryModel[] = [];
            this._store
              .pipe(select(uncompressionSelector))
              .subscribe((response2) => {
                historyArray = response2;
                historyArray = JSON.parse(JSON.stringify(historyArray));
                historyArray.push({
                  initChars: value.payload,
                  resultChars: response,
                });
              });
            return PutUncompressionHistoryAction(historyArray);
          })
        )
      )
    )
  );
}

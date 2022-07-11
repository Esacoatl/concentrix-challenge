import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { CompressionService } from 'src/app/shared/services/compression.service';
import {
  CompressAction,
  UncompressAction,
} from '../../redux/actions/compression.actions';
import { CompressionState } from '../../redux/state/compression.state';
import {
  compressionSelector,
  uncompressionSelector,
} from '../../redux/selectors/compression.selector';
import { InputTypes } from '../main-input/InputTypes';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-main-input',
  templateUrl: './main-input.component.html',
  styleUrls: ['./main-input.component.scss'],
})
export class MainInputComponent implements OnInit {
  /** */
  /**Use of Injection */
  @Input() inputType: any;
  public resultChars: string = '';
  public btnIcon: string = '';
  public numbersActive: any = false;
  public mainInputSub: Subscription = new Subscription();

  /** Use of reactive Forms */
  compressForm = new FormGroup({
    characters: new FormControl<string>('', Validators.required),
  });

  constructor(
    private _compressionService: CompressionService,
    private _snackBar: MatSnackBar,
    private _store: Store<CompressionState>
  ) {}

  ngOnInit(): void {
    /** validate compress or uncompress */
    switch (this.inputType) {
      case InputTypes.COMPRESS:
        this.btnIcon = 'archive';
        this.compressionSelect();
        break;
      case InputTypes.UNCOMPRESS:
        this.btnIcon = 'inbox';
        this.numbersActive = true;
        this.uncompressionSelect();
        break;
      default:
        break;
    }
  }

  /** type of method by view */
  btnAction() {
    let action =
      this.inputType === InputTypes.COMPRESS
        ? this.compress()
        : this.uncompress();
    return action;
  }

  /**----------------COMPRESSION------------------ */
  /** method to call the compress redux action */
  compress(): void {
    /** validate characters if worth compress*/
    this._compressionService
      .isCompress(this.compressForm.value.characters!)
      .subscribe((value: any) => {
        if (value) {
          this._store.dispatch(
            CompressAction(this.compressForm.value.characters!)
          );
        } else {
          /** string already compressed call alert*/
          this._snackBar.openFromComponent(SnackbarComponent, {
            duration: 3000,
            data: 'Its already compress 😎',
          });
        }
      });
  }

  /** Method to retrive compress history from State and set last compression*/
  compressionSelect(): void {
    this.mainInputSub = this._store
      .pipe(select(compressionSelector))
      .subscribe((response) => {
        if (response.length > 0) {
          this.resultChars = response[response.length - 1].resultChars;
        }
      });
  }

  /**----------------UNCOMPRESSION---------------- */
  /** method to call the uncompress action */
  uncompress() {
    this._store.dispatch(UncompressAction(this.compressForm.value.characters!));
  }

  /** Method to retrive uncompress history from State*/
  uncompressionSelect(): void {
    this.mainInputSub = this._store
      .pipe(select(uncompressionSelector))
      .subscribe((response) => {
        if (response.length > 0) {
          this.resultChars = response[response.length - 1].resultChars;
        }
      });
  }

  /** copy text method */
  copyToClipboard(): void {
    navigator.clipboard.writeText(this.resultChars);
  }

  ngOnDestroy(): void {
    /** unsubscribe from Store */
    this.mainInputSub.unsubscribe();
  }
}

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';
import { SnackbarComponent } from '../components/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root',
})
export class CompressionService {
  /** */
  constructor(private _snackBar: MatSnackBar) {}

  /**
   *  Code challenge
   *  a.- "Desing method to compress"
   *  b.- "If would not shorten, simply output the original letters"
   *  c.- Bonus #1: "Design the method in such a way that the input string may contain numbers"
   *
   */
  compressMethod(value: any): Observable<any> {
    const chars: string = value.payload;
    let counter = 1;
    return of(
      /** split form map single char */
      chars.split('').reduce((prev: any, current: any, index: any) => {
        let compressValue = prev;
        /** initialize*/
        if (index === 0) {
          counter -= 1;
          compressValue = current;
        }
        /** compare current char whit last */
        if (compressValue.slice(-1) === current && index < chars.length - 1) {
          counter++;
        } else {
          index == chars.length - 1 && counter++;
          /** validate and set number if more than 2 chars equal*/
          if (counter > 2) {
            compressValue = prev + counter;
          } else if (counter === 2) {
            compressValue += chars[index - 1];
          }
          /** save already compressed*/
          index < chars.length - 1 && (compressValue += current);
          /** reset conuter */
          counter = 1;
        }
        return compressValue;
      }, '')
    );
  }

  /**
   *  Code challenge
   *  c.- Bonus#1: "Desing method which the output string can be uncompressed back into the original input string" - failed if numbers :(
   *
   */
  uncompressMethod(value: any): Observable<any> {
    let chars: string = value.payload;
    return of(
      chars.split('').reduce((prev, current, index) => {
        let uncompressValue = prev;
        /** set if number */
        const currentNumber = parseInt(current);
        const prevNumber = parseInt(chars[index - 1]);
        /** initialize */
        if (index === 0) {
          uncompressValue = current;
          return '';
        }
        /** if more than 2 numbers */
        if (
          (!isNaN(prevNumber) && !isNaN(currentNumber)) ||
          (index === 0 && !isNaN(currentNumber))
        ) {
          this._snackBar.openFromComponent(SnackbarComponent, {
            duration: 5000,
            data: 'Numbers are hard, I cant uncompress numbers together 😅 (yet)',
          });
          return chars;
        }
        /** if its a single char or 2 chars*/
        if (isNaN(prevNumber) && isNaN(currentNumber)) {
          uncompressValue += chars[index - 1];
        }
        /** if number set chars said number*/
        if (!isNaN(currentNumber)) {
          for (let i = 0; i < currentNumber; i++) {
            uncompressValue += chars[index - 1];
          }
        }
        return uncompressValue;
      }, '')
    );
  }

  /**
   *  Code challenge
   *  d.- Bonus#2: "Can the caller of the method know if the input string was compressed"
   *
   */
  isCompress(chars: string): Observable<any> {
    let count: number = 0;
    let isValid: any = false;
    chars.split('').reduce((prev, current) => {
      /** if 3 chars equals together then can compress something*/
      current === prev ? count++ : (count = 0);
      if (count >= 2) {
        isValid = true;
      }
      return current;
    }, '');
    return of(isValid);
  }
}

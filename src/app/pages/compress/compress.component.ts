import { Component, OnInit } from '@angular/core';
import { InputTypes } from '../../shared/components/main-input/InputTypes';

@Component({
  selector: 'app-compress',
  templateUrl: './compress.component.html',
})
export class CompressComponent implements OnInit {
  /** Set type of view */
  public typeEnum = InputTypes.COMPRESS;
  constructor() {}

  ngOnInit(): void {}
}

import { Component, OnInit } from '@angular/core';
import { InputTypes } from '../../shared/components/main-input/InputTypes';

@Component({
  selector: 'app-uncompress',
  templateUrl: './uncompress.component.html',
})
export class UncompressComponent implements OnInit {
  /** Set type of view*/
  public typeEnum = InputTypes.UNCOMPRESS;
  constructor() {}

  ngOnInit(): void {}
}

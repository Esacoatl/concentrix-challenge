import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-about-dialog',
  templateUrl: './about-dialog.component.html',
})
export class AboutDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<AboutDialogComponent>) {}

  ngOnInit(): void {}
}

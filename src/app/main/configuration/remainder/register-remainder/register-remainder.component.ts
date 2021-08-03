import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-register-remainder',
  templateUrl: './register-remainder.component.html',
  styleUrls: ['./register-remainder.component.scss']
})
export class RegisterRemainderComponent implements OnInit {

  registerForm: FormGroup
  years: any = [2015, 2016, 2017, 2018, 2019, 2020, 2021]
  
  constructor(
    public dialogRef: MatDialogRef<RegisterRemainderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private dbs: DatabaseService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      app: [null],
      reminder: [null],
      max: [null]
    })
  }

}

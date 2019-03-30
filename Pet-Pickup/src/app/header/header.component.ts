import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {PersonService} from '../shared/person.service';
import {Person} from '../shared/person.model';
import {Form, FormArray, FormControl, FormGroup, Validators} from '@angular/forms';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  name: string;


  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewCaseDialog, {
      height: '90%',
      width: '90%',
      backdropClass: 'test'
    });
  }

}


@Component({
  selector: 'app-new-case-dialog',
  templateUrl: './new-case-dialog.html',
  styles: [
  ]
})
export class NewCaseDialog  {
  personForm = new FormGroup({
    'name': new FormControl('')
  });

  constructor(
    public personService: PersonService,
    public dialogRef: MatDialogRef<NewCaseDialog>) {}

  onSubmit() {
     const newPerson = new Person(this.personForm.get('name').value);
     this.personService.addPerson(newPerson);
  }

}

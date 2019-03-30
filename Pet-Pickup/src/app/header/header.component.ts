import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Person} from '../shared/person.model';
import {Form, FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Pet} from '../shared/pet.model';
import {PetCaseService} from '../shared/pet-case.service';



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
    'name': new FormControl(''),
    'petname': new FormControl('')
  });

  constructor(
    public petCaseService: PetCaseService,
    public dialogRef: MatDialogRef<NewCaseDialog>) {}

  onSubmit() {
     this.petCaseService.addCase(
       new Person(this.personForm.get('name').value),
       new Pet(this.personForm.get('petname').value)
     );
     console.log(this.petCaseService.getCases());
  }

}

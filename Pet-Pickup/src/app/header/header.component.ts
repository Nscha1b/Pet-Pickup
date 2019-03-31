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
  styleUrls: ['./header.component.css']
})
export class NewCaseDialog  {
  caseForm = new FormGroup({
    'firstname': new FormControl(''),
    'pre': new FormControl(''),
    'mid': new FormControl(''),
    'last': new FormControl(''),
    'suf': new FormControl(''),
    'address': new FormControl(''),
    'city': new FormControl(''),
    'state': new FormControl(''),
    'zip': new FormControl(''),
    'email': new FormControl(''),
    'home': new FormControl(''),
    'work': new FormControl(''),
    'mobile': new FormControl(''),
    'petname': new FormControl(''),
    'sex': new FormControl(''),
    'pettype': new FormControl(''),
    'petbreed': new FormControl(''),
    'petcolor': new FormControl(''),
    'petweight': new FormControl(''),
    'petdob': new FormControl(''),
    'petdod': new FormControl(''),
    'pettod': new FormControl(''),
    'petage': new FormControl(''),
  });

  constructor(
    public petCaseService: PetCaseService,
    public dialogRef: MatDialogRef<NewCaseDialog>) {}

  onSubmit() {
     this.petCaseService.addCase(
       new Person(
         1,
          this.caseForm.get('firstname').value,
          this.caseForm.get('pre').value,
          this.caseForm.get('mid').value,
          this.caseForm.get('last').value,
          this.caseForm.get('suf').value,
          this.caseForm.get('address').value,
          this.caseForm.get('city').value,
          this.caseForm.get('state').value,
          this.caseForm.get('zip').value,
          this.caseForm.get('email').value,
          this.caseForm.get('home').value,
          this.caseForm.get('work').value,
          this.caseForm.get('mobile').value,
       ),
       new Pet(
         1,
         this.caseForm.get('petname').value,
         this.caseForm.get('sex').value,
         this.caseForm.get('pettype').value,
         this.caseForm.get('petbreed').value,
         this.caseForm.get('petcolor').value,
         this.caseForm.get('petweight').value,
         this.caseForm.get('petdob').value,
         this.caseForm.get('petdod').value,
         this.caseForm.get('pettod').value,
         this.caseForm.get('petage').value
       )
     );
     console.log(this.petCaseService.getCases());
  }

}




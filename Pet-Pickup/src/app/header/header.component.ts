import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Person} from '../shared/person.model';
import {Form, FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Pet} from '../shared/pet.model';
import {PetCaseService} from '../shared/pet-case.service';
import {PetCremationDetails} from '../shared/pet-cremation.details';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewCaseDialogComponent, {
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
export class NewCaseDialogComponent  {
  caseForm = new FormGroup({
    // owner controls
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
    // pet controls
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
    // Cremation Details Controls
    'crematory': new FormControl(''),
    'status': new FormControl(''),
    'cremationtype': new FormControl(''),
    'vetclinic': new FormControl(''),
    'print': new FormControl(''),
    'fur': new FormControl(''),
    'returnperson': new FormControl(''),
    'returnplace': new FormControl(''),
    'returnaddress': new FormControl(''),
    'returncity': new FormControl(''),
    'returnstate': new FormControl(''),
    'returnphone': new FormControl(''),
    'returnzip': new FormControl(''),
    'notes': new FormControl('')
  });

  constructor(
    public petCaseService: PetCaseService,
    public dialogRef: MatDialogRef<NewCaseDialogComponent>) {}

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
       ),
       new PetCremationDetails(
         this.caseForm.get('crematory').value,
         this.caseForm.get('status').value,
         this.caseForm.get('cremationtype').value,
         this.caseForm.get('vetclinic').value,
         this.caseForm.get('print').value,
         this.caseForm.get('fur').value,
         'Owner',
         1,
         this.caseForm.get('returnperson').value,
         this.caseForm.get('returnplace').value,
         this.caseForm.get('returnphone').value,
         this.caseForm.get('returnaddress').value,
         this.caseForm.get('returncity').value,
         this.caseForm.get('returnstate').value,
         this.caseForm.get('returnzip').value,
         this.caseForm.get('notes').value,
       )
     );
     // console.log(this.petCaseService.getCases());
     console.log(this.petCaseService.getOwner(0));
  }

  writeOwnerInfo(id?: number) {
    if (id) {
      const owner = this.petCaseService.getOwner(0);
      this.caseForm.patchValue({
        returnperson: owner.firstname,
        returnplace: owner.address,
        returnaddress: owner.address,
        returncity: owner.city,
        returnstate: owner.state,
        returnphone: owner.home,
        returnzip: owner.zip
      });
    } else {
      this.caseForm.patchValue({
        returnperson: this.caseForm.get('firstname').value,
        returnplace: this.caseForm.get('address').value,
        returnaddress: this.caseForm.get('address').value,
        returncity: this.caseForm.get('city').value,
        returnstate: this.caseForm.get('state').value,
        returnphone: this.caseForm.get('home').value,
        returnzip: this.caseForm.get('zip').value
      });
    }

  }

}

import {Component,  OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {Person} from '../shared/person.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
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
export class NewCaseDialogComponent implements OnInit {
  caseForm: FormGroup;
  ownerForm = this.fb.group({
    'firstname': new FormControl('', Validators.required),
    'pre': new FormControl(''),
    'mid': new FormControl(''),
    'last': new FormControl('', Validators.required),
    'suf': new FormControl(''),
    'address': new FormControl('', Validators.required),
    'city': new FormControl('', Validators.required),
    'state': new FormControl('', Validators.required),
    'zip': new FormControl('', Validators.required),
    'email': new FormControl(''),
    'home': new FormControl('', Validators.required),
    'work': new FormControl(''),
    'mobile': new FormControl('')
  });
  petForm = this.fb.group({
    'petname': new FormControl('', Validators.required),
    'sex': new FormControl(''),
    'pettype': new FormControl('', Validators.required),
    'petbreed': new FormControl(''),
    'petcolor': new FormControl(''),
    'petweight': new FormControl(''),
    'petdob': new FormControl(''),
    'petdod': new FormControl(''),
    'pettod': new FormControl(''),
    'petage': new FormControl('')
  });
  detailsForm = new FormGroup({
    'crematory': new FormControl('', Validators.required),
    'status': new FormControl('', Validators.required),
    'cremationtype': new FormControl('', Validators.required),
    'vetclinic': new FormControl('', Validators.required),
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

  constructor(public petCaseService: PetCaseService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.caseForm = this.fb.group({
      owner: this.ownerForm,
      pet: this.petForm,
      details: this.detailsForm
    });
  }

  onSubmit() {
    this.petCaseService.addCase(
      new Person(
        1,
        this.caseForm.get('owner').get('firstname').value,
        // this.caseForm.get('firstname').value,
        this.caseForm.get('owner').get('pre').value,
        this.caseForm.get('owner').get('mid').value,
        this.caseForm.get('owner').get('last').value,
        this.caseForm.get('owner').get('suf').value,
        this.caseForm.get('owner').get('address').value,
        this.caseForm.get('owner').get('city').value,
        this.caseForm.get('owner').get('state').value,
        this.caseForm.get('owner').get('zip').value,
        this.caseForm.get('owner').get('email').value,
        this.caseForm.get('owner').get('home').value,
        this.caseForm.get('owner').get('work').value,
        this.caseForm.get('owner').get('mobile').value,
      ),
      new Pet(
        1,
        this.caseForm.get('pet').get('petname').value,
        this.caseForm.get('pet').get('sex').value,
        this.caseForm.get('pet').get('pettype').value,
        this.caseForm.get('pet').get('petbreed').value,
        this.caseForm.get('pet').get('petcolor').value,
        this.caseForm.get('pet').get('petweight').value,
        this.caseForm.get('pet').get('petdob').value,
        this.caseForm.get('pet').get('petdod').value,
        this.caseForm.get('pet').get('pettod').value,
        this.caseForm.get('pet').get('petage').value
      ),
      new PetCremationDetails(
        this.caseForm.get('details').get('crematory').value,
        this.caseForm.get('details').get('status').value,
        this.caseForm.get('details').get('cremationtype').value,
        this.caseForm.get('details').get('vetclinic').value,
        this.caseForm.get('details').get('print').value,
        this.caseForm.get('details').get('fur').value,
        'Owner',
        1,
        this.caseForm.get('details').get('returnperson').value,
        this.caseForm.get('details').get('returnplace').value,
        this.caseForm.get('details').get('returnphone').value,
        this.caseForm.get('details').get('returnaddress').value,
        this.caseForm.get('details').get('returncity').value,
        this.caseForm.get('details').get('returnstate').value,
        this.caseForm.get('details').get('returnzip').value,
        this.caseForm.get('details').get('notes').value,
      )
    );
    // console.log(this.petCaseService.getCases());
    console.log(this.petCaseService.getOwner(0));
  }
  writeOwnerInfo(id?: number) {
    if (id) {
      const owner = this.petCaseService.getOwner(id);
      console.log(owner);
      this.detailsForm.patchValue({
        returnperson: owner.firstname,
        returnplace: owner.address,
        returnaddress: owner.address,
        returncity: owner.city,
        returnstate: owner.state,
        returnphone: owner.mobile,
        returnzip: owner.zip
      });
    } else {
      this.detailsForm.patchValue({
        returnperson: this.caseForm.get('owner').get('firstname').value,
        returnplace: this.caseForm.get('owner').get('address').value,
        returnaddress: this.caseForm.get('owner').get('address').value,
        returncity: this.caseForm.get('owner').get('city').value,
        returnstate: this.caseForm.get('owner').get('state').value,
        returnphone: this.caseForm.get('owner').get('home').value,
        returnzip: this.caseForm.get('owner').get('zip').value
      });
    }

  }
  writeVetInfo() {
    if (this.caseForm.get('details').get('vetclinic').value === 'Number One Vet Clinic') {
      this.detailsForm.patchValue({
        returnperson: 'Number One Vet Clinic',
        returnplace: 'Number One Vet Clinic',
        returnaddress: '101 Vet Drive',
        returncity: 'Pittsburgh',
        returnstate: 'PA',
        returnphone: '412-444-8765',
        returnzip: '15122'
      });
    } else if (this.caseForm.get('details').get('vetclinic').value === 'Evergreen Pets') {
      this.detailsForm.patchValue({
        returnperson: 'Evergreen Pets',
        returnplace: 'Evergreen Pets',
        returnaddress: '433 Green Way',
        returncity: 'Pittsburgh',
        returnstate: 'PA',
        returnphone: '412-999-6537',
        returnzip: '15327'
      });
    }
  }
  clearReturnInfo() {
    this.caseForm.get('details').patchValue({
      returnperson: '',
      returnplace: '',
      returnaddress: '',
      returncity: '',
      returnstate: '',
      returnphone: '',
      returnzip: ''
    });
  }





}

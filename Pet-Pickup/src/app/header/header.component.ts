import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Person } from '../shared/person.model';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Pet } from '../shared/pet.model';
import { PetCaseService } from '../shared/pet-case.service';
import { PetCremationDetails } from '../shared/pet-cremation.details';
import { AuthService } from '../login/auth.service';
import { Subject, Subscription } from 'rxjs';
import { PetCase } from '../shared/pet-case.model';
import { isUndefined } from 'util';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  loadedCase;

  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private petCaseService: PetCaseService
  ) {}
  private authListenerSubs: Subscription;
  userIsAuthenticated = false;

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
    this.petCaseService.caseChanged.subscribe(() => {
      this.loadedCase = this.petCaseService.loadCase();
      this.openDialog();
    });
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }


  openDialog(): void {
    this.dialog.open(NewCaseDialogComponent, {
      height: '90%',
      width: '90%',
      disableClose: true
    });
  }

  newCase() {
    this.petCaseService.loadedCase = undefined;
    this.openDialog();
  }
}

// TODO... Really need to split these into seperate files....

@Component({
  selector: 'app-new-case-dialog',
  templateUrl: './new-case-dialog.html',
  styleUrls: ['./header.component.css']
})
export class NewCaseDialogComponent implements OnInit {
  caseForm: FormGroup;
  ownerForm = this.fb.group({
    firstname: new FormControl('', Validators.required),
    pre: new FormControl('-1'),
    mid: new FormControl(''),
    last: new FormControl('', Validators.required),
    suf: new FormControl('-1'),
    address: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    state: new FormControl('-1', Validators.required),
    zip: new FormControl('', Validators.required),
    email: new FormControl(''),
    home: new FormControl('', Validators.required),
    work: new FormControl(''),
    mobile: new FormControl('')
  });
  petForm = this.fb.group({
    petname: new FormControl('', Validators.required),
    sex: new FormControl(''),
    pettype: new FormControl('', Validators.required),
    petbreed: new FormControl(''),
    petcolor: new FormControl(''),
    petweight: new FormControl(''),
    petdob: new FormControl(''),
    petdod: new FormControl(''),
    pettod: new FormControl(''),
    petage: new FormControl('')
  });
  detailsForm = new FormGroup({
    crematory: new FormControl('-1', Validators.required),
    status: new FormControl('-1', Validators.required),
    cremationtype: new FormControl('-1', Validators.required),
    vetclinic: new FormControl('-1', Validators.required),
    print: new FormControl(''),
    fur: new FormControl(''),
    returnperson: new FormControl(''),
    returnplace: new FormControl(''),
    returnaddress: new FormControl(''),
    returncity: new FormControl(''),
    returnstate: new FormControl('-1'),
    returnphone: new FormControl(''),
    returnzip: new FormControl(''),
    notes: new FormControl('')
  });
  states = [
    'AL',
    'AK',
    'AZ',
    'AR',
    'CA',
    'CO',
    'CT',
    'DE',
    'FL',
    'GA',
    'HI',
    'ID',
    'IL',
    'IN',
    'IA',
    'KS',
    'KY',
    'LA',
    'ME',
    'MD',
    'MA',
    'MI',
    'MN',
    'MS',
    'MO',
    'MT',
    'NE',
    'NV',
    'NH',
    'NJ',
    'NM',
    'NY',
    'NC',
    'ND',
    'OH',
    'OK',
    'OR',
    'PA',
    'RI',
    'SC',
    'SD',
    'TN',
    'TX',
    'UT',
    'VT',
    'VA',
    'WA',
    'WV',
    'WI',
    'WY'
  ];
  suffix = ['Jr.', 'Sr.', 'II', 'III', 'IV'];
  prefix = ['Dr.', 'Miss', 'Mr.', 'Mrs.', 'Ms.'];
  showOwner = true;
  showPet = false;
  showDetails = false;
  loadedCase = this.petCaseService.loadedCase;

  constructor(
    public petCaseService: PetCaseService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<NewCaseDialogComponent>
  ) {}

  ngOnInit(): void {
    this.caseForm = this.fb.group({
      owner: this.ownerForm,
      pet: this.petForm,
      details: this.detailsForm
    });
    this.caseForm.reset();
    if (!isUndefined(this.loadedCase)) {
      this.fillFormInfo(this.loadedCase);
    }
  }

  onSubmit() {
    if (isUndefined(this.loadedCase)) {
      this.petCaseService.addPetCase(
        this.getOwnerFormValues(), this.getPetFormValues(), this.getDetailsFormValues()
      );
    } else {
      // we are updating a case...
      this.petCaseService.UpdatePetCase(
        this.getOwnerFormValues(), this.getPetFormValues(), this.getDetailsFormValues()
      );
    }
  }

  fillFormInfo(loadedCase: PetCase) {
    this.ownerForm.patchValue({
      firstname: loadedCase.person.firstname,
      pre: loadedCase.person.pre,
      mid: loadedCase.person.mid,
      last: loadedCase.person.last,
      suf: loadedCase.person.suf,
      address: loadedCase.person.address,
      city: loadedCase.person.city,
      state: loadedCase.person.state,
      zip: loadedCase.person.zip,
      email: loadedCase.person.email,
      home: loadedCase.person.home,
      work: loadedCase.person.work,
      mobile: loadedCase.person.mobile
    });
    this.petForm.patchValue({
      petname: loadedCase.pet.petname,
      sex: loadedCase.pet.sex,
      pettype: loadedCase.pet.pettype,
      petbreed: loadedCase.pet.petbreed,
      petcolor: loadedCase.pet.petcolor,
      petweight: loadedCase.pet.petweight,
      petdob: loadedCase.pet.petdob,
      petdod: loadedCase.pet.petdod,
      pettod: loadedCase.pet.pettod,
      petage: loadedCase.pet.petage
    });
    this.detailsForm.patchValue({
      crematory: loadedCase.cremationDetails.crematory,
      status: loadedCase.cremationDetails.status,
      cremationtype: loadedCase.cremationDetails.type,
      vetclinic: loadedCase.cremationDetails.clinic,
      print: loadedCase.cremationDetails.print,
      fur: loadedCase.cremationDetails.fur,
      returnperson: loadedCase.cremationDetails.returnPerson,
      returnplace: loadedCase.cremationDetails.returnPlace,
      returnaddress: loadedCase.cremationDetails.returnAddress,
      returncity: loadedCase.cremationDetails.returnCity,
      returnstate: loadedCase.cremationDetails.returnState,
      returnphone: loadedCase.cremationDetails.returnPhone,
      returnzip: loadedCase.cremationDetails.returnZip,
      notes: loadedCase.cremationDetails.notes
    });
  }

  writeOwnerInfo(id?: number) {
    if (id) {
      const owner = this.petCaseService.getOwner(id);
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
      if (this.caseForm.get('owner').get('state').value !== -1) {
        this.detailsForm.patchValue({
          returnstate: this.caseForm.get('owner').get('state').value
        });
      }
      this.detailsForm.patchValue({
        returnperson: this.caseForm.get('owner').get('firstname').value,
        returnplace: this.caseForm.get('owner').get('address').value,
        returnaddress: this.caseForm.get('owner').get('address').value,
        returncity: this.caseForm.get('owner').get('city').value,
        returnphone: this.caseForm.get('owner').get('home').value,
        returnzip: this.caseForm.get('owner').get('zip').value
      });
    }
  }
  writeVetInfo() {
    if (
      this.caseForm.get('details').get('vetclinic').value ===
      'Number One Vet Clinic'
    ) {
      this.detailsForm.patchValue({
        returnperson: 'Number One Vet Clinic',
        returnplace: 'Number One Vet Clinic',
        returnaddress: '101 Vet Drive',
        returncity: 'Pittsburgh',
        returnstate: 'PA',
        returnphone: '412-444-8765',
        returnzip: '15122'
      });
    } else if (
      this.caseForm.get('details').get('vetclinic').value === 'Evergreen Pets'
    ) {
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
  toggleShowOwner() {
    if (this.ownerForm.valid) {
      this.showOwner = true;
      this.showPet = false;
      this.showDetails = false;
    }
  }
  toggleShowPet(event) {
    if (this.ownerForm.valid && event.srcElement.name === 'ownerTab') {
      this.showOwner = false;
      this.showPet = true;
      this.showDetails = false;
    } else if (this.ownerForm.valid) {
      this.showOwner = false;
      this.showPet = true;
      this.showDetails = false;
    }
  }
  toggleShowDetails(event) {
    if (this.petForm.valid && event.srcElement.name === 'petTab') {
      this.showOwner = false;
      this.showPet = false;
      this.showDetails = true;
    } else if (this.petForm.valid) {
      this.showOwner = false;
      this.showPet = false;
      this.showDetails = true;
    }
  }
  closeDialog() {
    this.dialogRef.close();
  }


  getOwnerFormValues() {
    let tempOwnerID = 1;
    if (!isUndefined(this.loadedCase)) {
      // we are updating a case
      tempOwnerID = this.loadedCase.person.id;
    }
return new Person(
  tempOwnerID,
  this.caseForm.get('owner').get('firstname').value,
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
  this.caseForm.get('owner').get('mobile').value
);
  }

  getPetFormValues() {
    let tempPetID = 1;
    if (!isUndefined(this.loadedCase)) {
      // we are updating a case
      tempPetID = this.loadedCase.pet.id;
    }
return new Pet(
  tempPetID,
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
);
  }

  getDetailsFormValues() {

return new PetCremationDetails(
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
  this.caseForm.get('details').get('notes').value
);
  }



}

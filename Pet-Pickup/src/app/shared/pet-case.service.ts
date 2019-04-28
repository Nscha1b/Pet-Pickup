import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { PetCase } from './pet-case.model';
import { Person } from './person.model';
import { Pet } from './pet.model';
import { PersonService } from './person.service';
import { PetService } from './pet.service';
import { PetCremationDetails } from './pet-cremation.details';
import { HttpClient } from '@angular/common/http';
import { CaseQuery } from './case-query.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PetCaseService {
  casesChanged = new Subject<PetCase[]>();
  private petCases: PetCase[] = [];
  posts: any;
  postsUpdate: any;
  isLoading = false;
  caseCount = null;
  private loadingListener = new Subject<boolean>();
  loadedCase: PetCase;
  caseChanged = new Subject<PetCase>();

  constructor(
    private personService: PersonService,
    private petService: PetService,
    private http: HttpClient,
    private router: Router
  ) {}

  getCases(filter, howMany, offset, orderBy) {
    const newCases: PetCase[] = [];
    this.isLoading = true;
    this.loadingListener.next(true);
    this.http
      .get('http://localhost:3000/api/get/cases', {
        params: {
          filter: filter, howMany: howMany, offset: offset, orderBy: orderBy
        }
      })
      .subscribe((data: any) => {
        data.rows.forEach(i => {
          const newCase = new PetCase(
            new Person(
              i.personid,
              i.personfirstname,
              i.pre,
              i.middlename,
              i.lastname,
              i.suf,
              i.personaddress,
              i.personcity,
              i.personstate,
              +i.personzip,
              i.email,
              i.personhome,
              i.personwork,
              i.personmobile
            ),
            new Pet(
              i.petid,
              i.petname,
              i.petsex,
              i.pettype,
              i.petbreed,
              i.petcolor,
              i.petweight,
              i.petdob,
              i.petdod,
              i.pettod,
              i.petage
            ),
            new PetCremationDetails(
              i.crematory,
              i.status,
              i.pettype,
              i.clinic,
              i.print,
              i.fur,
              i.returnto,
              i.returntoid,
              i.returnperson,
              i.returnplace,
              i.returnphone,
              i.returnaddress,
              i.returncity,
              i.returnstate,
              i.returnzip,
              i.note
            )
          );
          newCases.push(newCase);
          this.petCases = newCases;
          this.casesChanged.next(this.petCases.slice());
          this.isLoading = false;
          this.loadingListener.next(false);
        });
        this.caseCount = +data.caseCount;
      });
  }

  getCase(filter) {
    this.http
      .get('http://localhost:3000/api/get/loadCase', {
        params: {
          filter: filter
        }
      })
      .subscribe((data: any) => {
        data.rows.forEach(i => {
          const openCase = new PetCase(
            new Person(
              i.personid,
              i.personfirstname,
              i.pre,
              i.middlename,
              i.lastname,
              i.suf,
              i.personaddress,
              i.personcity,
              i.personstate,
              +i.personzip,
              i.email,
              i.personhome,
              i.personwork,
              i.personmobile
            ),
            new Pet(
              i.petid,
              i.petname,
              i.petsex,
              i.pettype,
              i.petbreed,
              i.petcolor,
              i.petweight,
              i.petdob,
              i.petdod,
              i.pettod,
              i.petage
            ),
            new PetCremationDetails(
              i.crematory,
              i.status,
              i.detailstype,
              i.clinic,
              i.print,
              i.fur,
              i.returnto,
              i.returntoid,
              i.returnperson,
              i.returnplace,
              i.returnphone,
              i.returnaddress,
              i.returncity,
              i.returnstate,
              i.returnzip,
              i.note
            )
          );
          this.loadedCase = openCase;
          this.caseChanged.next(this.loadedCase);
        });
      });
  }

  addPetCase(p: Person, pe: Pet, d: PetCremationDetails) {
    const newPetCase = {
      firstname: p.firstname,
      pre: p.pre,
      middlename: p.mid,
      lastname: p.last,
      suf: p.suf,
      address: p.address,
      city: p.city,
      state: p.state,
      zip: p.zip,
      email: p.email,
      home: p.home,
      work: p.work,
      mobile: p.mobile,
      name: pe.petname,
      sex: pe.sex,
      type: pe.pettype,
      breed: pe.petbreed,
      color: pe.petcolor,
      weight: pe.petweight,
      dateofbirth: pe.petdob,
      dateofdeath: pe.petdod,
      timeofdeath: pe.pettod,
      age: pe.pettod,
      crematory: d.crematory,
      status: d.status,
      detailstype: d.type,
      clinic: d.clinic,
      print: d.print,
      fur: d.fur,
      returnto: d.returnTo,
      returntoid: d.returnToID,
      returnperson: d.returnPerson,
      returnplace: d.returnPlace,
      returnphone: d.returnPhone,
      returnaddress: d.returnAddress,
      returncity: d.returnCity,
      returnstate: d.returnState,
      returnzip: d.returnState,
      note: d.notes,
      ownerid: '',
      petid: ''
    };

    this.http
      .post('http://localhost:3000/api/post/petcase', newPetCase)
      .subscribe(res => {
        console.log(res);
        this.getCases('', 5, 0, 'ownerid');
      });
  }

  UpdatePetCase(p: Person, pe: Pet, d: PetCremationDetails) {
    const updatedCase = {
      firstname: p.firstname,
      pre: p.pre,
      middlename: p.mid,
      lastname: p.last,
      suf: p.suf,
      address: p.address,
      city: p.city,
      state: p.state,
      zip: p.zip,
      email: p.email,
      home: p.home,
      work: p.work,
      mobile: p.mobile,
      name: pe.petname,
      sex: pe.sex,
      type: pe.pettype,
      breed: pe.petbreed,
      color: pe.petcolor,
      weight: pe.petweight,
      dateofbirth: pe.petdob,
      dateofdeath: pe.petdod,
      timeofdeath: pe.pettod,
      age: pe.petage,
      crematory: d.crematory,
      status: d.status,
      detailstype: d.type,
      clinic: d.clinic,
      print: d.print,
      fur: d.fur,
      returnto: d.returnTo,
      returntoid: d.returnToID,
      returnperson: d.returnPerson,
      returnplace: d.returnPlace,
      returnphone: d.returnPhone,
      returnaddress: d.returnAddress,
      returncity: d.returnCity,
      returnstate: d.returnState,
      returnzip: d.returnState,
      note: d.notes,
      ownerid: p.id,
      petid: pe.id
    };

    this.http
      .post('http://localhost:3000/api/post/updatePetCase', updatedCase)
      .subscribe(res => {
        console.log(res);
        this.getCases('', 5, 0, 'ownerid');
      });
  }

  addDetails(d: PetCremationDetails) {
    const newDetails = {
      crematory: d.crematory,
      status: d.status,
      detailstype: d.type,
      clinic: d.clinic,
      print: d.print,
      fur: d.fur,
      returnto: d.returnTo,
      returntoid: d.returnToID,
      returnperson: d.returnPerson,
      returnplace: d.returnPlace,
      returnphone: d.returnPhone,
      returnaddress: d.returnAddress,
      returncity: d.returnCity,
      returnstate: d.returnState,
      returnzip: d.returnState,
      note: d.notes,
      ownerid: '',
      petid: ''
    };

    this.http
      .post('http://localhost:3000/api/post/details', newDetails)
      .subscribe(res => {
        console.log(res);
      });
  }

  getCaseCount() {
    return this.caseCount;
  }

  getLoadingListener() {
    return this.loadingListener.asObservable();
  }


  getOwner(id) {
    return this.personService.getPerson(id);
  }

  loadCases() {
    return this.petCases.slice();
  }

  loadCase() {
    return this.loadedCase;
  }

  checkIsLoading() {
    return this.isLoading;
  }
}

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PetCase } from './pet-case.model';
import { Person } from './person.model';
import { Pet } from './pet.model';
import {PersonService} from './person.service';
import {PetService} from './pet.service';
import {PetCremationDetails} from './pet-cremation.details';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { CaseQuery } from './case-query.model';

@Injectable({
  providedIn: 'root'
})
export class PetCaseService {
  casesChanged = new Subject<PetCase[]>();

  private petCases: PetCase[] = [];
  posts: any;
  postsUpdate: any;

  getOwner(id) {
    return this.personService.getPerson(id);
  }

  loadCases() {
    return this.petCases.slice();
  }

   loadEmptyTable() {
    return this.petCases.slice();
  }

  addCase(person: Person, pet: Pet, details: PetCremationDetails) {
    this.petCases.push(
      new PetCase(
        new Person(person.id, person.firstname, person.pre, person.mid,
          person.last, person.suf, person.address, person.city, person.state,
          person.zip, person.email, person.home, person.work, person.mobile
        ),
        new Pet(pet.id, pet.petname, pet.sex, pet.pettype, pet.petbreed, pet.petcolor, pet.petweight,
          pet.petdob, pet.petdod, pet.pettod, pet.petage
        ),
        new PetCremationDetails(details.crematory, details.status, details.type, details.clinic,
          details.print, details.fur, details.returnTo, details.returnToID, details.returnPlace,
          details.returnPhone, details.returnAddress, details.returnCity, details.returnState,
          details.returnZip, details.returnPerson, details.notes)
      )
    );
    this.casesChanged.next(this.petCases.slice());
    //this.personService.addPerson(person);
    //this.petService.addPet(pet);
    //this.addDetails(details);
    this.addPetCase(person, pet, details);
  }

  constructor(
    private personService: PersonService,
    private petService: PetService,
    private http: HttpClient
    ) { }

    getCases() {
      const newCases: PetCase[] = [];
      this.http
      .get('http://localhost:3000/api/get/cases')
      .subscribe((data: CaseQuery[]) => {
        data.forEach(i => {
          const newCase =  new PetCase(
            new Person(i.personid, i.personfirstname, i.pre, i.middlename, i.lastname,
              i.suf, i.personaddress, i.personcity, i.personstate,
              +i.personzip, i.email, i.personhome, i.personwork, i.personmobile),
            new Pet(i.petid, i.petname, i.petsex, i.pettype, i.petbreed,
              i.petcolor, i.petweight, i.petdob,
              i.petdod, i.pettod, i.petage),
            new PetCremationDetails(i.crematory, i.status, i.pettype, i.clinic,
              i.print, i.fur, i.returnto, i.returntoid,
              i.returnperson, i.returnplace, i.returnphone,
              i.returnaddress, i.returncity, i.returnstate,
              i.returnzip, i.note)
            );
        newCases.push(newCase);
        this.petCases = newCases;
        this.casesChanged.next(this.petCases.slice());
        });
      });
    }

    addDetails(d: PetCremationDetails) {
      const newDetails = {crematory: d.crematory, status: d.status, type: d.type, clinic: d.clinic,
        print: d.print, fur: d.fur, returnto: d.returnTo, returntoid: d.returnToID, returnperson: d.returnPerson,
        returnplace: d.returnPlace, returnphone: d.returnPhone, returnaddress: d.returnAddress,
        returncity: d.returnCity, returnstate: d.returnState, returnzip: d.returnState,
        note: d.notes, ownerid: '', petid: ''};

      this.http.post('http://localhost:3000/api/post/details', newDetails)
        .subscribe((res) => {
          console.log(res);
        });
    }

    addPetCase(p: Person, pe: Pet, d: PetCremationDetails) {
      const newPetCase = {firstname: p.firstname, pre: p.pre, middlename: p.mid,
        lastname: p.last, suf: p.suf, address: p.address, city: p.city, state: p.state,
        zip: p.zip, email: p.email, home: p.home, work: p.work, mobile: p.mobile,
        name: pe.petname, sex: pe.sex, type: pe.pettype,
        breed: pe.petbreed, color: pe.petcolor, weight: pe.petweight,
        dateofbirth: pe.petdob, dateofdeath: pe.petdod, timeofdeath: pe.pettod, age: pe.pettod,
        crematory: d.crematory, status: d.status, detailstype: d.type, clinic: d.clinic,
        print: d.print, fur: d.fur, returnto: d.returnTo, returntoid: d.returnToID, returnperson: d.returnPerson,
        returnplace: d.returnPlace, returnphone: d.returnPhone, returnaddress: d.returnAddress,
        returncity: d.returnCity, returnstate: d.returnState, returnzip: d.returnState,
        note: d.notes, ownerid: '', petid: ''};

      this.http.post('http://localhost:3000/api/post/petcase', newPetCase)
        .subscribe((res) => {
          console.log(res);
        });
    }


}

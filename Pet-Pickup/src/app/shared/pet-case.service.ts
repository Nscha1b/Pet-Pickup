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

  private petCases: PetCase[] = [
    new PetCase(
      new Person(1, 'Nelson', 'Mr', 'Paul', 'Jensen',
        'Sr', '435 Elm Drive', 'Milford', 'PA', 15342,
        'NelsonJenson@gmail.com', '411-654-3323', '411-656-0098', '345-554-7685'),
      new Pet(1, 'fluffers', 'Female', 'Dog', 'Pitbull', 'Black',
        '44', '1/1/1988', '1/22/98', '2:00PM', '10'
      ),
      new PetCremationDetails('Small Crematory', 'Pickup', 'Direct Cre', 'We heart pets',
        true, true, 'Nelson', 1, 'Nelson', 'Home',
        '111-111-1111', '321 fishy st', 'Wexford', 'PA', '15122',
        'I would like fluffy to be returned in the morning - Nelson')
    ),
    new PetCase(
      new Person(2, 'Ben', 'Mr', 'Paul', 'Jensen',
        'Sr', '435 Elm Drive', 'Milford', 'PA', 15342,
        'NelsonJenson@gmail.com', '411-654-3323', '411-656-0098', '345-554-7685'),
      new Pet(1, 'Lilly', 'Female', 'Dog', 'Pitbull', 'Black',
        '12', '1/1/1988', '1/22/98', '2:00PM', '10'
      ),
      new PetCremationDetails('Red Brick Cremations', 'Pickup', 'Immediate', 'Number one',
        true, true, 'Nelson', 1, 'Nelson', 'Home',
        '111-111-1111', '321 fishy st', 'Wexford', 'PA', '15122',
        'I would like fluffy to be returned in the morning - Nelson')
    ),
    new PetCase(
      new Person(3, 'Wilson', 'Mr', 'Paul', 'Jensen',
        'Sr', '435 Elm Drive', 'Milford', 'PA', 15342,
        'NelsonJenson@gmail.com', '411-654-3323', '411-656-0098', '345-554-7685'),
      new Pet(1, 'Tyson', 'Male', 'Dog', 'Pitbull', 'Black',
        '50', '1/1/1988', '1/22/98', '2:00PM', '10'
      ),
      new PetCremationDetails('Blue Crems', 'Waiting', 'Package', 'Evergreen Pets',
        true, true, 'Nelson', 1, 'Nelson', 'Home',
        '111-111-1111', '321 fishy st', 'Wexford', 'PA', '15122',
        'I would like fluffy to be returned in the morning - Nelson')
    ),
  ];
  posts: any;
  postsUpdate: any;

  getOwner(id) {
    return this.personService.getPerson(id);
  }

  getCases() {
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
    this.personService.addPerson(person);
    this.petService.addPet(pet);
  }

  constructor(
    private personService: PersonService,
    private petService: PetService,
    private http: HttpClient) { }

    getPetCases() {
      const newCases: PetCase[] = [];
      this.http
      .get('http://localhost:3000/')
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
        return this.casesChanged.next(this.petCases.slice());
        });
        console.log(newCases);
      });
    }


}

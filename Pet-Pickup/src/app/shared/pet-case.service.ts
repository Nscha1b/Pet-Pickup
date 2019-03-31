import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PetCase } from './pet-case.model';
import { Person } from './person.model';
import { Pet } from './pet.model';
import {PersonService} from './person.service';
import {PetService} from './pet.service';
import {PetCremationDetails} from './pet-cremation.details';

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
        '50', '1/1/1988', '1/22/98', '2:00PM', '10'
      ),
      new PetCremationDetails('Blue Crems', 'Pickup', 'Direct Cre', 'Number One',
        true, true, 'Nelson', 1, 'Nelson', 'Home',
        '111-111-1111', '321 fishy st', 'Wexford', 'PA', '15122',
        'I would like fluffy to be returned in the morning - Nelson')
    ),
  ];

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
    private petService: PetService) { }
}

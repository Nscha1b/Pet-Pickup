import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PetCase } from './pet-case.model';
import { Person } from './person.model';
import { Pet } from './pet.model';
import {PersonService} from './person.service';
import {PetService} from './pet.service';

@Injectable({
  providedIn: 'root'
})
export class PetCaseService {
  casesChanged = new Subject<PetCase[]>();

  private petCases: PetCase[] = [
    new PetCase(
      new Person('Ben'),
      new Pet('fluffers')
    ),
    new PetCase(
      new Person('Ralf'),
      new Pet('Blue')
    ),
    new PetCase(
      new Person('Jen'),
      new Pet('Princess')
    ),
    new PetCase(
      new Person('Lisa'),
      new Pet('Elmo')
    ),
    new PetCase(
      new Person('Scotty'),
      new Pet('Jaws')
    )
  ];

  getCases() {
    return this.petCases.slice();
  }

  addCase(person: Person, pet: Pet) {
    this.petCases.push(
      new PetCase(
        new Person(person.name),
        new Pet(pet.name)
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

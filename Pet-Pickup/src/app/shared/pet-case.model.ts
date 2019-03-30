import {Person} from './person.model';
import {Pet} from './pet.model';

export class PetCase {
  public person: Person;
  public pet: Pet;

  constructor(person: Person, pet: Pet) {
    this.person = person;
    this.pet = pet;
  }
}


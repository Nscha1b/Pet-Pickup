import {Person} from './person.model';
import {Pet} from './pet.model';
import {PetCremationDetails} from './pet-cremation.details';

export class PetCase {
  public person: Person;
  public pet: Pet;
  public cremationDetails: PetCremationDetails;

  constructor(person: Person, pet: Pet, cremationDetails: PetCremationDetails) {
    this.person = person;
    this.pet = pet;
    this.cremationDetails = cremationDetails;
  }
}


import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {Pet} from './pet.model';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  petChanged = new Subject<Pet[]>();

  private pets: Pet[] = [

  ];

  getPets() {
    return this.pets.slice();
  }

  addPet(pet: Pet) {
    this.pets.push(new Pet(pet.id,
      pet.petname, pet.sex, pet.pettype, pet.petbreed, pet.petcolor,
      pet.petweight, pet.petdob, pet.petdod, pet.pettod, pet.petage
    ));
    this.petChanged.next(this.pets.slice());
    console.log('Pet Added');
  }

  constructor() { }
}

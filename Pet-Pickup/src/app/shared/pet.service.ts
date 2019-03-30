import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {Pet} from './pet.model';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  petChanged = new Subject<Pet[]>();

  private pets: Pet[] = [
    new Pet('fluffy'),
    new Pet('Lenny')
  ];

  getPets() {
    return this.pets.slice();
  }

  addPet(pet: Pet) {
    this.pets.push(new Pet(pet.name));
    this.petChanged.next(this.pets.slice());
    console.log('Pet Added');
    console.log(this.getPets());
  }

  constructor() { }
}

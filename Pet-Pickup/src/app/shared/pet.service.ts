import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {Pet} from './pet.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  petChanged = new Subject<Pet[]>();

  private pets: Pet[] = [];

  constructor(private http: HttpClient) { }

  loadPets() {
    return this.pets.slice();
  }

  /*
  addPet(pet: Pet) {
    this.pets.push(new Pet(pet.id,
      pet.petname, pet.sex, pet.pettype, pet.petbreed, pet.petcolor,
      pet.petweight, pet.petdob, pet.petdod, pet.pettod, pet.petage
    ));
    this.petChanged.next(this.pets.slice());
    console.log('Pet Added');
  }
  */

  addPet(p: Pet) {
    const newPet = {name: p.petname, sex: p.sex, type: p.pettype,
      breed: p.petbreed, color: p.petcolor, weight: p.petweight,
      dateofbirth: p.petdob, dateofdeath: p.petdod, timeofdeath: p.pettod, age: p.pettod};

    this.http.post('http://localhost:3000/api/post/pet', newPet)
      .subscribe((res) => {
        console.log(res);
      });
  }

  getPets(filter, howMany, offset, orderBy) {
    this.pets = [];
    this.http.get('http://localhost:3000/api/get/pets', {
      params: {
        filter: filter,
        howMany: howMany,
        offset: offset,
        orderBy: orderBy
      }
    }).subscribe((data: any) => {
      console.log(data);
      data.rows.forEach(i => {
        const newPet =
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
        );
        this.pets.push(newPet);
      });
      this.petChanged.next();
    });
  }


}

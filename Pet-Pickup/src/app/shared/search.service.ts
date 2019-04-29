import { Injectable } from '@angular/core';
import { PersonService } from './person.service';
import { PetService } from './pet.service';
import { PetCaseService } from './pet-case.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  searchResult = [];
  lastKeypress = 0;
  constructor(private person: PersonService, private pets: PetService, private pcService: PetCaseService) {}

  // they are typing... Search the database
  search($event, searchBy) {
    if ($event.timeStamp - this.lastKeypress > 200) {
      if ($event.target.value === '') {
        this.pcService.clearSearchResults(true);
      } else {
        this.pcService.searchCases($event.target.value, 5, 0, 0, searchBy);
      }
    }
    this.lastKeypress = $event.timeStamp;
  }

  // they clicked on a search result, figure out who it was... person/pet and id
  getSelected(ID: number, type: string) {
    console.log('we got the following ' + ID + ' ' + type);
     this.pcService.getCase(ID);
  }
}

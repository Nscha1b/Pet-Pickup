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
  search($event, searchBy, button, searchText) {
    if ($event.timeStamp - this.lastKeypress > 200) {
      if (searchText === '') {
        this.pcService.clearSearchResults(true);
      } else if (window.location.href.includes('search') || button === true) {
        // if we're on the search page find more cases
        this.pcService.searchCases(searchText, 500, 0, 0, searchBy);
      } else {
        this.pcService.searchCases(searchText, 4, 0, 0, searchBy);
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

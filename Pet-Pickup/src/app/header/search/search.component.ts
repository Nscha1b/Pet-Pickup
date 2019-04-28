import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PersonService } from 'src/app/shared/person.service';
import { PetService } from 'src/app/shared/pet.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchResult = [];
  searchBy: String = 'Owner Name';
  lastKeypress = 0;
  selected;
  @Output() openCase = new EventEmitter();

  constructor(private person: PersonService, private pets: PetService) { }


  ngOnInit() {
    this.person.peopleChanged.subscribe(() => {
      this.searchResult = this.person.loadPeople();
    });
    this.pets.petChanged.subscribe(() => {
      this.searchResult = this.pets.loadPets();
    });
  }

  search($event) {
    if ($event.timeStamp - this.lastKeypress > 200) {
      if ($event.target.value === '') {
        this.searchResult = [];
        return;
      } else if (this.searchBy === 'Owner Name') {
        this.person.getPeople($event.target.value, 4, 0, 0);
      } else if (this.searchBy === 'Pet Name') {
        this.pets.getPets($event.target.value, 4, 0, 0);
      }
    }
    this.lastKeypress = $event.timeStamp;
  }

  loadCase($event) {
    if (this.searchBy === 'Owner Name') {
      this.selected = { ID: $event.target.id, type: 'Person' };
      this.openCase.emit(this.selected);
    } else {
      this.selected = { ID: $event.target.id, type: 'Pet' };
      this.openCase.emit(this.selected);
    }
  }

}

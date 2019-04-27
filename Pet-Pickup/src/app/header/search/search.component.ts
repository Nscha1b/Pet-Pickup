import { Component, OnInit, ViewChild, ElementRef, Renderer, Renderer2 } from '@angular/core';
import { PersonService } from 'src/app/shared/person.service';
import { Person } from 'src/app/shared/person.model';
import { PetService } from 'src/app/shared/pet.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchResult = [];
  searchBy: String = 'Owner Name';

  constructor(private person: PersonService, private pets: PetService) { }


  ngOnInit() {
    this.person.peopleChanged.subscribe(() => {
      this.searchResult = this.person.loadPeople();
      console.log(this.searchResult);
    });
    this.pets.petChanged.subscribe(() => {
      this.searchResult = this.pets.loadPets();
      console.log(this.searchResult);
    });
  }

  search($event) {
    if ($event.target.value === '') {
      this.searchResult = [];
      return;
    } else if (this.searchBy === 'Owner Name') {
      this.person.getPeople($event.target.value, 4, 0, 0);
      console.log($event.target.value);
    } else if (this.searchBy === 'Pet Name') {
      this.pets.getPets($event.target.value, 4, 0, 0);
      console.log($event.target.value);
    }
  }

}

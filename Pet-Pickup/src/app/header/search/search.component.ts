import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PersonService } from 'src/app/shared/person.service';
import { PetService } from 'src/app/shared/pet.service';
import { SearchService } from 'src/app/shared/search.service';
import { PetCaseService } from 'src/app/shared/pet-case.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchResult = [];
  searchBy = 'Owner Name';
  hide = false;

  constructor(private pcService: PetCaseService, private searchService: SearchService) { }


  ngOnInit() {
    this.pcService.searchChanged.subscribe(() => {
      this.searchResult = this.pcService.loadSearchResults();
    });
  }

  search($event, searchBy) {
    window.location.href.includes('search') ? this.hide = true : this.hide = false;
    this.searchService.search($event, searchBy);
  }

  loadCase($event) {
    console.log($event);
    if (this.searchBy === 'Owner Name') {
      this.searchService.getSelected($event.target.id, 'Owner Name');
    } else {
      this.searchService.getSelected($event.target.id, 'Pet Name');
    }
  }

}

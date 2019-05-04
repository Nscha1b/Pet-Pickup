import { Component, OnInit } from '@angular/core';
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
  searchButton = false;
  searchText = '';

  constructor(
    private pcService: PetCaseService,
    private searchService: SearchService
  ) {}

  ngOnInit() {
    this.pcService.searchChanged.subscribe(() => {
      this.searchResult = this.pcService.loadSearchResults();
    });
  }

  search($event, searchBy) {
    window.location.href.includes('search') ? (this.hide = true) : (this.hide = false);
    this.searchService.search($event, searchBy, this.searchButton, this.searchText);
    if (this.searchButton === true) {
      this.hide = true;
    }
    this.searchButton = false;
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

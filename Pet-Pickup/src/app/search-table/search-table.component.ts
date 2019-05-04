import { Component, OnInit } from '@angular/core';
import { PetCaseService } from '../shared/pet-case.service';

@Component({
  selector: 'app-search-table',
  templateUrl: './search-table.component.html',
  styleUrls: ['./search-table.component.css']
})
export class SearchTableComponent implements OnInit {
  searchResults = [];
  columnsToDisplay = [
    'id',
    'Pet Name',
    'Date of Death',
    'Owner Name',
    'Vet Clinic'
  ];

  constructor(private pcService: PetCaseService) {}
  ngOnInit() {
    this.searchResults = this.pcService.loadSearchResults();
    this.pcService.searchChanged.subscribe(() => {
      this.searchResults = this.pcService.loadSearchResults();
    });
  }

  loadCase($event) {
    this.pcService.getCase($event.target.id);
  }
}

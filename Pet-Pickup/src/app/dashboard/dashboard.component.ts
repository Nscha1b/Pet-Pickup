import { AfterViewInit, OnInit, Component } from '@angular/core';
import { PetCaseService } from '../shared/pet-case.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PetCase } from '../shared/pet-case.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit, OnInit {
  petCases = [];
  columnsToDisplay = [
    'id',
    'owner',
    'pet',
    'sex',
    'weight',
    'crematory',
    'type',
    'clinic',
    'status'
  ];
  isLoading = false;
  private loadingSub: Subscription;
  totalCases = null;
  orderBy = 'ownerID';
  showHowMany = 5;
  offset = 0;
  pages = [];

  constructor(private petCaseService: PetCaseService) {}

  clinics = new FormGroup({
    clinicDD: new FormControl('All Clinics')
  });

  ngOnInit() {
    this.loadingSub = this.petCaseService
      .getLoadingListener()
      .subscribe(checkLoad => {
        this.isLoading = checkLoad;
      });
    this.petCaseService.getCases(this.orderBy, this.showHowMany, this.offset);
  }

  ngAfterViewInit() {
    this.petCaseService.casesChanged.subscribe(() => {
      this.petCases = this.petCaseService.loadCases();
      this.totalCases = this.petCaseService.getCaseCount();
      this.nextDisabled();
      this.getPageCount();
    });
  }


  filterVetClinic(clinicDD) {
    /*
    // data is the table column, removes white space, and set to lowercase.
    // filter is what we're selecting from the clinicDD we do the same to find a match
    this.dataSource.filterPredicate = (data, filter) =>
      data.cremationDetails.clinic
        .trim()
        .toLowerCase()
        .indexOf(filter.trim().toLowerCase()) !== -1;
    this.dataSource.filter = clinicDD; */
  }

  nextPage() {
    this.offset = this.offset + this.showHowMany;
    this.petCaseService.getCases(this.orderBy, this.showHowMany, this.offset);
    this.totalCases = this.petCaseService.getCaseCount();
    this.prevDisabled();
  }

  nextDisabled() {
    if (this.totalCases === null) {
      // initally make the button clickable
      return false;
    } else if (this.offset + this.showHowMany >= this.totalCases) {
      return true;
    }
    return false;
  }

  prevPage() {
    this.offset = this.offset - this.showHowMany;
    this.petCaseService.getCases(this.orderBy, this.showHowMany, this.offset);
    this.totalCases = this.petCaseService.getCaseCount();
    this.prevDisabled();
  }

  prevDisabled() {
    if (this.offset - this.showHowMany < 0) {
      return true;
    }
    return false;
  }

  changePage(pageNumber) {

      this.offset = this.showHowMany;

    this.offset = this.offset * pageNumber;
    this.petCaseService.getCases(this.orderBy, this.showHowMany, this.offset);
  }

  getPageCount() {
    setTimeout(() => {
      const pageAmount = Math.ceil(this.petCaseService.getCaseCount() / this.showHowMany);
      this.pages = new Array(pageAmount);
    });
  }
}

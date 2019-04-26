import { AfterViewInit, OnInit, Component } from '@angular/core';
import { PetCaseService } from '../shared/pet-case.service';
import { Subscription } from 'rxjs';

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
  filter = '';
  isLoading = false;
  private loadingSub: Subscription;
  totalCases = null;
  orderBy = 'ownerID';
  showHowMany = '5';
  offset = 0;
  pages = [];

  constructor(private petCaseService: PetCaseService) {}
  ngOnInit() {
    this.loadingSub = this.petCaseService
      .getLoadingListener()
      .subscribe(checkLoad => {
        this.isLoading = checkLoad;
      });
      this.getCases();
  }

  ngAfterViewInit() {
    this.petCaseService.casesChanged.subscribe(() => {
      this.petCases = this.petCaseService.loadCases();
      this.getCaseCount();
      this.nextDisabled();
      this.getPageCount();
    });
  }


  getCases() {
    this.petCaseService.getCases(this.filter, +this.showHowMany, this.offset, this.orderBy);
    this.getCaseCount();
  }

  getCaseCount() {
    this.totalCases = this.petCaseService.getCaseCount();
    setTimeout(() => {
      this.totalCases = this.petCaseService.getCaseCount();
    });
  }

  nextPage() {
    this.offset = this.offset + +this.showHowMany;
    this.getCases();
  }

  nextDisabled() {
    if (this.totalCases === null) {
      // initally make the button clickable
      return false;
    } else if (+this.showHowMany === 1 && this.offset < this.totalCases - 1) {
      return false;
    } else if (this.offset + this.showHowMany >= this.totalCases) {
      return true;
    }
    return false;
  }

  prevPage() {
    this.offset = this.offset - +this.showHowMany;
    this.getCases();
  }

  prevDisabled() {
    if (this.offset - +this.showHowMany < 0) {
      return true;
    }
    return false;
  }

  changePage(pageNumber) {
    this.offset = +this.showHowMany;
    this.offset = this.offset * pageNumber;
    this.getCases();
  }

  getPageCount() {
    setTimeout(() => {
      const pageAmount = Math.ceil(this.petCaseService.getCaseCount() / +this.showHowMany);
      this.pages = new Array(pageAmount);
    });
  }

  currentPage() {
    return this.offset / +this.showHowMany;
  }
}

import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {PetCaseService} from '../shared/pet-case.service';
import {PetCase} from '../shared/pet-case.model';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit {
  subscription: Subscription;
  columnsToDisplay = ['owner', 'pet'];
  dataSource = [];

  constructor(private petCaseService: PetCaseService) { }

  ngOnInit() {
    this.subscription = this.petCaseService.casesChanged
      .subscribe(
        (petCases: PetCase[]) => {
          this.dataSource = petCases;
        }
      );
    this.dataSource = this.petCaseService.getCases();
  }

}



import { Component, OnInit } from '@angular/core';
import {PersonService} from '../shared/person.service';
import {Person} from '../shared/person.model';
import {Subscription} from 'rxjs';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit {
  subscription: Subscription;
  columnsToDisplay = ['owner'];
  dataSource = [];

  constructor(private personService: PersonService) { }

  ngOnInit() {
    this.subscription = this.personService.peopleChanged
      .subscribe(
        (people: Person[]) => {
          this.dataSource = people;
        }
      );
    this.dataSource = this.personService.getPeople();
  }

}



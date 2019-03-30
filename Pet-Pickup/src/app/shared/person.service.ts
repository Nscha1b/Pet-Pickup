import { Injectable } from '@angular/core';
import {Person} from './person.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  peopleChanged = new Subject<Person[]>();

  private people: Person[] = [
    new Person('ben'),
    new Person('Ron'),
    new Person('Tom')
  ];

  constructor() { }

  getPeople() {
    return this.people.slice();
  }

  addPerson(person: Person) {
    this.people.push(new Person(person.name));
    this.peopleChanged.next(this.people.slice());
  }
}

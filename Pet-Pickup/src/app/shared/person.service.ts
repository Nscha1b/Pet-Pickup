import { Injectable } from '@angular/core';
import { Person } from './person.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  peopleChanged = new Subject<Person[]>();

  private people: Person[] = [
    new Person(1, 'Nelson', 'Mr', 'Paul', 'Jensen',
      'Sr', '435 Elm Drive', 'Milford', 'PA', 15342,
      'NelsonJenson@gmail.com', '411-654-3323', '411-656-0098', '345-554-7685')
  ];

  constructor() { }

  getPeople() {
    return this.people.slice();
  }

  addPerson(person: Person) {
    this.people.push(new Person(person.id, person.firstname, person.pre, person.mid,
      person.last, person.suf, person.address, person.city, person.state,
      person.zip, person.email, person.home, person.work, person.mobile
    ));
    this.peopleChanged.next(this.people.slice());
    console.log('Person Added');
    console.log(this.getPeople());
  }
}

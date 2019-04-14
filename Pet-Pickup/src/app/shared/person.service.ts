import { Injectable } from '@angular/core';
import { Person } from './person.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {map, catchError} from 'rxjs/operators';

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

  constructor(private http: HttpClient) { }

  getPeople() {
    return this.people.slice();
  }

  getPerson(id) {
     return this.people.slice().find(x => x.id === id);
  }

  /*
  addPerson(person: Person) {
    this.people.push(new Person(person.id, person.firstname, person.pre, person.mid,
      person.last, person.suf, person.address, person.city, person.state,
      person.zip, person.email, person.home, person.work, person.mobile
    ));
    this.peopleChanged.next(this.people.slice());
    console.log('Person Added');
  }
  */

 addPerson(p: Person) {
  // tslint:disable-next-line:max-line-length
  const newPerson = {firstname: p.firstname, pre: p.pre, middlename: p.mid, lastname: p.last, suf: p.suf, address: p.address, city: p.city, state: p.state, zip: p.zip, email: p.email, home: p.home, work: p.work, mobile: p.mobile};
// tslint:disable-next-line: max-line-length
// <{firstname, pre, middlename, lastname, suf, address, city, state, zip, email, home, work, mobile}>
     this.http.post('http://localhost:3000/', newPerson)
     .subscribe((res) => {
      console.log(res);
     });
    /*
    .subscribe((responseData) => {
        console.log(responseData.message);
        const ID = responseData.postID;
        post.id = ID;
        this.posts.push(post);
        this.postsUpdate.next([...this.posts]);
      }); */



      console.log('this is running');
}



}

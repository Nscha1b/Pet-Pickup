import { Injectable } from '@angular/core';
import { Person } from './person.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  peopleChanged = new Subject<Person[]>();

  private people: Person[] = [];

  constructor(private http: HttpClient) {}

  getPerson(id) {
    return this.people.slice().find(x => x.id === id);
  }

  loadPeople() {
    return this.people.slice();
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
    const newPerson = {
      firstname: p.firstname,
      pre: p.pre,
      middlename: p.mid,
      lastname: p.last,
      suf: p.suf,
      address: p.address,
      city: p.city,
      state: p.state,
      zip: p.zip,
      email: p.email,
      home: p.home,
      work: p.work,
      mobile: p.mobile
    };

    this.http
      .post('http://localhost:3000/api/post/person', newPerson)
      .subscribe(res => {
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
  }

  getPeople(filter, howMany, offset, orderBy) {
    this.people = [];
    this.http.get('http://localhost:3000/api/get/people', {
      params: {
        filter: filter,
        howMany: howMany,
        offset: offset,
        orderBy: orderBy
      }
    }).subscribe((data: any) => {
      console.log(data);
      data.rows.forEach(i => {
        const newPerson =
          new Person(
            i.personid,
            i.personfirstname,
            i.pre,
            i.middlename,
            i.lastname,
            i.suf,
            i.personaddress,
            i.personcity,
            i.personstate,
            +i.personzip,
            i.email,
            i.personhome,
            i.personwork,
            i.personmobile
          );
        this.people.push(newPerson);
      });
      this.peopleChanged.next();
    });
  }
}

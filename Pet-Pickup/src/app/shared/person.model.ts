export class Person {
  public id: number;
  public firstname: string;
  public pre: string;
  public mid: string;
  public last: string;
  public suf: string;
  public address: string;
  public city: string;
  public state: string;
  public zip: number;
  public email: string;
  public home: string;
  public work: string;
  public mobile: string;

  constructor(id: number, firstname: string, pre: string, mid: string, last: string,
              suf: string, address: string, city: string, state: string,
              zip: number, email: string, home: string, work: string, mobile: string) {
    this.id = id;
    this.firstname = firstname;
    this.pre = pre;
    this.mid = mid;
    this.last = last;
    this.suf = suf;
    this.address = address;
    this.city = city;
    this.state = state;
    this.zip = zip;
    this.email = email;
    this.home = home;
    this.work = work;
    this.mobile = mobile;
  }
}

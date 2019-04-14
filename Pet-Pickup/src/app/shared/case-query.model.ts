export class CaseQuery {
  public personid: number;
  public personfirstname: string;
  public pre: string;
  public middlename: string;
  public lastname: string;
  public suf: string;
  public personaddress: string;
  public personcity: string;
  public personstate: string;
  public personzip: string;
  public email: string;
  public personhome: string;
  public personwork: string;
  public personmobile: string;
  public petid: number;
  public petname: string;
  public petsex: string;
  public pettype: string;
  public petbreed: string;
  public petcolor: string;
  public petweight: number;
  public petdob: string;
  public petdod: string;
  public pettod: string;
  public petage: string;
  public detailsid: number;
  public crematory: string;
  public status: string;
  public detailstype: string;
  public clinic: string;
  public print: boolean;
  public fur: boolean;
  public returnto: string;
  public returntoid: number;
  public returnperson: string;
  public returnplace: string;
  public returnphone: string;
  public returnaddress: string;
  public returncity: string;
  public returnstate: string;
  public returnzip: string;
  public note: string;
  public detailsownid: number;
  public detailspetid: number;

  constructor(personid: number,
    personfirstname: string,
     pre: string,
     middlename: string,
     lastname: string,
     suf: string,
     personaddress: string,
     personcity: string,
     personstate: string,
     personzip: string,
     email: string,
     personhome: string,
     personwork: string,
     personmobile: string,
     petid: number,
     petname: string,
     petsex: string,
     pettype: string,
     petbreed: string,
     petcolor: string,
     petweight: number,
     petdob: string,
     petdod: string,
     pettod: string,
     petage: string,
     detailsid: number,
     crematory: string,
     status: string,
     detailstype: string,
     clinic: string,
     print: boolean,
     fur: boolean,
     returnto: string,
     returntoid: number,
     returnperson: string,
     returnplace: string,
     returnphone: string,
     returnaddress: string,
     returncity: string,
     returnstate: string,
     returnzip: string,
     note: string,
     detailsownid: number,
     detailspetid: number) {
      this.personid = personid;
      this.personfirstname = personfirstname;
      this.pre = pre;
      this.middlename = middlename;
      this.lastname = lastname;
      this.suf = suf;
      this.personaddress = personaddress;
      this.personcity = personcity;
      this.personstate = personstate;
      this.personzip = personzip;
      this.email = email;
      this.personhome = personhome;
      this.personwork = personwork;
      this.personmobile = personmobile;
      this.petid = petid;
      this.petname = petname;
      this.petsex = petsex;
      this.pettype = pettype;
      this.petbreed = petbreed;
      this.petcolor = petcolor;
      this.petweight = petweight;
      this.petdob = petdob;
      this.petdod = petdod;
      this.pettod = pettod;
      this.petage = petage;
      this.detailsid = detailsid;
      this.crematory = crematory;
      this.status = status;
      this.detailstype = detailstype;
      this.clinic = clinic;
      this.print = print;
      this.fur = fur;
      this.returnto = returnto;
      this.returntoid = returntoid;
      this.returnperson = returnperson;
      this.returnplace = returnplace;
      this.returnphone = returnphone;
      this.returnaddress = returnaddress;
      this.returncity = returncity;
      this.returnstate = returnstate;
      this.returnzip = returnzip;
      this.note = note;
      this.detailsownid = detailsownid;
      this.detailspetid = detailspetid;
  }
}

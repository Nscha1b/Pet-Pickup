export class Pet {
  public id: number;
  public petname: string;
  public sex: string;
  public pettype: string;
  public petbreed: string;
  public petcolor: string;
  public petweight: string;
  public petdob: string;
  public petdod: string;
  public pettod: string;
  public petage: string;

  constructor(id: number, petname: string, sex: string, pettype: string, petbreed: string,
              petcolor: string, petweight: string, petdob: string,
              petdod: string, pettod: string, petage: string) {
    this.id = id;
    this.petname = petname;
    this.sex = sex;
    this.pettype = pettype;
    this.petbreed = petbreed;
    this.petcolor = petcolor;
    this.petweight = petweight;
    this.petdob = petdob;
    this.petdod = petdod;
    this.pettod = pettod;
    this.petage = petage;
  }
}
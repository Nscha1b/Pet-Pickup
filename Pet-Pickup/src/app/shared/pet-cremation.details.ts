export class PetCremationDetails {
  crematory: string;
  status: string;
  type: string;
  clinic: string;
  print: boolean;
  fur: boolean;
  returnTo: string;
  returnToID: number;
  returnPerson: string;
  returnPlace: string;
  returnPhone: string;
  returnAddress: string;
  returnCity: string;
  returnState: string;
  returnZip: string;
  notes: string;


  constructor(crematory: string, status: string, type: string, clinic: string,
              print: boolean, fur: boolean, returnTo: string, returnToID: number,
              returnPerson: string, returnPlace: string, returnPhone: string,
              returnAddress: string, returnCity: string, returnState: string,
              returnZip: string, notes: string) {
    this.crematory = crematory;
    this.status = status;
    this.type = type;
    this.clinic = clinic;
    this.print = print;
    this.fur = fur;
    this.returnTo = returnTo;
    this.returnToID = returnToID;
    this.returnPerson = returnPerson;
    this.returnPlace = returnPlace;
    this.returnPhone = returnPhone;
    this.returnAddress = returnAddress;
    this.returnCity = returnCity;
    this.returnState = returnState;
    this.returnZip = returnZip;
    this.notes = notes;
  }

}

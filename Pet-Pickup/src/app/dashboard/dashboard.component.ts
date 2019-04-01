import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { PetCaseService } from '../shared/pet-case.service';
import { PetCase } from '../shared/pet-case.model';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSort } from '@angular/material/';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements AfterViewInit, OnInit {
  columnsToDisplay = [
    'id', 'firstname', 'pet', 'sex', 'weight', 'crematory',
    'type', 'clinic', 'status'];
  dataSource: MatTableDataSource<PetCase>;

   @ViewChild(MatPaginator) paginator: MatPaginator;
   @ViewChild(MatSort) sort: MatSort;

  constructor(private petCaseService: PetCaseService) {}

  clinics = new FormGroup({
    'clinicDD': new FormControl('All Clinics')
  });

  ngAfterViewInit() {
    // Mat data tables will not let you sort on nested object properties,
    // so for whatever item we are referring to on the table,
    // return the nested property
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'id': return item.person.id
        case 'firstname': return item.person.firstname;
        case 'pet': return item.pet.petname;
        case 'sex': return item.pet.sex;
        case 'weight': return item.pet.petweight;
        case 'crematory': return item.cremationDetails.crematory;
        case 'type': return item.cremationDetails.type;
        case 'clinic': return item.cremationDetails.clinic;
        case 'status': return item.cremationDetails.status;
        default:
          return item[property];
      }
    };
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  filterVetClinic(clinicDD) {
    // data is the table column, removes white space, and set to lowercase.
    // filter is what we're selecting from the clinicDD we do the same to find a match
    this.dataSource.filterPredicate = (data, filter) => (
      data.cremationDetails.clinic.trim().toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1
    );
    this.dataSource.filter = clinicDD;
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.petCaseService.getCases());
  }

}










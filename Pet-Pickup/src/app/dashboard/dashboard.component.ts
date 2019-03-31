import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {PetCaseService} from '../shared/pet-case.service';
import {PetCase} from '../shared/pet-case.model';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements AfterViewInit {
  subscription: Subscription;
  columnsToDisplay = [
    'id', 'owner', 'pet', 'sex', 'weight', 'crematory',
    'type', 'clinic', 'status'];
   dataSource: MatTableDataSource<PetCase>;

   @ViewChild(MatPaginator) paginator: MatPaginator;
   @ViewChild(MatSort) sort: MatSort;

  constructor(private petCaseService: PetCaseService) {
    this.dataSource = new MatTableDataSource(this.petCaseService.getCases());
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


}



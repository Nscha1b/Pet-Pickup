import {Component, OnInit, ViewChild} from '@angular/core';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Pet-Pickup';
  display = 'none';

  ngOnInit(): void {
  }

  openModal() {

    this.display = 'block';
  }

  onCloseHandled() {


    this.display = 'none';


  }

}










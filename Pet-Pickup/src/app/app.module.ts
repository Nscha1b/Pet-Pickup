import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import {
  MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatMenuModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatDividerModule,
  MatTableModule,
  MatTabsModule,
  MatSortModule,
  MatPaginatorModule,
  MatOptionModule,
  MatSelectModule,
} from '@angular/material';
import {HeaderComponent, NewCaseDialogComponent} from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NewCaseDialogComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatMenuModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatTableModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatOptionModule,
    MatSortModule,
    MatSelectModule
  ],
  entryComponents: [
    NewCaseDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

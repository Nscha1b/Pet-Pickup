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
  MatCardModule, MatDialogModule, MatFormFieldModule
} from '@angular/material';
import {HeaderComponent, NewCaseDialog} from './header/header.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NewCaseDialog
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
    MatFormFieldModule
  ],
  entryComponents: [
    NewCaseDialog
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

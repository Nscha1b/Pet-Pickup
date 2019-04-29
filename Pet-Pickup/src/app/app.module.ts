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
  MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatIconModule, MatProgressSpinnerModule
} from '@angular/material';
import {HeaderComponent, NewCaseDialogComponent} from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import {AuthInterceptor} from './login/auth-interceptor';
import { PaginatorComponent } from './shared/paginator/paginator.component';
import { SearchComponent } from './header/search/search.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { SearchTableComponent } from './search-table/search-table.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NewCaseDialogComponent,
    DashboardComponent,
    LoginComponent,
    PaginatorComponent,
    SearchComponent,
    DropdownDirective,
    SearchTableComponent
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
    MatSelectModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    HttpClientModule,
    MatProgressSpinnerModule
  ],
  entryComponents: [
    NewCaseDialogComponent
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }

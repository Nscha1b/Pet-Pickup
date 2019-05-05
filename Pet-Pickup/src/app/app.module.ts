import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponent, NewCaseDialogComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './login/auth-interceptor';
import { SearchComponent } from './header/search/search.component';
import { SearchTableComponent } from './search-table/search-table.component';
import { AngularMaterialModule } from './angular-material.module';
import { AuthModule } from './login/auth.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NewCaseDialogComponent,
    DashboardComponent,
    SearchComponent,
    SearchTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ScrollingModule,
    AngularMaterialModule,
    AuthModule
  ],
  entryComponents: [
    NewCaseDialogComponent
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }

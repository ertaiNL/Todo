import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListComponent } from './views/todo-list/todo-list.component';
import { HttpClientModule } from "@angular/common/http";
import { TodoTableComponent } from './components/todo-table/todo-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from "@angular/material/checkbox";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatDatepickerModule } from "@angular/material/datepicker";

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoTableComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatSortModule,
    MatTableModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

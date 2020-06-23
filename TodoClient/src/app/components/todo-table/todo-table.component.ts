import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { TodoTableDataSource } from './todo-table-datasource';
import {Todo} from "../../models/todo";
import {TodoService} from "../../services/todo.service";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-todo-table',
  templateUrl: './todo-table.component.html',
  styleUrls: ['./todo-table.component.scss']
})
export class TodoTableComponent implements OnInit, OnDestroy {
  dataSource: TodoTableDataSource;

  private unsubscribe$ = new Subject<boolean>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['completed', 'title', 'expiration'];

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.dataSource = new TodoTableDataSource(this.unsubscribe$);
    this.dataSource.loadTodos(this.todoService.getTodos());
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSortChange(sort: Sort) {
    this.dataSource.sortOn(sort);
  }
}

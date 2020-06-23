import { DataSource } from '@angular/cdk/collections';
import {takeUntil} from 'rxjs/operators';
import {Observable, of as observableOf, merge, Subject, BehaviorSubject} from 'rxjs';
import {Todo} from "../../models/todo";
import {Sort} from "@angular/material/sort";

/**
 * Data source for the TodoTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TodoTableDataSource extends DataSource<Todo> {
  private data: Todo[];
  private todosSubject = new BehaviorSubject<Todo[]>([])

  constructor(private unsubscribe$: Subject<boolean>) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Todo[]> {
    return this.todosSubject.asObservable();
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {
    this.todosSubject.complete();
  }

  loadTodos(todos$: Observable<Todo[]>) {
    todos$.pipe(takeUntil(this.unsubscribe$)).subscribe((todos: Todo[]) => {
      this.data = todos;
      this.sort('expiration', true);
      this.todosSubject.next(this.data);
    })
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  sortOn(sort: Sort) {
    if (sort.active && sort.direction !== '') {
      this.sort(sort.active, sort.direction === 'asc');
    }
    this.todosSubject.next(this.data);
  }

  private sort(column: string, isAsc: boolean) {
    this.data.sort((a, b) => {
      switch (column) {
        case 'title':
          return compare(a.title, b.title, isAsc);
        case 'expiration':
          return compareDate(a.expiration, b.expiration, isAsc);
        default:
          return 0;
      }
    });
  }
}

function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

function compareDate(a: Date, b: Date, isAsc: boolean) {
  if (a == null) {
    return 1;
  } else if (b == null) {
    return -1;
  }

  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

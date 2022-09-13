import { ajax } from 'rxjs/ajax';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  EMPTY,
  filter,
  fromEvent,
  map,
  mergeMap,
  switchMap,
  tap,
} from 'rxjs';
import { card } from './card';

const result = document.getElementById('result');
const search = document.getElementById('search');
search.focus();

const url = 'https://api.github.com/search/users?q=';

const stream$ = fromEvent(search, 'input').pipe(
  map((e) => e.target.value),
  debounceTime(1000),
  distinctUntilChanged(),
  tap(() => (result.innerHTML = '')),
  filter((v) => v.trim()),
  switchMap((value) =>
    ajax.getJSON(`${url}${value}`).pipe(catchError(() => EMPTY)),
  ),
  map((response) => response.items),
  mergeMap((items) => items),
);

stream$.subscribe({
  next: (user) => {
    result.insertAdjacentHTML('beforeend', card(user));
  },
});

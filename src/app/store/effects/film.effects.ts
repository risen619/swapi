import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Observable, of } from 'rxjs';
import { mergeMap, catchError, map } from 'rxjs/operators';

import * as FilmActions from '../actions/film.actions';

import { FilmsApiService } from 'src/app/services/api/films.api.service';


@Injectable()
export class FilmEffects
{
	constructor(private actions$: Actions, private api: FilmsApiService) { }

	@Effect()
	loadFilm$: Observable<Action> = this.actions$.pipe(
		ofType<FilmActions.LoadFilm>(FilmActions.FilmActionTypes.LoadFilm),
		mergeMap(a =>
		{
			return this.api.getFilm(a.payload).pipe(
				map(r => new FilmActions.LoadFilmSuccess(r)),
				catchError(e => of(new FilmActions.LoadFilmSuccess(e)))
			);
		})
	);
}

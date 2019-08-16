import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, catchError, map, withLatestFrom } from 'rxjs/operators';

import * as FilmActions from '../actions/film.actions';

import { FilmsApiService } from 'src/app/services/api';
import { FilmFacade } from '../facades/film';


@Injectable()
export class FilmEffects
{
	constructor(private actions$: Actions, private api: FilmsApiService, private filmsFacade: FilmFacade) { }

	@Effect()
	loadFilm$: Observable<Action> = this.actions$.pipe(
		ofType<FilmActions.LoadFilm>(FilmActions.FilmActionTypes.LoadFilm),
		withLatestFrom(this.filmsFacade.films),
		mergeMap(([a, films]) =>
		{
			if(films[a.payload]) return EMPTY;
			else return this.api.getFilm(a.payload).pipe(
				map(r => new FilmActions.LoadFilmSuccess(r)),
				catchError(e => of(new FilmActions.LoadFilmSuccess(e)))
			);
		})
	);
}

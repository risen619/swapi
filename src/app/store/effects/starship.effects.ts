import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable, EMPTY, of } from 'rxjs';
import { withLatestFrom, mergeMap, map, catchError } from 'rxjs/operators';

import { StarshipsApiService } from 'src/app/services/api';

import { Starship } from 'src/app/models/starship';

import * as SActions from '../actions/starship.actions';
import { StarshipFacade } from '../facades/starship';

@Injectable()
export class StarshipEffects
{
	constructor(private actions$: Actions, private api: StarshipsApiService, private starshipsFacade: StarshipFacade) { }

	@Effect()
	loadStarship$: Observable<Action> = this.actions$.pipe(
		ofType<SActions.LoadStarship>(SActions.StarshipActionTypes.LoadStarship),
		withLatestFrom(this.starshipsFacade.starships),
		mergeMap(([a, starships]) =>
		{
			if(starships[a.payload]) return EMPTY;
			else return this.api.getStarship(a.payload).pipe(
				map(r => new SActions.LoadStarshipSuccess(new Starship(r))),
				catchError(e => of(new SActions.LoadStarshipFailed(e)))
			);
		})
	);
}

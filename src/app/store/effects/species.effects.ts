import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, map, catchError, withLatestFrom } from 'rxjs/operators';

import * as SActions from '../actions/species.actions';

import { SpeciesApiService } from 'src/app/services/api';
import { Species } from 'src/app/models/species';
import { SpeciesFacade } from '../facades/species';

@Injectable()
export class SpeciesEffects
{
	constructor(private actions$: Actions, private api: SpeciesApiService, private speciesFacade: SpeciesFacade) { }

	@Effect()
	loadOneSpecies$: Observable<Action> = this.actions$.pipe(
		ofType<SActions.LoadOneSpecies>(SActions.SpeciesActionTypes.LoadOneSpecies),
		withLatestFrom(this.speciesFacade.species),
		mergeMap(([a, species]) =>
		{
			if(species[a.payload]) return EMPTY;
			else return this.api.getSpecies(a.payload).pipe(
				map(r => new SActions.LoadOneSpeciesSuccess(new Species(r))),
				catchError(e => of(new SActions.LoadOneSpeciesFailed(e)))
			);
		})
	);
}

import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';

import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';

import * as CActions from '../actions/character.actions';

import { Action } from '@ngrx/store';

import { CharactersApiService } from 'src/app/services/api/characters.api.service';

@Injectable()
export class CharacterEffects
{
	constructor(private actions$: Actions, private api: CharactersApiService) { }

	@Effect()
	getCharacters$: Observable<Action> = this.actions$.pipe(
		ofType<CActions.LoadCharacters>(CActions.CharacterActionTypes.LoadCharacters),
		mergeMap(() =>
		{
			return this.api.getCharacters().pipe(
				map(r => new CActions.LoadCharactersSuccess(r.results)),
				catchError(e => of(new CActions.LoadCharactersFailed(e)))
			);
		})
	);

	@Effect()
	getCharacter$: Observable<Action> = this.actions$.pipe(
		ofType<CActions.LoadCharacter>(CActions.CharacterActionTypes.LoadCharacter),
		mergeMap(a =>
		{
			return this.api.getCharacter(a.payload).pipe(
				map(r => new CActions.LoadCharacterSuccess(r)),
				catchError(e => of(new CActions.LoadCharacterFailed(e)))
			);
		})
	);
}

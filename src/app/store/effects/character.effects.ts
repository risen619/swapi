import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';

import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError, switchMap } from 'rxjs/operators';

import * as CActions from '../actions/character.actions';
import * as FActions from '../actions/film.actions';

import { Action } from '@ngrx/store';

import { CharactersApiService } from 'src/app/services/api/characters.api.service';
import { CharacterModel } from 'src/app/models/character';

@Injectable()
export class CharacterEffects
{
	constructor(private actions$: Actions, private api: CharactersApiService) { }

	private getFilmsActions(models: CharacterModel[])
	{
		const filmsSet = models.reduce((p, c) => {
			c.films.forEach(f =>
			{
				p.add(f);
			});
			return p;
		}, new Set<String>());

		let filmsActions = [];
		for(let f of filmsSet)
		{
			const fId = (f.match(/\/(\d+)\/?/) || [])[1];
			fId && filmsActions.push(new FActions.LoadFilm(fId));
		}

		return filmsActions;
	}

	@Effect()
	getCharacters$: Observable<Action> = this.actions$.pipe(
		ofType<CActions.LoadCharacters>(CActions.CharacterActionTypes.LoadCharacters),
		mergeMap(() =>
		{
			return this.api.getCharacters().pipe(
				switchMap(r => [new CActions.LoadCharactersSuccess(r.results), ...this.getFilmsActions(r.results)]),
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
				switchMap(r => [new CActions.LoadCharacterSuccess(r), ...this.getFilmsActions([r])]),
				catchError(e => of(new CActions.LoadCharacterFailed(e)))
			);
		})
	);
}

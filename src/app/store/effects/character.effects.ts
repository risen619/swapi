import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { mergeMap, catchError, switchMap } from 'rxjs/operators';

import * as CActions from '../actions/character.actions';
import * as FActions from '../actions/film.actions';
import * as SpeciesActions from '../actions/species.actions';
import * as StarshipsActions from '../actions/starship.actions';

import { CharactersApiService } from 'src/app/services/api';
import { CharacterModel } from 'src/app/models/character';

@Injectable()
export class CharacterEffects
{
	constructor(private actions$: Actions, private api: CharactersApiService) { }

	private getActionsForField<T extends Action>(models: CharacterModel[], field: FieldTypes, TYPE: { new(id: string): T; }) : T[]
	{
		const set = models.reduce((p, c) => {
			c[field].forEach(i => p.add(i));
			return p;
		}, new Set<String>());

		let actions = [];
		for(let i of set)
		{
			const id = (i.match(/\/(\d+)\/?/) || [])[1];
			id && actions.push(new TYPE(id));
		}

		return actions;
	}

	private fetchSubsets(models: CharacterModel[])
	{
		return [
			...this.getActionsForField(models, 'films', FActions.LoadFilm),
			...this.getActionsForField(models, 'species', SpeciesActions.LoadOneSpecies),
			...this.getActionsForField(models, 'starships', StarshipsActions.LoadStarship)
		];
	}

	@Effect()
	getCharacters$: Observable<Action> = this.actions$.pipe(
		ofType<CActions.LoadCharacters>(CActions.CharacterActionTypes.LoadCharacters),
		mergeMap(() =>
		{
			return this.api.getCharacters().pipe(
				switchMap(r => [new CActions.LoadCharactersSuccess(r.results), ...this.fetchSubsets(r.results)]),
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
				switchMap(r => [new CActions.LoadCharacterSuccess(r), ...this.fetchSubsets([r])]),
				catchError(e => of(new CActions.LoadCharacterFailed(e)))
			);
		})
	);
}

type FieldTypes = 'films' | 'species' | 'starships';

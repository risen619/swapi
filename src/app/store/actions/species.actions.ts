import { Action } from '@ngrx/store';

import { SpeciesModel } from 'src/app/models/species';

export enum SpeciesActionTypes
{
	LoadOneSpecies = '[Species] Load one species',
	LoadOneSpeciesSuccess = '[Species] One species loaded successfully',
	LoadOneSpeciesFailed = '[Species] One species failed to load'
}


export class LoadOneSpecies implements Action
{
	readonly type = SpeciesActionTypes.LoadOneSpecies;

	constructor(public payload: string) { }
}
export class LoadOneSpeciesSuccess implements Action
{
	readonly type = SpeciesActionTypes.LoadOneSpeciesSuccess

	constructor(public payload: SpeciesModel) { }
}
export class LoadOneSpeciesFailed implements Action
{
	readonly type = SpeciesActionTypes.LoadOneSpeciesFailed

	constructor(public payload: any) { }
}


export type SpeciesActions = LoadOneSpecies | LoadOneSpeciesSuccess | LoadOneSpeciesFailed;

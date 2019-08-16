import { Action } from '@ngrx/store';

import { StarshipModel } from 'src/app/models/starship';

export enum StarshipActionTypes
{
	LoadStarship = '[Starship] Load starship',
	LoadStarshipSuccess = '[Starship] Starship loaded successfully',
	LoadStarshipFailed = '[Starship] Starship failed to load'
}


export class LoadStarship implements Action
{
	readonly type = StarshipActionTypes.LoadStarship;

	constructor(public payload: string) { }
}
export class LoadStarshipSuccess implements Action
{
	readonly type = StarshipActionTypes.LoadStarshipSuccess

	constructor(public payload: StarshipModel) { }
}
export class LoadStarshipFailed implements Action
{
	readonly type = StarshipActionTypes.LoadStarshipFailed

	constructor(public payload: any) { }
}


export type StarshipActions = LoadStarship | LoadStarshipSuccess | LoadStarshipFailed;

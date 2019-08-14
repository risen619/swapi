import { Action } from '@ngrx/store';

import { FilmModel } from 'src/app/models/film';

export enum FilmActionTypes
{
	LoadFilm = '[Film] Load Films',
	LoadFilmSuccess = '[Film] Film Loaded successfully',
	LoadFilmFailed = '[Film] Film failed to load'
}


export class LoadFilm implements Action
{
	readonly type = FilmActionTypes.LoadFilm;

	constructor(public payload: string) { }
}
export class LoadFilmSuccess implements Action
{
	readonly type = FilmActionTypes.LoadFilmSuccess

	constructor(public payload: FilmModel) { }
}
export class LoadFilmFailed implements Action
{
	readonly type = FilmActionTypes.LoadFilmFailed

	constructor(public payload: any) { }
}


export type FilmActions = LoadFilm | LoadFilmSuccess | LoadFilmFailed;

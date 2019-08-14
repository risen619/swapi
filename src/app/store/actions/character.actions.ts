import { Action } from '@ngrx/store';

import { CharacterModel } from 'src/app/models/character';

export enum CharacterActionTypes
{
	LoadCharacters = '[Character] Load Characters',
	LoadCharactersSuccess = '[Character] Characters loaded successfully',
	LoadCharactersFailed = '[Character] Characters failed to load',

	LoadCharacter = '[Character] Load Character',
	LoadCharacterSuccess = '[Character] Character loaded successfully',
	LoadCharacterFailed = '[Character] Character failed to load'
}

export class LoadCharacters implements Action
{
	readonly type = CharacterActionTypes.LoadCharacters;
}
export class LoadCharactersSuccess implements Action
{
	readonly type = CharacterActionTypes.LoadCharactersSuccess

	constructor(public payload: CharacterModel[]) { }
}
export class LoadCharactersFailed implements Action
{
	readonly type = CharacterActionTypes.LoadCharactersFailed

	constructor(public payload: any) { }
}


export class LoadCharacter implements Action
{
	readonly type = CharacterActionTypes.LoadCharacter;

	constructor(public payload: string) { }
}
export class LoadCharacterSuccess implements Action
{
	readonly type = CharacterActionTypes.LoadCharacterSuccess

	constructor(public payload: CharacterModel) { }
}
export class LoadCharacterFailed implements Action
{
	readonly type = CharacterActionTypes.LoadCharacterFailed

	constructor(public payload: any) { }
}


export type CharactersActions =
	LoadCharacters | LoadCharactersSuccess | LoadCharactersFailed |
	LoadCharacter | LoadCharacterSuccess | LoadCharacterFailed;

import { CharacterActionTypes as Actions, CharactersActions } from '../actions/character.actions';

import { Character } from 'src/app/models/character';

export const characterFeatureKey = 'character';

export interface State
{
	characters: { [key: string] : Character }
}

export const initialState: State = {
	characters: { }
};

export function reducer(state = initialState, action: CharactersActions): State
{
	switch (action.type)
	{
		case Actions.LoadCharactersSuccess:
		{
			const characters = action.payload.reduce((p, c) => {
				const char = new Character(c);
				return { ...p, [char.id]: char };
			}, { });

			return { ...state, characters };
		}

		case Actions.LoadCharacterSuccess:
		{
			const char = new Character(action.payload);

			return { ...state, characters: { ...state.characters, [char.id]: char } };	
		}

		default: return state;
	}
}

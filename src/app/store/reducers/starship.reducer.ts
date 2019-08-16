import { StarshipActionTypes, StarshipActions } from '../actions/starship.actions';

import { Starship } from 'src/app/models/starship';

export interface State
{
	starships: { [key: string]: Starship }
}

export const initialState: State = {
	starships: { }
};

export function reducer(state = initialState, action: StarshipActions): State
{
	switch (action.type)
	{
		case StarshipActionTypes.LoadStarshipSuccess:
		{
			const starship = new Starship(action.payload);
			return { ...state, starships: { ...state.starships, [starship.id]: starship } };
		}

		default: return state;
	}
}

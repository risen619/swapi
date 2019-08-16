import { SpeciesActions, SpeciesActionTypes } from '../actions/species.actions';

import { Species } from 'src/app/models/species';

export interface State
{
	species: { [key: string]: Species }
}

export const initialState: State = {
	species: { }
};

export function reducer(state = initialState, action: SpeciesActions): State
{
	switch (action.type)
	{
		case SpeciesActionTypes.LoadOneSpeciesSuccess:
		{
			const species = new Species(action.payload);
			return { ...state, species: { ...state.species, [species.id]: species } };	
		}

		default: return state;
	}
}

import { Film } from 'src/app/models/film';
import { FilmActions, FilmActionTypes as Actions } from '../actions/film.actions';

export interface State
{
	films: { [key: string]: Film }
}

export const initialState: State = {
	films: { }
};

export function reducer(state = initialState, action: FilmActions): State
{
	switch (action.type)
	{
		case Actions.LoadFilmSuccess:
		{
			const film = new Film(action.payload);
			return { ...state, films: { ...state.films, [film.id]: film } };
		}

		default: return state;
	}
}

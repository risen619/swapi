import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { environment } from 'src/environments/environment';

import { reducer as characters, State as CharactersState } from './character.reducer';
import { reducer as films, State as FilmsState } from './film.reducer';

export interface State
{
    characters: CharactersState,
    films: FilmsState
}

export const reducers: ActionReducerMap<State> = {
    characters,
    films
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

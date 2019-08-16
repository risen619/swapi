import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { environment } from 'src/environments/environment';

import { reducer as characters, State as CharactersState } from './character.reducer';
import { reducer as films, State as FilmsState } from './film.reducer';
import { reducer as species, State as SpeciesState } from './species.reducer';
import { reducer as starships, State as StarshipsState } from './starship.reducer';

export interface State
{
    characters: CharactersState,
    films: FilmsState,
    species: SpeciesState,
    starships: StarshipsState
}

export const reducers: ActionReducerMap<State> = {
    characters,
    films,
    species,
    starships
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

import { Injectable } from '@angular/core';

import { ActionsSubject, Store } from '@ngrx/store';

import { of } from 'rxjs';
import { map, concatMap, take, flatMap } from 'rxjs/operators';

import { AsyncTracker } from './_asyncTracker';

import * as Actions from '../actions/species.actions';
import { State } from '../reducers';

@Injectable({ providedIn: 'root' })
export class SpeciesFacade extends AsyncTracker
{
    private _state = this.store.select(s => s.species);

    constructor(actionsSubject: ActionsSubject, private store: Store<State>)
    {
        super(actionsSubject);
    }

    get state() { return this._state; }

    get species() { return this.state.pipe(map(s => s.species)); }

    getOneSpecies(id: string)
    {
        const getOneSpecies = () => this.species.pipe(map(s => s[id]));

        return getOneSpecies().pipe(
            concatMap(s =>
            {
                if(s) return of(s);
                else
                {
                    this.store.dispatch(new Actions.LoadOneSpecies(id));
                    return this.trackAsyncAction(Actions.SpeciesActionTypes.LoadOneSpeciesSuccess, Actions.SpeciesActionTypes.LoadOneSpeciesFailed)
                    .pipe(take(1), flatMap(() => getOneSpecies()));
                }
            })
        );
    }

}

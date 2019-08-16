import { Injectable } from '@angular/core';

import { ActionsSubject, Store } from '@ngrx/store';

import { of } from 'rxjs';
import { map, concatMap, take, flatMap } from 'rxjs/operators';

import { AsyncTracker } from './_asyncTracker';

import * as Actions from '../actions/starship.actions';
import { State } from '../reducers';

@Injectable({ providedIn: 'root' })
export class StarshipFacade extends AsyncTracker
{
    private _state = this.store.select(s => s.starships);

    constructor(actionsSubject: ActionsSubject, private store: Store<State>)
    {
        super(actionsSubject);
    }

    get state() { return this._state; }

    get starships() { return this.state.pipe(map(s => s.starships)); }

    getStarship(id: string)
    {
        const getStarship = () => this.starships.pipe(map(s => s[id]));

        return getStarship().pipe(
            concatMap(s =>
            {
                if (s) return of(s);
                else
                {
                    this.store.dispatch(new Actions.LoadStarship(id));
                    return this.trackAsyncAction(Actions.StarshipActionTypes.LoadStarshipSuccess, Actions.StarshipActionTypes.LoadStarshipFailed)
                    .pipe(take(1), flatMap(() => getStarship()));
                }
            })
        );
    }
}

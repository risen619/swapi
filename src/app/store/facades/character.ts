import { Injectable } from '@angular/core';

import { Store, ActionsSubject } from '@ngrx/store';

import { of, throwError } from 'rxjs';
import { map, mergeMap, take, filter, flatMap, switchMap, concatMap } from 'rxjs/operators';

import * as Actions from '../actions/character.actions';
import { State } from '../reducers';

import { AsyncTracker } from './_asyncTracker';

@Injectable({ providedIn: 'root' })
export class CharacterFacade extends AsyncTracker
{
    private _state = this.store.select(s => s.characters);

    constructor(private store: Store<State>, actionsSubject: ActionsSubject)
    {
        super(actionsSubject);
    }

    get state() { return this._state; }

    get characters() { return this.state.pipe(map(s => s.characters)); }

    getCharacter(id: string)
    {
        const getCharacter = () => this.characters.pipe(map(c => c[id]));

        return getCharacter().pipe(
            concatMap(c =>
            {
                if(c) return of(c);
                else
                {
                    this.store.dispatch(new Actions.LoadCharacter(id));
                    return this.trackAsyncAction(
                        Actions.CharacterActionTypes.LoadCharacterSuccess, Actions.CharacterActionTypes.LoadCharacterFailed
                    ).pipe(take(1), flatMap(() => getCharacter()));
                }
            })
        );
    }

    requestCharacters()
    {
        this.store.dispatch(new Actions.LoadCharacters());
    }
}
import { Injectable } from "@angular/core";

import { ActionsSubject, Store } from '@ngrx/store';

import { of } from 'rxjs';
import { map, flatMap, take, concatMap } from 'rxjs/operators';

import { State } from '../reducers';
import * as Actions from '../actions/film.actions';

import { AsyncTracker } from './_asyncTracker';

@Injectable({ providedIn: 'root' })
export class FilmFacade extends AsyncTracker
{
    private _state = this.store.select(s => s.films);

    constructor(actionsSubject: ActionsSubject, private store: Store<State>)
    {
        super(actionsSubject);
    }

    get state() { return this._state; }

    get films() { return this.state.pipe(map(s => s.films)); }

    getFilm(id: string)
    {
        const getFilm = () => this.films.pipe(map(f => f[id]));

        return getFilm().pipe(
            concatMap(f =>
            {
                if(f) return of(f);
                else
                {
                    this.store.dispatch(new Actions.LoadFilm(id));
                    return this.trackAsyncAction(Actions.FilmActionTypes.LoadFilmSuccess, Actions.FilmActionTypes.LoadFilmFailed)
                    .pipe(take(1), flatMap(() => getFilm()));
                }
            })
        );
    }
}
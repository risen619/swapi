import { ActionsSubject, Action } from '@ngrx/store';

import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

export class AsyncTracker
{
    constructor(protected actionsSubject: ActionsSubject) { }

    protected trackAsyncAction(success: string, fail: string) : Observable<{ isSuccess: boolean, payload: any | void, type: string }>
    {
        return this.actionsSubject
        .pipe(
            filter((a: Action) => a.type === success || a.type === fail),
            map(a => ({ isSuccess: a.type === success, payload: null, ...a }))
        );
    }
}
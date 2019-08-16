import { NgModule } from '@angular/core';

import { StoreModule as NgRxStoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from 'src/environments/environment';

import { reducers, metaReducers } from './reducers';

import { CharacterEffects } from './effects/character.effects';
import { FilmEffects } from './effects/film.effects';
import { SpeciesEffects } from './effects/species.effects';
import { StarshipEffects } from './effects/starship.effects';

@NgModule({
	imports: [
		NgRxStoreModule.forRoot(reducers, {
			metaReducers,
			runtimeChecks: {
				strictStateImmutability: true,
				strictActionImmutability: true,
			}
		}),
		!environment.production ? StoreDevtoolsModule.instrument() : [],
		EffectsModule.forRoot([CharacterEffects, FilmEffects, SpeciesEffects, StarshipEffects])
	]
})
export class StoreModule { }
import { Component, Output, EventEmitter } from '@angular/core';
import { FilmFacade } from 'src/app/store/facades/film';
import { Subscription } from 'rxjs';
import { Film } from 'src/app/models/film';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
	selector: 'filters',
	templateUrl: './filters.component.html',
	styleUrls: ['./filters.component.scss']
})
export class FiltersComponent
{
	@Output() filtersChange = new EventEmitter<{ film: string }>();

	private sub: Subscription = new Subscription();
	private form: FormGroup;

	private films: Film[] = [];

	constructor(private filmsFacade: FilmFacade, fb: FormBuilder)
	{
		this.sub.add(this.filmsFacade.films.subscribe(f => this.films = Object.values(f)));

		this.form = fb.group({
			'film': ['']
		});

		this.sub.add(this.form.valueChanges.subscribe(() => this.filtersChange.emit(this.form.value)));
	}

	ngOnDestroy()
	{
		this.sub.unsubscribe();
	}
}

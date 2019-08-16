export interface SpeciesModel
{
	name: string;
	classification: string;
	designation: string;
	average_height: string;
	skin_colors: string;
	hair_colors: string;
	eye_colors: string;
	average_lifespan: string;
	homeworld: string;
	language: string;
	people: string[];
	films: string[];
	created: string;
	edited: string;
	url: string;
}

export class Species implements SpeciesModel
{
	private _data: SpeciesModel;
	private _id: string;

	constructor(data: SpeciesModel)
	{
		this._data = data;
        this._id = (this.url.match(/\/(\d+)\/?/) || [])[1];
	}

	get data() { return this._data; }

	get name() { return this._data.name; }
	set name(data: string) { this._data.name = data; }

	get classification() { return this._data.classification; }
	set classification(data: string) { this._data.classification = data; }

	get designation() { return this._data.designation; }
	set designation(data: string) { this._data.designation = data; }

	get average_height() { return this._data.average_height; }
	set average_height(data: string) { this._data.average_height = data; }

	get skin_colors() { return this._data.skin_colors; }
	set skin_colors(data: string) { this._data.skin_colors = data; }

	get hair_colors() { return this._data.hair_colors; }
	set hair_colors(data: string) { this._data.hair_colors = data; }

	get eye_colors() { return this._data.eye_colors; }
	set eye_colors(data: string) { this._data.eye_colors = data; }

	get average_lifespan() { return this._data.average_lifespan; }
	set average_lifespan(data: string) { this._data.average_lifespan = data; }

	get homeworld() { return this._data.homeworld; }
	set homeworld(data: string) { this._data.homeworld = data; }

	get language() { return this._data.language; }
	set language(data: string) { this._data.language = data; }

	get people() { return this._data.people; }
	set people(data: string[]) { this._data.people = data; }

	get films() { return this._data.films; }
	set films(data: string[]) { this._data.films = data; }

	get created() { return this._data.created; }
	set created(data: string) { this._data.created = data; }

	get edited() { return this._data.edited; }
	set edited(data: string) { this._data.edited = data; }

	get url() { return this._data.url; }
	set url(data: string) { this._data.url = data; }

	get id() { return this._id; }
}
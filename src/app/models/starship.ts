export interface StarshipModel
{
    name: string;
    model: string;
    manufacturer: string;
    cost_in_credits: string;
    length: string;
    max_atmosphering_speed: string;
    crew: string;
    passengers: string;
    cargo_capacity: string;
    consumables: string;
    hyperdrive_rating: string;
    MGLT: string;
    starship_class: string;
    pilots: any[];
    films: string[];
    created: string;
    edited: string;
    url: string;
}

export class Starship implements StarshipModel
{
    private _data: StarshipModel;
    private _id: string;

    constructor(data: StarshipModel)
    {
        this._data = data;
        this._id = (this.url.match(/\/(\d+)\/?/) || [])[1];
    }

    get data() { return this._data; }

    get name() { return this._data.name; }
    set name(data: string) { this._data.name = data; }
    
    get model() { return this._data.model; }
    set model(data: string) { this._data.model = data; }
    
    get manufacturer() { return this._data.manufacturer; }
    set manufacturer(data: string) { this._data.manufacturer = data; }
    
    get cost_in_credits() { return this._data.cost_in_credits; }
    set cost_in_credits(data: string) { this._data.cost_in_credits = data; }
    
    get length() { return this._data.length; }
    set length(data: string) { this._data.length = data; }
    
    get max_atmosphering_speed() { return this._data.max_atmosphering_speed; }
    set max_atmosphering_speed(data: string) { this._data.max_atmosphering_speed = data; }
    
    get crew() { return this._data.crew; }
    set crew(data: string) { this._data.crew = data; }
    
    get passengers() { return this._data.passengers; }
    set passengers(data: string) { this._data.passengers = data; }
    
    get cargo_capacity() { return this._data.cargo_capacity; }
    set cargo_capacity(data: string) { this._data.cargo_capacity = data; }
    
    get consumables() { return this._data.consumables; }
    set consumables(data: string) { this._data.consumables = data; }
    
    get hyperdrive_rating() { return this._data.hyperdrive_rating; }
    set hyperdrive_rating(data: string) { this._data.hyperdrive_rating = data; }
    
    get MGLT() { return this._data.MGLT; }
    set MGLT(data: string) { this._data.MGLT = data; }
    
    get starship_class() { return this._data.starship_class; }
    set starship_class(data: string) { this._data.starship_class = data; }
    
    get pilots() { return this._data.pilots; }
    set pilots(data: any[]) { this._data.pilots = data; }
    
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
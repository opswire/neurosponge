## NeuroSponge

## Deploy

- move .env.example -> .env
- make start
- make vendor
- make migrate
- make seed

----------

## Get all decks

- [GET] localhost:8888/api/v1/deck

### Filterable query params:
    - filter[search]=value
    - filter[author_id]=value
    - filter[category_id]=value

### Sortable query params:
    - sort[id]=asc|desc
    - sort[created_at]=asc|desc

### Paginate query params:
    - paginate=true|false
    - page=value
    - per_page=value

## Get deck by ID

- [GET] localhost:8888/api/v1/deck/{deckId}

## Register

- [POST] localhost:8888/api/v1/auth/register

### Body params
    - [required] email=value
    - [required] password=value

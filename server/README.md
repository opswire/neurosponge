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

## Get deck by ID

- [GET] localhost:8888/api/v1/deck/{deckId}

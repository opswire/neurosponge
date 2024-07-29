.PHONY: start vendor migrate rollback seed

PORT = 8888

# Билдит и поднимает сервер
start:
	docker compose up -d --build

# Обновляет все пакеты
vendor:
	docker compose run --rm sponge.test composer install

# Накатить миграцию
migrate:
	docker compose run --rm sponge.test php artisan migrate

# Откатить миграцию
rollback:
	docker compose run --rm sponge.test php artisan migrate:rollback

# Запустить seeder
seed:
	docker compose run --rm sponge.test php artisan db:seed

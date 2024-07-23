.PHONY: start up build vendor test echo

PORT = 8888

# Билдит и поднимает сервер
start:
	docker compose up -d --build

# Поднимает сервер
up:
	docker compose up -d

# Создает образ приложения
build:
	docker compose build

# Обновляет все пакеты
vendor:
	docker compose run --rm app composer install

# Запускает юнит-тесты
test:
	docker compose run --rm app bin/phpunit

# Тестовый endpoindt
echo:
	curl http://localhost:$(PORT)/api/echo

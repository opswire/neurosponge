.PHONY: up build vendor test echo

PORT = 8888

# Поднимает сервер
up: build
	docker-compose up -d

# Создает образ приложения
build:
	docker-compose build

# Обновляет все пакеты
vendor:
	docker-compose run --rm app composer install

# Запускает юнит-тесты
test:
	docker-compose run --rm app bin/phpunit

# Тестовый endpoindt
echo:
	curl http://localhost:$(PORT)/echo

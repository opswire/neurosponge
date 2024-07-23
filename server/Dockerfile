FROM php:8.3-fpm

# Установка зависимостей
RUN apt-get update && apt-get install -y \
   git \
   curl \
   unzip \
   libpq-dev \
   libonig-dev \
   libxml2-dev

# Установка расширений PHP
RUN docker-php-ext-install pdo pdo_pgsql mbstring xml

# Установка Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Установка рабочего каталога
WORKDIR /var/www/html

# Копирование файлов проекта
COPY . .

# Установка зависимостей проекта
RUN composer install --no-scripts --no-autoloader

# Генерация автозагрузчика
RUN composer dump-autoload --optimize

# Открытие порта 9000 для PHP-FPM
EXPOSE 9000

CMD ["php-fpm"]


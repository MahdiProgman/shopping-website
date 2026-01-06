#!/bin/sh

echo "Waiting for MySQL to be ready…"
while ! nc -z mysql_db 3306; do
  sleep 1
done

echo "Running migrations…"
npx sequelize-cli db:migrate

echo "Running seeders…"
npx sequelize-cli db:seed:all

echo "Starting server…"
exec "$@"

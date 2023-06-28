#!/bin/bash -x

# Prerequisite:
# export PGPASSWORD='PGPASSWORD'

# Reset staging db and clone prodution db
dropdb -U postgres -h edgein-test.cb64akwzxn73.us-east-2.rds.amazonaws.com  postgres -f || true
createdb -U postgres -h edgein-test.cb64akwzxn73.us-east-2.rds.amazonaws.com postgres
pg_dump -U postgres -h edgein-1.cb64akwzxn73.us-east-2.rds.amazonaws.com  postgres \
--exclude-table-data actions --exclude-table-data data_raw --exclude-table-data data_runs \
--exclude-table-data notification_actions --exclude-table temp*\
 | psql -U postgres -h edgein-test.cb64akwzxn73.us-east-2.rds.amazonaws.com postgres

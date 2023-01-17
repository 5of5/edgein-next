#!/bin/bash -x

# Prerequisite:
# git checkout to target branch
# export PGPASSWORD='PGPASSWORD'
# export ADMIN_SECRET='HASURA_ADMIN_SECRET'

# Reset staging db and clone prodution db
dropdb -U postgres -h edgein-test.cb64akwzxn73.us-east-2.rds.amazonaws.com  postgres -f || true
createdb -U postgres -h edgein-test.cb64akwzxn73.us-east-2.rds.amazonaws.com postgres
pg_dump -U postgres -h edgein-1.cb64akwzxn73.us-east-2.rds.amazonaws.com  postgres | psql -U postgres -h edgein-test.cb64akwzxn73.us-east-2.rds.amazonaws.com postgres

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
cd  $SCRIPT_DIR/../infra/hasura
# Apply new migrations of target branch (all migrations of production is applied already when we clone db)
npx hasura migrate apply --endpoint https://test.edgein.dev  --admin-secret $HASURA_ADMIN_SECRET --database-name default
# Clear and apply metadata of target branch
npx hasura metadata clear --endpoint https://test.edgein.dev  --admin-secret $HASURA_ADMIN_SECRET
npx hasura metadata apply --endpoint https://test.edgein.dev  --admin-secret $HASURA_ADMIN_SECRET

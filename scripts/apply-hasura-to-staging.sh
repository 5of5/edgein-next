#!/bin/bash -x

# Prerequisite:
# git checkout to target branch
# export ADMIN_SECRET='HASURA_ADMIN_SECRET'

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
cd  $SCRIPT_DIR/../infra/hasura
# Apply new migrations of target branch (all migrations of production is applied already when we clone db)
npx hasura migrate apply --endpoint https://test.edgeindev.com  --admin-secret $HASURA_ADMIN_SECRET \
--database-name default --skip-update-check
# Clear and apply metadata of target branch
npx hasura metadata clear --endpoint https://test.edgeindev.com  --admin-secret $HASURA_ADMIN_SECRET --skip-update-check
npx hasura metadata apply --endpoint https://test.edgeindev.com  --admin-secret $HASURA_ADMIN_SECRET --skip-update-check

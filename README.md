# EdgeIn.io

## Web3-focused data intelligence for success.

EdgeIn combines highly refined automated processes, the personalization of human intelligence, and the meaningful utility of blockchain technologies, to give you an unparalleled edge in Web3.

Learn more at [EdgeIn.io](http://edgein.io/)

### Getting Started

- Install node 16
- Run `npm run docker:start`, this should build a local database and hasura engine
- Run `npm run dev`, this will start next.js

## Editting Graphql 

- Make changes .graphql file (NOT TO EDIT types.ts)
- Make sure a local instance of hasura is running
- Run `npm run codegen` this will generate a 

## Migrations
- Run `npm run hasura migrate apply`
- Run `npm run hasura metadata apply`

## Creating Migrations
- Run `npm run hasura console`
- Use the hasura console to create the migration files

### Remove Hasura migrations
This will update the `schema.sql` file to have all current migrations
applied, and deletes them so that we don't reapply them.
1. Create a "clean" Hasura instance locally:
1. Dump the schemas and select Hasura metadata:
   ```
   pg_dump -h localhost -p 5432 -U edgeu \
       --exclude-table-data "hdb_catalog.*log*" \
       --exclude-table-data hdb_catalog.hdb_schema_update_event \
       --schema public --schema hdb_catalog --schema hdb_views -v -f ./infra/hasura/dev-bootstrap/schema.sql edgedb
   ```
1. Comment out `CREATE SCHEMA public` so that it won't error when it's loaded by docker.
1. Delete old migrations:
   ```
   rm -rf hasura/migrations/*
   ```
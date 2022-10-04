# EdgeIn.io

## Web3-focused data intelligence for success.

EdgeIn combines highly refined automated processes, the personalization of human intelligence, and the meaningful utility of blockchain technologies, to give you an unparalleled edge in Web3.

Learn more at [EdgeIn.io](http://edgein.io/)

## Getting Started

### Install Node 16

https://nodejs.org/en/download/

### Install docker-desktop 

https://docs.docker.com/desktop/ 

If you already have docker installed make sure the following command runs: 
```
docker compose version
```
any issues and you probably have an outdated docker install (command used to be docker-compoose)

### Start Docker containers 
```
npm run docker:start
```
this should build a local database and hasura engine. Check they are up with:
```
docker ps
```
your output should look something like:
```
968caa7ae2fe   postgres:14.1                  "docker-entrypoint.s…"   23 hours ago   Up 23 hours (healthy)   0.0.0.0:5432->5432/tcp   infra-postgres-1
de3c3c77c736   hasura/graphql-engine:v2.7.0   "graphql-engine serve"   23 hours ago   Up 23 hours             0.0.0.0:8080->8080/tcp   infra-graphql-engine-1
```

### Start Next App 
```
npm run dev
``` 

## Editing Graphql

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

# EdgeIn.io

## Web3-focused data intelligence for success.

EdgeIn combines highly refined automated processes, the personalization of human intelligence, and the meaningful utility of blockchain technologies, to give you an unparalleled edge in Web3.

Learn more at [EdgeIn.io](http://edgein.io/)

## Getting Started

### Install Node 16

https://nodejs.org/en/download/

### Install Docker-Desktop 

https://docs.docker.com/desktop/ 

If you already have docker installed make sure the following command runs: 
```
docker compose version
```
any issues and you probably have an outdated docker install (command used to be docker-compose)

### Start Docker Containers 
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
The Hasura web console should now be available at `http://localhost:8080`. Check `/infra/hasura/config.yaml` for the password.

### Load Schema and Initial Data
This is taken care of using the `docker-entrypoint-initdb.d` directory populated from `infra/hasura/bootstrap-dev`. No further action should be required.

### Run Migrations
```
npm run hasura migrate apply
npm run hasura metadata apply
```

### Start Next App 
```
npm install
npm run dev
``` 

### Creating a User
- Open the Hasura admin panel and navigate to the "allowed_emails" table, then add a row with your email address. 
- Return to the local site and signup as normal
- Check your email and validate the email address with Auth0
- Open the local app admin at
```
http://localhost:3000/admin/app
```
- Find your user in the users table, click edit and change the role to admin
- Login!!!

NOTE: once an email is registed with Auth0 if you delete the user from the local database and try to use it again the signup will fail. You will need to use another address.


### Companies
Although the database will be initialized with some seed data all the companies are in draft. To change this in bulk connect to the PG instance in docker using:
```
docker exec -it bash [CONTAINER_ID found from docker ps]
```
Once logged into the instance run:
```
psql -U edgeu -d edgedb
```
This will log you into the postgres cli, then you can update all the companies using:
```
UPDATE companies SET status='published' WHERE status='draft';
```

## Local Scripts
There are multiple helper scripts in the scripts directory. To run these you will need a .env file. Ask for this. You can then run:
```
npx ts-node ./awesome-script.ts
```

## Hasura / GraphQL

### Editing Graphql

- Make changes .graphql file (NOT TO EDIT types.ts)
- Make sure a local instance of hasura is running
- Run `npm run codegen` this will generate a

### Creating Migrations

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

## AWS

### DNS / Domains
All managed in Route 53

### GraphQL
ELB and EC2 cluster hosted in US-East-2

### Jenkins
ELB and EC2 hosted in US-West-2
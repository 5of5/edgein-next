# EdgeIn.io

## Web3-focused data intelligence for success.

Mentibus combines highly refined automated processes, the personalization of human intelligence, and the meaningful utility of blockchain technologies, to give you an unparalleled edge in Web3.

Learn more at [EdgeIn.io](http://edgein.io/)

## Getting Started

### Install Node 18

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
872fe454e029   redis:6.2-alpine               "docker-entrypoint.s…"   5 minutes ago  Up 5 minutes           0.0.0.0:6379->6379/tcp   infra-cache-1
968caa7ae2fe   postgres:14.1                  "docker-entrypoint.s…"   23 hours ago   Up 23 hours (healthy)   0.0.0.0:5432->5432/tcp   infra-postgres-1
de3c3c77c736   hasura/graphql-engine:v2.7.0   "graphql-engine serve"   23 hours ago   Up 23 hours             0.0.0.0:8080->8080/tcp   infra-graphql-engine-1
```

The Hasura web console should now be available at `http://localhost:8080`. Check `/infra/hasura/config.yaml` for the password.
The redis server is running on `127.0.0.1:6379` for applying rate limit. Now can test graphql_query api locally.

### Load Schema and Initial Data

This is taken care of using the `docker-entrypoint-initdb.d` directory populated from `infra/hasura/bootstrap-dev`. No further action should be required.

### Run Migrations

```
npm run hasura migrate apply
npm run hasura metadata apply
```

### Load Hasura Console to check metadata status

```
npm run hasura console
```

### Load seed data

```
cd scripts/db/
sh ./load-seed-data.sh
```

### Start Next App

```
npm install
npm run dev
```

### Creating a User

- Open local site and signup as normal
- Check your email and validate the email address with Auth0
- Open hasura console and can role in the users table to admin
- Open the local app admin at

```
https://staging.edgein.dev/admin/app/
```

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

## Staging environment

Staging is an environment that mimics the production environment, where developers can test their applications before deploying them to the live environment. It is a replica of the production environment, with similar hardware and software configurations.

The purpose of staging is to ensure that the application works as expected in a real-world scenario. It allows developers to test their applications in an environment that is similar to the production environment, which increases the chances of identifying any issues before the application is released to the public.

Using a staging environment also helps improve the quality of the application. It enables developers to test new features, updates, or changes made to the application before they are deployed to the live environment. This ensures that the application is fully functional and meets the requirements of the end-users.

In conclusion, staging is an essential part of the development process. It allows developers to test their applications in a safe and controlled environment, reducing the risk of potential issues when deploying to the live environment. Using a staging environment improves the quality of the application and ensures that it meets the requirements of the end-users.

More information about the staging environment can be found in a [Notion documentation](https://www.notion.so/edgeinio/Staging-af8a640ce2854a199a2dc754891aa810).

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

Managed in Route 53 and vercel

### GraphQL

ELB and EC2 cluster hosted in US-East-2

### Jenkins

ELB and EC2 hosted in US-West-2

### redis server

EC2 hosted in US-West-2

## API

### submit-data

This API allows partners upsert/delete edgein data.
Partner need to be added in data_partners table, then using their api_key to request

#### Upsert data

curl --location --request POST 'https://edgein.io/api/submit-data/' --header 'Content-Type: application/json' --data-raw '{
"partner_api_key": "<api_key>",
"resource_type": "<resource_type>",
"resource_identifier": <list_of_filters>,
"resource": {<resource_obj>}
}'

Each filter of <list_of_filters> is a json: {"field": <column_name>, "value": <value_to_filter>, "method": "<graphql_filter_method>"}
method is optional, default value is "\_eq"

<resource_obj> is a json {"< field >": < value >}

Only support for < resource_type >.< field > that's available in data_fields table.
The value can be transform if transform pattern is set in data_fields table for this field.
If "< field >" is "< other_resource_type >:< other_field >" pattern, the "< field >" will be converted into "< other_resource_type >\_id"
and new < value > will be changed to id of other_resource_type record which contains input < value >
For example: Before using resource data, {"companies:name": "TEST_NAME"} will be converted into {"company_id": "1"}
where company#1 name is "TEST_NAME"

<list_of_filters> and <resource_obj> can be an array also (their lenghts must be equal), then each item is one record

Allow relationship in resource object, if <field> is other resource type. New record of other resource will be inserted with relation to main resource id

For example: When input a list of resource field with relationship field for creating news that support creating relationship looks like as below:
curl --location 'https://edgein.io/api/submit_data' \
--header 'Content-Type: application/json' \
--data '{
"partner_api_key": "<api_key>",
"resource_type": "news",
"resource_identifier":[[{"field": "id"}], [{"field": "id"}]],
"resource":[
{
"text": "test1",
"metadata": {"description": "Li Ning bought 10 Bitcoin"},
"news_person": {"people:name": "Jacob Abraham"}
},
{
"text": "test2",
"metadata": {"description": "Peter Wuffli bouhgt 9 Bitcoin"}
}
]
}'

#### Delete data

curl --location --request DELETE 'https://edgein.io/api/submit-data/' --header 'Content-Type: application/json' --data-raw '{
"partner_api_key": "<api_key>",
"resource_type": "<resource_type>",
"resource_identifier":[<list_of_filters>]
}'

<list_of_filters> can be an array also, then each item is one to be deleted record

## Scripts

### Prerequisite

Create .env in scripts directory then cd this directory and run npx ts-node < scripts >

### Update data fields table

Add below env variables
PG_USER=< PG_USER >
PG_HOST=< PG_HOST >
PG_DATABASE=< PG_DATABASE >
PG_DATABASE=< PG_DATABASE >
PG_PORT=< PG_PORT >
Then run the script update_data_fields.ts

### Clone prodution DB to staging DB

#### Run at local

export PGPASSWORD='PGPASSWORD'
export ADMIN_SECRET='HASURA_ADMIN_SECRET'
bash clone-db-from-production-to-staging.sh

#### Trigger jenkins job

Trigger job at https://jenkins.edgein.dev/job/Clone%20DB%20from%20production%20tp%20staging/

### Apply hasura of working branch to staging

git checkout to target branch
export ADMIN_SECRET='HASURA_ADMIN_SECRET'
bash apply-hasura-to-staging.sh

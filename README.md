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
Managed in Route 53 and vercel

### GraphQL
ELB and EC2 cluster hosted in US-East-2

### Jenkins
ELB and EC2 hosted in US-West-2

### redis server
EC2 hosted in US-West-2

## API

### submit-data
This API allows partners insert/update/delete edgein data.
Partner need to be added in data_partners table, then using their api_key o request

#### Insert data
curl --location --request POST 'https://edgein.io/api/submit_data/' --header 'Content-Type: application/json' --data-raw '{
    "partner_api_key": "<api_key>",
    "resource_type": "<resource_type>",
    "resource_identifier":[{"field": "id"}],
    "resource": {<resource_obj>}
}'

<resource_obj> is a json {"< field >": < value >} or it can be an array of json [ {"< field >": < value >} , {"< field >": < value >} , ...]
Support allowing a list input of resource field. The value in array should have the same resource type. If any object in array fails validation, The result will respond the failed object and remaining elements which locate after failed object still not yet validate and insert into database.

Only support for < resource_type >.< field > that's available in data_fields table.
The value can be transform if transform pattern is set in data_fields table for this field.
If "< field >" is "< other_resource_type >:< other_field >" pattern, the "< field >" will be converted into "< other_resource_type >_id"
and new < value > will be changed to id of other_resource_type record which contains input < value >
For example: Before using resource data, {"companies:name": "TEST_NAME"} will be converted into {"company_id": "1"}
where company 1 name is "TEST_NAME"

Support for allowing to create relationships when submitting a news item user can specific tickers or other identifiers for people and companies and the api should automatically do the lookup and create the news_organisations record. Only support to create relationships for people and team_members , news and news_organizations.

For example: when creating a new person in people table. Also providing team_members's values object. Api will automatically create new item record in team_members table. {<resource_obj>} looks like as below:
"resource":{
  <people_obj>,
  "team_members":{
     "companies:name": "TEST_NAME",
  }
}

Support for allowing to create relationships with relationship field can be a string or an array of strings.
"resource":{
  <people_obj>,
  "team_members":{
     "companies:name": ["TEST_NAME", "TEST_NAME", ...],
  }
}

For example: When input a list of resource field with relationship field for creating news that support creating relationship looks like as below:
curl --location 'https://edgein.io/api/submit_data' \
--header 'Content-Type: application/json' \
--data '{
"partner_api_key": "<api_key>",
"resource_type": "<resource_type>",
"resource_identifier":[{"field": "id"}],
"resource":[{
  "text": "<value>",
  "link": "<value>",
  "date": "<value>",
  "status": "<value>",
  "news_organizations":{
  "companies:name": [ "<value>" , "<value>" , ... ], "vc_firms:name": [ "<value>" , "<value>" , ... ] }
},
{
  "text": "<value>",
  "link": "<value>",
  "date": "<value>",
  "status": "<value>",
  "news_organizations":{
  "companies:name": [ "<value>" , "<value>" , ... ], "vc_firms:name": [ "<value>" , "<value>" , ... ] }
},...
]
}'

#### Update data
curl --location --request POST 'https://edgein.io/api/submit_data/' --header 'Content-Type: application/json' --data-raw '{
    "partner_api_key": "<api_key>",
    "resource_type": "<resource_type>",
    "resource_identifier":[<list_of_filters>],
    "resource":{<resource_obj>}
}'

Each filter of <list_of_filters> is a json: {"field": <column_name>, "value": <value_to_filter>, "method": "<graphql_filter_method>"}
method is optional, default value is "_eq"

#### Delete data
curl --location --request DELETE 'https://edgein.io/api/submit_data/' --header 'Content-Type: application/json' --data-raw '{
    "partner_api_key": "<api_key>",
    "resource_type": "<resource_type>",
    "resource_identifier":[<list_of_filters>]
}'


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
git checkout to target branch
export PGPASSWORD='PGPASSWORD'
export ADMIN_SECRET='HASURA_ADMIN_SECRET'
bash clone_db_from_production_to_staging.sh
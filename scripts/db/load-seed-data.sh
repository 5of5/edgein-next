#!/bin/bash

# Set the default hostname to localhost
hostname=${PG_HOST:-localhost}

psql -U edgeu -h $hostname -d edgedb < 2-companies_file.sql
psql -U edgeu -h $hostname -d edgedb < 3-people_file.sql
psql -U edgeu -h $hostname -d edgedb < 4-vc_firms_file.sql
psql -U edgeu -h $hostname -d edgedb < 5-team_members_file.sql
psql -U edgeu -h $hostname -d edgedb < 6-investment_rounds_file.sql
psql -U edgeu -h $hostname -d edgedb < 7-investments_file.sql
psql -U edgeu -h $hostname -d edgedb < 8-events_file.sql
psql -U edgeu -h $hostname -d edgedb < 9-news_file.sql
psql -U edgeu -h $hostname -d edgedb < 10-users_file.sql
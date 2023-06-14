#!/bin/bash -x

# Prerequisite:
# git checkout to target branch
# export PGPASSWORD='PGPASSWORD'
# export ADMIN_SECRET='HASURA_ADMIN_SECRET'

# CREATE TABLE temp_companies AS select * from companies where status = 'published' and companies.id IN (SELECT company_id from investment_rounds) and companies.id IN (SELECT company_id from team_members) limit 100;
# pg_dump -U postgres -h edgein-1.cb64akwzxn73.us-east-2.rds.amazonaws.com -t temp_companies --data-only postgres > companies_file.sql
# create table temp_team_members as SELECT * from team_members where team_members.company_id IN (SELECT id from temp_companies);
# pg_dump -U postgres -h edgein-1.cb64akwzxn73.us-east-2.rds.amazonaws.com -t temp_team_members --data-only postgres > team_members_file.sql
# create table temp_people as SELECT * from people where people.id IN (SELECT person_id from temp_team_members);
# pg_dump -U postgres -h edgein-1.cb64akwzxn73.us-east-2.rds.amazonaws.com -t temp_people --data-only postgres > people_file.sql
# create table temp_investment_rounds as SELECT * from investment_rounds where investment_rounds.company_id IN (SELECT id from temp_companies);
# pg_dump -U postgres -h edgein-1.cb64akwzxn73.us-east-2.rds.amazonaws.com -t temp_investment_rounds --data-only postgres > investment_rounds_file.sql
# create table temp_investments as SELECT * from investments where investments.round_id IN (SELECT id from temp_investment_rounds);
# pg_dump -U postgres -h edgein-1.cb64akwzxn73.us-east-2.rds.amazonaws.com -t temp_investments --data-only postgres > investments_file.sql
# create table temp_vc_firms as SELECT * from vc_firms where vc_firms.id IN (SELECT vc_firm_id from temp_investments);
# pg_dump -U postgres -h edgein-1.cb64akwzxn73.us-east-2.rds.amazonaws.com -t temp_vc_firms --data-only postgres > vc_firms_file.sql
# create table temp_events as SELECT * from events limit 50;
# pg_dump -U postgres -h edgein-1.cb64akwzxn73.us-east-2.rds.amazonaws.com -t temp_events --data-only postgres > events_file.sql
# create table temp_news as SELECT * from news limit 50;
pg_dump -U postgres -h edgein-1.cb64akwzxn73.us-east-2.rds.amazonaws.com -t temp_news --data-only postgres > news_file.sql
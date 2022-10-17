alter table "public"."companies" alter column "slug" set not null;
alter table "public"."companies" add constraint "companies_slug_key" unique ("slug");

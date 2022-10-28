alter table "public"."vc_firms" add constraint "vc_firms_slug_key" unique ("slug");
alter table "public"."vc_firms" alter column "slug" set not null;

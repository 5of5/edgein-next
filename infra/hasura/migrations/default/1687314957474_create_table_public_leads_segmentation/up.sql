CREATE TABLE "public"."leads_segmentation" (
"id" serial NOT NULL,
"name" text NULL,
"description" text NULL,
"sql" text NULL,
"campaign_id" text NOT NULL,
"status" text NOT NULL DEFAULT 'inactive'::text,
"created_at" date NOT NULL DEFAULT now(),
"updated_at" date NOT NULL DEFAULT now(),
PRIMARY KEY ("id"),
UNIQUE ("name")
);

CREATE trigger set_public_leads_segmentation_updated_at before
UPDATE
    ON
    public.leads_segmentation for each row execute function set_current_timestamp_updated_at();

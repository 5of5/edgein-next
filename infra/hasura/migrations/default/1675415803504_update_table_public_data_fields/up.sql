ALTER TABLE public.actions ALTER COLUMN "user" DROP NOT NULL;
ALTER TABLE public.data_raw ALTER COLUMN user_id DROP NOT NULL;
UPDATE public.data_fields SET is_valid_identifier=true WHERE "path"='company.website';
UPDATE public.data_fields SET is_valid_identifier=true WHERE "path"='vc_firm.website';
INSERT INTO "public"."data_fields"("name", "path", "resource", "weight", "regex_transform", "description", "regex_test", "is_valid_identifier", "restricted_admin") VALUES 
(E'geopoint', E'company.geopoint', E'company', 1, null, null, null, false, false),
(E'ticker', E'coin.ticker', E'coin', 1, null, null, null, false, false),
(E'name', E'coin.name', E'coin', 1, null, null, null, false, false),
(E'blockchain_id', E'coin.blockchain_id', E'coin', 1, null, null, null, false, false),
(E'company_id', E'coin.company_id', E'coin', 1, null, null, null, false, false),
(E'type', E'coin.type', E'coin', 1, null, null, null, false, false),
(E'name', E'blockchain.name', E'blockchain', 1, null, null, null, false, false);

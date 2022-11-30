DELETE FROM "public"."data_fields"
WHERE "path" IN
(
  'company.status',
  'company.created_at',
  'company.updated_at',
  'vc_firm.external_id',
  'vc_firm.status',
  'vc_firm.created_at',
  'vc_firm.updated_at',
  'people.external_id',
  'people.status',
  'people.created_at',
  'people.updated_at'
);

INSERT INTO "public"."data_fields"
  ("name", "path", "resource", "weight")
VALUES
  -- new companies fields
  (E'bitcointalk', E'company.bitcointalk', E'company', 1),
  (E'facebook', E'company.facebook', E'company', 1),
  (E'instagram', E'company.instagram', E'company', 1),
  (E'medium', E'company.medium', E'company', 1),
  (E'reddit', E'company.reddit', E'company', 1),
  (E'telegram', E'company.telegram', E'company', 1),
  (E'youtube', E'company.youtube', E'company', 1),
  (E'blockchain_explorer', E'company.blockchain_explorer', E'company', 1),
  (E'status_tags', E'company.status_tags', E'company', 1),
  -- new vc_firms fields
  (E'latest_investment', E'vc_firm.latest_investment', E'vc_firm', 1),
  (E'status_tags', E'vc_firm.status_tags', E'vc_firm', 1),
  -- new people fields
  (E'website_url', E'people.website_url', E'people', 1),
  (E'twitter_url', E'people.twitter_url', E'people', 1),
  (E'facebook_url', E'people.facebook_url', E'people', 1),
  (E'about', E'people.about', E'people', 1),
  (E'city', E'people.city', E'people', 1),
  (E'country', E'people.country', E'people', 1),
  (E'email', E'people.email', E'people', 1),
  -- team_members fields
  (E'company_id', E'team_member.company_id', E'team_member', 1),
  (E'person_id', E'team_member.person_id', E'team_member', 1),
  (E'start_date', E'team_member.start_date', E'team_member', 1),
  (E'end_date', E'team_member.end_date', E'team_member', 1),
  (E'founder', E'team_member.founder', E'team_member', 1),
  (E'function', E'team_member.function', E'team_member', 1),
  (E'seniority', E'team_member.seniority', E'team_member', 1),
  (E'title', E'team_member.title', E'team_member', 1),
  -- investors fields
  (E'vc_firm_id', E'investor.vc_firm_id', E'investor', 1),
  (E'person_id', E'investor.person_id', E'investor', 1),
  (E'function', E'investor.function', E'investor', 1),
  (E'start_date', E'investor.start_date', E'investor', 1),
  (E'end_date', E'investor.end_date', E'investor', 1),
  (E'seniority', E'investor.seniority', E'investor', 1),
  (E'title', E'investor.title', E'investor', 1),
  -- investments fields
  (E'round_id', E'investment.round_id', E'investment', 1),
  (E'person_id', E'investment.person_id', E'investment', 1),
  (E'vc_firm_id', E'investment.vc_firm_id', E'investment', 1),
  (E'amount', E'investment.amount', E'investment', 1),
  -- investment_rounds fields
  (E'company_id', E'investment_round.company_id', E'investment_round', 1),
  (E'round_date', E'investment_round.round_date', E'investment_round', 1),
  (E'round', E'investment_round.round', E'investment_round', 1),
  (E'amount', E'investment_round.amount', E'investment_round', 1),
  (E'valuation', E'investment_round.valuation', E'investment_round', 1),
  (E'currency', E'investment_round.currency', E'investment_round', 1);

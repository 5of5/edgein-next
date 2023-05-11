CREATE TYPE resource_type1_enum AS ENUM ( 'company', 'vc_firm', 'people', 'blockchain', 'coin', 'investment_round', 'investment', 'team_member', 'investor', 'event', 'event_person', 'event_organization', 'resource_link', 'news', 'news_organization', 'news_person');
ALTER TABLE data_fields
  ALTER COLUMN resource
    SET DATA TYPE resource_type1_enum
    USING resource::text::resource_type1_enum;

CREATE TYPE resource_type_enum AS ENUM ( 'companies', 'vc_firms', 'people', 'blockchains', 'coins', 'investment_rounds', 'investments', 'team_members', 'investors', 'events', 'event_person', 'event_organization', 'resource_links', 'news', 'news_organizations', 'news_person');
ALTER TABLE data_discard
  ALTER COLUMN resource
    SET DATA TYPE resource_type_enum
    USING resource::text::resource_type_enum;

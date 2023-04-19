INSERT INTO public.data_fields ("name", "path", resource, weight) VALUES
    ('source', 'news.source', 'news', 1),
    ('created_at', 'news.created_at', 'news', 1),
    ('is_publisher', 'news_organization.is_publisher', 'news_organization', 1);

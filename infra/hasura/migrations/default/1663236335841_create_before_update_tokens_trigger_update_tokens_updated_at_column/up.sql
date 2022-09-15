CREATE TRIGGER update_tokens_updated_at_column BEFORE UPDATE ON tokens FOR EACH ROW EXECUTE PROCEDURE  update_updated_at_column();

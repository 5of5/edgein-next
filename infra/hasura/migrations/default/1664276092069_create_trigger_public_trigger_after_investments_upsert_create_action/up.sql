CREATE TRIGGER trigger_after_investments_insert_create_action
  AFTER INSERT
  ON public.investments
  FOR EACH ROW
  EXECUTE PROCEDURE public.after_upsert_investments_create_action();
  
CREATE TRIGGER trigger_after_investments_update_create_action
  AFTER UPDATE
  ON public.investments
  FOR EACH ROW
  EXECUTE PROCEDURE public.after_upsert_investments_create_action();

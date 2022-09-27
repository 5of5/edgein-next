CREATE TRIGGER trigger_after_investor_insert_create_action
  AFTER INSERT
  ON public.investors
  FOR EACH ROW
  EXECUTE PROCEDURE public.after_insert_investor_create_action();

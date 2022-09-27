CREATE TRIGGER trigger_after_vc_firm_update_create_action
  AFTER UPDATE
  ON public.vc_firms
  FOR EACH ROW
  EXECUTE PROCEDURE public.after_update_vc_firm_create_action();

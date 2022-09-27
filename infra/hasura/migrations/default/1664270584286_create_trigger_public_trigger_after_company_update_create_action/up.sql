CREATE TRIGGER trigger_after_company_update_create_action
  AFTER UPDATE
  ON public.companies
  FOR EACH ROW
  EXECUTE PROCEDURE public.after_update_companies_create_action();

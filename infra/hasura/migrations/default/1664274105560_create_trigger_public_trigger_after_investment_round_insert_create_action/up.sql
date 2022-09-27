CREATE TRIGGER trigger_after_investment_round_insert_create_action
  AFTER INSERT
  ON public.investment_rounds
  FOR EACH ROW
  EXECUTE PROCEDURE public.after_insert_investment_round_create_action();

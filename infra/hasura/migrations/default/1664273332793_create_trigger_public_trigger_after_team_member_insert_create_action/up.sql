CREATE TRIGGER trigger_after_team_member_insert_create_action
  AFTER INSERT
  ON public.team_members
  FOR EACH ROW
  EXECUTE PROCEDURE public.after_insert_team_member_create_action();

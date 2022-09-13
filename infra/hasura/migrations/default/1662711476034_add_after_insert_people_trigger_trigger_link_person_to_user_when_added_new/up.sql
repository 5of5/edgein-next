CREATE OR REPLACE TRIGGER trigger_link_person_to_user_when_added_new
AFTER INSERT ON public.people
FOR EACH ROW
EXECUTE PROCEDURE link_person_to_user_when_added_new();

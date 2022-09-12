CREATE OR REPLACE TRIGGER trigger_link_person_to_user_when_new_user_added
AFTER INSERT ON public.users
FOR EACH ROW
EXECUTE PROCEDURE link_person_to_user_when_new_user_added();

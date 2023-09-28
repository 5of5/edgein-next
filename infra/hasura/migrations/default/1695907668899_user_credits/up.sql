CREATE OR REPLACE FUNCTION public.user_credits(user_row users)
 RETURNS numeric
 LANGUAGE plpgsql
 STABLE
AS $function$
DECLARE
    user_credits integer;
BEGIN
    user_credits := (SELECT SUM(amount) FROM user_transactions WHERE user_id = user_row.id AND created_at >= '2023-07-19T00:00:00.000000+00:00');
    IF user_credits < 0 OR user_credits IS NULL THEN
        RETURN 0;
    END IF;
    RETURN user_credits;
END;
$function$;

CREATE OR REPLACE FUNCTION public.user_credits(user_row users)
 RETURNS numeric
 LANGUAGE plpgsql
 STABLE
AS $function$
DECLARE
    referral_count integer;
    first_referral timestamp;
    days_since_first_referral integer;
BEGIN
    referral_count := (SELECT COUNT(*) FROM users WHERE reference_user_id = user_row.id AND created_at >= '2023-07-19T00:00:00.000000+00:00');
    IF referral_count = 0 THEN
        RETURN 0;
    END IF;
    first_referral := (SELECT MIN(created_at) FROM users WHERE reference_user_id = user_row.id);
    days_since_first_referral := EXTRACT(DAY FROM current_timestamp - first_referral);
    RETURN referral_count * 14.99 - (days_since_first_referral / 30) * 14.99;
END;
$function$;

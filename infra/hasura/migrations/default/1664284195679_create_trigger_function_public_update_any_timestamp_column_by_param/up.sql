-- trigger function to update timestamp column by specifying
-- column name as argument
CREATE OR REPLACE FUNCTION update_any_timestamp_column_by_param()
  RETURNS trigger
  LANGUAGE plpgsql AS
$func$
BEGIN
   NEW := json_populate_record(NEW, json_build_object(TG_ARGV[0], now()));
   RETURN NEW;
END
$func$;

-- trigger
CREATE TRIGGER update_read_at
BEFORE UPDATE OF read_flag
ON public.user_notifications
FOR EACH ROW
EXECUTE FUNCTION update_any_timestamp_column_by_param('read_at');

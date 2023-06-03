
ALTER TABLE investment_rounds ALTER COLUMN round_date TYPE date USING round_date::date;

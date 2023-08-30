update companies set tags = tags || '["NEAR/OWC"]' where tags ? 'NEAR';
update companies set tags = tags - 'NEAR' where tags ? 'NEAR';

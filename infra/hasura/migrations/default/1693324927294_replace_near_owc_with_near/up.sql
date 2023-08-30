update companies set tags = tags || '["NEAR"]' where tags ? 'NEAR/OWC';
update companies set tags = tags - 'NEAR/OWC' where tags ? 'NEAR/OWC';

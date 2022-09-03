update actions set "user" = u.id FROM "users" as u where u.email = actions.user;

-- below script initializes the system with root user
insert into "company"("id", "name", "logo") values(1, "admin", "");
insert into "project"("id", "name", "companyId") values(1, "admin", 1);
insert into "team"("id", "name", "sprint", "goal", "companyId", "projectId") values (1, "admin", "", "", 1, 1);
insert into "user"("id", "name", "email", "password", "image", "mobile", "role", "teamId", "projectId", "companyId") values (1, "admin", "admin@admin.com", "password", "", "", "ADMIN", 1, 1, 1);
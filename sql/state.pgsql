-- below script initializes the system with root user

-- SELECT adsrc FROM pg_attrdef WHERE adrelid = (SELECT oid FROM pg_class WHERE relname = 'userr');

ALTER SEQUENCE userr_id_seq RESTART WITH 1000;
ALTER SEQUENCE team_id_seq RESTART WITH 1000;
ALTER SEQUENCE project_id_seq RESTART WITH 1000;
ALTER SEQUENCE company_id_seq RESTART WITH 1000;

insert into company(id, name, logo) values(1, 'admin', null);
insert into project(id, name, companyId) values(1, 'admin', 1);
insert into team(id, name, sprint, goal, companyId, projectId) values (1, 'admin', null, null, 1, 1);
insert into userr(id, name, email, password, image, mobile, role, teamId, projectId, companyId) values (1, 'admin', 'admin@admin.com', 'password', null, null, 'ADMIN', 1, 1, 1);
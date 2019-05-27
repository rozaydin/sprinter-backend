insert into company(name, logo) values('Siemens', null) returning id;
insert into project(name, companyId) values('MindSphere', 1000) returning id;
insert into team(name, sprint, goal, companyId, projectId) values ('Team 7', null, null, 1000, 1000) returning id;
insert into userr(name, email, password, image, mobile, role, teamId, projectId, companyId) values ('Ridvan Ozaydin', 'ridvan.ozaydin@siemens.com', 'password', null, null, 'DEV', 1000, 1000, 1000) returning id;
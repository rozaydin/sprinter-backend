-- Postgresql Schema File

DROP TABLE IF EXISTS "company" ;

CREATE TABLE IF NOT EXISTS "company" (
  "id" SERIAL,
  "name" VARCHAR(255) NOT NULL,
  "logo" VARCHAR(255) NULL,
  PRIMARY KEY ("id"));

CREATE UNIQUE INDEX "company_name_UNIQUE" ON "company" ("name" ASC);

DROP TABLE IF EXISTS "project" ;

CREATE TABLE IF NOT EXISTS "project" (
  "id" SERIAL,
  "name" VARCHAR(255) NULL,
  "companyId" INT NULL,
  PRIMARY KEY ("id"),
  CONSTRAINT "project_company"
    FOREIGN KEY ("companyId")
    REFERENCES "company" ("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
	
CREATE INDEX "project_company_idx" ON "project" ("companyId" ASC);


DROP TABLE IF EXISTS "team" ;

CREATE TABLE IF NOT EXISTS "team" (
  "id" SERIAL,
  "name" VARCHAR(255) NULL,
  "sprint" VARCHAR(45) NULL,
  "goal" VARCHAR(1024) NULL,
  "companyId" INT NULL,
  "projectId" INT NULL,
  PRIMARY KEY ("id"),
  CONSTRAINT "team_company"
    FOREIGN KEY ("companyId")
    REFERENCES "company" ("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT "team_project"
    FOREIGN KEY ("projectId")
    REFERENCES "project" ("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


CREATE INDEX IF NOT EXISTS "team_company_idx" ON "team" ("companyId" ASC);
CREATE INDEX IF NOT EXISTS "team_project_idx" ON "team" ("projectId" ASC);


DROP TABLE IF EXISTS "user" ;

CREATE TABLE IF NOT EXISTS "user" (
  "id" SERIAL,
  "name" VARCHAR(255) NULL,
  "email" VARCHAR(255) NOT NULL,
  "password" VARCHAR(255) NULL,
  "image" VARCHAR(255) NULL,
  "mobile" VARCHAR(45) NULL,
  "role" VARCHAR(45) NULL,
  "teamId" INT NULL,
  "projectId" INT NULL,
  "companyId" INT NULL,
  PRIMARY KEY ("id"),
  CONSTRAINT "user_company"
    FOREIGN KEY ("companyId")
    REFERENCES "company" ("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT "user_project"
    FOREIGN KEY ("projectId")
    REFERENCES "project" ("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT "user_team"
    FOREIGN KEY ("teamId")
    REFERENCES "team" ("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE UNIQUE INDEX "user_email_UNIQUE" ON "user" ("email" ASC);
CREATE INDEX "user_company_idx" ON "user" ("companyId" ASC);
CREATE INDEX "user_project_idx" ON "user" ("projectId" ASC);
CREATE INDEX "user_team_idx" ON "user" ("teamId" ASC);
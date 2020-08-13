# Migration `20200813043529-posts-and-communities-and-comments`

This migration has been generated by Wing Lee at 8/12/2020, 9:35:29 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."Post" (
"id" SERIAL,
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)  NOT NULL ,
"title" text  NOT NULL ,
"content" text  NOT NULL ,
"authorId" integer  NOT NULL ,
"communityId" integer   ,
PRIMARY KEY ("id"))

CREATE TABLE "public"."Comment" (
"id" SERIAL,
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)  NOT NULL ,
"title" text  NOT NULL ,
"content" text  NOT NULL ,
"authorId" integer  NOT NULL ,
"postId" integer  NOT NULL ,
PRIMARY KEY ("id"))

CREATE TABLE "public"."Community" (
"id" SERIAL,
"name" text  NOT NULL ,
PRIMARY KEY ("id"))

ALTER TABLE "public"."User" ADD COLUMN "username" text  NOT NULL ;

CREATE UNIQUE INDEX "User.username_unique" ON "public"."User"("username")

ALTER TABLE "public"."Post" ADD FOREIGN KEY ("authorId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."Post" ADD FOREIGN KEY ("communityId")REFERENCES "public"."Community"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."Comment" ADD FOREIGN KEY ("authorId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."Comment" ADD FOREIGN KEY ("postId")REFERENCES "public"."Post"("id") ON DELETE CASCADE ON UPDATE CASCADE

DROP TABLE "public"."LightNovel";
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200813031516-user-model..20200813043529-posts-and-communities-and-comments
--- datamodel.dml
+++ datamodel.dml
@@ -3,24 +3,53 @@
 }
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
-model LightNovel {
-  id    Int    @default(autoincrement()) @id
-  title String
-}
-
 model User {
-  id             Int      @default(autoincrement()) @id
-  joined         DateTime @default(now())
-  email          String   @unique
+  id             Int       @default(autoincrement()) @id
+  joined         DateTime  @default(now())
+  email          String    @unique
+  username       String    @unique
   hashedPassword String
-  role           Role     @default(USER)
+  role           Role      @default(USER)
+  posts          Post[]
+  comments       Comment[]
 }
+model Post {
+  id          Int        @default(autoincrement()) @id
+  createdAt   DateTime   @default(now())
+  updatedAt   DateTime   @updatedAt
+  title       String
+  content     String
+  author      User       @relation(fields: [authorId], references: [id])
+  authorId    Int
+  comments    Comment[]
+  Community   Community? @relation(fields: [communityId], references: [id])
+  communityId Int?
+}
+
+model Comment {
+  id        Int      @default(autoincrement()) @id
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
+  title     String
+  content   String
+  author    User     @relation(fields: [authorId], references: [id])
+  authorId  Int
+  post      Post     @relation(fields: [postId], references: [id])
+  postId    Int
+}
+
+model Community {
+  id    Int    @default(autoincrement()) @id
+  name  String
+  posts Post[]
+}
+
 enum Role {
   USER
   MODERATOR
   ADMIN
```


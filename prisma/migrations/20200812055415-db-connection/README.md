# Migration `20200812055415-db-connection`

This migration has been generated by Wing Lee at 8/11/2020, 10:54:15 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql

```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200812055415-db-connection
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,4 @@
+datasource db {
+    provider = "postgresql"
+    url = "***"
+}
```


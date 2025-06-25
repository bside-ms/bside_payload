import {
  MigrateUpArgs,
  MigrateDownArgs,
} from "@payloadcms/db-mongodb";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  await payload.update({
    collection: "redirects",
    where: {},
    data: { _status: "published" },
  });
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  // Migration code
}

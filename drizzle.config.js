/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.tsx",
    dialect: 'postgresql',
    dbCredentials: {
      url: "postgresql://neondb_owner:etsH48rNcOpg@ep-lucky-base-a5yv9m21.us-east-2.aws.neon.tech/neondb?sslmode=require",
    }
  };
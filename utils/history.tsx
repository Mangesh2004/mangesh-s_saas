import { db } from '@/utils/db';
import { schema } from '@/utils/schema';
import { desc, eq } from 'drizzle-orm';

export const getUserHistory = async (userEmail: string) => {
  const history = await db
    .select()
    .from(schema)
    .where(eq(schema.createdBy, userEmail))
    .orderBy(desc(schema.createdAt));

  return history;
};

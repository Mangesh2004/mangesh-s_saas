import { pgTable , serial, text, varchar} from "drizzle-orm/pg-core";

export const schema = pgTable('aiOutput',{
    id:serial('id').primaryKey(),
    formdata:varchar('formdata').notNull(),
    aiResponse:text('aiResponse'),
    templeteSlug:varchar('templeteSlug').notNull(),
    createdBy:varchar('email').notNull(),
    createdAt:varchar('createdAt')
})
import { z } from "zod";

export const searchFormSchema = z.object({
  searchQuery: z.string().min(1, { message: "Search text required" }),
});

export type SearchData = z.infer<typeof searchFormSchema>;

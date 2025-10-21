import z from "zod";

export const createTaskSchema = z
  .object({
    title: z.string().min(1),
    content: z.string().max(500).optional(),
    completed: z.enum(["true", "false"]).transform((val) => val === "true"),
  })
  .strict();

export type createTaskSchemaInput = z.input<typeof createTaskSchema>;
export type createTaskSchemaOutput = z.output<typeof createTaskSchema>;

export type TaskType = {
  tasks: {
    id: number;
    title: string;
    content: string;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
    userId: number;
  }[];
};

export type Task = {
  id: number;
  title: string;
  content: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  userId: number;
};

export const FormSchema = z.object({
  title: z
    .string()
    .transform((val) => (val === "" ? undefined : val))
    .optional(),
  content: z
    .string()
    .transform((val) => (val === "" ? undefined : val))
    .optional(),
});

export type FormType = z.infer<typeof FormSchema>;

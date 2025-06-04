import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormInputs = z.infer<typeof loginSchema>;

export const guestSignupSchema = z
  .object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    phone: z.string().min(10, "Phone number is required"),
    role: z.enum(["guest", "agent_admin"], {
      required_error: "Role is required",
    }),
    agency: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.role === "agent_admin" && !data.agency) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Agency is required for agent_admin",
        path: ["agency"],
      });
    }
  });

export type GuestSignupInputs = z.infer<typeof guestSignupSchema>;

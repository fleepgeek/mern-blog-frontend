import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { User } from "../types";
import { useEffect } from "react";

const formSchema = z.object({
  email: z.string().optional(),
  name: z.string().min(2, { message: "Please fill in your name" }),
  bio: z.string().min(2, { message: "Please add a short bio about yourself" }),
});

type UserFormData = z.infer<typeof formSchema>;

type UserProfileFormProps = {
  user: User;
};

export default function UserProfileForm({ user }: UserProfileFormProps) {
  const form = useForm<UserFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: user.email,
      name: user.name || "",
      bio: user.bio || "",
    },
  });

  useEffect(() => {
    form.reset(user);
  }, [form, user]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values: UserFormData) => {
          console.log(values);
        })}
        className="space-y-8"
      >
        <div>
          <h2 className="text-2xl font-bold">Profile</h2>
          <FormDescription>Update your account information</FormDescription>
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Update Info</Button>
      </form>
    </Form>
  );
}

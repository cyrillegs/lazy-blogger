"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { redirect } from "next/navigation"
import { createPost } from "@/lib/actions/post.actions"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
 
const subjects = ["react", "nextjs", "tailwindcss", "nodejs", "supabase"];
const formSchema = z.object({
  title: z.string().min(1, { message: "This field is required." }).max(500),
  body: z.string().min(1, { message: "This field is required." }).max(5000),
  image: z.string().min(1, { message: "This field is required." }).max(500),
  subject: z.string().min(1, { message: "This field is required." }).max(500),
  // image: z.string().max(500),
  // subject: z.string().max(500),
})

const onSubmit = async (values: z.infer<typeof formSchema>) => {
  //console.log(values);
  
  const post = await createPost(values);
  if (post) {
    redirect(`/post/${post.id}`);
  } else {
    console.log("Failed to create a post!");
    redirect("/");
  }
};

const PostForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      subject: "",
      image: "",
      body: "",
    }
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} 
      className="space-y-4 w-full">
      
      {/* Form Field for Title */}
      <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter the title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      
      {/* Form Field for Subject */}
      <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className="w-full">
                  <SelectTrigger className="input capitalize w-full">
                    <SelectValue placeholder="Select the subject" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  { subjects.map((subject) => (
                      <SelectItem
                        value={subject}
                        key={subject}
                        className="capitalize"
                      >
                        {subject}
                      </SelectItem>  
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

      {/* Form Field for Text Area */}
      <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Post Body</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter the Body"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Form Field for Image URL */}
      <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input placeholder="Image url" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default PostForm;
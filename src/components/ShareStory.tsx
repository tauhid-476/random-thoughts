'use client'

import { useStoryStore } from '@/lib/store'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Send } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import AnimatedInput from './AnimatedInput'
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { useToast } from '@/hooks/use-toast'

const storySchema = z.object({
  title: z.string().min(3, "Title can't be empty"),
  description: z.string().min(3, "Description can't be empty")
})

type FormValues = z.infer<typeof storySchema>

export default function ShareStory() {
  const { toast } = useToast()
  const addStory = useStoryStore((state) => state.addStory)

  const form = useForm<FormValues>({
    resolver: zodResolver(storySchema),
    defaultValues: {
      title: '',
      description: ''
    }
  })

  const onSubmit = (data: FormValues) => {
    addStory({
      id: Date.now().toString(),
      title: data.title,
      description: data.description,
      likes: 0,
      createdAt: new Date().toISOString()
    })
    toast({
      title: 'Story shared successfully',
      description: 'Your story is now available to the world!',
    })
    form.reset()
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Share Your Story</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <AnimatedInput
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Share your story anonymously..."
                      className="min-h-[150px] px-3 py-2 w-full dark:bg-neutral-800 text-white border dark:border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700">
              <Send className="mr-2 h-4 w-4 dark:text-white" />
              <p className="dark:text-white">Share story</p>
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}


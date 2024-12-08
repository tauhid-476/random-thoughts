import { useStoryStore } from '@/lib/store'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from './ui/button';
import { Send } from 'lucide-react';
import { Textarea } from './ui/textarea';
import AnimatedInput from './AnimatedInput';



export default function ShareStory() {

  const [title, setTitle] = React.useState('')
  const [description, setDescription] = React.useState('')
  const addStory = useStoryStore((state) => state.addStory)


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addStory({
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      likes: 0,
      createdAt: new Date().toISOString()
    })

    setTitle('')
    setDescription('')
  }

  return (

    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Share Your Story</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <AnimatedInput
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Textarea
              placeholder="Share your story anonymously..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[150px] px-3 py-2 w-full dark:bg-neutral-800 text-white border dark:border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <Button type="submit" className="w-full bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700">
            <Send className="mr-2 h-4 w-4 dark:text-white" />
            <p className="dark:text-white">Share story</p>
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

'use client';
import { Story } from '@/lib/storyType';
import { useStoryStore } from "@/lib/store"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AnimatedLikeButton from './AnimatedLikeButton';

export function StoryCard({ story }: { story: Story }) {
  const likeStory = useStoryStore((state) => state.likeStory);

  return (
    <Card className="w-full transition-all hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl md:text-3xl font-semibold">{story.title}</CardTitle>
        <p className="text-sm text-muted-foreground">
          {new Date(story.createdAt).toLocaleDateString()}
        </p>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-wrap text-foreground text-xl">{story.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <AnimatedLikeButton story={story} likeStory={likeStory} />
      </CardFooter>
    </Card>
  )

}

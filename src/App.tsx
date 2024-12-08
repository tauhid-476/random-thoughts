'use client';

import { StoryCard } from '@/components/StoryCard';
import { useStoryStore } from '@/lib/store';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import ShareStory from '@/components/ShareStory';
import { ThemeProvider } from './components/theme-provider';
import { ModeToggle } from './components/mode-toggle';
import AnimatedShinyText from './components/ui/animated-shiny-text';
// import { ModeToggle } from '@/components/theme-toggle';

export default function Home() {
  const stories = useStoryStore((state) => state.stories);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <main className="min-h-screen bg-background md:max-w-4xl md:mx-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center relative">
          <div className="absolute right-0 top-0">
            <ModeToggle />
          </div>
          <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
          <span className='text-3xl'>Share Your Thoughts ✨</span>
        </AnimatedShinyText>
          <p className="text-muted-foreground">Share your story with the world, anonymously.</p>
        </div>

        <div className="flex flex-col gap-8">
          <div>
            <ShareStory />
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground">Recent Stories</h2>
            <ScrollArea className="h-[800px] rounded-md border p-4">
              <div className="space-y-4">
                {stories.map((story, index) => (
                  <div key={story.id}>
                    <StoryCard story={story} />
                    {index < stories.length - 1 && (
                      <Separator className="my-4" />
                    )}
                  </div>
                ))}
                {stories.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    No stories yet. Be the first to share!
                  </p>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </main>
    </ThemeProvider>
  );
}

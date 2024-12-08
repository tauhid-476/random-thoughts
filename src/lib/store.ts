//your store is a hook
"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Stories, Story } from "./storyType";

//first store type
interface StoryStore {
  stories: Stories;
  addStory: (story: Story) => void;
  likeStory: (storyId: string) => void;
}

export const useStoryStore = create<StoryStore>()(
  persist(
    (set) => ({
      stories: [],
      addStory: (story) =>
        set((state) => ({
          stories: [story, ...state.stories],
        })),
      likeStory: (id) =>
        set((state) => ({
          stories: state.stories.map((story) =>
            story.id === id ? { ...story, likes: story.likes + 1 } : story
          ),
        })),
    }),
    {
      name: import.meta.env.VITE_STORAGE_NAME!, // unique name
    }
  )
);
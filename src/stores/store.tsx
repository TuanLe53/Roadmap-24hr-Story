import { create } from 'zustand'

export interface Story{
    id: string,
    src: string,
    createdAt: string,
}

interface StoryStore {
    stories: Story[];
    addStory: (story: Story) => void;
    updateStories: (newStories: Story[]) => void;
}

const useStore = create<StoryStore>((set) => ({
    stories: [],
    addStory: (story: Story) => set((state) => ({ stories: [story, ...state.stories] })),
    updateStories: (newStories: Story[]) => set(() => ({ stories: newStories })),
}))

export default useStore;
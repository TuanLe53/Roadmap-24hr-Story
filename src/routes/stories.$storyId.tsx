import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import useStore from '@/stores/store';
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/stories/$storyId')({
  component: StoryPage,
})

function StoryPage() {
  const { storyId } = Route.useParams(); 
  const stories = useStore((state) => state.stories);
  const story = stories.find((s) => s.id === storyId);

  const [progress, setProgress] = useState<number>(0);

  const nextStoryIndex = story && stories.indexOf(story) + 1;
  const previousStoryIndex = story && stories.indexOf(story) - 1;

  const isNextButtonDisabled = nextStoryIndex === stories.length || nextStoryIndex === undefined;
  const isPreviousButtonDisabled = previousStoryIndex as number < 0 || previousStoryIndex === undefined;

  const navigate = useNavigate({ from: '/stories/$storyId' });
  const goToStory = (storyIndex: number) => {
    if (storyIndex >= 0 && storyIndex < stories.length) {
      navigate({ to: `/stories/${stories[storyIndex].id}` });
    }
  }

  useEffect(() => {
    setProgress(0);
  
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          if (!isNextButtonDisabled) {
            goToStory(nextStoryIndex as number);
          }
          return 100;
        }
        return prev + 1;
      });
    }, 30);
  
    return () => clearInterval(interval);
  }, [storyId]);

  return (
    <div className='min-h-screen w-full flex flex-col items-center'>
      <Progress value={progress} className="w-[60%]" />
      <div className='w-full flex items-center justify-center gap-10'>
        <Button className='rounded-full' onClick={() => goToStory(previousStoryIndex as number)} disabled={isPreviousButtonDisabled} ><ArrowLeft /></Button>
        <img src={story?.src} className='h-[90vh] w-[60%] object-fit'/>
        <Button className='rounded-full' onClick={() => goToStory(nextStoryIndex as number)} disabled={isNextButtonDisabled}><ArrowRight /></Button>
      </div>
    </div>
  )
}

import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import StoryCircle from "./StoryCircle";
import { Link } from "@tanstack/react-router";
import { useEffect } from "react";
import useStore, { Story } from "@/stores/store";

const expiryTime = 1000 * 60 * 60 * 24;

export default function StorysCarousel() {
    const stories = useStore((state) => state.stories);
    const updateStories = useStore((state) => state.updateStories);

    useEffect(() => {
        const isExpiry = (story: Story, expiryHours: number) => {
            const createdAt = new Date(story.createdAt);
            const expiryTime = createdAt.getTime() + expiryHours;
            return Date.now() > expiryTime;
        }

        const getStories = async () => {
            const storedStories = localStorage.getItem("stories");
            if (storedStories) {
                const parsedStories: Story[] = JSON.parse(storedStories);

                const activeStories = parsedStories.filter(story => !isExpiry(story, expiryTime));
                localStorage.setItem('stories', JSON.stringify(activeStories));
                updateStories(activeStories);
            }
        }

        getStories();

    }, [updateStories])


    return (
        <>
            <Carousel
                opts={{ align: "start" }}
                className="w-full max-w-xl"
            >
                <CarouselContent className="p-2 items-center">
                    <CarouselItem className="basis-1/6 flex justify-center items-center pl-6">
                        <Link to="/upload">
                            <Button
                                variant={"outline"}
                                className="rounded-full w-18 h-18 cursor-pointer"
                            >
                                <Plus />
                            </Button>
                        </Link>
                    </CarouselItem>
                    
                    {stories.map((story, i) => (
                        <CarouselItem key={i} className="basis-1/6 flex justify-center items-center pl-6">
                            <StoryCircle story={story}/>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselNext />
                <CarouselPrevious />
            </Carousel>
        
            <div className="w-full h-full mt-38">
                <p className="text-center text-2xl">Click to view the story</p>
            </div>
        </>
    )
}
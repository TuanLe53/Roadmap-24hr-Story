import { Story } from "@/stores/store";
import { Link } from "@tanstack/react-router";
import { UserRound } from "lucide-react";

export default function StoryCircle({story}:{story: Story}) {
    return (
        <div className="flex justify-center items-center rounded-full w-18 h-18 bg-gradient-to-r from-teal-500 to-green-400">
            <Link to="/stories/$storyId" params={{storyId: story.id}} className="bg-gray-300 rounded-full w-16 h-16 overflow-hidden">
                <UserRound className="w-16 h-16" />
            </Link>
        </div>
    )
}
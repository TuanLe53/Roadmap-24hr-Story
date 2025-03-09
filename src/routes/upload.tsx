import { Button } from '@/components/ui/button';
import useStore, { Story } from '@/stores/store';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import React, { useState } from 'react';
import { v4 as uuidv4 } from "uuid";

export const Route = createFileRoute('/upload')({
  component: UploadPage,
})

function createStory(id: string, src: string): Story {
  return {
    id: id,
    src: src,
    createdAt: new Date().toISOString(),
  };
}
function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [imgPreview, setImgPreview] = useState<string>("");

  const addStory = useStore((state) => state.addStory);

  const navigate = useNavigate({ from: '/upload' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])

      const videoUrl = URL.createObjectURL(e.target.files[0]);
      setImgPreview(videoUrl);
    }
  }

  const handleUpload = async () => {
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      const storedStories = localStorage.getItem('stories');
      const stories = storedStories ? JSON.parse(storedStories) : [];

      const story = createStory(uuidv4(), result);

      addStory(story);
      stories.push(story);

      localStorage.setItem('stories', JSON.stringify(stories))
      navigate({to: '/'})
    };
    reader.readAsDataURL(file);
    }

  return (
    <div className='flex flex-col items-center justify-between'>
      {file &&      
        <img src={imgPreview} />
      }

      <input type='file' accept='image/*' onChange={handleChange} />
      <div>
        <Button type='button' onClick={handleUpload}>Upload</Button>
      </div>
    </div>
  )
}

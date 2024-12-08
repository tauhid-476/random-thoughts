import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { cn } from "@/lib/utils";
import { motion } from 'framer-motion';

interface AnimatedLikeButtonProps {
  story: {
    id: string;
    likes: number;
  };
  likeStory: (id: string) => void;
}

const AnimatedLikeButton: React.FC<AnimatedLikeButtonProps> = ({ story, likeStory }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    likeStory(story.id);
    setIsLiked(true);
    
    // Reset liked state after animation
    setTimeout(() => {
      setIsLiked(false);
    }, 600);
  };

  return (
    <motion.button
      onClick={handleLike}
      className={cn(
        'gap-2 transition-colors relative flex items-center',
        story.likes > 0 && 'text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-500'
      )}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        key={`heart-${story.id}`}
        initial={{ scale: 1, opacity: 1 }}
        animate={isLiked ? { 
          scale: [1, 1.5, 0.8, 1.2, 1],
          rotate: [0, -15, 15, -15, 0],
          opacity: [1, 0.7, 1, 0.7, 1]
        } : {}}
        transition={{ 
          duration: 0.6,
          type: "spring",
          stiffness: 300,
          damping: 10
        }}
      >
        <Heart 
          className={cn(
            "h-4 w-4",
            isLiked && "text-red-500"
          )}
        />
      </motion.div>
      
      {isLiked && (
        <motion.span
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          className="absolute -top-6 left-1/2 transform -translate-x-1/2 
                     text-red-500 font-bold text-xs"
        >
          +1
        </motion.span>
      )}
      
      <span>{story.likes}</span>
    </motion.button>
  );
};

export default AnimatedLikeButton;
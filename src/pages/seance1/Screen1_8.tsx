import React, { useState, useEffect } from "react";
import { useSpeech } from "@/hooks/useSpeech";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ArrowUp, ArrowDown, MessageSquare, ThumbsUp, ThumbsDown, Award } from "lucide-react";

interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  votes: number;
  timestamp: string;
  isHighlighted: boolean;
  replies: Reply[];
}

interface Reply {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
}

// Commentaires initiaux pour peupler le forum
const initialComments: Comment[] = [
  {
    id: "c1",
    author: "Professeur Martin",
    avatar: "M",
    content: "Le message principal de cette chanson est que notre lieu de naissance est le fruit du hasard, mais influence fortement notre destin et notre vision du monde. Goldman nous invite à prendre conscience de ce privilège ou de cette difficulté pour développer plus d'empathie envers les autres.",
    votes: 12,
    timestamp: "Il y a 2 heures",
    isHighlighted: true,
    replies: [
      {
        id: "r1c1",
        author: "Élise",
        avatar: "E",
        content: "Je suis d'accord, c'est une invitation à l'empathie et à la compréhension des différentes réalités vécues par d'autres personnes selon leur lieu de naissance.",
        timestamp: "Il y a 1 heure"
      }
    ]
  },
  {
    id: "c2",
    author: "Thomas",
    avatar: "T",
    content: "Pour moi, cette chanson parle surtout des conflits et des guerres causés par les différences d'origine. Les exemples historiques mentionnés (Allemagne post-guerre, Belfast, Johannesburg) montrent comment ces conflits divisent les peuples.",
    votes: 8,
    timestamp: "Il y a 1 heure 30 minutes",
    isHighlighted: false,
    replies: []
  },
  {
    id: "c3",
    author: "Sophie",
    avatar: "S",
    content: "Je pense que Goldman nous parle aussi de l'identité et comment elle est façonnée par notre lieu de naissance. Il questionne si nous serions la même personne si nous étions nés ailleurs.",
    votes: 5,
    timestamp: "Il y a 1 heure",
    isHighlighted: false,
    replies: []
  }
];

const Screen18: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState("");
  const [newReply, setNewReply] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isTeacherMode, setIsTeacherMode] = useState(false);
  const [teacherMessage, setTeacherMessage] = useState("");
  const [sortBy, setSortBy] = useState<"votes" | "recent">("votes");
  const { speak } = useSpeech();

  useEffect(() => {
    // Instruction au chargement de l'écran
    speak("Dans cet espace, partagez votre interprétation du message principal de la chanson et votez pour les contributions qui vous semblent les plus pertinentes.");
  }, [speak]);

  // Trier les commentaires
  const sortedComments = [...comments].sort((a, b) => {
    if (sortBy === "votes") {
      return b.votes - a.votes;
    }
    // Trier par récence (simulation basée sur les timestamps)
    return a.timestamp.includes("2 heures") ? 1 : -1;
  });

  const handleVote = (commentId: string, upvote: boolean) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          votes: upvote ? comment.votes + 1 : comment.votes - 1
        };
      }
      return comment;
    }));
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    const newCommentObj: Comment = {
      id: `c${comments.length + 1}`,
      author: "Vous",
      avatar: "V",
      content: newComment,
      votes: 0,
      timestamp: "À l'instant",
      isHighlighted: false,
      replies: []
    };
    
    setComments([...comments, newCommentObj]);
    setNewComment("");
  };

  const handleAddReply = (commentId: string) => {
    if (!newReply.trim()) return;
    
    const reply: Reply = {
      id: `r${Date.now()}`,
      author: "Vous",
      avatar: "V",
      content: newReply,
      timestamp: "À l'instant"
    };
    
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...comment.replies, reply]
        };
      }
      return comment;
    }));
    
    setNewReply("");
    setReplyingTo(null);
  };

  const handleHighlight = (commentId: string) => {
    setComments(comments.map(comment => ({
      ...comment,
      isHighlighted: comment.id === commentId
    })));
  };

  const handleAddTeacherMessage = () => {
    setIsDialogOpen(false);
    speak("Message du professeur ajouté avec succès.");
    // Ici, on pourrait ajouter le message du professeur à l'UI
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Synthèse collaborative</h1>
      {/* ...le reste du code fourni... */}
    </div>
  );
};

export default Screen18;

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Heart, 
  GitFork, 
  Eye, 
  Copy, 
  Download, 
  Calendar,
  Clock,
  User,
  Tag,
  ArrowLeft,
  Share2,
  Code
} from "lucide-react";
import { motion } from "framer-motion";
import CodeEditor from '@/components/playground/CodeEditor';
import Link from 'next/link';

export default function SharedCode() {
  const router = useRouter();
  const { shareId } = router.query;
  const { data: session } = useSession();
  const [shareData, setShareData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (shareId) {
      fetchSharedCode();
    }
  }, [shareId]);

  const fetchSharedCode = async () => {
    try {
      const response = await fetch(`/api/playground/share?shareId=${shareId}`);
      const data = await response.json();

      if (response.ok) {
        setShareData(data.share);
        setLiked(data.share.likedBy?.includes(session?.user?.id) || false);
        setLikeCount(data.share.stats?.likes || 0);
      } else {
        setError(data.error || 'Failed to load shared code');
      }
    } catch (err) {
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (!session) {
      router.push('/auth/login');
      return;
    }

    try {
      const response = await fetch('/api/playground/share', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          shareId,
          action: 'like'
        })
      });

      if (response.ok) {
        setLiked(!liked);
        setLikeCount(prev => liked ? prev - 1 : prev + 1);
      }
    } catch (error) {
      console.error('Failed to like/unlike:', error);
    }
  };

  const handleFork = async () => {
    if (!session) {
      router.push('/auth/login');
      return;
    }

    try {
      const response = await fetch('/api/playground/share', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          shareId,
          action: 'fork'
        })
      });

      const data = await response.json();

      if (response.ok) {
        router.push(`/playground/share/${data.forkShareId}`);
      }
    } catch (error) {
      console.error('Failed to fork:', error);
    }
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(shareData.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy code:', error);
    }
  };

  const handleDownload = () => {
    const extensions = { javascript: 'js', typescript: 'ts', python: 'py' };
    const extension = extensions[shareData.language] || 'txt';
    const blob = new Blob([shareData.code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${shareData.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.${extension}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getLanguageColor = (language) => {
    const colors = {
      javascript: 'bg-yellow-500',
      typescript: 'bg-blue-500',
      python: 'bg-green-500'
    };
    return colors[language] || 'bg-gray-500';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="h-96 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-6 text-center">
            <div className="text-red-500 mb-4">Error: {error}</div>
            <Button onClick={() => router.push('/playground')} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Playground
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-surface border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                onClick={() => router.push('/playground')}
                variant="ghost"
                size="sm"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Playground
              </Button>
              <div className="h-6 w-px bg-gray-300"></div>
              <div className="flex items-center gap-2">
                <Share2 className="w-5 h-5 text-gray-600" />
                <span className="text-sm text-gray-600">Shared Solution</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                onClick={handleLike}
                variant={liked ? "default" : "outline"}
                size="sm"
                className={liked ? "bg-red-500 hover:bg-red-600" : ""}
              >
                <Heart className={`w-4 h-4 mr-1 ${liked ? 'fill-current' : ''}`} />
                {likeCount}
              </Button>
              <Button onClick={handleFork} variant="outline" size="sm">
                <GitFork className="w-4 h-4 mr-1" />
                Fork
              </Button>
              <Button onClick={handleCopyCode} variant="outline" size="sm">
                {copied ? 'Copied!' : <Copy className="w-4 h-4" />}
              </Button>
              <Button onClick={handleDownload} variant="outline" size="sm">
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title and Description */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-2xl">{shareData.title}</CardTitle>
                    {shareData.description && (
                      <p className="text-gray-600">{shareData.description}</p>
                    )}
                  </div>
                  <Badge className={`${getLanguageColor(shareData.language)} text-white`}>
                    {shareData.language}
                  </Badge>
                </div>
                
                {shareData.tags && shareData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {shareData.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardHeader>
            </Card>

            {/* Code Editor */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  Solution Code
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-96">
                  <CodeEditor
                    value={shareData.code}
                    onChange={() => {}} // Read-only
                    language={shareData.language}
                    readOnly={true}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Fork Information */}
            {shareData.forkedFrom && (
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <GitFork className="w-4 h-4" />
                    <span>Forked from</span>
                    <Link 
                      href={`/playground/share/${shareData.forkedFrom.shareId}`}
                      className="text-brand hover:underline font-medium"
                    >
                      {shareData.forkedFrom.title}
                    </Link>
                    <span>by {shareData.forkedFrom.author.name}</span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Author Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Author</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={shareData.author.image} alt={shareData.author.name} />
                    <AvatarFallback>{shareData.author.name?.charAt(0) || 'U'}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-gray-900">{shareData.author.name}</div>
                    <div className="text-sm text-gray-500">Level {shareData.author.level}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Eye className="w-4 h-4" />
                    Views
                  </div>
                  <span className="font-medium">{shareData.stats.views}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Heart className="w-4 h-4" />
                    Likes
                  </div>
                  <span className="font-medium">{shareData.stats.likes}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <GitFork className="w-4 h-4" />
                    Forks
                  </div>
                  <span className="font-medium">{shareData.stats.forks}</span>
                </div>
              </CardContent>
            </Card>

            {/* Meta Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Created {formatDate(shareData.createdAt)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>Updated {formatDate(shareData.updatedAt)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Code className="w-4 h-4" />
                  <span>{shareData.code.length} characters</span>
                </div>
              </CardContent>
            </Card>

            {/* Question Link */}
            <Card>
              <CardContent className="p-4">
                <Link 
                  href={`/playground?question=${shareData.questionId}&language=${shareData.language}`}
                  className="block text-center"
                >
                  <Button className="w-full">
                    Try This Problem
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

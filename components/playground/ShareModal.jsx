import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter 
} from "@/components/ui/dialog";
import { 
  Share2, 
  Copy, 
  Check, 
  Globe, 
  Lock, 
  Tag,
  X
} from "lucide-react";
import { motion } from "framer-motion";

const ShareModal = ({ 
  isOpen, 
  onClose, 
  questionId, 
  language, 
  code, 
  questionTitle 
}) => {
  const [title, setTitle] = useState(`${questionTitle} - ${language} Solution`);
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [isSharing, setIsSharing] = useState(false);
  const [shareResult, setShareResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim()) && tags.length < 5) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleShare = async () => {
    setIsSharing(true);
    
    try {
      const response = await fetch('/api/playground/share', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          questionId,
          language,
          code,
          title,
          description,
          tags,
          isPublic
        })
      });

      const data = await response.json();

      if (response.ok) {
        setShareResult({
          success: true,
          shareId: data.shareId,
          url: `${window.location.origin}/playground/share/${data.shareId}`
        });
      } else {
        setShareResult({
          success: false,
          error: data.error || 'Failed to share code'
        });
      }
    } catch (error) {
      setShareResult({
        success: false,
        error: 'Network error occurred'
      });
    } finally {
      setIsSharing(false);
    }
  };

  const handleCopyLink = async () => {
    if (shareResult?.url) {
      try {
        await navigator.clipboard.writeText(shareResult.url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        console.error('Failed to copy link:', error);
      }
    }
  };

  const handleClose = () => {
    setTitle(`${questionTitle} - ${language} Solution`);
    setDescription('');
    setTags([]);
    setNewTag('');
    setIsPublic(true);
    setShareResult(null);
    setCopied(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="w-5 h-5" />
            Share Your Solution
          </DialogTitle>
          <DialogDescription>
            Share your code solution with the community and help others learn
          </DialogDescription>
        </DialogHeader>

        {!shareResult ? (
          <div className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Give your solution a descriptive title"
                maxLength={100}
              />
              <div className="text-xs text-gray-500">{title.length}/100 characters</div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Explain your approach, time complexity, or any insights..."
                rows={4}
                maxLength={500}
              />
              <div className="text-xs text-gray-500">{description.length}/500 characters</div>
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <Label>Tags (max 5)</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((tag, index) => (
                  <motion.div
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      {tag}
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 hover:text-red-500"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  </motion.div>
                ))}
              </div>
              {tags.length < 5 && (
                <div className="flex gap-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add a tag (e.g., algorithm, optimization)"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                    maxLength={20}
                  />
                  <Button onClick={handleAddTag} variant="outline" size="sm">
                    Add
                  </Button>
                </div>
              )}
            </div>

            {/* Privacy Setting */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                {isPublic ? (
                  <Globe className="w-5 h-5 text-green-600" />
                ) : (
                  <Lock className="w-5 h-5 text-gray-600" />
                )}
                <div>
                  <div className="font-medium">
                    {isPublic ? 'Public' : 'Private'}
                  </div>
                  <div className="text-sm text-gray-600">
                    {isPublic 
                      ? 'Anyone can view and learn from your solution'
                      : 'Only you can access this share link'
                    }
                  </div>
                </div>
              </div>
              <Switch
                checked={isPublic}
                onCheckedChange={setIsPublic}
              />
            </div>

            {/* Code Preview */}
            <div className="space-y-2">
              <Label>Code Preview</Label>
              <div className="bg-neutral-900 text-neutral-100 p-4 rounded-lg max-h-40 overflow-y-auto">
                <pre className="text-sm font-mono whitespace-pre-wrap">
                  {code.substring(0, 500)}
                  {code.length > 500 && '...'}
                </pre>
              </div>
              <div className="text-xs text-gray-500">
                {code.length} characters • {language}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {shareResult.success ? (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Solution Shared Successfully!
                  </h3>
                  <p className="text-gray-600 mt-1">
                    Your code is now available for others to learn from
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <Label className="text-sm font-medium text-gray-700">Share Link</Label>
                  <div className="flex items-center gap-2 mt-2">
                    <Input
                      value={shareResult.url}
                      readOnly
                      className="font-mono text-sm"
                    />
                    <Button
                      onClick={handleCopyLink}
                      variant="outline"
                      size="sm"
                      className="shrink-0"
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="text-sm text-gray-600">
                  Share ID: <code className="bg-gray-200 px-2 py-1 rounded">{shareResult.shareId}</code>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                  <X className="w-8 h-8 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Sharing Failed
                  </h3>
                  <p className="text-red-600 mt-1">
                    {shareResult.error}
                  </p>
                </div>
                <Button onClick={() => setShareResult(null)} variant="outline">
                  Try Again
                </Button>
              </div>
            )}
          </div>
        )}

        <DialogFooter>
          {!shareResult ? (
            <>
              <Button onClick={handleClose} variant="outline">
                Cancel
              </Button>
              <Button 
                onClick={handleShare} 
                disabled={!title.trim() || isSharing}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isSharing ? 'Sharing...' : 'Share Solution'}
              </Button>
            </>
          ) : (
            <Button onClick={handleClose}>
              Close
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;

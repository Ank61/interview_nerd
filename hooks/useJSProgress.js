import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export const useJSProgress = () => {
    const { data: session } = useSession();
    const [progress, setProgress] = useState({
        completedQuestions: [],
        topicProgress: {}
    });
    const [loading, setLoading] = useState(true);

    // Load progress on mount
    useEffect(() => {
        loadProgress();
    }, [session]);

    const loadProgress = async () => {
        setLoading(true);
        try {
            if (session?.user) {
                // Fetch from database
                const response = await fetch('/api/js-practice/progress');
                const data = await response.json();
                if (data.success) {
                    setProgress(data.progress);
                }
            } else {
                // Load from localStorage
                const localProgress = localStorage.getItem('jsProgress');
                if (localProgress) {
                    setProgress(JSON.parse(localProgress));
                }
            }
        } catch (error) {
            console.error('Error loading progress:', error);
        } finally {
            setLoading(false);
        }
    };

    const saveProgress = async (questionId, tags, difficulty, code, isCorrect) => {
        const newCompletion = {
            questionId,
            tags,
            difficulty,
            code,
            isCorrect,
            completedAt: new Date().toISOString(),
            lastAttempt: new Date().toISOString(),
            attempts: 1
        };

        if (session?.user) {
            // Save to database
            try {
                const response = await fetch('/api/js-practice/progress', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ questionId, tags, difficulty, code, isCorrect })
                });
                const data = await response.json();
                if (data.success) {
                    await loadProgress(); // Reload from server
                }
            } catch (error) {
                console.error('Error saving progress:', error);
            }
        } else {
            // Save to localStorage
            const updatedProgress = { ...progress };
            const existingIndex = updatedProgress.completedQuestions.findIndex(
                q => q.questionId === questionId
            );

            if (existingIndex >= 0) {
                updatedProgress.completedQuestions[existingIndex] = {
                    ...updatedProgress.completedQuestions[existingIndex],
                    lastAttempt: new Date().toISOString(),
                    code,
                    isCorrect,
                    attempts: updatedProgress.completedQuestions[existingIndex].attempts + 1
                };
            } else {
                updatedProgress.completedQuestions.push(newCompletion);
            }

            // Update topic progress
            const mainTag = tags[0]; // Use first tag as main topic
            if (!updatedProgress.topicProgress[mainTag]) {
                updatedProgress.topicProgress[mainTag] = { total: 0, easy: 0, medium: 0, hard: 0 };
            }
            updatedProgress.topicProgress[mainTag].total++;
            updatedProgress.topicProgress[mainTag][difficulty]++;
            updatedProgress.topicProgress[mainTag].lastPracticed = new Date().toISOString();

            setProgress(updatedProgress);
            localStorage.setItem('jsProgress', JSON.stringify(updatedProgress));
        }
    };

    const isQuestionCompleted = (questionId) => {
        return progress.completedQuestions.some(q => q.questionId === questionId && q.isCorrect);
    };

    const getTopicProgress = (topic) => {
        return progress.topicProgress[topic] || { total: 0, easy: 0, medium: 0, hard: 0 };
    };

    return {
        progress,
        loading,
        saveProgress,
        isQuestionCompleted,
        getTopicProgress,
        reload: loadProgress
    };
};
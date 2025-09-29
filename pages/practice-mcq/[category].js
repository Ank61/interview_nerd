// import { useRouter } from 'next/router';
// import { useState, useEffect } from 'react';
// import {
//     mcqQuestions,
//     nodeMCQs,
//     reactMCQs,
//     jsMCQs,
//     tsMCQs,
//     sqlMCQs,
//     oopMCQs,
//     mongodbMCQs
// } from '@/data/mcqDatasets';

// export default function PracticeMCQ() {
//     const router = useRouter();
//     const { category, topic } = router.query;
//     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//     const [selectedOption, setSelectedOption] = useState(null);
//     const [showAnswer, setShowAnswer] = useState(false);
//     const [questions, setQuestions] = useState([]);

//     useEffect(() => {
//         if (!category) return;

//         // Combine all question arrays
//         const allQuestions = [
//             ...mcqQuestions,
//             ...nodeMCQs,
//             ...reactMCQs,
//             ...jsMCQs,
//             ...tsMCQs,
//             ...sqlMCQs,
//             ...oopMCQs,
//             ...mongodbMCQs
//         ];

//         // Filter by category (case-insensitive)
//         const filtered = allQuestions.filter(
//             q => q.category && q.category.toLowerCase() === category.toLowerCase()
//         );

//         setQuestions(filtered);
//     }, [category]);

//     const currentQuestion = questions[currentQuestionIndex];

//     const handleOptionSelect = (optionIndex) => {
//         if (showAnswer) return;
//         setSelectedOption(optionIndex);
//         setShowAnswer(true);
//     };

//     const handleNext = () => {
//         setSelectedOption(null);
//         setShowAnswer(false);
//         setCurrentQuestionIndex((prev) =>
//             prev < questions.length - 1 ? prev + 1 : 0
//         );
//     };

//     if (!currentQuestion) {
//         return (
//             <div className="min-h-screen bg-gray-50 p-8">
//                 <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
//                     <h1 className="text-2xl font-bold mb-4">
//                         {category} MCQs
//                     </h1>
//                     {topic && (
//                         <p className="text-gray-600 mb-4">Topic: {decodeURIComponent(topic)}</p>
//                     )}
//                     {questions.length === 0 ? (
//                         <p>No questions found for this category.</p>
//                     ) : (
//                         <p>Loading questions...</p>
//                     )}
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
//             <div className="max-w-3xl mx-auto bg-white rounded-lg shadow overflow-hidden">
//                 <div className="p-6">
//                     <div className="flex justify-between items-center mb-6">
//                         <h1 className="text-2xl font-bold">
//                             {category} Practice
//                         </h1>
//                         <span className="text-gray-600">
//                             Question {currentQuestionIndex + 1} of {questions.length}
//                         </span>
//                     </div>

//                     {topic && (
//                         <p className="text-gray-700 mb-6">Topic: {decodeURIComponent(topic)}</p>
//                     )}

//                     <div className="mb-8">
//                         <h2 className="text-lg font-medium mb-4">
//                             {currentQuestion.question}
//                         </h2>

//                         <div className="space-y-3">
//                             {currentQuestion.options.map((option, index) => {
//                                 let buttonClass = "w-full text-left p-4 rounded-lg border transition-colors";

//                                 if (showAnswer) {
//                                     if (index === currentQuestion.correctAnswer) {
//                                         buttonClass += " bg-green-100 border-green-500";
//                                     } else if (index === selectedOption) {
//                                         buttonClass += " bg-red-100 border-red-500";
//                                     } else {
//                                         buttonClass += " border-gray-200";
//                                     }
//                                 } else {
//                                     buttonClass += " hover:bg-gray-50 border-gray-200";
//                                 }

//                                 return (
//                                     <button
//                                         key={index}
//                                         className={buttonClass}
//                                         onClick={() => handleOptionSelect(index)}
//                                         disabled={showAnswer}
//                                     >
//                                         {option}
//                                     </button>
//                                 );
//                             })}
//                         </div>
//                     </div>

//                     {showAnswer && (
//                         <div className="mb-6 p-4 bg-blue-50 rounded-lg">
//                             <h3 className="font-medium text-blue-800 mb-2">Explanation:</h3>
//                             <p className="text-gray-700">
//                                 {currentQuestion.explanation || "No explanation available."}
//                             </p>
//                         </div>
//                     )}

//                     <div className="flex justify-end">
//                         <button
//                             onClick={handleNext}
//                             className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
//                         >
//                             {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Start Over'}
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import {
    mcqQuestions,
    nodeMCQs,
    reactMCQs,
    jsMCQs,
    tsMCQs,
    sqlMCQs,
    oopMCQs,
    mongodbMCQs
} from '@/data/mcqDatasets';

export default function PracticeMCQ() {
    const router = useRouter();
    const { category, topic } = router.query;
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showAnswer, setShowAnswer] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [score, setScore] = useState(0);

    useEffect(() => {
        if (!category) return;

        const allQuestions = [
            ...mcqQuestions,
            ...nodeMCQs,
            ...reactMCQs,
            ...jsMCQs,
            ...tsMCQs,
            ...sqlMCQs,
            ...oopMCQs,
            ...mongodbMCQs
        ];

        const filtered = allQuestions.filter(
            q => q.category && q.category.toLowerCase() === category.toLowerCase()
        );

        setQuestions(filtered);
        setCurrentQuestionIndex(0);
        setScore(0);
    }, [category]);

    const currentQuestion = questions[currentQuestionIndex];
    const progress = questions.length > 0 ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0;

    const handleOptionSelect = (optionIndex) => {
        if (showAnswer) return;
        setSelectedOption(optionIndex);
        setShowAnswer(true);

        if (optionIndex === currentQuestion.correctAnswer) {
            setScore(prev => prev + 1);
        }
    };

    const handleNext = () => {
        setSelectedOption(null);
        setShowAnswer(false);
        setCurrentQuestionIndex((prev) =>
            prev < questions.length - 1 ? prev + 1 : 0
        );
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setSelectedOption(null);
            setShowAnswer(false);
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    if (!currentQuestion) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="text-center max-w-md">
                    <div className="w-16 h-16 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        {category ? `${category} Practice` : 'Loading...'}
                    </h2>
                    <p className="text-gray-500">
                        {questions.length === 0 ? 'No questions available for this category' : 'Preparing your questions...'}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Progress Bar */}
            <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
                <div className="max-w-4xl mx-auto px-4 py-3">
                    <div className="flex items-center justify-between mb-2">
                        <h1 className="text-lg font-semibold text-gray-900">
                            {category}
                        </h1>
                        <span className="text-sm text-gray-500">
                            {currentQuestionIndex + 1} / {questions.length}
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                            className="bg-blue-600 h-1.5 rounded-full transition-all duration-300 ease-out"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Question Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-8">
                        {/* Question */}
                        <div className="mb-8">
                            <h2 className="text-xl leading-relaxed text-gray-900 font-medium">
                                {currentQuestion.question}
                            </h2>
                        </div>

                        {/* Options */}
                        <div className="space-y-3 mb-8">
                            {currentQuestion.options.map((option, index) => {
                                const isCorrect = index === currentQuestion.correctAnswer;
                                const isSelected = index === selectedOption;

                                let optionClass = "w-full text-left p-5 rounded-xl border-2 transition-all duration-200 font-medium";

                                if (showAnswer) {
                                    if (isCorrect) {
                                        optionClass += " bg-green-50 border-green-500 text-green-800";
                                    } else if (isSelected && !isCorrect) {
                                        optionClass += " bg-red-50 border-red-500 text-red-800";
                                    } else {
                                        optionClass += " bg-gray-50 border-gray-200 text-gray-600";
                                    }
                                } else {
                                    optionClass += " bg-white border-gray-200 text-gray-800 hover:border-blue-300 hover:bg-blue-50 active:scale-[0.98]";
                                }

                                return (
                                    <button
                                        key={index}
                                        className={optionClass}
                                        onClick={() => handleOptionSelect(index)}
                                        disabled={showAnswer}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <div className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center flex-shrink-0">
                                                <span className="text-xs font-bold">
                                                    {String.fromCharCode(65 + index)}
                                                </span>
                                            </div>
                                            <span className="flex-1">{option}</span>
                                            {showAnswer && isCorrect && (
                                                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                            {showAnswer && isSelected && !isCorrect && (
                                                <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Explanation */}
                        {showAnswer && currentQuestion.explanation && (
                            <div className="mb-8 p-6 bg-blue-50 rounded-xl border border-blue-100">
                                <div className="flex items-start space-x-3">
                                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-blue-900 mb-2">Explanation</h3>
                                        <p className="text-blue-800 leading-relaxed">
                                            {currentQuestion.explanation}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Navigation */}
                        <div className="flex items-center justify-between">
                            <button
                                onClick={handlePrevious}
                                disabled={currentQuestionIndex === 0}
                                className="px-6 py-3 text-gray-600 font-medium rounded-xl hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Previous
                            </button>

                            <div className="text-center">
                                <div className="text-sm text-gray-500 mb-1">Score</div>
                                <div className="text-2xl font-bold text-gray-900">
                                    {score}/{currentQuestionIndex + (showAnswer ? 1 : 0)}
                                </div>
                            </div>

                            <button
                                onClick={handleNext}
                                disabled={!showAnswer}
                                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Restart'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Topic info */}
                {topic && (
                    <div className="mt-4 text-center">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                            Topic: {decodeURIComponent(topic)}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}
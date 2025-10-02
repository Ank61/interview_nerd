import { useRouter } from "next/router";
import Head from "next/head";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    BookOpen,
    Settings,
    User,
    FileText,
    Copy,
    Check,
} from "lucide-react";
import { resourceSheets, sheetContent } from "@/data/resourceSheets";
import { useState } from "react";

export default function SheetPage() {
    const router = useRouter();
    const { topic, sheet } = router.query;
    const [copiedIndex, setCopiedIndex] = useState(null);

    const resourceData = resourceSheets[topic];
    const sheetData = sheetContent[topic]?.[sheet];
    const sheetMeta = resourceData?.sheets.find(s => s.id === sheet);

    const copyToClipboard = (text, index) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    if (!resourceData || !sheetData) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Head>
                    <title>Sheet Not Found - Interview Nerd</title>
                </Head>

                {/* Header */}
                <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
                    <div className="w-full px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            <div className="flex items-center space-x-8">
                                <div
                                    className="flex items-center space-x-3 cursor-pointer"
                                    onClick={() => router.push("/")}
                                >
                                    <div className="p-2 rounded-lg bg-gray-100">
                                        <BookOpen size={24} className="text-gray-700" />
                                    </div>
                                    <div>
                                        <h1 className="hidden lg:block text-xl font-bold text-gray-900">Interview Nerd</h1>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                                    <User size={20} className="text-gray-600" />
                                </button>
                                <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                                    <Settings size={20} className="text-gray-600" />
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="py-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <Card className="border border-gray-200">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-gray-700" />
                                    Sheet Not Found
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-700 mb-4">
                                    The sheet youre looking for doesnt exist or is coming soon.
                                </p>
                                <Button onClick={() => router.push("/resources")}>
                                    Back to Resources
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Head>
                <title>{sheetData.name} - {resourceData.title} - Interview Nerd</title>
                <meta name="description" content={`${sheetData.name} reference sheet for ${resourceData.title}`} />
            </Head>

            {/* Header */}
            <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
                <div className="w-full px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-8">
                            <div
                                className="flex items-center space-x-3 cursor-pointer"
                                onClick={() => router.push("/")}
                            >
                                <div className="p-2 rounded-lg bg-gray-100">
                                    <BookOpen size={24} className="text-gray-700" />
                                </div>
                                <div>
                                    <h1 className="hidden lg:block text-xl font-bold text-gray-900">Interview Nerd</h1>
                                </div>
                            </div>

                            {/* Breadcrumb */}
                            <nav className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
                                <button onClick={() => router.push("/")} className="hover:text-gray-700 transition-colors">
                                    Home
                                </button>
                                <span>/</span>
                                <button onClick={() => router.push("/resources")} className="hover:text-gray-700 transition-colors">
                                    Resources
                                </button>
                                <span>/</span>
                                <button onClick={() => router.push(`/resources/${topic}`)} className="hover:text-gray-700 transition-colors">
                                    {resourceData.title}
                                </button>
                                <span>/</span>
                                <span className="text-gray-900 font-medium">{sheetData.name}</span>
                            </nav>
                        </div>

                        <div className="flex items-center space-x-4">
                            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                                <User size={20} className="text-gray-600" />
                            </button>
                            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                                <Settings size={20} className="text-gray-600" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Page Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-4xl">{sheetMeta?.icon}</span>
                            <h1 className="text-3xl font-bold text-gray-900">{sheetData.name}</h1>
                        </div>
                        <p className="text-gray-600">{sheetMeta?.description}</p>
                        <div className="mt-4">
                            <Badge
                                variant="outline"
                                className={`bg-${sheetData.color}-50 text-${sheetData.color}-700 border-${sheetData.color}-200`}
                            >
                                {sheetData.commands.length} Command{sheetData.commands.length !== 1 ? 's' : ''}
                            </Badge>
                        </div>
                    </div>

                    {/* Commands List */}
                    <div className="space-y-4">
                        {sheetData.commands.map((command, index) => (
                            <Card key={index} className="border border-gray-200 hover:shadow-md transition-shadow">
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <code className="text-lg font-mono font-semibold text-gray-900 bg-gray-100 px-3 py-1 rounded">
                                                    {command.cmd}
                                                </code>
                                                <Badge variant="outline" className="text-xs">
                                                    {sheetData.name}
                                                </Badge>
                                            </div>
                                            <p className="text-gray-700 mb-3">{command.desc}</p>
                                            {command.ex && (
                                                <div className="bg-gray-900 text-gray-100 rounded-lg p-4 relative group">
                                                    <div className="flex items-start justify-between">
                                                        <code className="text-sm font-mono flex-1 break-all">
                                                            {command.ex}
                                                        </code>
                                                        <button
                                                            onClick={() => copyToClipboard(command.ex, index)}
                                                            className="ml-3 p-2 hover:bg-gray-800 rounded transition-colors flex-shrink-0"
                                                            title="Copy to clipboard"
                                                        >
                                                            {copiedIndex === index ? (
                                                                <Check className="w-4 h-4 text-green-400" />
                                                            ) : (
                                                                <Copy className="w-4 h-4 text-gray-400 group-hover:text-gray-200" />
                                                            )}
                                                        </button>
                                                    </div>
                                                    {copiedIndex === index && (
                                                        <span className="absolute top-2 right-12 text-xs text-green-400">
                                                            Copied!
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="mt-8 flex gap-4">
                        <Button
                            variant="outline"
                            onClick={() => router.push(`/resources/${topic}`)}
                            className="border-gray-300 hover:bg-gray-50"
                        >
                            ← Back to {resourceData.title}
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => router.push("/resources")}
                            className="border-gray-300 hover:bg-gray-50"
                        >
                            All Resources
                        </Button>
                    </div>
                </div>
            </main>
        </div>
    );
}
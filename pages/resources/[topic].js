import { useRouter } from "next/router";
import Head from "next/head";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    BookOpen,
    Settings,
    User,
    ArrowRight,
    Terminal,
    FileText,
} from "lucide-react";

const topicsMeta = {
    "linux-fundamentals": {
        title: "Linux Fundamentals",
        description:
            "Essential Linux commands and concepts for developers and system administrators.",
    },
    "docker-cheat-sheet": {
        title: "Docker Cheat Sheet",
    },
    "git-commands": { title: "Git Commands" },
    "aws-cli-reference": { title: "AWS CLI Reference" },
    "rest-api-best-practices": { title: "REST API Best Practices" },
    "security-guidelines": { title: "Security Guidelines" },
    "system-design-primer": { title: "System Design Primer" },
    "sql-query-patterns": { title: "SQL Query Patterns" },
};

const linuxCategories = [
    {
        name: "File Management",
        color: "blue",
        commands: [
            { cmd: "ls", desc: "List directory contents", ex: "ls -la" },
            { cmd: "cp", desc: "Copy files and directories", ex: "cp src.txt dst.txt" },
            { cmd: "mv", desc: "Move/rename files", ex: "mv old.txt new.txt" },
            { cmd: "rm", desc: "Remove files", ex: "rm file.txt | rm -r dir/" },
            { cmd: "mkdir", desc: "Create directory", ex: "mkdir -p path/to/dir" },
            { cmd: "touch", desc: "Create empty file / update timestamp", ex: "touch notes.md" },
        ],
    },
    {
        name: "Navigation",
        color: "emerald",
        commands: [
            { cmd: "pwd", desc: "Print working directory", ex: "pwd" },
            { cmd: "cd", desc: "Change directory", ex: "cd /var/log" },
            { cmd: "tree", desc: "Display directory tree", ex: "tree -L 2" },
        ],
    },
    {
        name: "Permissions & Ownership",
        color: "orange",
        commands: [
            { cmd: "chmod", desc: "Change permissions", ex: "chmod -R 755 app/" },
            { cmd: "chown", desc: "Change owner/group", ex: "chown user:group file" },
            { cmd: "umask", desc: "Default permission mask", ex: "umask 022" },
        ],
    },
    {
        name: "Process Management",
        color: "purple",
        commands: [
            { cmd: "ps", desc: "List processes", ex: "ps aux | grep node" },
            { cmd: "top/htop", desc: "Interactive process viewer", ex: "top" },
            { cmd: "kill", desc: "Send signal to process", ex: "kill -9 <pid>" },
            { cmd: "jobs/bg/fg", desc: "Manage background jobs", ex: "sleep 60 &; jobs; fg %1" },
            { cmd: "nice/renice", desc: "Adjust process priority", ex: "renice 10 -p <pid>" },
        ],
    },
    {
        name: "Networking",
        color: "red",
        commands: [
            { cmd: "ip/ifconfig", desc: "Network interfaces", ex: "ip a" },
            { cmd: "ss/netstat", desc: "Sockets / connections", ex: "ss -tulpn" },
            { cmd: "curl", desc: "HTTP requests", ex: "curl -I https://example.com" },
            { cmd: "ping", desc: "Check connectivity", ex: "ping -c 4 8.8.8.8" },
            { cmd: "traceroute", desc: "Route to host", ex: "traceroute example.com" },
            { cmd: "dig/nslookup", desc: "DNS lookup", ex: "dig A example.com" },
        ],
    },
    {
        name: "System Info & Monitoring",
        color: "indigo",
        commands: [
            { cmd: "uname", desc: "System info", ex: "uname -a" },
            { cmd: "df", desc: "Disk usage per filesystem", ex: "df -h" },
            { cmd: "du", desc: "Disk usage per path", ex: "du -sh *" },
            { cmd: "free", desc: "Memory usage", ex: "free -h" },
            { cmd: "uptime", desc: "Load average & uptime", ex: "uptime" },
            { cmd: "dmesg", desc: "Kernel ring buffer", ex: "dmesg | tail" },
            { cmd: "journalctl", desc: "Systemd logs", ex: "journalctl -u nginx --since today" },
        ],
    },
    {
        name: "Package Management",
        color: "amber",
        commands: [
            { cmd: "apt", desc: "Debian/Ubuntu packages", ex: "sudo apt update && sudo apt install nginx" },
            { cmd: "yum/dnf", desc: "RHEL/CentOS/Fedora packages", ex: "sudo dnf install nginx" },
            { cmd: "snap", desc: "Snaps", ex: "sudo snap install --classic code" },
        ],
    },
    {
        name: "Archiving & Compression",
        color: "green",
        commands: [
            { cmd: "tar", desc: "Archive/compress files", ex: "tar -czf backup.tgz folder/" },
            { cmd: "gzip/gunzip", desc: "Compress/decompress", ex: "gzip file | gunzip file.gz" },
            { cmd: "zip/unzip", desc: "Zip archives", ex: "zip -r archive.zip folder/" },
        ],
    },
    {
        name: "Text Processing",
        color: "cyan",
        commands: [
            { cmd: "cat", desc: "Concatenate/view files", ex: "cat file.txt" },
            { cmd: "less", desc: "Paged viewer", ex: "less /var/log/syslog" },
            { cmd: "head/tail", desc: "First/last lines", ex: "tail -f app.log" },
            { cmd: "wc", desc: "Counts", ex: "wc -l file.txt" },
            { cmd: "cut", desc: "Column extraction", ex: "cut -d, -f2 file.csv" },
            { cmd: "sort/uniq", desc: "Sort & deduplicate", ex: "sort file | uniq -c" },
            { cmd: "awk", desc: "Pattern scanning/processing", ex: "awk -F, '{print $1,$3}' file.csv" },
            { cmd: "sed", desc: "Stream editor", ex: "sed -n '1,10p' file.txt" },
            { cmd: "xargs", desc: "Build and execute commands", ex: "cat files.txt | xargs -I{} rm {}" },
        ],
    },
    {
        name: "Searching",
        color: "rose",
        commands: [
            { cmd: "grep", desc: "Search by pattern", ex: "grep -R " + '"error"' + " ./logs" },
            { cmd: "find", desc: "Find files by criteria", ex: "find . -name '*.log' -mtime -1" },
            { cmd: "locate", desc: "Indexed file search", ex: "locate nginx.conf" },
            { cmd: "rg/ag", desc: "Fast code search (ripgrep/the_silver_searcher)", ex: "rg TODO src/" },
        ],
    },
];

export default function ResourceTopic() {
    const router = useRouter();
    const { topic } = router.query;

    const meta = topicsMeta[topic] || { title: "Resource" };
    const isLinux = topic === "linux-fundamentals";

    return (
        <div className="min-h-screen bg-gray-50">
            <Head>
                <title>{meta.title} - Interview Nerd</title>
                <meta name="description" content={meta.description || `${meta.title} resource`} />
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
                                <span className="text-gray-900 font-medium">{meta.title}</span>
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
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">{meta.title}</h1>
                        {meta.description && (
                            <p className="mt-2 text-gray-600">{meta.description}</p>
                        )}
                    </div>

                    {isLinux ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {linuxCategories.map((cat) => (
                                <Card key={cat.name} className="border border-gray-200">
                                    <CardHeader>
                                        <CardTitle className="flex items-center justify-between">
                                            <span>{cat.name}</span>
                                            <Badge className={`bg-${cat.color}-100 text-${cat.color}-800`}>{cat.commands.length}</Badge>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-3">
                                            {cat.commands.map(({ cmd, desc, ex }) => (
                                                <div key={cmd} className="p-3 rounded-lg border border-gray-200 bg-white">
                                                    <div className="flex items-center justify-between">
                                                        <code className="font-mono text-sm text-gray-900">{cmd}</code>
                                                        <Badge variant="outline" className="text-xs">{cat.name}</Badge>
                                                    </div>
                                                    <p className="text-sm text-gray-600 mt-1">{desc}</p>
                                                    {ex && (
                                                        <div className="mt-2 text-xs text-gray-700">
                                                            <span className="font-semibold mr-1">Example:</span>
                                                            <code className="font-mono bg-gray-50 px-2 py-1 rounded border">{ex}</code>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <Card className="border border-gray-200">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-gray-700" />
                                    Coming Soon
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-700 mb-4">
                                    We are actively working on comprehensive resources for this topic.
                                </p>
                                <div className="flex items-center gap-2">
                                    <Button variant="outline" onClick={() => router.push("/resources")}>Back to Resources</Button>
                                    <Button onClick={() => router.push("/resources/linux-fundamentals")}>
                                        Explore Linux Fundamentals
                                        <ArrowRight className="ml-2 w-4 h-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </main>
        </div>
    );
}

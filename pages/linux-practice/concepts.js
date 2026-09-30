import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Folder, 
  FileText, 
  Activity, 
  Shield, 
  Terminal, 
  ChevronRight,
  BookOpen,
  ArrowLeft,
  Code,
  Globe,
  Lock,
  Package,
  HardDrive,
} from "lucide-react";
import { linuxConcepts } from "@/data/linuxData";

// Icon mapping based on string name from data
const iconMap = {
  Folder: Folder,
  FileText: FileText,
  Activity: Activity,
  Shield: Shield,
  Terminal: Terminal,
  Code: Code,
  Globe: Globe,
  Lock: Lock,
  Package: Package,
  HardDrive: HardDrive,
};

export default function LinuxConcepts() {
  return (
    <>
      <Head>
        <title>Linux Concepts | Interview Nerd</title>
        <meta name="description" content="Explore essential Linux concepts for systems administration and devops interviews." />
      </Head>

      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto space-y-10">
          
          {/* Header */}
          <div className="space-y-4">
            <Link 
              href="/linux-practice"
              className="inline-flex items-center text-gray-500 hover:text-gray-900 font-medium transition-colors text-sm"
            >
              <ArrowLeft size={16} className="mr-1.5" />
              Back to Linux Practice
            </Link>
            
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-xl">
                <BookOpen size={24} className="text-orange-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">
                Linux Concepts
              </h1>
            </div>
            <p className="text-gray-600 max-w-2xl text-lg">
              Select a subject module to review theory, best practices, and interview questions before executing the exercises.
            </p>
          </div>

          {/* Concepts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {linuxConcepts.map((concept, index) => {
              const Icon = iconMap[concept.icon] || Terminal;
              
              return (
                <Link key={concept.id} href={`/linux-practice/concepts/${concept.id}`}>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-surface border border-gray-200 rounded-2xl p-6 h-full flex flex-col hover:border-orange-300 hover:shadow-xl transition-all group relative overflow-hidden"
                  >
                    <div className="flex items-start justify-between mb-4 relative z-10">
                      <div className="p-2.5 bg-orange-50 rounded-lg group-hover:bg-orange-100 transition-colors">
                        <Icon size={22} className="text-orange-600" />
                      </div>
                      <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {concept.exercises.length} exercise{concept.exercises.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2 relative z-10 group-hover:text-orange-700 transition-colors">
                      {concept.title}
                    </h3>
                    
                    <p className="text-sm text-gray-600 mb-6 flex-1 relative z-10">
                      {concept.description}
                    </p>

                    <div className="flex items-center text-sm font-bold text-orange-600 group-hover:text-orange-700 transition-colors relative z-10 mt-auto">
                      Start Learning <ChevronRight size={16} className="ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </div>
                    
                    {/* Background decoration */}
                    <Icon size={120} className="absolute -bottom-6 -right-6 text-orange-50 group-hover:text-orange-100 transition-colors transform -rotate-12" />
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

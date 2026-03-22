import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FileText, Share2, Download, MoreVertical } from 'lucide-react';

interface PreviewProps {
  markdown: string;
}

export default function Preview({ markdown }: PreviewProps) {
  return (
    <section className="flex-1 bg-preview overflow-y-auto relative">
      <div className="h-10 flex items-center px-4 font-mono text-[0.7rem] text-inactive tracking-widest uppercase sticky top-0 bg-preview/90 backdrop-blur-sm z-10">
        RENDERED PREVIEW
      </div>
      
      <div className="px-16 pb-12 font-sans text-main leading-relaxed text-[0.95rem] 
                      [&_h1]:text-white [&_h1]:text-[2.8rem] [&_h1]:font-bold [&_h1]:mt-8 [&_h1]:mb-4 [&_h1]:border-l-[6px] [&_h1]:border-neon [&_h1]:pl-6 [&_h1]:-ml-[2.1rem]
                      [&_h2]:text-white [&_h2]:text-[1.6rem] [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-4
                      [&_h3]:text-dimmed [&_h3]:text-[1.1rem] [&_h3]:font-semibold [&_h3]:mt-8 [&_h3]:mb-4
                      [&_p]:text-[#b0b0b0] [&_p]:mb-4
                      [&_code]:font-mono [&_code]:text-neon
                      [&_ul]:list-none [&_ul]:pl-0 [&_ul]:mb-6
                      [&_li]:relative [&_li]:pl-6 [&_li]:mb-2 [&_li]:text-[#b0b0b0]
                      [&_li::before]:content-['—'] [&_li::before]:absolute [&_li::before]:left-0 [&_li::before]:text-neon">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {markdown}
        </ReactMarkdown>
      </div>

      <div className="absolute top-4 right-8 bg-[#2b1e2e] p-2.5 rounded shadow-[0_4px_20px_rgba(0,0,0,0.5)] flex flex-col gap-4 z-20">
        <FileText size={20} className="text-white cursor-pointer" />
        <Share2 size={20} className="text-dimmed hover:text-white cursor-pointer transition-colors" />
        <Download size={20} className="text-dimmed hover:text-white cursor-pointer transition-colors" />
        <MoreVertical size={20} className="text-dimmed hover:text-white cursor-pointer transition-colors" />
      </div>
    </section>
  );
}
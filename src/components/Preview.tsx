import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FileText, Share2, Download, MoreVertical } from "lucide-react";

interface PreviewProps {
  markdown: string;
}

export default function Preview({ markdown }: PreviewProps) {
  return (
    <section className="flex flex-col h-full w-full bg-preview overflow-y-auto overflow-x-hidden min-w-0 relative">
      <div className="h-10 flex items-center px-4 font-mono text-[0.7rem] text-inactive tracking-widest uppercase sticky top-0 bg-preview/90 backdrop-blur-sm z-10 shrink-0">
        RENDERED PREVIEW
      </div>

      <div
        className="px-8 pb-12 font-sans text-main leading-relaxed text-[0.95rem] min-w-0 wrap-break-word
                      [&_h1]:text-heading [&_h1]:text-[2.8rem] [&_h1]:font-bold [&_h1]:mt-8 [&_h1]:mb-4 [&_h1]:border-l-[6px] [&_h1]:border-neon [&_h1]:pl-6 [&_h1]:-ml-[2.1rem]
                      [&_h2]:text-heading [&_h2]:text-[1.6rem] [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-4
                      [&_h3]:text-dimmed [&_h3]:text-[1.1rem] [&_h3]:font-semibold [&_h3]:mt-8 [&_h3]:mb-4
                      [&_p]:text-main [&_p]:mb-4
                      [&_code]:font-mono [&_code]:text-neon [&_code]:break-all
                      [&_ul]:list-none [&_ul]:pl-0 [&_ul]:mb-6
                      [&_ol]:list-decimal [&_ol]:pl-10 [&_ol]:mb-6 [&_ol]:text-main
                      [&_li]:relative [&_li]:mb-2 [&_li]:text-main
                      [&_ul_li:not(.task-list-item)]:pl-6
                      [&_ul_li:not(.task-list-item)::before]:content-['—'] [&_ul_li:not(.task-list-item)::before]:absolute [&_ul_li:not(.task-list-item)::before]:left-0 [&_ul_li:not(.task-list-item)::before]:text-neon
                      [&_li.task-list-item]:list-none [&_li.task-list-item]:pl-1
                      [&_li_input[type='checkbox']]:mr-2 [&_li_input[type='checkbox']]:accent-neon
                      [&_table]:w-full [&_table]:border-collapse [&_table]:mb-6 [&_table]:text-sm
                      [&_th]:text-heading [&_th]:font-bold [&_th]:p-3 [&_th]:border [&_th]:border-inactive [&_th]:bg-activity/50 [&_th]:text-left
                      [&_td]:text-main [&_td]:p-3 [&_td]:border [&_td]:border-inactive
                      [&_hr]:border-inactive [&_hr]:my-10 [&_hr]:border-t-2
                      [&_del]:line-through [&_del]:text-dimmed"
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
      </div>

      <div
        className="absolute top-4 right-8 p-2.5 rounded shadow-[0_4px_20px_rgba(0,0,0,0.5)] flex flex-col gap-4 z-20"
        style={{ backgroundColor: "var(--color-sidebar)" }}
      >
        <FileText size={20} className="text-main cursor-pointer" />
        <Share2
          size={20}
          className="text-dimmed hover:text-white cursor-pointer transition-colors"
        />
        <Download
          size={20}
          className="text-dimmed hover:text-white cursor-pointer transition-colors"
        />
        <MoreVertical
          size={20}
          className="text-dimmed hover:text-white cursor-pointer transition-colors"
        />
      </div>
    </section>
  );
}

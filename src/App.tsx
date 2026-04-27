import { useState, useEffect } from 'react'
import { BookOpen, ChevronRight, Home, Menu, X, Download, Star, List, ChevronLeft, Award, Zap, Target, Layout, Workflow, CheckSquare, Flag } from 'lucide-react'
import pptxgen from "pptxgenjs";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const lessons = [
  { 
    id: 'lesson-1', 
    title: 'Updating is Harder than Starting Fresh', 
    path: '/content/lesson-1.html',
    highlights: ['The Fix-it Problem', 'Starting Fresh vs. Patching', 'Clean Foundations']
  },
  { 
    id: 'lesson-2', 
    title: 'You are the Driver: The Best Way to Use AI', 
    path: '/content/lesson-2.html',
    highlights: ['The Driver Metaphor', 'Subject Knowledge is Key', 'Knowing When to Take Over']
  },
  { 
    id: 'lesson-3', 
    title: 'How we built this: Learning by Doing', 
    path: '/content/lesson-3.html',
    highlights: ['Learning by Doing', 'Recording the Journey', '3-Day Build with AI']
  },
]

const demos = [
  {
    id: 'demo-migration',
    title: 'Project Update: Old to New',
    path: '/content/demo-migration.html',
    highlights: ['Modernizing an Old Tool', 'Simpler Design', 'Better Speed']
  },
  {
    id: 'demo-workflow',
    title: 'The 3-Day Build Workflow',
    path: '/content/demo-workflow.html',
    highlights: ['Quick Progress Timeline', 'AI-Human Teamwork', 'Fast Prototyping']
  },
  { 
    id: 'lesson-x', 
    title: 'Development Process Log', 
    path: '/content/lesson-x.html',
    highlights: ['Tracking Decisions', 'Fixing Problems', 'Step-by-Step History']
  },
]

const conclusions = [
  {
    id: 'conclusion',
    title: 'Summary & Take-Home',
    path: '/content/conclusion.html',
    highlights: ['Key Takeaways', 'The Future of Research', 'Final Conclusion']
  }
]

type PageType = 'intro' | 'session' | 'checklist' | 'summary';
interface LogPage {
  content: string;
  type: PageType;
}

function MarkdownViewer({ path }: { path: string }) {
  const [pages, setPages] = useState<LogPage[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    fetch(path)
      .then(res => res.text())
      .then(text => {
        const resultPages: LogPage[] = [];
        const checklistMatch = text.match(/### Implementation Checklist[\s\S]*?(?=### Path Forward|$)/);
        const checklistContent = checklistMatch ? checklistMatch[0] : "";
        const summaryMatch = text.match(/### Path Forward[\s\S]*/);
        const summaryContent = summaryMatch ? summaryMatch[0] : "";
        let mainBody = text.replace(/### Implementation Checklist[\s\S]*/, "").trim();
        const sessionParts = mainBody.split(/(?=## Session)/g);
        if (sessionParts[0] && !sessionParts[0].startsWith('## Session')) {
          resultPages.push({ content: sessionParts[0].trim(), type: 'intro' });
          sessionParts.shift();
        }
        sessionParts.forEach(s => {
          resultPages.push({ content: s.trim(), type: 'session' });
        });
        if (checklistContent) {
          resultPages.push({ content: checklistContent.trim(), type: 'checklist' });
        }
        if (summaryContent) {
          resultPages.push({ content: summaryContent.trim(), type: 'summary' });
        }
        setPages(resultPages);
      });
  }, [path]);

  if (pages.length === 0) return <div className="p-8 text-slate-400">Loading documentation...</div>;

  const page = pages[currentPage];

  return (
    <div className="flex flex-col h-full bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="flex-1 overflow-auto p-12">
        {page.type === 'intro' ? (
          <div className="h-full flex flex-col justify-center items-center text-center py-20">
            <div className="w-20 h-20 bg-sky-50 rounded-3xl flex items-center justify-center mb-8">
              <BookOpen className="text-sky-600" size={40} />
            </div>
            <div className="prose prose-slate prose-xl max-w-3xl">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{page.content}</ReactMarkdown>
            </div>
          </div>
        ) : page.type === 'checklist' ? (
          <div className="h-full flex flex-col justify-center py-10">
             <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-100">
                <CheckSquare className="text-emerald-500" size={32} />
                <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Project Milestones</h2>
             </div>
             <div className="prose prose-slate prose-lg max-w-none prose-ul:list-none prose-ul:pl-0 prose-li:bg-slate-50 prose-li:p-4 prose-li:rounded-xl prose-li:mb-3 prose-li:border prose-li:border-slate-100">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{page.content}</ReactMarkdown>
            </div>
          </div>
        ) : page.type === 'summary' ? (
          <div className="h-full flex flex-col justify-center items-center text-center py-20 bg-slate-900 rounded-[2rem] text-white">
            <Flag className="text-sky-400 mb-8" size={48} />
            <div className="prose prose-invert prose-xl max-w-2xl">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{page.content}</ReactMarkdown>
            </div>
            <div className="mt-12 p-6 bg-slate-800 rounded-2xl border border-slate-700">
               <p className="text-sky-300 font-bold uppercase tracking-widest text-xs">Final Status</p>
               <p className="text-slate-400 mt-2">All research objectives met. Presentation live.</p>
            </div>
          </div>
        ) : (
          <div className="prose prose-slate max-w-none prose-headings:text-slate-900 prose-p:text-slate-600 prose-strong:text-slate-900 prose-code:bg-slate-100 prose-code:p-1 prose-code:rounded prose-pre:bg-slate-900 prose-pre:text-slate-100">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{page.content}</ReactMarkdown>
          </div>
        )}
      </div>
      
      <div className="bg-slate-50 border-t border-slate-200 p-6 flex items-center justify-between">
        <div className="flex gap-4">
          <button 
            disabled={currentPage === 0}
            onClick={() => setCurrentPage(prev => prev - 1)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={16} /> Previous
          </button>
          <button 
            disabled={currentPage === pages.length - 1}
            onClick={() => setCurrentPage(prev => prev + 1)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-bold hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next <ChevronRight size={16} />
          </button>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="h-2 w-48 bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-sky-600 transition-all duration-300" 
              style={{ width: `${((currentPage + 1) / pages.length) * 100}%` }}
            />
          </div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            {page.type.toUpperCase()} • {currentPage + 1} of {pages.length}
          </span>
        </div>
      </div>
    </div>
  );
}

const presentationHighlights = [
  {
    title: 'A World Transformed by AI',
    subtitle: '01. Background',
    content: 'AI has fundamentally changed the world, with new functionalities emerging every month. Everyone has their own unique experiences, and it is crucial to share these insights—even if they are still immature—to collectively navigate this shift.'
  },
  {
    title: 'Lessons from 2026',
    subtitle: '02. Results',
    content: 'This presentation shares two major lessons learned since the start of 2026, focusing on how we work with AI and the rapid way we can now build new tools.'
  },
  {
    title: 'The 3-Day Development Proof',
    subtitle: '03. Impact',
    content: 'The application you see today was built entirely from scratch with AI in only three days. This shows how AI fundamentally changes our mindset when doing research and building projects.'
  }
];

function App() {
  const [view, setView] = useState<'welcome' | 'highlights' | 'toc' | 'lesson'>('welcome')
  const [currentLesson, setCurrentLesson] = useState<string | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [slideRequest, setSlideRequest] = useState<number | null>(null)

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'NAVIGATE') {
        const { lessonId, slideIndex } = event.data;
        setCurrentLesson(lessonId);
        setView('lesson');
        if (slideIndex !== undefined) {
          setSlideRequest(slideIndex);
        }
      } else if (event.data.type === 'EXPORT_SUMMARY') {
        exportFullSummary();
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const activeLesson = [...lessons, ...demos, ...conclusions].find(l => l.id === currentLesson)

  const exportFullSummary = async () => {
    const pres = new pptxgen();
    
    // 1. Title Slide
    const titleSlide = pres.addSlide();
    titleSlide.background = { color: '0F172A' };
    titleSlide.addText("Transforming Research with AI", { x: 0.5, y: 2, w: '90%', h: 1, fontSize: 36, color: '38BDF8', bold: true, align: 'center' });
    titleSlide.addText("2026 Executive Summary & Lessons", { x: 0.5, y: 3, w: '90%', h: 0.5, fontSize: 20, color: 'F1F5F9', align: 'center' });
    titleSlide.addText("Leihong Wu | DBB Seminar", { x: 0.5, y: 5, w: '90%', h: 0.3, fontSize: 14, color: '94A3B8', align: 'center' });

    // 2. Highlights Slide
    const hlSlide = pres.addSlide();
    hlSlide.addText("Executive Highlights", { x: 0.5, y: 0.5, w: '90%', h: 0.5, fontSize: 28, color: '0F172A', bold: true });
    presentationHighlights.forEach((hl, idx) => {
      hlSlide.addText(hl.title, { x: 0.5, y: 1.5 + (idx * 1.5), w: '90%', h: 0.4, fontSize: 18, color: '0284C7', bold: true });
      hlSlide.addText(hl.content, { x: 0.5, y: 2.0 + (idx * 1.5), w: '90%', h: 0.8, fontSize: 14, color: '475569' });
    });

    // 3. Lessons (Iterate through all lessons)
    for (const lesson of lessons) {
      // Section Header
      const sectionSlide = pres.addSlide();
      sectionSlide.background = { color: 'F1F5F9' };
      sectionSlide.addText(lesson.title, { x: 0.5, y: 2.5, w: '90%', h: 1, fontSize: 28, color: '0F172A', bold: true, align: 'center' });
      
      // Fetch and parse content
      try {
        const response = await fetch(lesson.path);
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const slides = doc.querySelectorAll('.slide');
        
        slides.forEach((slideEl) => {
          const pSlide = pres.addSlide();
          const h1 = slideEl.querySelector('h1')?.textContent || slideEl.querySelector('h2')?.textContent;
          if (h1) pSlide.addText(h1, { x: 0.5, y: 0.5, w: '90%', h: 0.8, fontSize: 24, color: '0F172A', bold: true });
          
          const bullets: string[] = [];
          slideEl.querySelectorAll('li, p, .take-home-card h3').forEach(el => {
            const text = el.textContent?.trim();
            if (text && text.length > 5 && !text.includes('Slide')) bullets.push(text);
          });
          
          bullets.slice(0, 7).forEach((text, idx) => {
            pSlide.addText(`• ${text}`, { x: 0.7, y: 1.5 + (idx * 0.5), w: '85%', h: 0.4, fontSize: 14, color: '475569' });
          });
        });
      } catch (e) { console.error("Error exporting lesson:", lesson.id, e); }
    }

    // 4. Conclusion
    const conclusion = conclusions[0];
    const concHeader = pres.addSlide();
    concHeader.background = { color: '0F172A' };
    concHeader.addText("Final Summary & Take-Home", { x: 0.5, y: 2.5, w: '90%', h: 1, fontSize: 28, color: '38BDF8', bold: true, align: 'center' });

    try {
      const response = await fetch(conclusion.path);
      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      doc.querySelectorAll('.slide').forEach(slideEl => {
        const pSlide = pres.addSlide();
        const h1 = slideEl.querySelector('h1')?.textContent || slideEl.querySelector('h2')?.textContent;
        if (h1) pSlide.addText(h1, { x: 0.5, y: 0.5, w: '90%', h: 0.8, fontSize: 24, color: '0F172A', bold: true });
        
        const bullets: string[] = [];
        slideEl.querySelectorAll('.take-home-card h3, .take-home-card p, li span').forEach(el => {
          const text = el.textContent?.trim();
          if (text) bullets.push(text);
        });
        
        bullets.slice(0, 8).forEach((text, idx) => {
          pSlide.addText(text, { x: 0.7, y: 1.5 + (idx * 0.5), w: '85%', h: 0.4, fontSize: 12, color: '475569' });
        });
      });
    } catch (e) { console.error("Error exporting conclusion", e); }

    pres.writeFile({ fileName: `Full_Research_Summary_2026.pptx` });
  };

  const downloadPPTX = async (lessonId: string) => {
    const lesson = [...lessons, ...demos, ...conclusions].find(l => l.id === lessonId);
    if (!lesson) return;
    const pres = new pptxgen();
    const titleSlide = pres.addSlide();
    titleSlide.background = { color: 'F1F5F9' };
    titleSlide.addText(lesson.title, { x: 0.5, y: 1, w: '90%', h: 1, fontSize: 32, color: '0F172A', bold: true, align: 'center' });
    titleSlide.addText("Executive Highlights", { x: 0.5, y: 2.5, w: '90%', h: 0.5, fontSize: 20, color: '0284C7', bold: true });
    lesson.highlights.forEach((hl, idx) => {
      titleSlide.addText(`• ${hl}`, { x: 0.7, y: 3.2 + (idx * 0.5), w: '85%', h: 0.4, fontSize: 16, color: '475569' });
    });
    titleSlide.addText("Leihong Wu | DBB Seminar 2026", { x: 0.5, y: 5, w: '90%', h: 0.3, fontSize: 12, color: '94A3B8', align: 'center' });
    if (lesson.path.endsWith('.html')) {
      try {
        const response = await fetch(lesson.path);
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const slides = doc.querySelectorAll('.slide');
        slides.forEach((slideEl) => {
          const pSlide = pres.addSlide();
          const h1 = slideEl.querySelector('h1')?.textContent;
          const h2 = slideEl.querySelector('h2')?.textContent;
          if (h1) pSlide.addText(h1, { x: 0.5, y: 0.5, w: '90%', h: 0.8, fontSize: 24, color: '0F172A', bold: true });
          else if (h2) pSlide.addText(h2, { x: 0.5, y: 0.5, w: '90%', h: 0.8, fontSize: 24, color: '0F172A', bold: true });
          const content: string[] = [];
          slideEl.querySelectorAll('li, p').forEach(el => {
            const text = el.textContent?.trim();
            if (text && text.length > 5) content.push(text);
          });
          content.slice(0, 6).forEach((text, idx) => {
            pSlide.addText(`• ${text}`, { x: 0.7, y: 1.5 + (idx * 0.6), w: '85%', h: 0.5, fontSize: 14, color: '475569' });
          });
        });
      } catch (error) {
        console.error("Failed to parse lesson content for PPTX:", error);
      }
    } else {
      const response = await fetch(lesson.path);
      const md = await response.text();
      const sessions = md.split(/(?=## Session|# Plan)/g);
      sessions.forEach((session) => {
        const pSlide = pres.addSlide();
        const lines = session.trim().split('\n');
        const title = lines[0].replace(/#+\s*/, '');
        pSlide.addText(title, { x: 0.5, y: 0.5, w: '90%', h: 0.8, fontSize: 24, color: '0F172A', bold: true });
        const bullets = lines.slice(1)
          .filter(l => l.trim().startsWith('-') || l.trim().startsWith('*') || l.trim().match(/^\d+\./))
          .map(l => l.replace(/^[-*\d.]+\s*/, '').trim())
          .slice(0, 7);
        bullets.forEach((bullet, idx) => {
          pSlide.addText(`• ${bullet}`, { x: 0.7, y: 1.5 + (idx * 0.5), w: '85%', h: 0.4, fontSize: 14, color: '475569' });
        });
      });
    }
    pres.writeFile({ fileName: `${lesson.id}.pptx` });
  };

  const selectLesson = (id: string) => {
    setCurrentLesson(id);
    setView('lesson');
    setSlideRequest(null);
  };

  const activePath = activeLesson ? `${activeLesson.path}${slideRequest !== null ? `?slide=${slideRequest}` : ''}` : '';

  return (
    <div className="flex h-screen w-screen bg-slate-50 overflow-hidden text-slate-900 font-sans">
      <aside 
        className={`${
          isSidebarOpen ? 'w-64' : 'w-0'
        } transition-all duration-300 bg-slate-900 text-white flex flex-col shadow-xl z-20 overflow-hidden`}
      >
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <BookOpen className="text-sky-400" />
          <span className="font-bold text-lg tracking-tight">AI Research</span>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          <button onClick={() => { setView('welcome'); setCurrentLesson(null); }} className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${view === 'welcome' ? 'bg-sky-600 text-white' : 'hover:bg-slate-800 text-slate-400'}`}>
            <Home size={18} /> <span className="font-medium">Title Page</span>
          </button>
          <button onClick={() => { setView('highlights'); setCurrentLesson(null); }} className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${view === 'highlights' ? 'bg-sky-600 text-white' : 'hover:bg-slate-800 text-slate-400'}`}>
            <Zap size={18} /> <span className="font-medium">Highlights</span>
          </button>
          <button onClick={() => { setView('toc'); setCurrentLesson(null); }} className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${view === 'toc' ? 'bg-sky-600 text-white' : 'hover:bg-slate-800 text-slate-400'}`}>
            <List size={18} /> <span className="font-medium">Table of Contents</span>
          </button>

          <div className="pt-4 pb-2 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Lessons</div>
          {lessons.map((lesson) => (
            <button key={lesson.id} onClick={() => selectLesson(lesson.id)} className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${currentLesson === lesson.id ? 'bg-sky-600 text-white' : 'hover:bg-slate-800 text-slate-400'}`}>
              <span className="font-medium truncate mr-2">{lesson.title}</span>
              <ChevronRight size={14} className={currentLesson === lesson.id ? 'opacity-100' : 'opacity-0'} />
            </button>
          ))}

          <div className="pt-4 pb-2 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Demos</div>
          {demos.map((demo) => (
            <button key={demo.id} onClick={() => selectLesson(demo.id)} className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${currentLesson === demo.id ? 'bg-sky-600 text-white' : 'hover:bg-slate-800 text-slate-400'}`}>
              <div className="flex items-center gap-3 truncate">
                {demo.id.includes('migration') ? <Layout size={14} /> : <Workflow size={14} />}
                <span className="font-medium truncate">{demo.title}</span>
              </div>
              <ChevronRight size={14} className={currentLesson === demo.id ? 'opacity-100' : 'opacity-0'} />
            </button>
          ))}

          <div className="pt-4 pb-2 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Closing</div>
          {conclusions.map((conclusion) => (
            <button key={conclusion.id} onClick={() => selectLesson(conclusion.id)} className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${currentLesson === conclusion.id ? 'bg-sky-600 text-white' : 'hover:bg-slate-800 text-slate-400'}`}>
              <div className="flex items-center gap-3 truncate">
                <Flag size={14} />
                <span className="font-medium truncate">{conclusion.title}</span>
              </div>
              <ChevronRight size={14} className={currentLesson === conclusion.id ? 'opacity-100' : 'opacity-0'} />
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-800">
          <div className="text-xs font-bold text-sky-400 uppercase mb-1">Author</div>
          <div className="text-sm font-medium text-slate-200">Leihong Wu</div>
          <div className="text-[10px] text-slate-500 mt-2">DBB Seminar 2026</div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col relative overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-10 shadow-sm">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-slate-100 rounded-md text-slate-600 transition-colors">
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="flex flex-col">
              <h2 className="text-[10px] font-black text-sky-600 uppercase tracking-widest leading-none mb-1">
                {view === 'welcome' ? 'Start' : view === 'highlights' ? 'Abstract' : view === 'toc' ? 'Index' : 'Chapter'}
              </h2>
              <h3 className="text-sm font-bold text-slate-800 truncate max-w-[300px]">
                {view === 'welcome' ? 'Welcome' : view === 'highlights' ? 'Presentation Highlights' : view === 'toc' ? 'Curriculum' : activeLesson?.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex flex-col items-end text-right">
              <span className="text-xs font-bold text-slate-900">Leihong Wu</span>
              <span className="text-[10px] text-slate-400 uppercase tracking-tight">DBB Seminar 2026</span>
            </div>
            {activeLesson && (
              <button onClick={() => downloadPPTX(activeLesson.id)} className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-800 transition-colors shadow-lg">
                <Download size={16} /> Export
              </button>
            )}
          </div>
        </header>

        <div className="flex-1 overflow-auto bg-slate-100">
          {view === 'welcome' && (
            <div className="h-full flex items-center justify-center p-8 bg-white">
              <div className="max-w-4xl w-full border-t border-b border-slate-200 py-20 text-center">
                <h1 className="text-5xl font-light text-slate-900 mb-8 tracking-tight leading-tight">
                  Transforming <span className="font-bold">Research</span> with AI: <br />
                  <span className="text-slate-500">Lessons Learned in 2026</span>
                </h1>
                <div className="space-y-2 mb-16">
                  <p className="text-2xl font-medium text-slate-800">Leihong Wu</p>
                  <p className="text-slate-500 uppercase tracking-[0.2em] text-sm">DBB Seminar Series</p>
                </div>
                <div className="flex flex-col items-center gap-8">
                  <p className="text-slate-400 font-mono text-sm">April 30, 2026</p>
                  <button onClick={() => setView('highlights')} className="group flex items-center gap-3 px-8 py-3 bg-slate-900 text-white rounded-full font-bold text-sm hover:bg-slate-800 transition-all hover:scale-105 shadow-lg">
                    Begin Presentation <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {view === 'highlights' && (
            <div className="h-full p-12 max-w-5xl mx-auto flex flex-col justify-center">
              <h2 className="text-5xl font-black text-slate-900 mb-16 tracking-tight flex items-center gap-4">
                <Award className="text-sky-600" size={48} /> Executive Highlights
              </h2>
              <div className="grid grid-cols-1 gap-8">
                <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-200 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-2 h-full bg-sky-500" />
                  <div className="flex gap-8">
                    <div className="w-16 h-16 bg-sky-50 rounded-2xl flex items-center justify-center shrink-0"> <BookOpen className="text-sky-600" size={32} /> </div>
                    <div>
                      <h3 className="text-xs font-black text-sky-600 uppercase tracking-widest mb-2">01. Background</h3>
                      <p className="text-2xl font-bold text-slate-800 leading-tight mb-4">A World Transformed by AI</p>
                      <p className="text-lg text-slate-600 leading-relaxed">AI has fundamentally changed the world, with new functionalities emerging every month. Everyone has their own unique experiences, and it is crucial to share these insights—even if they are still immature—to collectively navigate this shift.</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-200 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-2 h-full bg-blue-600" />
                  <div className="flex gap-8">
                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0"> <Target className="text-blue-600" size={32} /> </div>
                    <div>
                      <h3 className="text-xs font-black text-blue-600 uppercase tracking-widest mb-2">02. Results</h3>
                      <p className="text-2xl font-bold text-slate-800 leading-tight mb-4">Lessons from 2026</p>
                      <p className="text-lg text-slate-600 leading-relaxed">This presentation shares two major lessons learned since the start of 2026, focusing on how we work with AI and the rapid way we can now build new tools.</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-200 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-2 h-full bg-slate-900" />
                  <div className="flex gap-8">
                    <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center shrink-0"> <Zap className="text-slate-900" size={32} /> </div>
                    <div>
                      <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">03. Impact</h3>
                      <p className="text-2xl font-bold text-slate-800 leading-tight mb-4">The 3-Day Development Proof</p>
                      <p className="text-lg text-slate-600 leading-relaxed">The application you see today was built entirely from scratch with AI in only three days. This shows how AI fundamentally changes our mindset when doing research and building projects.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-16 flex justify-center">
                <button onClick={() => setView('toc')} className="flex items-center gap-2 text-slate-400 hover:text-slate-900 font-bold transition-colors uppercase tracking-widest text-sm">
                  Continue to Curriculum <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

{view === 'toc' && (
  <div className="h-full p-12 max-w-4xl mx-auto">
    <h2 className="text-4xl font-black text-slate-900 mb-8 flex items-center gap-4">
      <List className="text-sky-600" size={40} /> Presentation Index
    </h2>
    <div className="space-y-4">
      <div className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Lessons</div>
      {lessons.map((lesson, idx) => (
        <button 
          key={lesson.id} 
          onClick={() => selectLesson(lesson.id)} 
          className="w-full flex items-center justify-between p-4 rounded-lg transition-colors hover:bg-slate-100 border border-slate-200"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center font-bold text-slate-400">{idx + 1}</div>
            <span className="text-lg font-medium text-slate-800">{lesson.title}</span>
          </div>
          <ChevronRight size={16} className="text-slate-400" />
        </button>
      ))}
      <div className="text-sm font-bold text-slate-500 uppercase tracking-wider mt-6 mb-2">Demos</div>
      {demos.map((demo, idx) => (
        <button 
          key={demo.id} 
          onClick={() => selectLesson(demo.id)} 
          className="w-full flex items-center justify-between p-4 rounded-lg transition-colors hover:bg-slate-100 border border-slate-200"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center font-bold text-slate-400">{idx + 1}</div>
            <span className="text-lg font-medium text-slate-800">{demo.title}</span>
          </div>
          <ChevronRight size={16} className="text-slate-400" />
        </button>
      ))}
      <div className="text-sm font-bold text-slate-500 uppercase tracking-wider mt-6 mb-2">Closing</div>
      {conclusions.map((conclusion, idx) => (
        <button 
          key={conclusion.id} 
          onClick={() => selectLesson(conclusion.id)} 
          className="w-full flex items-center justify-between p-4 rounded-lg transition-colors hover:bg-slate-100 border border-slate-200"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center font-bold text-slate-400">{idx + 1}</div>
            <span className="text-lg font-medium text-slate-800">{conclusion.title}</span>
          </div>
          <ChevronRight size={16} className="text-slate-400" />
        </button>
      ))}
    </div>
  </div>
)}

          {view === 'lesson' && activeLesson && (
            <div className="h-full w-full">
               {activeLesson.path.endsWith('.md') ? (
                <div className="h-full w-full p-8 overflow-hidden flex justify-center">
                    <div className="max-w-5xl w-full h-full flex flex-col">
                      <p className="text-slate-400 mb-4 font-mono text-sm uppercase">Auto-Generated Documentation</p>
                      <MarkdownViewer path={activeLesson.path} />
                    </div>
                </div>
               ) : (
                <iframe src={activePath} className="w-full h-full border-none shadow-inner bg-white" title={activeLesson.title} />
               )}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default App

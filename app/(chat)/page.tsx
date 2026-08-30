"use client";

import {
  ArrowUpRight,
  Braces,
  Check,
  ChevronDown,
  Code2,
  Copy,
  Download,
  Eye,
  FileCode2,
  Folder,
  Globe2,
  History,
  Layers3,
  LayoutTemplate,
  Menu,
  Monitor,
  MoreHorizontal,
  Palette,
  Play,
  Plus,
  Rocket,
  Search,
  Send,
  Settings2,
  SlidersHorizontal,
  Smartphone,
  Sparkles,
  Tablet,
  WandSparkles,
  X,
  Zap,
} from "lucide-react";
import { type FormEvent, useMemo, useState } from "react";

type TemplateId = "saas" | "portfolio" | "commerce";
type ViewMode = "preview" | "code";

type Template = {
  id: TemplateId;
  name: string;
  label: string;
  description: string;
  accent: string;
  accentSoft: string;
  icon: typeof LayoutTemplate;
};

const templates: Template[] = [
  {
    accent: "#7c5cff",
    accentSoft: "#efeaff",
    description: "A focused launch page for a modern product team.",
    icon: Zap,
    id: "saas",
    label: "SaaS landing page",
    name: "Launchpad",
  },
  {
    accent: "#ec6b4f",
    accentSoft: "#fff0ea",
    description: "A sharp, editorial portfolio for independent makers.",
    icon: Palette,
    id: "portfolio",
    label: "Creative portfolio",
    name: "Atelier",
  },
  {
    accent: "#159a78",
    accentSoft: "#e4f7f0",
    description: "A conversion-ready storefront for considered goods.",
    icon: Layers3,
    id: "commerce",
    label: "Boutique storefront",
    name: "Goodfolk",
  },
];

const baseFiles = [
  { kind: "folder", name: "app" },
  { active: true, kind: "code", name: "page.tsx" },
  { kind: "code", name: "layout.tsx" },
  { kind: "code", name: "globals.css" },
  { kind: "folder", name: "components" },
  { kind: "code", name: "hero.tsx" },
  { kind: "code", name: "pricing.tsx" },
  { kind: "folder", name: "lib" },
  { kind: "code", name: "content.ts" },
];

const codeSnippets: Record<TemplateId, string> = {
  commerce: `export default function Goodfolk() {
  return (
    <main className="min-h-screen bg-[#f4f6ef] text-[#143128]">
      <Header logo="goodfolk goods" />
      <section className="mx-auto grid max-w-6xl gap-12 px-8 py-20 lg:grid-cols-2">
        <div>
          <Badge>New season / 2026</Badge>
          <h1>Everyday goods, made to last.</h1>
          <p>Thoughtful objects for slower, better rituals.</p>
          <Button>Shop the collection</Button>
        </div>
        <ProductGrid />
      </section>
    </main>
  )
}`,
  portfolio: `export default function Atelier() {
  return (
    <main className="min-h-screen bg-[#f7f4ef] text-[#171717]">
      <Header logo="atelier / 04" />
      <section className="mx-auto max-w-6xl px-8 pb-28 pt-24">
        <p className="eyebrow">Independent design practice</p>
        <h1>Objects, interfaces, and quiet moments.</h1>
        <ProjectGrid />
      </section>
    </main>
  )
}`,
  saas: `export default function Launchpad() {
  return (
    <main className="min-h-screen bg-[#0b0b10] text-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-8 py-6">
        <Logo />
        <Button>Start building</Button>
      </nav>
      <section className="mx-auto grid max-w-6xl gap-16 px-8 pb-24 pt-20 lg:grid-cols-[1fr_0.8fr]">
        <div>
          <Badge>AI-powered workspace</Badge>
          <h1>Turn ideas into products, faster.</h1>
          <p>Launch polished experiences with a team of AI-native tools.</p>
          <Button size="lg">Build your first idea <ArrowUpRight /></Button>
        </div>
        <ProductPreview />
      </section>
    </main>
  )
}`,
};

const promptSuggestions = [
  "Make the hero feel more premium",
  "Add a testimonials section",
  "Create a dark mode variant",
  "Make it mobile-first",
];

function getTemplate(id: TemplateId) {
  return templates.find((template) => template.id === id) ?? templates[0];
}

export default function Page() {
  const [activeTemplate, setActiveTemplate] = useState<TemplateId>("saas");
  const [viewMode, setViewMode] = useState<ViewMode>("preview");
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">(
    "desktop"
  );
  const [prompt, setPrompt] = useState("");
  const [projectName, setProjectName] = useState("launchpad");
  const [isGenerating, setIsGenerating] = useState(false);
  const [notice, setNotice] = useState("Ready");
  const [showFiles, setShowFiles] = useState(true);
  const [showInspector, setShowInspector] = useState(true);
  const [primaryColor, setPrimaryColor] = useState("#7c5cff");
  const [radius, setRadius] = useState("soft");
  const [font, setFont] = useState("Geist");
  const [siteTitle, setSiteTitle] = useState("Launchpad");
  const [changes, setChanges] = useState(12);

  const template = useMemo(() => getTemplate(activeTemplate), [activeTemplate]);

  const selectTemplate = (id: TemplateId) => {
    setActiveTemplate(id);
    setPrimaryColor(getTemplate(id).accent);
    setSiteTitle(getTemplate(id).name);
    setNotice(`${getTemplate(id).name} selected`);
    setChanges((current) => current + 1);
  };

  const runGeneration = (event?: FormEvent) => {
    event?.preventDefault();
    const trimmedPrompt = prompt.trim();
    if (!trimmedPrompt || isGenerating) {
      return;
    }
    setIsGenerating(true);
    setNotice("Building your update…");
    window.setTimeout(() => {
      setIsGenerating(false);
      setNotice("Changes applied");
      setChanges((current) => current + 1);
      setPrompt("");
    }, 900);
  };

  const copyCode = async () => {
    await navigator.clipboard?.writeText(codeSnippets[activeTemplate]);
    setNotice("Code copied");
  };

  const downloadCode = () => {
    const file = new Blob([codeSnippets[activeTemplate]], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${projectName || "ai-builder"}-page.tsx`;
    link.click();
    URL.revokeObjectURL(url);
    setNotice("Code downloaded");
  };

  return (
    <main className="flex min-h-screen w-full flex-col overflow-hidden bg-[#f8f8fa] text-[#17171b]">
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-black/[0.07] bg-white/90 px-4 backdrop-blur-xl lg:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <button
            aria-label="Toggle file explorer"
            className="rounded-lg p-2 text-black/45 transition hover:bg-black/[0.05] hover:text-black lg:hidden"
            onClick={() => setShowFiles((current) => !current)}
            type="button"
          >
            <Menu className="size-5" />
          </button>
          <div className="flex items-center gap-2.5 border-r border-black/[0.08] pr-4">
            <div className="flex size-8 items-center justify-center rounded-[10px] bg-[#17171b] text-white shadow-sm">
              <Sparkles className="size-4" />
            </div>
            <span className="hidden text-[15px] font-semibold tracking-[-0.02em] sm:block">
              AI Builder
            </span>
          </div>
          <div className="hidden items-center gap-2 text-[13px] text-black/50 sm:flex">
            <span>Projects</span>
            <span className="text-black/20">/</span>
            <input
              aria-label="Project name"
              className="w-28 bg-transparent font-medium text-black/75 outline-none transition focus:w-40"
              onChange={(event) => setProjectName(event.target.value)}
              value={projectName}
            />
            <ChevronDown className="size-3.5 text-black/35" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden items-center gap-1.5 rounded-full bg-[#effaf4] px-2.5 py-1.5 text-[11px] font-medium text-[#19754f] sm:flex">
            <span className="size-1.5 rounded-full bg-[#2eb879]" />
            {notice}
          </span>
          <button
            className="hidden items-center gap-2 rounded-lg border border-black/[0.1] bg-white px-3 py-2 text-[12px] font-medium text-black/65 shadow-[0_1px_2px_rgba(0,0,0,.03)] transition hover:border-black/20 hover:text-black md:flex"
            onClick={() => setNotice("Version history opened")}
            type="button"
          >
            <History className="size-3.5" />
            History
          </button>
          <button
            className="flex items-center gap-2 rounded-lg bg-[#17171b] px-3.5 py-2 text-[12px] font-semibold text-white shadow-[0_2px_6px_rgba(23,23,27,.18)] transition hover:bg-black"
            onClick={() => setNotice("Deploy preview created")}
            type="button"
          >
            <Rocket className="size-3.5" />
            <span className="hidden sm:inline">Deploy</span>
            <ArrowUpRight className="size-3.5" />
          </button>
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        <aside
          className={`${showFiles ? "flex" : "hidden"} absolute inset-y-16 left-0 z-20 w-[248px] flex-col border-r border-black/[0.07] bg-white lg:relative lg:inset-y-0 lg:flex`}
        >
          <div className="flex items-center justify-between px-4 pb-3 pt-5">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-black/35">
                Workspace
              </p>
              <p className="mt-1 text-[13px] font-semibold text-black/75">
                {projectName || "Untitled project"}
              </p>
            </div>
            <button
              aria-label="Close file explorer"
              className="rounded-md p-1.5 text-black/35 hover:bg-black/[0.05] lg:hidden"
              onClick={() => setShowFiles(false)}
              type="button"
            >
              <X className="size-4" />
            </button>
          </div>
          <div className="px-3 pb-4">
            <button
              className="flex w-full items-center gap-2 rounded-lg border border-dashed border-black/[0.13] px-3 py-2.5 text-left text-[12px] font-medium text-black/55 transition hover:border-black/25 hover:bg-black/[0.02]"
              onClick={() => setNotice("New page added")}
              type="button"
            >
              <Plus className="size-3.5" />
              New page
            </button>
          </div>
          <div className="flex items-center justify-between border-y border-black/[0.06] px-4 py-2.5">
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-black/35">
              Files
            </span>
            <div className="flex items-center gap-1">
              <button
                aria-label="Search files"
                className="rounded p-1 text-black/35 hover:bg-black/[0.05] hover:text-black/70"
                onClick={() => setNotice("File search ready")}
                type="button"
              >
                <Search className="size-3.5" />
              </button>
              <button
                aria-label="More file actions"
                className="rounded p-1 text-black/35 hover:bg-black/[0.05] hover:text-black/70"
                onClick={() => setNotice("File actions opened")}
                type="button"
              >
                <MoreHorizontal className="size-3.5" />
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto px-2 py-3">
            {baseFiles.map((file) => (
              <button
                className={`group flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-[12px] transition ${file.active ? "bg-[#17171b]/[0.07] font-semibold text-black/85" : "text-black/52 hover:bg-black/[0.04] hover:text-black/80"}`}
                key={file.name}
                onClick={() => setNotice(`${file.name} selected`)}
                type="button"
              >
                {file.kind === "folder" ? (
                  <Folder className="size-3.5 text-black/35" />
                ) : (
                  <FileCode2 className="size-3.5 text-[#7c5cff]/70" />
                )}
                <span>{file.name}</span>
                {file.active ? (
                  <span className="ml-auto size-1.5 rounded-full bg-[#7c5cff]" />
                ) : null}
              </button>
            ))}
          </div>
          <div className="border-t border-black/[0.07] p-3">
            <div className="rounded-xl bg-[#f7f6fb] p-3">
              <div className="mb-2 flex items-center gap-2">
                <div className="flex size-6 items-center justify-center rounded-md bg-[#eae6ff] text-[#7253e7]">
                  <Sparkles className="size-3.5" />
                </div>
                <span className="text-[11px] font-semibold text-black/70">
                  Builder credits
                </span>
                <span className="ml-auto text-[10px] font-medium text-black/40">
                  82%
                </span>
              </div>
              <div className="h-1 overflow-hidden rounded-full bg-black/[0.08]">
                <div className="h-full w-[82%] rounded-full bg-[#7c5cff]" />
              </div>
              <p className="mt-2 text-[10px] leading-relaxed text-black/40">
                164 of 200 monthly generations used
              </p>
            </div>
          </div>
        </aside>

        <section className="flex min-w-0 flex-1 flex-col">
          <div className="flex h-12 shrink-0 items-center justify-between border-b border-black/[0.07] bg-white/65 px-3 lg:px-5">
            <div className="flex items-center gap-1 rounded-lg bg-black/[0.045] p-1">
              <button
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[11px] font-semibold transition ${viewMode === "preview" ? "bg-white text-black/80 shadow-sm" : "text-black/40 hover:text-black/70"}`}
                onClick={() => setViewMode("preview")}
                type="button"
              >
                <Eye className="size-3.5" />
                Preview
              </button>
              <button
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[11px] font-semibold transition ${viewMode === "code" ? "bg-white text-black/80 shadow-sm" : "text-black/40 hover:text-black/70"}`}
                onClick={() => setViewMode("code")}
                type="button"
              >
                <Code2 className="size-3.5" />
                Code
              </button>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="hidden items-center gap-1 rounded-lg border border-black/[0.08] bg-white p-1 sm:flex">
                <button
                  aria-label="Desktop preview"
                  className={`rounded-md p-1.5 ${device === "desktop" ? "bg-black/[0.07] text-black/80" : "text-black/35 hover:text-black/60"}`}
                  onClick={() => setDevice("desktop")}
                  type="button"
                >
                  <Monitor className="size-3.5" />
                </button>
                <button
                  aria-label="Tablet preview"
                  className={`rounded-md p-1.5 ${device === "tablet" ? "bg-black/[0.07] text-black/80" : "text-black/35 hover:text-black/60"}`}
                  onClick={() => setDevice("tablet")}
                  type="button"
                >
                  <Tablet className="size-3.5" />
                </button>
                <button
                  aria-label="Mobile preview"
                  className={`rounded-md p-1.5 ${device === "mobile" ? "bg-black/[0.07] text-black/80" : "text-black/35 hover:text-black/60"}`}
                  onClick={() => setDevice("mobile")}
                  type="button"
                >
                  <Smartphone className="size-3.5" />
                </button>
              </div>
              <button
                className="rounded-lg border border-black/[0.08] bg-white p-2 text-black/45 transition hover:text-black/80"
                onClick={() => setNotice("Preview refreshed")}
                type="button"
              >
                <Play className="size-3.5" />
              </button>
              <button
                aria-label="Toggle inspector"
                className={`rounded-lg border border-black/[0.08] bg-white p-2 transition ${showInspector ? "text-[#7253e7]" : "text-black/45 hover:text-black/80"}`}
                onClick={() => setShowInspector((current) => !current)}
                type="button"
              >
                <SlidersHorizontal className="size-3.5" />
              </button>
            </div>
          </div>

          <div className="relative flex min-h-0 flex-1 overflow-auto bg-[#f1f1f3] p-4 lg:p-8">
            {viewMode === "preview" ? (
              <div className="flex min-h-full w-full items-start justify-center">
                <div
                  className={`overflow-hidden bg-white shadow-[0_14px_45px_rgba(25,25,35,.13)] transition-all duration-300 ${device === "desktop" ? "w-full max-w-[930px] rounded-xl" : device === "tablet" ? "w-[min(100%,700px)] rounded-2xl" : "w-[min(100%,390px)] rounded-[28px] border-[7px] border-[#22232b]"}`}
                >
                  <BuilderPreview
                    accent={primaryColor || template.accent}
                    radius={radius}
                    siteTitle={siteTitle || template.name}
                    template={activeTemplate}
                  />
                </div>
              </div>
            ) : (
              <div className="mx-auto h-fit w-full max-w-[930px] overflow-hidden rounded-xl border border-black/[0.08] bg-[#15151a] shadow-[0_14px_45px_rgba(25,25,35,.13)]">
                <div className="flex items-center justify-between border-b border-white/[0.08] px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-[#ff6a6a]" />
                    <span className="size-2 rounded-full bg-[#ffc95c]" />
                    <span className="size-2 rounded-full bg-[#54d39b]" />
                    <span className="ml-3 font-mono text-[11px] text-white/40">
                      app / page.tsx
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      className="rounded-md p-1.5 text-white/45 transition hover:bg-white/[0.08] hover:text-white"
                      onClick={copyCode}
                      type="button"
                    >
                      <Copy className="size-3.5" />
                    </button>
                    <button
                      className="rounded-md p-1.5 text-white/45 transition hover:bg-white/[0.08] hover:text-white"
                      onClick={downloadCode}
                      type="button"
                    >
                      <Download className="size-3.5" />
                    </button>
                  </div>
                </div>
                <pre className="overflow-x-auto p-5 text-[12px] leading-7 text-[#d9d5e8] sm:p-7">
                  <code>{codeSnippets[activeTemplate]}</code>
                </pre>
              </div>
            )}
          </div>

          <div className="border-t border-black/[0.07] bg-white/85 px-3 py-3 backdrop-blur-xl lg:px-5">
            <form
              className="mx-auto flex max-w-4xl items-end gap-2 rounded-2xl border border-black/[0.11] bg-white p-2 shadow-[0_4px_20px_rgba(20,20,30,.07)] focus-within:border-[#7c5cff]/45 focus-within:ring-4 focus-within:ring-[#7c5cff]/[0.08]"
              onSubmit={runGeneration}
            >
              <div className="flex items-center self-end pb-1 pl-1">
                <button
                  aria-label="Attach context"
                  className="rounded-lg p-2 text-black/35 transition hover:bg-black/[0.05] hover:text-black/70"
                  onClick={() => setNotice("Context picker opened")}
                  type="button"
                >
                  <Plus className="size-4" />
                </button>
              </div>
              <textarea
                aria-label="Describe the change you want"
                className="max-h-28 min-h-10 flex-1 resize-none bg-transparent px-1 py-2 text-[13px] leading-5 text-black/80 outline-none placeholder:text-black/35"
                onChange={(event) => setPrompt(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    runGeneration();
                  }
                }}
                placeholder="Describe what you want to build or change…"
                value={prompt}
              />
              <button
                aria-label="Generate changes"
                className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#17171b] text-white transition hover:bg-[#7c5cff] disabled:cursor-not-allowed disabled:opacity-35"
                disabled={!prompt.trim() || isGenerating}
                type="submit"
              >
                {isGenerating ? (
                  <Sparkles className="size-4 animate-pulse" />
                ) : (
                  <Send className="size-4" />
                )}
              </button>
            </form>
            <div className="mx-auto mt-2.5 flex max-w-4xl items-center justify-between gap-3 px-1">
              <div className="hidden items-center gap-2 text-[10px] text-black/35 sm:flex">
                <WandSparkles className="size-3.5" />
                AI can update layout, copy, style, and code
              </div>
              <div className="flex min-w-0 gap-1.5 overflow-x-auto no-scrollbar">
                {promptSuggestions.slice(0, 3).map((suggestion) => (
                  <button
                    className="shrink-0 rounded-full border border-black/[0.08] bg-white px-2.5 py-1 text-[10px] font-medium text-black/45 transition hover:border-[#7c5cff]/30 hover:bg-[#f8f6ff] hover:text-[#7253e7]"
                    key={suggestion}
                    onClick={() => setPrompt(suggestion)}
                    type="button"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {showInspector ? (
          <aside className="hidden w-[252px] shrink-0 flex-col border-l border-black/[0.07] bg-white xl:flex">
            <div className="flex h-12 items-center justify-between border-b border-black/[0.07] px-4">
              <div className="flex items-center gap-2">
                <Settings2 className="size-3.5 text-black/45" />
                <span className="text-[12px] font-semibold text-black/75">
                  Inspector
                </span>
              </div>
              <span className="rounded-full bg-[#f1edff] px-2 py-1 text-[9px] font-bold uppercase tracking-[0.1em] text-[#7253e7]">
                Live
              </span>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <section>
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="text-[10px] font-bold uppercase tracking-[0.14em] text-black/35">
                    Templates
                  </h2>
                  <LayoutTemplate className="size-3.5 text-black/25" />
                </div>
                <div className="space-y-2">
                  {templates.map((item) => {
                    const Icon = item.icon;
                    const isSelected = item.id === activeTemplate;
                    return (
                      <button
                        className={`flex w-full items-center gap-2.5 rounded-xl border p-2 text-left transition ${isSelected ? "border-[#7c5cff]/35 bg-[#f8f6ff]" : "border-black/[0.07] hover:border-black/[0.15] hover:bg-black/[0.02]"}`}
                        key={item.id}
                        onClick={() => selectTemplate(item.id)}
                        type="button"
                      >
                        <div
                          className="flex size-8 items-center justify-center rounded-lg"
                          style={{
                            backgroundColor: item.accentSoft,
                            color: item.accent,
                          }}
                        >
                          <Icon className="size-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-[11px] font-semibold text-black/75">
                            {item.name}
                          </p>
                          <p className="truncate text-[10px] text-black/40">
                            {item.label}
                          </p>
                        </div>
                        {isSelected ? (
                          <Check className="ml-auto size-3.5 text-[#7c5cff]" />
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              </section>

              <div className="my-5 h-px bg-black/[0.07]" />

              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-[10px] font-bold uppercase tracking-[0.14em] text-black/35">
                    Site settings
                  </h2>
                  <Globe2 className="size-3.5 text-black/25" />
                </div>
                <label className="block">
                  <span className="mb-1.5 block text-[11px] font-medium text-black/60">
                    Site title
                  </span>
                  <input
                    className="w-full rounded-lg border border-black/[0.1] bg-white px-2.5 py-2 text-[11px] text-black/75 outline-none transition focus:border-[#7c5cff]/45 focus:ring-2 focus:ring-[#7c5cff]/10"
                    onChange={(event) => setSiteTitle(event.target.value)}
                    value={siteTitle}
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-[11px] font-medium text-black/60">
                    Primary color
                  </span>
                  <div className="flex items-center gap-2 rounded-lg border border-black/[0.1] px-2.5 py-2">
                    <input
                      aria-label="Primary color"
                      className="size-5 cursor-pointer rounded border-0 bg-transparent p-0"
                      onChange={(event) => setPrimaryColor(event.target.value)}
                      type="color"
                      value={primaryColor}
                    />
                    <span className="font-mono text-[10px] uppercase text-black/45">
                      {primaryColor}
                    </span>
                  </div>
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-[11px] font-medium text-black/60">
                    Typeface
                  </span>
                  <select
                    className="w-full appearance-none rounded-lg border border-black/[0.1] bg-white px-2.5 py-2 text-[11px] text-black/65 outline-none focus:border-[#7c5cff]/45"
                    onChange={(event) => setFont(event.target.value)}
                    value={font}
                  >
                    <option>Geist</option>
                    <option>Inter</option>
                    <option>DM Sans</option>
                    <option>Space Grotesk</option>
                  </select>
                </label>
                <div>
                  <span className="mb-1.5 block text-[11px] font-medium text-black/60">
                    Corner style
                  </span>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      ["sharp", "Sharp"],
                      ["soft", "Soft"],
                      ["round", "Round"],
                    ].map(([value, label]) => (
                      <button
                        className={`rounded-lg border py-2 text-[10px] font-medium transition ${radius === value ? "border-[#7c5cff]/40 bg-[#f7f4ff] text-[#7253e7]" : "border-black/[0.09] text-black/45 hover:bg-black/[0.03]"}`}
                        key={value}
                        onClick={() => setRadius(value)}
                        type="button"
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </section>

              <div className="my-5 h-px bg-black/[0.07]" />

              <section>
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="text-[10px] font-bold uppercase tracking-[0.14em] text-black/35">
                    Build status
                  </h2>
                  <Braces className="size-3.5 text-black/25" />
                </div>
                <div className="space-y-2">
                  <StatusRow label="Components" value="18" />
                  <StatusRow label="AI changes" value={String(changes)} />
                  <StatusRow good label="Accessibility" value="98%" />
                  <StatusRow good label="Performance" value="94" />
                </div>
              </section>
            </div>
            <div className="border-t border-black/[0.07] p-3">
              <button
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-black/[0.1] py-2.5 text-[11px] font-semibold text-black/60 transition hover:bg-black/[0.04] hover:text-black/80"
                onClick={() => setNotice("Project settings opened")}
                type="button"
              >
                <Settings2 className="size-3.5" />
                Project settings
              </button>
            </div>
          </aside>
        ) : null}
      </div>
    </main>
  );
}

function StatusRow({
  label,
  value,
  good = false,
}: {
  label: string;
  value: string;
  good?: boolean;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-black/[0.025] px-2.5 py-2">
      <span className="text-[10px] text-black/45">{label}</span>
      <span
        className={`flex items-center gap-1 text-[10px] font-semibold ${good ? "text-[#20845d]" : "text-black/65"}`}
      >
        {good ? <Check className="size-3" /> : null}
        {value}
      </span>
    </div>
  );
}

function BuilderPreview({
  accent,
  radius,
  siteTitle,
  template,
}: {
  accent: string;
  radius: string;
  siteTitle: string;
  template: TemplateId;
}) {
  const radiusClass =
    radius === "sharp"
      ? "rounded-none"
      : radius === "round"
        ? "rounded-3xl"
        : "rounded-xl";

  if (template === "portfolio") {
    return (
      <div className="min-h-[590px] bg-[#f7f4ef] font-sans text-[#171717]">
        <div className="flex items-center justify-between px-6 py-5 text-[10px] sm:px-10">
          <span className="font-semibold tracking-[-0.03em]">atelier / 04</span>
          <div className="hidden items-center gap-5 text-black/45 sm:flex">
            <span>Work</span>
            <span>About</span>
            <span>Contact</span>
          </div>
          <span className="size-2 rounded-full bg-[#ec6b4f]" />
        </div>
        <div className="px-6 pb-14 pt-16 sm:px-10 sm:pt-24">
          <p className="mb-5 text-[9px] font-bold uppercase tracking-[0.2em] text-[#ec6b4f]">
            Independent design practice
          </p>
          <h1 className="max-w-xl text-[40px] font-medium leading-[0.98] tracking-[-0.065em] sm:text-[60px]">
            Objects, interfaces, and quiet moments.
          </h1>
          <p className="mt-6 max-w-xs text-[12px] leading-6 text-black/50">
            A small studio working across brand, digital, and the spaces
            between.
          </p>
          <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-5">
            {["Form / 01", "Rhythm / 02", "Field / 03", "Still / 04"].map(
              (item, index) => (
                <div
                  className={`${radiusClass} ${index % 2 === 0 ? "bg-[#d9d2c6]" : "bg-[#c2d1cc]"} flex aspect-[1.35] items-end p-3 sm:p-5`}
                  key={item}
                >
                  <div>
                    <span className="block text-[10px] font-semibold">
                      {item}
                    </span>
                    <span className="mt-1 block text-[9px] text-black/45">
                      Selected project
                    </span>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    );
  }

  if (template === "commerce") {
    return (
      <div className="min-h-[590px] bg-[#f4f6ef] font-sans text-[#143128]">
        <div className="flex items-center justify-between border-b border-[#143128]/10 px-6 py-5 text-[10px] sm:px-10">
          <span className="font-semibold tracking-[-0.02em]">
            goodfolk goods
          </span>
          <div className="hidden items-center gap-5 text-[#143128]/55 sm:flex">
            <span>Shop</span>
            <span>Our story</span>
            <span>Journal</span>
          </div>
          <span className="rounded-full border border-[#143128]/15 px-2 py-1">
            Bag (0)
          </span>
        </div>
        <div className="grid gap-10 px-6 pb-16 pt-16 sm:px-10 sm:pt-24 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="inline-flex rounded-full bg-[#d8eee4] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.15em] text-[#21805f]">
              New season / 2026
            </span>
            <h1 className="mt-5 max-w-md text-[42px] font-medium leading-[0.98] tracking-[-0.06em] sm:text-[58px]">
              Everyday goods, made to last.
            </h1>
            <p className="mt-6 max-w-xs text-[12px] leading-6 text-[#143128]/55">
              Thoughtful objects for slower, better rituals.
            </p>
            <button
              className="mt-8 flex items-center gap-2 rounded-full px-5 py-3 text-[11px] font-bold text-white"
              style={{ backgroundColor: accent }}
              type="button"
            >
              Shop the collection <ArrowUpRight className="size-3.5" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {["Linen throw", "Stoneware set", "Daily tote", "Oak tray"].map(
              (item, index) => (
                <div
                  className={`${radiusClass} overflow-hidden bg-white`}
                  key={item}
                >
                  <div
                    className={`aspect-square ${index % 2 === 0 ? "bg-[#d7e4d8]" : "bg-[#eadfd0]"}`}
                  />
                  <div className="flex items-center justify-between px-3 py-3">
                    <span className="text-[10px] font-semibold">{item}</span>
                    <span className="text-[9px] text-[#143128]/45">$48</span>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[590px] bg-[#0b0b10] font-sans text-white">
      <div className="flex items-center justify-between px-6 py-5 text-[10px] sm:px-10">
        <div className="flex items-center gap-2 font-semibold tracking-[-0.02em]">
          <span
            className="flex size-5 items-center justify-center rounded-md text-[9px]"
            style={{ backgroundColor: accent }}
          >
            ✦
          </span>
          {siteTitle}
        </div>
        <div className="hidden items-center gap-5 text-white/45 sm:flex">
          <span>Product</span>
          <span>Solutions</span>
          <span>Pricing</span>
          <span>Resources</span>
        </div>
        <button
          className="rounded-lg border border-white/15 px-3 py-2 text-[10px] font-semibold text-white/80"
          type="button"
        >
          Sign in
        </button>
      </div>
      <div className="px-6 pb-20 pt-20 sm:px-10 sm:pt-24">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-[0.13em] text-white/60">
            <Sparkles className="size-3" style={{ color: accent }} /> AI-powered
            workspace
          </span>
          <h1 className="mt-6 max-w-2xl text-[44px] font-medium leading-[0.95] tracking-[-0.065em] sm:text-[66px]">
            Turn ideas into products, faster.
          </h1>
          <p className="mt-6 max-w-sm text-[13px] leading-6 text-white/45">
            Launch polished experiences with a team of AI-native tools that keep
            your best thinking in the loop.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              className={`${radiusClass} flex items-center gap-2 px-4 py-3 text-[11px] font-bold text-white`}
              style={{ backgroundColor: accent }}
              type="button"
            >
              Build your first idea <ArrowUpRight className="size-3.5" />
            </button>
            <span className="flex items-center gap-1.5 text-[10px] text-white/35">
              <Check className="size-3.5 text-[#54d39b]" /> No credit card
              required
            </span>
          </div>
        </div>
        <div className="mt-16 grid gap-3 sm:grid-cols-3">
          {["Brief to build", "Always editable", "Ready to ship"].map(
            (item, index) => (
              <div
                className={`${radiusClass} border border-white/[0.08] bg-white/[0.035] p-4`}
                key={item}
              >
                <span
                  className="mb-8 flex size-7 items-center justify-center rounded-lg bg-white/[0.07] text-[11px] font-bold"
                  style={{ color: accent }}
                >
                  0{index + 1}
                </span>
                <span className="block text-[11px] font-semibold text-white/80">
                  {item}
                </span>
                <span className="mt-1 block text-[10px] leading-5 text-white/35">
                  A calm, focused way to move from thought to shipped.
                </span>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

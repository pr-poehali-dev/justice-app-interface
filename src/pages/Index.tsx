import { useState, useRef } from "react";
import type React from "react";
import Icon from "@/components/ui/icon";

type Section = "home" | "search" | "generator" | "stenography" | "distribution";

const NAV_ITEMS = [
  { id: "search" as Section, icon: "Search", label: "Поиск практики", sub: "ИИ-ассистент" },
  { id: "generator" as Section, icon: "FileText", label: "Генератор актов", sub: "Проекты судебных актов" },
  { id: "stenography" as Section, icon: "Mic", label: "Стенография", sub: "Протокол заседания" },
  { id: "distribution" as Section, icon: "GitBranch", label: "Распределение дел", sub: "ИИ-модуль" },
];

const MODULE_CARDS = [
  {
    id: "search" as Section,
    icon: "Search",
    num: "01",
    title: "Поиск судебной практики",
    desc: "ИИ-ассистент находит релевантные судебные решения, анализирует прецеденты и формирует аналитические справки по запросу",
    tag: "ChatGPT",
    color: "blue",
  },
  {
    id: "generator" as Section,
    icon: "FileText",
    num: "02",
    title: "Генератор судебных актов",
    desc: "Автоматическая генерация проектов судебных актов на основе промта и загруженных документов по делу",
    tag: "GPT-4",
    color: "green",
  },
  {
    id: "stenography" as Section,
    icon: "Mic",
    num: "03",
    title: "Модуль стенографии",
    desc: "Преобразование аудиозаписи судебного заседания в структурированный письменный протокол с разметкой участников",
    tag: "Whisper AI",
    color: "amber",
  },
  {
    id: "distribution" as Section,
    icon: "GitBranch",
    num: "04",
    title: "Распределение дел",
    desc: "Интеллектуальная система автоматического распределения судебных дел между судьями с учётом нагрузки и специализации",
    tag: "ML-модель",
    color: "purple",
  },
];

const tagColors: Record<string, string> = {
  blue: "bg-blue-50 text-blue-700 border-blue-200",
  green: "bg-emerald-50 text-emerald-700 border-emerald-200",
  amber: "bg-amber-50 text-amber-700 border-amber-200",
  purple: "bg-violet-50 text-violet-700 border-violet-200",
};

const iconColors: Record<string, string> = {
  blue: "bg-blue-100 text-blue-700",
  green: "bg-emerald-100 text-emerald-700",
  amber: "bg-amber-100 text-amber-700",
  purple: "bg-violet-100 text-violet-700",
};

function HomePage({ onNavigate }: { onNavigate: (s: Section) => void }) {
  return (
    <div className="animate-fade-in">
      <div className="bg-[hsl(var(--navy))] text-white px-8 py-10 mb-8 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)",
            backgroundSize: "20px 20px",
          }}
        />
        <div className="relative">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-mono-ru tracking-widest text-white/50 uppercase">АИС · Судебный модуль</span>
            <span className="w-2 h-2 rounded-full bg-[hsl(var(--gold))] status-dot" />
            <span className="text-xs text-[hsl(var(--gold))]">Система активна</span>
          </div>
          <h1 className="text-3xl font-bold mb-2 tracking-tight">ГАС «Судопроизводство 1.0»</h1>
          <p className="text-white/60 text-sm max-w-xl leading-relaxed">
            Автоматизированная информационная система поддержки судопроизводства с применением технологий искусственного интеллекта
          </p>
          <div className="flex items-center gap-6 mt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-[hsl(var(--gold))]">4</div>
              <div className="text-xs text-white/50 mt-0.5">модуля</div>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="text-center">
              <div className="text-2xl font-bold text-white">ИИ</div>
              <div className="text-xs text-white/50 mt-0.5">технологии</div>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="text-center">
              <div className="text-2xl font-bold text-white">24/7</div>
              <div className="text-xs text-white/50 mt-0.5">доступность</div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8">
        <h2 className="text-xs font-mono-ru tracking-widest text-[hsl(var(--muted-foreground))] uppercase mb-5">
          Доступные модули системы
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MODULE_CARDS.map((card, i) => (
            <button
              key={card.id}
              onClick={() => onNavigate(card.id)}
              className={`module-card bg-white text-left p-6 rounded-sm cursor-pointer animate-fade-in`}
              style={{ animationDelay: `${(i + 1) * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded flex items-center justify-center ${iconColors[card.color]}`}>
                  <Icon name={card.icon} size={20} />
                </div>
                <span className="text-xs font-mono-ru text-[hsl(var(--muted-foreground))]">{card.num}</span>
              </div>
              <h3 className="font-bold text-[hsl(var(--navy))] mb-2 text-base">{card.title}</h3>
              <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed mb-4">{card.desc}</p>
              <div className="flex items-center justify-between">
                <span className={`text-xs px-2 py-0.5 rounded border font-medium ${tagColors[card.color]}`}>{card.tag}</span>
                <Icon name="ArrowRight" size={16} className="text-[hsl(var(--muted-foreground))]" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

const SEARCH_API_URL = "https://functions.poehali.dev/2419c578-0d31-4ff5-af53-3d6d80370658";

function SearchSection() {
  const [messages, setMessages] = useState([
    { role: "ai", text: "Здравствуйте. Я готов помочь с поиском судебной практики. Опишите ситуацию или введите ключевые слова, нормы права, номер дела." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    const updatedMessages = [...messages, { role: "user", text: userMsg }];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);
    setError("");

    try {
      const res = await fetch(SEARCH_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Ошибка сервера");
      setMessages((m) => [...m, { role: "ai", text: data.answer }]);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Неизвестная ошибка";
      setError(msg);
      setMessages((m) => [...m, { role: "ai", text: "Произошла ошибка при обращении к ИИ. Убедитесь, что API-ключ OpenAI добавлен в настройках." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in h-full flex flex-col" style={{ minHeight: "calc(100vh - 120px)" }}>
      <div className="px-8 py-6 border-b border-[hsl(var(--border))] bg-white">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center">
            <Icon name="Search" size={16} className="text-blue-700" />
          </div>
          <div>
            <h2 className="font-bold text-[hsl(var(--navy))] text-base">Поиск судебной практики</h2>
            <p className="text-xs text-[hsl(var(--muted-foreground))]">ИИ-ассистент на базе ChatGPT</p>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 status-dot" />
            <span className="text-xs text-emerald-600">Онлайн</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-8 py-6 space-y-4 bg-[hsl(var(--surface))]">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}>
            {msg.role === "ai" && (
              <div className="w-7 h-7 rounded-full bg-[hsl(var(--navy))] flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                <Icon name="Scale" size={13} className="text-white" />
              </div>
            )}
            <div
              className={`max-w-lg px-4 py-3 text-sm leading-relaxed ${
                msg.role === "user" ? "chat-bubble-user" : "chat-bubble-ai text-[hsl(var(--foreground))]"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="w-7 h-7 rounded-full bg-[hsl(var(--navy))] flex items-center justify-center mr-2 flex-shrink-0">
              <Icon name="Scale" size={13} className="text-white" />
            </div>
            <div className="chat-bubble-ai px-4 py-3">
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--muted-foreground))]"
                    style={{ animation: `pulse-dot 1.2s ${i * 0.2}s infinite` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="px-8 py-4 border-t border-[hsl(var(--border))] bg-white">
        {error && (
          <div className="mb-2 px-3 py-2 bg-red-50 border border-red-200 rounded-sm flex items-center gap-2 text-xs text-red-700">
            <Icon name="AlertCircle" size={13} />
            {error}
          </div>
        )}
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            disabled={loading}
            placeholder="Введите запрос: нормы права, обстоятельства дела, ключевые слова..."
            className="flex-1 px-4 py-2.5 text-sm border border-[hsl(var(--border))] rounded-sm bg-[hsl(var(--surface))] focus:outline-none focus:border-[hsl(var(--navy))] focus:ring-1 focus:ring-[hsl(var(--navy))] disabled:opacity-60"
          />
          <button
            onClick={send}
            disabled={loading || !input.trim()}
            className="px-4 py-2.5 bg-[hsl(var(--navy))] text-white text-sm font-medium rounded-sm hover:bg-[hsl(var(--navy-mid))] transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? <Icon name="Loader" size={15} className="animate-spin" /> : <Icon name="Send" size={15} />}
            Отправить
          </button>
        </div>
        <p className="text-xs text-[hsl(var(--muted-foreground))] mt-2">Нажмите Enter или кнопку для отправки запроса</p>
      </div>
    </div>
  );
}

const GENERATE_ACT_URL = "https://functions.poehali.dev/55012bc9-e84d-4c0f-962d-c8495c23f047";

function GeneratorSection() {
  const [prompt, setPrompt] = useState("");
  const [files, setFiles] = useState<string[]>([]);
  const [actType, setActType] = useState("решение");
  const [actText, setActText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generate = async () => {
    if (!prompt.trim() || loading) return;
    setLoading(true);
    setError("");
    setActText("");

    try {
      const res = await fetch(GENERATE_ACT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ act_type: actType, prompt, documents: files }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Ошибка сервера");
      setActText(data.act);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Неизвестная ошибка";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="px-8 py-6 border-b border-[hsl(var(--border))] bg-white">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-emerald-100 flex items-center justify-center">
            <Icon name="FileText" size={16} className="text-emerald-700" />
          </div>
          <div>
            <h2 className="font-bold text-[hsl(var(--navy))] text-base">Генератор судебных актов</h2>
            <p className="text-xs text-[hsl(var(--muted-foreground))]">Создание проектов на основе ChatGPT GPT-4</p>
          </div>
        </div>
      </div>

      <div className="px-8 py-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-[hsl(var(--navy))] uppercase tracking-wider mb-2">Тип акта</label>
            <div className="flex gap-2 flex-wrap">
              {["решение", "определение", "постановление", "приговор"].map((t) => (
                <button
                  key={t}
                  onClick={() => setActType(t)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-sm border transition-colors ${
                    actType === t
                      ? "bg-[hsl(var(--navy))] text-white border-[hsl(var(--navy))]"
                      : "bg-white text-[hsl(var(--foreground))] border-[hsl(var(--border))] hover:border-[hsl(var(--navy))]"
                  }`}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[hsl(var(--navy))] uppercase tracking-wider mb-2">
              Описание ситуации / промт
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={6}
              placeholder="Например: Дело о взыскании задолженности по договору займа. Истец — ООО «Альфа», ответчик — Иванов И.И. Сумма долга 350 000 руб., срок просрочки 8 месяцев..."
              className="w-full px-4 py-3 text-sm border border-[hsl(var(--border))] rounded-sm bg-[hsl(var(--surface))] focus:outline-none focus:border-[hsl(var(--navy))] focus:ring-1 focus:ring-[hsl(var(--navy))] resize-none leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[hsl(var(--navy))] uppercase tracking-wider mb-2">
              Документы по делу
            </label>
            <div
              className="upload-zone rounded-sm p-6 text-center cursor-pointer"
              onClick={() => setFiles((f) => [...f, `Документ_${f.length + 1}.pdf`])}
            >
              <Icon name="Upload" size={24} className="mx-auto mb-2 text-[hsl(var(--muted-foreground))]" />
              <p className="text-sm text-[hsl(var(--muted-foreground))]">Нажмите для загрузки или перетащите файлы</p>
              <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">PDF, DOCX, TXT — до 20 МБ каждый</p>
            </div>
            {files.length > 0 && (
              <div className="mt-2 space-y-1">
                {files.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 px-3 py-2 bg-emerald-50 border border-emerald-200 rounded-sm text-xs">
                    <Icon name="FileCheck" size={14} className="text-emerald-600" />
                    <span className="text-emerald-700">{f}</span>
                    <button
                      onClick={() => setFiles((fl) => fl.filter((_, idx) => idx !== i))}
                      className="ml-auto text-emerald-500 hover:text-red-500"
                    >
                      <Icon name="X" size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={generate}
            disabled={!prompt.trim() || loading}
            className="w-full py-3 bg-[hsl(var(--navy))] text-white font-semibold text-sm rounded-sm hover:bg-[hsl(var(--navy-mid))] transition-colors disabled:opacity-40 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Icon name="Loader" size={16} className="animate-spin" />
                Генерирую проект акта...
              </>
            ) : (
              <>
                <Icon name="Sparkles" size={16} />
                Сгенерировать проект
              </>
            )}
          </button>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[hsl(var(--navy))] uppercase tracking-wider mb-2">Проект акта</label>
          {error && (
            <div className="mb-3 px-3 py-2 bg-red-50 border border-red-200 rounded-sm flex items-center gap-2 text-xs text-red-700">
              <Icon name="AlertCircle" size={13} />
              {error}
            </div>
          )}
          {actText ? (
            <div className="bg-white border border-[hsl(var(--border))] rounded-sm p-5 animate-fade-in space-y-3 min-h-64">
              <div className="text-center text-xs font-semibold uppercase tracking-widest text-[hsl(var(--muted-foreground))] pb-3 border-b border-[hsl(var(--border))]">
                {actType.toUpperCase()}
              </div>
              <div className="text-sm leading-relaxed whitespace-pre-wrap text-[hsl(var(--foreground))] max-h-[480px] overflow-y-auto">
                {actText}
              </div>
              <div className="pt-3 border-t border-[hsl(var(--border))] flex gap-2">
                <button
                  onClick={() => navigator.clipboard.writeText(actText)}
                  className="flex-1 py-2 border border-[hsl(var(--navy))] text-[hsl(var(--navy))] text-xs font-medium rounded-sm hover:bg-[hsl(var(--navy))] hover:text-white transition-colors flex items-center justify-center gap-1.5"
                >
                  <Icon name="Copy" size={13} /> Копировать текст
                </button>
                <button
                  onClick={() => { setActText(""); setPrompt(""); }}
                  className="flex-1 py-2 border border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] text-xs font-medium rounded-sm hover:bg-[hsl(var(--muted))] transition-colors flex items-center justify-center gap-1.5"
                >
                  <Icon name="RefreshCw" size={13} /> Новый акт
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-[hsl(var(--surface))] border border-dashed border-[hsl(var(--border))] rounded-sm min-h-64 flex flex-col items-center justify-center text-center p-8">
              {loading ? (
                <>
                  <Icon name="Loader" size={32} className="text-emerald-500 mb-3 animate-spin" />
                  <p className="text-sm text-[hsl(var(--muted-foreground))]">Генерирую проект акта...</p>
                  <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">Обычно занимает 10–20 секунд</p>
                </>
              ) : (
                <>
                  <Icon name="FileText" size={36} className="text-[hsl(var(--muted-foreground))] mb-3 opacity-40" />
                  <p className="text-sm text-[hsl(var(--muted-foreground))]">Проект акта появится здесь</p>
                  <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">Заполните промт и нажмите «Сгенерировать»</p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const STENOGRAPHY_URL = "https://functions.poehali.dev/8a7cda5c-6df6-409d-81e0-9d0f79e71f7f";

type ProtocolEntry = { time: string; speaker: string; text: string };

function StenographySection() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [entries, setEntries] = useState<ProtocolEntry[]>([]);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File) => {
    setFile(f);
    setEntries([]);
    setError("");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) handleFile(f);
  };

  const process = async () => {
    if (!file || processing) return;
    setProcessing(true);
    setError("");
    setEntries([]);

    try {
      const buffer = await file.arrayBuffer();
      const bytes = new Uint8Array(buffer);
      let binary = "";
      for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
      const b64 = btoa(binary);

      const res = await fetch(STENOGRAPHY_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          audio_base64: b64,
          filename: file.name,
          mime_type: file.type || "audio/mpeg",
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Ошибка сервера");
      setEntries(data.entries || []);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Неизвестная ошибка";
      setError(msg);
    } finally {
      setProcessing(false);
    }
  };

  const copyProtocol = () => {
    const text = entries.map((e) => `[${e.time}] ${e.speaker}: ${e.text}`).join("\n");
    navigator.clipboard.writeText(text);
  };

  const reset = () => {
    setFile(null);
    setEntries([]);
    setError("");
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} КБ`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} МБ`;
  };

  return (
    <div className="animate-fade-in">
      <div className="px-8 py-6 border-b border-[hsl(var(--border))] bg-white">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-amber-100 flex items-center justify-center">
            <Icon name="Mic" size={16} className="text-amber-700" />
          </div>
          <div>
            <h2 className="font-bold text-[hsl(var(--navy))] text-base">Модуль стенографии</h2>
            <p className="text-xs text-[hsl(var(--muted-foreground))]">Расшифровка аудио через Whisper AI → структурированный протокол</p>
          </div>
        </div>
      </div>

      <div className="px-8 py-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-5">
          <div className="bg-amber-50 border border-amber-200 rounded-sm px-4 py-3 flex gap-3">
            <Icon name="Info" size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-700 leading-relaxed">
              Whisper AI распознаёт русскую речь, GPT-4o определяет участников и формирует официальный протокол заседания с временными метками.
            </p>
          </div>

          {/* Upload zone */}
          <input
            ref={fileInputRef}
            type="file"
            accept="audio/*,.mp3,.wav,.m4a,.ogg,.flac,.webm"
            className="hidden"
            onChange={handleInputChange}
          />

          {!file ? (
            <div
              className="upload-zone rounded-sm p-10 text-center cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
            >
              <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
                <Icon name="Mic" size={28} className="text-amber-600" />
              </div>
              <p className="font-semibold text-[hsl(var(--navy))] mb-1">Загрузите аудиозапись</p>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">MP3, WAV, M4A, OGG, FLAC — до 25 МБ</p>
              <p className="text-xs text-[hsl(var(--muted-foreground))] mt-3">Нажмите или перетащите файл сюда</p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="bg-white border border-[hsl(var(--border))] rounded-sm px-4 py-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <Icon name="FileAudio" size={15} className="text-amber-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[hsl(var(--navy))] truncate">{file.name}</p>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">{formatSize(file.size)}</p>
                </div>
                {processing && <Icon name="Loader" size={16} className="text-amber-600 animate-spin" />}
                {entries.length > 0 && !processing && <Icon name="CheckCircle" size={16} className="text-emerald-600" />}
              </div>

              {processing && (
                <div className="animate-fade-in">
                  <div className="flex justify-between text-xs text-[hsl(var(--muted-foreground))] mb-1">
                    <span>Whisper AI расшифровывает речь...</span>
                  </div>
                  <div className="h-1.5 bg-[hsl(var(--muted))] rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full animate-pulse" style={{ width: "100%" }} />
                  </div>
                  <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">Обычно занимает 20–60 секунд</p>
                </div>
              )}
            </div>
          )}

          {error && (
            <div className="px-3 py-2 bg-red-50 border border-red-200 rounded-sm flex items-center gap-2 text-xs text-red-700">
              <Icon name="AlertCircle" size={13} />
              {error}
            </div>
          )}

          <div className="flex gap-2">
            {file && !processing && entries.length === 0 && (
              <button
                onClick={process}
                className="flex-1 py-2.5 bg-[hsl(var(--navy))] text-white text-sm font-medium rounded-sm hover:bg-[hsl(var(--navy-mid))] transition-colors flex items-center justify-center gap-2"
              >
                <Icon name="Sparkles" size={15} /> Расшифровать
              </button>
            )}
            {entries.length > 0 && (
              <button
                onClick={copyProtocol}
                className="flex-1 py-2.5 bg-[hsl(var(--navy))] text-white text-sm font-medium rounded-sm hover:bg-[hsl(var(--navy-mid))] transition-colors flex items-center justify-center gap-2"
              >
                <Icon name="Copy" size={15} /> Копировать протокол
              </button>
            )}
            {file && (
              <button
                onClick={reset}
                className="px-4 py-2.5 border border-[hsl(var(--border))] text-sm rounded-sm hover:bg-[hsl(var(--muted))] transition-colors"
              >
                <Icon name="RefreshCw" size={15} />
              </button>
            )}
          </div>
        </div>

        {/* Result panel */}
        <div>
          <label className="block text-xs font-semibold text-[hsl(var(--navy))] uppercase tracking-wider mb-2">
            Протокол судебного заседания
          </label>
          {entries.length > 0 ? (
            <div className="bg-white border border-[hsl(var(--border))] rounded-sm p-5 animate-fade-in space-y-3 max-h-[520px] overflow-y-auto">
              <p className="text-center text-xs font-bold uppercase tracking-widest text-[hsl(var(--navy))] pb-2 border-b border-[hsl(var(--border))]">
                ПРОТОКОЛ СУДЕБНОГО ЗАСЕДАНИЯ
              </p>
              {entries.map((entry, i) => (
                <div key={i} className="flex gap-3 animate-fade-in" style={{ animationDelay: `${i * 0.04}s` }}>
                  <span className="text-xs font-mono-ru text-[hsl(var(--muted-foreground))] flex-shrink-0 mt-0.5 w-10">{entry.time}</span>
                  <div>
                    <span className="text-xs font-semibold text-[hsl(var(--navy))]">{entry.speaker}: </span>
                    <span className="text-xs text-[hsl(var(--foreground))]">{entry.text}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-[hsl(var(--surface))] border border-dashed border-[hsl(var(--border))] rounded-sm min-h-64 flex flex-col items-center justify-center text-center p-8">
              {processing ? (
                <>
                  <Icon name="Loader" size={32} className="text-amber-500 mb-3 animate-spin" />
                  <p className="text-sm text-[hsl(var(--muted-foreground))]">Формирую протокол...</p>
                </>
              ) : (
                <>
                  <Icon name="FileText" size={36} className="text-[hsl(var(--muted-foreground))] mb-3 opacity-40" />
                  <p className="text-sm text-[hsl(var(--muted-foreground))]">Протокол появится здесь</p>
                  <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">После загрузки и обработки аудиофайла</p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const DISTRIBUTE_URL = "https://functions.poehali.dev/7efc782e-0135-4df2-aa35-7f29bcc87264";

type CaseItem = {
  id: string; type: string; subject: string; complexity: string;
  status: string; judge: string | null; reason?: string;
};

type JudgeItem = {
  name: string; load: number;
  spec: string[]; complexSpec: string[];
  onVacation: boolean; onSickLeave: boolean;
  staffOnVacation: boolean; staffOnSickLeave: boolean;
};

const INIT_CASES: CaseItem[] = [
  { id: "22-12345/2024", type: "Гражданское", subject: "Взыскание долга", complexity: "Средняя", status: "new", judge: null },
  { id: "22-12346/2024", type: "Административное", subject: "Оспаривание решения УФАС", complexity: "Высокая", status: "new", judge: null },
  { id: "22-12347/2024", type: "Гражданское", subject: "Раздел имущества", complexity: "Высокая", status: "assigned", judge: "Иванов А.В." },
  { id: "22-12348/2024", type: "Уголовное", subject: "Мошенничество (ст. 159)", complexity: "Высокая", status: "assigned", judge: "Петрова С.М." },
  { id: "22-12349/2024", type: "Гражданское", subject: "Трудовой спор", complexity: "Низкая", status: "new", judge: null },
  { id: "22-12350/2024", type: "Уголовное", subject: "Организованная преступность (ст. 210)", complexity: "Особо сложное", status: "new", judge: null },
];

const INIT_JUDGES: JudgeItem[] = [
  { name: "Иванов А.В.", load: 78, spec: ["Гражданское", "Административное"], complexSpec: ["Корпоративные споры"], onVacation: false, onSickLeave: false, staffOnVacation: false, staffOnSickLeave: false },
  { name: "Петрова С.М.", load: 45, spec: ["Уголовное", "Гражданское"], complexSpec: ["Организованная преступность", "Коррупция"], onVacation: false, onSickLeave: false, staffOnVacation: false, staffOnSickLeave: false },
  { name: "Сидоров К.П.", load: 62, spec: ["Административное"], complexSpec: [], onVacation: true, onSickLeave: false, staffOnVacation: false, staffOnSickLeave: false },
  { name: "Козлова Е.Р.", load: 30, spec: ["Гражданское", "Уголовное"], complexSpec: ["Организованная преступность"], onVacation: false, onSickLeave: false, staffOnVacation: false, staffOnSickLeave: true },
];

function DistributionSection({ judges, setJudges }: { judges: JudgeItem[]; setJudges: React.Dispatch<React.SetStateAction<JudgeItem[]>> }) {
  const [cases, setCases] = useState<CaseItem[]>(INIT_CASES);
  const [distributing, setDistributing] = useState(false);
  const [reasoning, setReasoning] = useState("");
  const [error, setError] = useState("");
  const [editingJudge, setEditingJudge] = useState<string | null>(null);

  const complexityColor: Record<string, string> = {
    "Особо сложное": "bg-purple-50 text-purple-700 border-purple-200",
    "Высокая": "bg-red-50 text-red-700 border-red-200",
    "Средняя": "bg-amber-50 text-amber-700 border-amber-200",
    "Низкая": "bg-emerald-50 text-emerald-700 border-emerald-200",
  };

  const distribute = async () => {
    setDistributing(true);
    setError("");
    setReasoning("");

    try {
      const res = await fetch(DISTRIBUTE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ judges, cases }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Ошибка сервера");

      const assignments: { case_id: string; judge: string; reason: string }[] = data.assignments || [];
      setCases((prev) =>
        prev.map((c) => {
          const a = assignments.find((x) => x.case_id === c.id);
          return a ? { ...c, status: "assigned", judge: a.judge, reason: a.reason } : c;
        })
      );
      setReasoning(data.reasoning || "");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Неизвестная ошибка");
    } finally {
      setDistributing(false);
    }
  };

  const toggleJudge = (name: string, field: keyof JudgeItem) => {
    setJudges((prev) =>
      prev.map((j) => j.name === name ? { ...j, [field]: !j[field as keyof JudgeItem] } : j)
    );
  };

  const resetCases = () => {
    setCases(INIT_CASES);
    setReasoning("");
    setError("");
  };

  const statusIcon = (j: JudgeItem) => {
    if (j.onSickLeave) return { label: "Болеет", color: "text-red-600 bg-red-50 border-red-200" };
    if (j.onVacation) return { label: "Отпуск", color: "text-amber-600 bg-amber-50 border-amber-200" };
    return { label: "Работает", color: "text-emerald-600 bg-emerald-50 border-emerald-200" };
  };

  return (
    <div className="animate-fade-in">
      <div className="px-8 py-6 border-b border-[hsl(var(--border))] bg-white">
        <div className="flex items-center gap-3 flex-wrap gap-y-2">
          <div className="w-8 h-8 rounded bg-violet-100 flex items-center justify-center flex-shrink-0">
            <Icon name="GitBranch" size={16} className="text-violet-700" />
          </div>
          <div>
            <h2 className="font-bold text-[hsl(var(--navy))] text-base">Распределение судебных дел</h2>
            <p className="text-xs text-[hsl(var(--muted-foreground))]">ИИ-модуль с учётом нагрузки, отпусков, болезней и специализации</p>
          </div>
          <div className="ml-auto flex gap-2">
            <button
              onClick={resetCases}
              className="px-3 py-2 border border-[hsl(var(--border))] text-xs rounded-sm hover:bg-[hsl(var(--muted))] transition-colors flex items-center gap-1.5 text-[hsl(var(--muted-foreground))]"
            >
              <Icon name="RefreshCw" size={13} /> Сбросить
            </button>
            <button
              onClick={distribute}
              disabled={distributing}
              className="px-4 py-2 bg-[hsl(var(--navy))] text-white text-sm font-medium rounded-sm hover:bg-[hsl(var(--navy-mid))] transition-colors disabled:opacity-60 flex items-center gap-2"
            >
              {distributing ? <Icon name="Loader" size={14} className="animate-spin" /> : <Icon name="Zap" size={14} />}
              {distributing ? "ИИ распределяет..." : "Авто-распределить"}
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="mx-8 mt-4 px-3 py-2 bg-red-50 border border-red-200 rounded-sm flex items-center gap-2 text-xs text-red-700">
          <Icon name="AlertCircle" size={13} /> {error}
        </div>
      )}

      <div className="px-8 py-6 grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Cases table */}
        <div className="xl:col-span-2 space-y-4">
          <h3 className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-widest">Очередь дел</h3>
          <div className="bg-white border border-[hsl(var(--border))] rounded-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[hsl(var(--border))] bg-[hsl(var(--surface))]">
                  {["Номер дела", "Категория", "Предмет", "Сложность", "Назначен"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cases.map((c, i) => (
                  <tr key={c.id} className="border-b border-[hsl(var(--border))] last:border-0 hover:bg-[hsl(var(--surface))] transition-colors group">
                    <td className="px-4 py-3">
                      <span className="font-mono-ru text-xs text-[hsl(var(--navy))] font-medium">{c.id}</span>
                    </td>
                    <td className="px-4 py-3 text-xs text-[hsl(var(--foreground))]">{c.type}</td>
                    <td className="px-4 py-3 text-xs text-[hsl(var(--foreground))]">{c.subject}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded border font-medium ${complexityColor[c.complexity] || complexityColor["Средняя"]}`}>{c.complexity}</span>
                    </td>
                    <td className="px-4 py-3">
                      {c.judge ? (
                        <div>
                          <div className="flex items-center gap-1.5">
                            <Icon name="UserCheck" size={12} className="text-emerald-600 flex-shrink-0" />
                            <span className="text-xs text-emerald-700 font-medium">{c.judge}</span>
                          </div>
                          {c.reason && (
                            <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5 leading-tight">{c.reason}</p>
                          )}
                        </div>
                      ) : (
                        <span className="text-xs text-[hsl(var(--muted-foreground))] italic">Не назначен</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {reasoning && (
            <div className="bg-violet-50 border border-violet-200 rounded-sm px-4 py-3 animate-fade-in">
              <p className="text-xs font-semibold text-violet-800 mb-1">Логика ИИ-распределения:</p>
              <p className="text-xs text-violet-700 leading-relaxed">{reasoning}</p>
            </div>
          )}
        </div>

        {/* Judges panel */}
        <div>
          <h3 className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-widest mb-3">Состав суда</h3>
          <div className="space-y-3">
            {judges.map((j, i) => {
              const st = statusIcon(j);
              const isEditing = editingJudge === j.name;
              return (
                <div key={j.name} className="bg-white border border-[hsl(var(--border))] rounded-sm p-4 animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${j.onSickLeave || j.onVacation ? "bg-[hsl(var(--muted-foreground))]" : "bg-[hsl(var(--navy))]"}`}>
                      {j.name.split(" ")[0][0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[hsl(var(--navy))] truncate">{j.name}</p>
                      <span className={`text-xs px-1.5 py-0.5 rounded border font-medium ${st.color}`}>{st.label}</span>
                    </div>
                    <button
                      onClick={() => setEditingJudge(isEditing ? null : j.name)}
                      className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--navy))] transition-colors"
                    >
                      <Icon name={isEditing ? "ChevronUp" : "Settings"} size={14} />
                    </button>
                  </div>

                  {/* Load bar */}
                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-[hsl(var(--muted-foreground))] mb-1">
                      <span>Нагрузка</span>
                      <span className={`font-mono-ru font-bold ${j.load > 70 ? "text-red-600" : j.load > 50 ? "text-amber-600" : "text-emerald-600"}`}>{j.load}%</span>
                    </div>
                    <div className="h-1.5 bg-[hsl(var(--muted))] rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all duration-700 ${j.load > 70 ? "bg-red-500" : j.load > 50 ? "bg-amber-500" : "bg-emerald-500"}`} style={{ width: `${j.load}%` }} />
                    </div>
                  </div>

                  {/* Specs */}
                  <div className="flex flex-wrap gap-1 mb-2">
                    {j.spec.map((s) => (
                      <span key={s} className="text-xs px-1.5 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded">{s}</span>
                    ))}
                    {j.complexSpec.map((s) => (
                      <span key={s} className="text-xs px-1.5 py-0.5 bg-purple-50 text-purple-700 border border-purple-200 rounded">★ {s}</span>
                    ))}
                  </div>

                  {/* Staff indicators */}
                  {(j.staffOnVacation || j.staffOnSickLeave) && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {j.staffOnVacation && <span className="text-xs px-1.5 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 rounded">Помощник в отпуске</span>}
                      {j.staffOnSickLeave && <span className="text-xs px-1.5 py-0.5 bg-red-50 text-red-700 border border-red-200 rounded">Помощник болеет</span>}
                    </div>
                  )}

                  {/* Editable toggles */}
                  {isEditing && (
                    <div className="border-t border-[hsl(var(--border))] pt-3 mt-2 space-y-2 animate-fade-in">
                      <p className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider mb-2">Статус</p>
                      {[
                        { field: "onVacation" as keyof JudgeItem, label: "Судья в отпуске", icon: "Palmtree" },
                        { field: "onSickLeave" as keyof JudgeItem, label: "Судья болеет", icon: "Thermometer" },
                        { field: "staffOnVacation" as keyof JudgeItem, label: "Аппарат в отпуске", icon: "Users" },
                        { field: "staffOnSickLeave" as keyof JudgeItem, label: "Аппарат болеет", icon: "HeartPulse" },
                      ].map(({ field, label, icon }) => (
                        <button
                          key={field}
                          onClick={() => toggleJudge(j.name, field)}
                          className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-xs transition-colors ${
                            j[field] ? "bg-red-50 text-red-700 border border-red-200" : "bg-[hsl(var(--surface))] text-[hsl(var(--muted-foreground))] border border-[hsl(var(--border))] hover:border-[hsl(var(--navy))]"
                          }`}
                        >
                          <Icon name={icon} size={12} />
                          <span className="flex-1 text-left">{label}</span>
                          <Icon name={j[field] ? "ToggleRight" : "ToggleLeft"} size={16} />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

type UserRole = "judge" | "staff";

type UserProfile = {
  name: string;
  role: UserRole;
  position: string;
  department: string;
  caseLoad: number;
  casesThisMonth: number;
  onVacation: boolean;
  onSickLeave: boolean;
  spec: string[];
};

const DEFAULT_PROFILE: UserProfile = {
  name: "Петрова Светлана Михайловна",
  role: "judge",
  position: "Судья",
  department: "Судебный состав №2",
  caseLoad: 45,
  casesThisMonth: 12,
  onVacation: false,
  onSickLeave: false,
  spec: ["Уголовное", "Гражданское"],
};

function ProfilePanel({
  onClose,
  profile,
  setProfile,
  onSyncToJudges,
}: {
  onClose: () => void;
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  onSyncToJudges: (p: UserProfile) => void;
}) {
  const [editName, setEditName] = useState(false);
  const [nameInput, setNameInput] = useState(profile.name);
  const [synced, setSynced] = useState(false);

  const handleStatusChange = (field: keyof UserProfile) => {
    const updated = { ...profile, [field]: !profile[field] };
    setProfile(updated);
    onSyncToJudges(updated);
    setSynced(true);
    setTimeout(() => setSynced(false), 2500);
  };
  const [tab, setTab] = useState<"profile" | "stats" | "settings">("profile");

  const roleLabel = profile.role === "judge" ? "Судья" : "Работник аппарата";

  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in-right overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sync toast */}
        {synced && (
          <div className="fixed top-4 right-4 z-[60] flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white text-xs font-medium rounded shadow-lg animate-fade-in">
            <Icon name="RefreshCw" size={13} />
            Статус синхронизирован с модулем распределения
          </div>
        )}
        {/* Header */}
        <div className="bg-[hsl(var(--navy))] px-6 py-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)", backgroundSize: "20px 20px" }} />
          <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors">
            <Icon name="X" size={18} />
          </button>
          <div className="relative flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[hsl(var(--gold))] flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
              {profile.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
            </div>
            <div>
              {editName ? (
                <div className="flex items-center gap-2">
                  <input
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="bg-white/10 text-white text-sm px-2 py-1 rounded border border-white/30 focus:outline-none w-48"
                    autoFocus
                  />
                  <button onClick={() => { setProfile((p) => ({ ...p, name: nameInput })); setEditName(false); }} className="text-[hsl(var(--gold))] hover:text-white transition-colors">
                    <Icon name="Check" size={16} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <p className="text-white font-bold text-sm leading-tight">{profile.name}</p>
                  <button onClick={() => setEditName(true)} className="text-white/40 hover:text-white/80 transition-colors">
                    <Icon name="Pencil" size={12} />
                  </button>
                </div>
              )}
              <p className="text-white/60 text-xs mt-0.5">{roleLabel} · {profile.department}</p>
              <div className="flex items-center gap-1.5 mt-2">
                <span className={`text-xs px-2 py-0.5 rounded border font-medium ${profile.onSickLeave ? "bg-red-500/20 text-red-300 border-red-400/30" : profile.onVacation ? "bg-amber-500/20 text-amber-300 border-amber-400/30" : "bg-emerald-500/20 text-emerald-300 border-emerald-400/30"}`}>
                  {profile.onSickLeave ? "На больничном" : profile.onVacation ? "В отпуске" : "На работе"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[hsl(var(--border))] bg-[hsl(var(--surface))]">
          {([
            { id: "profile", label: "Профиль", icon: "User" },
            { id: "stats", label: "Статистика", icon: "BarChart2" },
            { id: "settings", label: "Настройки", icon: "Settings" },
          ] as const).map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-medium transition-colors border-b-2 ${tab === t.id ? "border-[hsl(var(--navy))] text-[hsl(var(--navy))]" : "border-transparent text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--navy))]"}`}
            >
              <Icon name={t.icon} size={13} /> {t.label}
            </button>
          ))}
        </div>

        <div className="flex-1 px-6 py-5 space-y-5">
          {/* PROFILE TAB */}
          {tab === "profile" && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <p className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider mb-3">Должность и роль</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 px-3 py-2.5 bg-[hsl(var(--surface))] border border-[hsl(var(--border))] rounded-sm">
                    <Icon name="Briefcase" size={14} className="text-[hsl(var(--muted-foreground))]" />
                    <div>
                      <p className="text-xs text-[hsl(var(--muted-foreground))]">Должность</p>
                      <p className="text-sm font-medium text-[hsl(var(--navy))]">{profile.position}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 px-3 py-2.5 bg-[hsl(var(--surface))] border border-[hsl(var(--border))] rounded-sm">
                    <Icon name="Building2" size={14} className="text-[hsl(var(--muted-foreground))]" />
                    <div>
                      <p className="text-xs text-[hsl(var(--muted-foreground))]">Подразделение</p>
                      <p className="text-sm font-medium text-[hsl(var(--navy))]">{profile.department}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider mb-3">Роль в системе</p>
                <div className="flex gap-2">
                  {(["judge", "staff"] as UserRole[]).map((r) => (
                    <button
                      key={r}
                      onClick={() => setProfile((p) => ({ ...p, role: r, position: r === "judge" ? "Судья" : "Помощник судьи" }))}
                      className={`flex-1 py-2 text-xs font-medium rounded-sm border transition-colors ${profile.role === r ? "bg-[hsl(var(--navy))] text-white border-[hsl(var(--navy))]" : "bg-white text-[hsl(var(--foreground))] border-[hsl(var(--border))] hover:border-[hsl(var(--navy))]"}`}
                    >
                      {r === "judge" ? "⚖️ Судья" : "📋 Работник аппарата"}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider mb-3">Специализация</p>
                <div className="flex flex-wrap gap-1.5">
                  {["Гражданское", "Уголовное", "Административное", "Арбитражное", "Семейное"].map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        const newSpec = profile.spec.includes(s)
                          ? profile.spec.filter((x) => x !== s)
                          : [...profile.spec, s];
                        const updated = { ...profile, spec: newSpec };
                        setProfile(updated);
                        onSyncToJudges(updated);
                        setSynced(true);
                        setTimeout(() => setSynced(false), 2500);
                      }}
                      className={`text-xs px-2.5 py-1 rounded border font-medium transition-colors ${profile.spec.includes(s) ? "bg-[hsl(var(--navy))] text-white border-[hsl(var(--navy))]" : "bg-white text-[hsl(var(--muted-foreground))] border-[hsl(var(--border))] hover:border-[hsl(var(--navy))]"}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider mb-3">Текущий статус</p>
                <div className="space-y-2">
                  {[
                    { field: "onVacation" as keyof UserProfile, label: "В отпуске", icon: "Palmtree", color: "amber" },
                    { field: "onSickLeave" as keyof UserProfile, label: "На больничном", icon: "Thermometer", color: "red" },
                  ].map(({ field, label, icon, color }) => {
                    const active = !!profile[field];
                    return (
                      <button
                        key={field}
                        onClick={() => handleStatusChange(field)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-sm border transition-colors ${active ? (color === "amber" ? "bg-amber-50 border-amber-200 text-amber-700" : "bg-red-50 border-red-200 text-red-700") : "bg-[hsl(var(--surface))] border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:border-[hsl(var(--navy))]"}`}
                      >
                        <Icon name={icon} size={15} />
                        <span className="flex-1 text-left text-sm">{label}</span>
                        <Icon name={active ? "ToggleRight" : "ToggleLeft"} size={20} className={active ? "" : "opacity-50"} />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STATS TAB */}
          {tab === "stats" && (
            <div className="space-y-4 animate-fade-in">
              <p className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider">Показатели работы</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Нагрузка", value: `${profile.caseLoad}%`, icon: "Activity", color: profile.caseLoad > 70 ? "text-red-600" : profile.caseLoad > 50 ? "text-amber-600" : "text-emerald-600" },
                  { label: "Дел в месяц", value: profile.casesThisMonth, icon: "FolderOpen", color: "text-[hsl(var(--navy))]" },
                  { label: "Завершено", value: 9, icon: "CheckCircle", color: "text-emerald-600" },
                  { label: "В работе", value: 3, icon: "Clock", color: "text-amber-600" },
                ].map((s) => (
                  <div key={s.label} className="bg-[hsl(var(--surface))] border border-[hsl(var(--border))] rounded-sm p-4 text-center">
                    <Icon name={s.icon} size={20} className={`mx-auto mb-2 ${s.color}`} />
                    <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
                    <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>

              <div>
                <p className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider mb-3">Нагрузка</p>
                <div className="bg-[hsl(var(--surface))] border border-[hsl(var(--border))] rounded-sm p-4">
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-[hsl(var(--muted-foreground))]">Текущая загруженность</span>
                    <span className={`font-bold font-mono-ru ${profile.caseLoad > 70 ? "text-red-600" : "text-emerald-600"}`}>{profile.caseLoad}%</span>
                  </div>
                  <div className="h-2 bg-[hsl(var(--muted))] rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-700 ${profile.caseLoad > 70 ? "bg-red-500" : profile.caseLoad > 50 ? "bg-amber-500" : "bg-emerald-500"}`} style={{ width: `${profile.caseLoad}%` }} />
                  </div>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider mb-3">Последние дела</p>
                <div className="space-y-2">
                  {[
                    { id: "22-12348/2024", subject: "Мошенничество (ст. 159)", status: "В работе", statusColor: "text-amber-600 bg-amber-50 border-amber-200" },
                    { id: "22-12347/2024", subject: "Раздел имущества", status: "Завершено", statusColor: "text-emerald-600 bg-emerald-50 border-emerald-200" },
                    { id: "22-12341/2024", subject: "Трудовой спор", status: "Завершено", statusColor: "text-emerald-600 bg-emerald-50 border-emerald-200" },
                  ].map((c) => (
                    <div key={c.id} className="flex items-center gap-3 px-3 py-2 bg-white border border-[hsl(var(--border))] rounded-sm">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-mono-ru text-[hsl(var(--navy))] font-medium">{c.id}</p>
                        <p className="text-xs text-[hsl(var(--muted-foreground))] truncate">{c.subject}</p>
                      </div>
                      <span className={`text-xs px-1.5 py-0.5 rounded border font-medium flex-shrink-0 ${c.statusColor}`}>{c.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SETTINGS TAB */}
          {tab === "settings" && (
            <div className="space-y-4 animate-fade-in">
              <p className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider">Уведомления</p>
              {[
                { label: "Новое дело назначено", desc: "При автоматическом распределении" },
                { label: "Изменение статуса дела", desc: "При обновлении дел в системе" },
                { label: "Напоминания о заседаниях", desc: "За 24 часа до начала" },
              ].map((n, i) => (
                <div key={i} className="flex items-start gap-3 px-3 py-3 bg-[hsl(var(--surface))] border border-[hsl(var(--border))] rounded-sm">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[hsl(var(--navy))]">{n.label}</p>
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">{n.desc}</p>
                  </div>
                  <div className="w-8 h-4 bg-[hsl(var(--navy))] rounded-full flex items-center justify-end px-0.5 flex-shrink-0 mt-0.5">
                    <div className="w-3 h-3 bg-white rounded-full" />
                  </div>
                </div>
              ))}

              <div className="pt-2">
                <p className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider mb-3">Система</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 px-3 py-2.5 bg-[hsl(var(--surface))] border border-[hsl(var(--border))] rounded-sm">
                    <Icon name="Shield" size={14} className="text-[hsl(var(--muted-foreground))]" />
                    <div className="flex-1">
                      <p className="text-xs font-medium text-[hsl(var(--navy))]">Версия системы</p>
                      <p className="text-xs text-[hsl(var(--muted-foreground))]">ГАС Судопроизводство 1.0</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 px-3 py-2.5 bg-[hsl(var(--surface))] border border-[hsl(var(--border))] rounded-sm">
                    <Icon name="Clock" size={14} className="text-[hsl(var(--muted-foreground))]" />
                    <div className="flex-1">
                      <p className="text-xs font-medium text-[hsl(var(--navy))]">Последний вход</p>
                      <p className="text-xs text-[hsl(var(--muted-foreground))]">Сегодня, {new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })}</p>
                    </div>
                  </div>
                </div>
              </div>

              <button className="w-full py-2.5 border border-red-200 text-red-600 text-sm font-medium rounded-sm hover:bg-red-50 transition-colors flex items-center justify-center gap-2 mt-4">
                <Icon name="LogOut" size={15} /> Выйти из системы
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const SUPPORT_CATEGORIES = [
  "Технический сбой",
  "Ошибка в данных дела",
  "Проблема с модулем ИИ",
  "Вопрос по работе системы",
  "Запрос на доработку",
  "Другое",
];

function SupportModal({ onClose }: { onClose: () => void }) {
  const [category, setCategory] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [priority, setPriority] = useState<"normal" | "high" | "critical">("normal");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSend = () => {
    if (!category || !subject || !message) return;
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 1200);
  };

  const ticketNum = `ТП-${Date.now().toString().slice(-6)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div
        className="w-full max-w-lg bg-white rounded-sm shadow-2xl animate-scale-in mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[hsl(var(--navy))] px-6 py-5 flex items-center justify-between rounded-t-sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[hsl(var(--gold))] flex items-center justify-center">
              <Icon name="Headphones" size={16} className="text-white" />
            </div>
            <div>
              <p className="text-white font-bold text-sm">Служба технической поддержки</p>
              <p className="text-white/50 text-xs">АИС поддержки судопроизводства</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/50 hover:text-white transition-colors">
            <Icon name="X" size={18} />
          </button>
        </div>

        {sent ? (
          <div className="px-6 py-10 text-center animate-fade-in">
            <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
              <Icon name="CheckCircle" size={28} className="text-emerald-600" />
            </div>
            <h3 className="font-bold text-[hsl(var(--navy))] text-base mb-1">Обращение отправлено</h3>
            <p className="text-sm text-[hsl(var(--muted-foreground))] mb-3">Ваш запрос принят в обработку</p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[hsl(var(--surface))] border border-[hsl(var(--border))] rounded-sm">
              <Icon name="Hash" size={13} className="text-[hsl(var(--muted-foreground))]" />
              <span className="text-xs font-mono-ru font-medium text-[hsl(var(--navy))]">{ticketNum}</span>
            </div>
            <p className="text-xs text-[hsl(var(--muted-foreground))] mt-3">Сохраните номер обращения для отслеживания статуса</p>
            <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">Ответ поступит в течение 1 рабочего дня</p>
            <button
              onClick={onClose}
              className="mt-6 px-6 py-2.5 bg-[hsl(var(--navy))] text-white text-sm font-medium rounded-sm hover:bg-[hsl(var(--navy-mid))] transition-colors"
            >
              Закрыть
            </button>
          </div>
        ) : (
          <div className="px-6 py-5 space-y-4">
            {/* Priority */}
            <div>
              <label className="block text-xs font-semibold text-[hsl(var(--navy))] uppercase tracking-wider mb-2">Приоритет</label>
              <div className="flex gap-2">
                {([
                  { id: "normal", label: "Обычный", color: "emerald" },
                  { id: "high", label: "Высокий", color: "amber" },
                  { id: "critical", label: "Критический", color: "red" },
                ] as const).map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setPriority(p.id)}
                    className={`flex-1 py-1.5 text-xs font-medium rounded-sm border transition-colors ${
                      priority === p.id
                        ? p.color === "emerald" ? "bg-emerald-600 text-white border-emerald-600"
                          : p.color === "amber" ? "bg-amber-500 text-white border-amber-500"
                          : "bg-red-600 text-white border-red-600"
                        : "bg-white text-[hsl(var(--muted-foreground))] border-[hsl(var(--border))] hover:border-[hsl(var(--navy))]"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-semibold text-[hsl(var(--navy))] uppercase tracking-wider mb-2">Категория обращения</label>
              <div className="flex flex-wrap gap-1.5">
                {SUPPORT_CATEGORIES.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    className={`text-xs px-2.5 py-1 rounded-sm border transition-colors ${
                      category === c
                        ? "bg-[hsl(var(--navy))] text-white border-[hsl(var(--navy))]"
                        : "bg-[hsl(var(--surface))] text-[hsl(var(--muted-foreground))] border-[hsl(var(--border))] hover:border-[hsl(var(--navy))]"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-xs font-semibold text-[hsl(var(--navy))] uppercase tracking-wider mb-2">Тема обращения</label>
              <input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Кратко опишите проблему..."
                className="w-full px-3 py-2.5 text-sm border border-[hsl(var(--border))] rounded-sm bg-[hsl(var(--surface))] focus:outline-none focus:border-[hsl(var(--navy))] focus:ring-1 focus:ring-[hsl(var(--navy))]"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs font-semibold text-[hsl(var(--navy))] uppercase tracking-wider mb-2">Описание</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                placeholder="Подробно опишите проблему или вопрос. При необходимости укажите номер дела, модуль системы и шаги воспроизведения..."
                className="w-full px-3 py-2.5 text-sm border border-[hsl(var(--border))] rounded-sm bg-[hsl(var(--surface))] focus:outline-none focus:border-[hsl(var(--navy))] focus:ring-1 focus:ring-[hsl(var(--navy))] resize-none leading-relaxed"
              />
            </div>

            {/* Footer */}
            <div className="flex items-center gap-3 pt-1">
              <button
                onClick={onClose}
                className="px-4 py-2.5 border border-[hsl(var(--border))] text-sm text-[hsl(var(--muted-foreground))] rounded-sm hover:bg-[hsl(var(--muted))] transition-colors"
              >
                Отмена
              </button>
              <button
                onClick={handleSend}
                disabled={!category || !subject || !message || sending}
                className="flex-1 py-2.5 bg-[hsl(var(--navy))] text-white text-sm font-semibold rounded-sm hover:bg-[hsl(var(--navy-mid))] transition-colors disabled:opacity-40 flex items-center justify-center gap-2"
              >
                {sending
                  ? <><Icon name="Loader" size={15} className="animate-spin" /> Отправляю...</>
                  : <><Icon name="Send" size={15} /> Отправить обращение</>
                }
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Index() {
  const [active, setActive] = useState<Section>("home");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [judges, setJudges] = useState<JudgeItem[]>(INIT_JUDGES);

  const syncProfileToJudges = (p: UserProfile) => {
    const parts = p.name.trim().split(/\s+/);
    const shortName = parts.length >= 2
      ? parts[0] + " " + parts.slice(1).map((w) => w[0] + ".").join("")
      : p.name;

    setJudges((prev) =>
      prev.map((j) => {
        if (j.name === shortName) {
          return {
            ...j,
            onVacation: p.onVacation,
            onSickLeave: p.onSickLeave,
            spec: p.spec,
          };
        }
        return j;
      })
    );
  };

  const renderContent = () => {
    switch (active) {
      case "search":
        return <SearchSection />;
      case "generator":
        return <GeneratorSection />;
      case "stenography":
        return <StenographySection />;
      case "distribution":
        return <DistributionSection judges={judges} setJudges={setJudges} />;
      default:
        return <HomePage onNavigate={setActive} />;
    }
  };

  return (
    <div className="min-h-screen flex bg-[hsl(var(--surface))]" style={{ fontFamily: "'Golos Text', sans-serif" }}>
      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? "w-64" : "w-16"} transition-all duration-300 bg-[hsl(var(--navy))] flex flex-col flex-shrink-0`}
        style={{ minHeight: "100vh" }}
      >
        <div className="px-4 py-5 border-b border-[hsl(var(--sidebar-border))]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 flex-shrink-0 rounded bg-[hsl(var(--gold))] flex items-center justify-center">
              <Icon name="Scale" size={16} className="text-white" />
            </div>
            {sidebarOpen && (
              <div className="animate-fade-in overflow-hidden">
                <div className="text-white font-bold text-sm leading-tight">ГАС Судопроизводство</div>
                <div className="text-white/40 text-xs">ИИ-модули</div>
              </div>
            )}
          </div>
        </div>

        <div className="px-2 pt-4">
          <button
            onClick={() => setActive("home")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-sm text-left nav-item ${
              active === "home" ? "nav-item-active" : "text-[hsl(var(--sidebar-foreground))]"
            }`}
          >
            <Icon name="LayoutDashboard" size={18} className="flex-shrink-0" />
            {sidebarOpen && <span className="text-sm font-medium animate-fade-in">Главная</span>}
          </button>
        </div>

        <nav className="flex-1 px-2 py-3 space-y-1">
          {sidebarOpen && (
            <div className="px-3 pb-2">
              <span className="text-xs font-semibold text-white/25 uppercase tracking-widest">Модули</span>
            </div>
          )}
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-sm text-left nav-item ${
                active === item.id ? "nav-item-active" : "text-[hsl(var(--sidebar-foreground))]"
              }`}
            >
              <Icon name={item.icon} size={18} className="flex-shrink-0" />
              {sidebarOpen && (
                <div className="overflow-hidden animate-fade-in">
                  <div className="text-sm font-medium leading-tight">{item.label}</div>
                  <div className="text-xs text-white/30">{item.sub}</div>
                </div>
              )}
            </button>
          ))}
        </nav>

        <div className="px-2 py-4 border-t border-[hsl(var(--sidebar-border))]">
          <button
            onClick={() => setSidebarOpen((o) => !o)}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-sm text-white/40 hover:text-white/70 transition-colors"
          >
            <Icon name={sidebarOpen ? "PanelLeftClose" : "PanelLeftOpen"} size={18} />
            {sidebarOpen && <span className="text-xs animate-fade-in">Свернуть панель</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-[hsl(var(--border))] px-8 py-3 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2 text-xs text-[hsl(var(--muted-foreground))]">
            <button onClick={() => setActive("home")} className="hover:text-[hsl(var(--navy))] transition-colors">
              Главная
            </button>
            {active !== "home" && (
              <>
                <Icon name="ChevronRight" size={12} />
                <span className="text-[hsl(var(--navy))] font-medium">{NAV_ITEMS.find((n) => n.id === active)?.label}</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 status-dot" />
              <span className="text-xs text-[hsl(var(--muted-foreground))]">Система работает</span>
            </div>
            <div className="h-5 w-px bg-[hsl(var(--border))]" />
            <button
              onClick={() => setProfileOpen(true)}
              className="flex items-center gap-2 px-2 py-1 rounded-sm hover:bg-[hsl(var(--muted))] transition-colors group"
            >
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold ${profile.onSickLeave || profile.onVacation ? "bg-[hsl(var(--muted-foreground))]" : "bg-[hsl(var(--navy))]"}`}>
                {profile.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-xs font-medium text-[hsl(var(--foreground))] leading-tight">
                  {profile.name.split(" ")[0]} {profile.name.split(" ").slice(1).map((w) => w[0] + ".").join("")}
                </p>
                <p className={`text-xs leading-tight ${profile.onSickLeave ? "text-red-500" : profile.onVacation ? "text-amber-500" : "text-[hsl(var(--muted-foreground))]"}`}>
                  {profile.onSickLeave ? "На больничном" : profile.onVacation ? "В отпуске" : profile.role === "judge" ? "Судья" : "Работник аппарата"}
                </p>
              </div>
              <Icon name="ChevronDown" size={13} className="text-[hsl(var(--muted-foreground))] group-hover:text-[hsl(var(--navy))] transition-colors" />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto py-6">{renderContent()}</div>

        {profileOpen && (
          <ProfilePanel
            onClose={() => setProfileOpen(false)}
            profile={profile}
            setProfile={setProfile}
            onSyncToJudges={syncProfileToJudges}
          />
        )}

        <footer className="bg-white border-t border-[hsl(var(--border))] px-8 py-3 flex items-center justify-between">
          <span className="text-xs text-[hsl(var(--muted-foreground))] font-mono-ru">
            ГАС «Судопроизводство 1.0»
          </span>
          <button
            onClick={() => setSupportOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[hsl(var(--navy))] border border-[hsl(var(--navy))/30] rounded-sm hover:bg-[hsl(var(--navy))] hover:text-white transition-colors group"
          >
            <Icon name="Headphones" size={13} />
            Техническая поддержка
          </button>
          <span className="text-xs text-[hsl(var(--muted-foreground))]">{new Date().getFullYear()} · v1.0</span>
        </footer>

        {supportOpen && <SupportModal onClose={() => setSupportOpen(false)} />}
      </main>
    </div>
  );
}
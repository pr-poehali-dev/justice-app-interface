import { useState } from "react";
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

function StenographySection() {
  const [uploaded, setUploaded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);

  const handleUpload = () => {
    setUploaded(true);
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setDone(true);
    }, 2500);
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
            <p className="text-xs text-[hsl(var(--muted-foreground))]">Расшифровка аудио в протокол судебного заседания</p>
          </div>
        </div>
      </div>

      <div className="px-8 py-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-5">
          <div className="bg-amber-50 border border-amber-200 rounded-sm px-4 py-3 flex gap-3">
            <Icon name="Info" size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-700 leading-relaxed">
              Система автоматически распознаёт речь участников заседания, разделяет реплики и формирует структурированный протокол с временными метками.
            </p>
          </div>

          {!uploaded ? (
            <div className="upload-zone rounded-sm p-10 text-center cursor-pointer" onClick={handleUpload}>
              <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
                <Icon name="Mic" size={28} className="text-amber-600" />
              </div>
              <p className="font-semibold text-[hsl(var(--navy))] mb-1">Загрузите аудиозапись</p>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">MP3, WAV, M4A, OGG — до 500 МБ</p>
              <p className="text-xs text-[hsl(var(--muted-foreground))] mt-3">Нажмите или перетащите файл сюда</p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="bg-white border border-[hsl(var(--border))] rounded-sm px-4 py-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <Icon name="FileAudio" size={15} className="text-amber-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[hsl(var(--navy))] truncate">audio_zasedanie_2024.mp3</p>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">128 МБ · 01:24:37</p>
                </div>
                {processing && <Icon name="Loader" size={16} className="text-amber-600 animate-spin" />}
                {done && <Icon name="CheckCircle" size={16} className="text-emerald-600" />}
              </div>

              {processing && (
                <div className="animate-fade-in">
                  <div className="flex justify-between text-xs text-[hsl(var(--muted-foreground))] mb-1">
                    <span>Распознавание речи...</span>
                    <span>67%</span>
                  </div>
                  <div className="h-1.5 bg-[hsl(var(--muted))] rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: "67%", transition: "width 2s ease" }} />
                  </div>
                </div>
              )}
            </div>
          )}

          {done && (
            <div className="flex gap-2 animate-fade-in">
              <button className="flex-1 py-2.5 bg-[hsl(var(--navy))] text-white text-sm font-medium rounded-sm hover:bg-[hsl(var(--navy-mid))] transition-colors flex items-center justify-center gap-2">
                <Icon name="Download" size={15} /> Скачать протокол
              </button>
              <button className="px-4 py-2.5 border border-[hsl(var(--border))] text-sm rounded-sm hover:bg-[hsl(var(--muted))] transition-colors">
                <Icon name="RefreshCw" size={15} />
              </button>
            </div>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-[hsl(var(--navy))] uppercase tracking-wider mb-2">
            Протокол судебного заседания
          </label>
          {done ? (
            <div className="bg-white border border-[hsl(var(--border))] rounded-sm p-5 text-sm leading-relaxed animate-fade-in space-y-3 max-h-96 overflow-y-auto">
              <p className="text-center text-xs font-bold uppercase tracking-widest text-[hsl(var(--navy))] pb-2 border-b border-[hsl(var(--border))]">
                ПРОТОКОЛ СУДЕБНОГО ЗАСЕДАНИЯ
              </p>
              {[
                {
                  time: "09:00",
                  speaker: "Председательствующий",
                  text: "Судебное заседание объявляется открытым. Слушается дело №...",
                },
                { time: "09:02", speaker: "Секретарь", text: "Явка сторон проверена. Истец присутствует, ответчик присутствует." },
                {
                  time: "09:03",
                  speaker: "Председательствующий",
                  text: "Суду необходимо разъяснить сторонам их права и обязанности согласно ст. 35 ГПК РФ...",
                },
                {
                  time: "09:07",
                  speaker: "Представитель истца",
                  text: "[Текст будет сгенерирован через Whisper AI при подключении API-ключа]",
                },
              ].map((entry, i) => (
                <div key={i} className="flex gap-3 animate-fade-in">
                  <span className="text-xs font-mono-ru text-[hsl(var(--muted-foreground))] flex-shrink-0 mt-0.5">{entry.time}</span>
                  <div>
                    <span className="text-xs font-semibold text-[hsl(var(--navy))]">{entry.speaker}: </span>
                    <span className="text-xs text-[hsl(var(--foreground))]">{entry.text}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-[hsl(var(--surface))] border border-dashed border-[hsl(var(--border))] rounded-sm min-h-64 flex flex-col items-center justify-center text-center p-8">
              <Icon name="FileText" size={36} className="text-[hsl(var(--muted-foreground))] mb-3 opacity-40" />
              <p className="text-sm text-[hsl(var(--muted-foreground))]">Протокол появится здесь</p>
              <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">После загрузки и обработки аудиофайла</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const CASES = [
  { id: "22-12345/2024", type: "Гражданское", subject: "Взыскание долга", complexity: "Средняя", status: "new", judge: null as string | null },
  { id: "22-12346/2024", type: "Административное", subject: "Оспаривание решения", complexity: "Высокая", status: "new", judge: null as string | null },
  { id: "22-12347/2024", type: "Гражданское", subject: "Раздел имущества", complexity: "Высокая", status: "assigned", judge: "Иванов А.В." },
  { id: "22-12348/2024", type: "Уголовное", subject: "Мошенничество (ст. 159)", complexity: "Высокая", status: "assigned", judge: "Петрова С.М." },
  { id: "22-12349/2024", type: "Гражданское", subject: "Трудовой спор", complexity: "Низкая", status: "new", judge: null as string | null },
];

const JUDGES = [
  { name: "Иванов А.В.", load: 78, spec: ["Гражданское", "Административное"] },
  { name: "Петрова С.М.", load: 45, spec: ["Уголовное", "Гражданское"] },
  { name: "Сидоров К.П.", load: 62, spec: ["Административное"] },
  { name: "Козлова Е.Р.", load: 30, spec: ["Гражданское", "Уголовное"] },
];

function DistributionSection() {
  const [cases, setCases] = useState(CASES);
  const [distributing, setDistributing] = useState(false);

  const distribute = () => {
    setDistributing(true);
    setTimeout(() => {
      setCases((prev) =>
        prev.map((c) => {
          if (c.status === "assigned") return c;
          const suitable = JUDGES.filter((j) => j.spec.includes(c.type) && j.load < 80);
          const judge = suitable.sort((a, b) => a.load - b.load)[0];
          return judge ? { ...c, status: "assigned", judge: judge.name } : c;
        })
      );
      setDistributing(false);
    }, 2000);
  };

  const complexityColor: Record<string, string> = {
    Высокая: "bg-red-50 text-red-700 border-red-200",
    Средняя: "bg-amber-50 text-amber-700 border-amber-200",
    Низкая: "bg-emerald-50 text-emerald-700 border-emerald-200",
  };

  return (
    <div className="animate-fade-in">
      <div className="px-8 py-6 border-b border-[hsl(var(--border))] bg-white">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-violet-100 flex items-center justify-center">
            <Icon name="GitBranch" size={16} className="text-violet-700" />
          </div>
          <div>
            <h2 className="font-bold text-[hsl(var(--navy))] text-base">Распределение судебных дел</h2>
            <p className="text-xs text-[hsl(var(--muted-foreground))]">ИИ-модуль автоматического распределения</p>
          </div>
          <button
            onClick={distribute}
            disabled={distributing}
            className="ml-auto px-4 py-2 bg-[hsl(var(--navy))] text-white text-sm font-medium rounded-sm hover:bg-[hsl(var(--navy-mid))] transition-colors disabled:opacity-60 flex items-center gap-2"
          >
            {distributing ? <Icon name="Loader" size={14} className="animate-spin" /> : <Icon name="Zap" size={14} />}
            {distributing ? "Распределение..." : "Авто-распределить"}
          </button>
        </div>
      </div>

      <div className="px-8 py-6 grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <h3 className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-widest mb-3">Очередь дел</h3>
          <div className="bg-white border border-[hsl(var(--border))] rounded-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[hsl(var(--border))] bg-[hsl(var(--surface))]">
                  {["Номер дела", "Категория", "Предмет", "Сложность", "Судья"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cases.map((c, i) => (
                  <tr
                    key={c.id}
                    className="border-b border-[hsl(var(--border))] last:border-0 hover:bg-[hsl(var(--surface))] transition-colors"
                    style={{ animationDelay: `${(i + 1) * 0.1}s` }}
                  >
                    <td className="px-4 py-3">
                      <span className="font-mono-ru text-xs text-[hsl(var(--navy))] font-medium">{c.id}</span>
                    </td>
                    <td className="px-4 py-3 text-xs text-[hsl(var(--foreground))]">{c.type}</td>
                    <td className="px-4 py-3 text-xs text-[hsl(var(--foreground))]">{c.subject}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded border font-medium ${complexityColor[c.complexity]}`}>{c.complexity}</span>
                    </td>
                    <td className="px-4 py-3">
                      {c.judge ? (
                        <div className="flex items-center gap-1.5">
                          <Icon name="UserCheck" size={12} className="text-emerald-600" />
                          <span className="text-xs text-emerald-700 font-medium">{c.judge}</span>
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
        </div>

        <div>
          <h3 className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-widest mb-3">Нагрузка судей</h3>
          <div className="space-y-3">
            {JUDGES.map((j, i) => (
              <div
                key={j.name}
                className="bg-white border border-[hsl(var(--border))] rounded-sm p-4 animate-fade-in"
                style={{ animationDelay: `${(i + 1) * 0.1}s` }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-full bg-[hsl(var(--navy))] flex items-center justify-center text-white text-xs font-bold">
                    {j.name.split(" ")[0][0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-[hsl(var(--navy))] truncate">{j.name}</p>
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">{j.spec.join(", ")}</p>
                  </div>
                  <span
                    className={`text-xs font-mono-ru font-bold ${
                      j.load > 70 ? "text-red-600" : j.load > 50 ? "text-amber-600" : "text-emerald-600"
                    }`}
                  >
                    {j.load}%
                  </span>
                </div>
                <div className="h-1.5 bg-[hsl(var(--muted))] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      j.load > 70 ? "bg-red-500" : j.load > 50 ? "bg-amber-500" : "bg-emerald-500"
                    }`}
                    style={{ width: `${j.load}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Index() {
  const [active, setActive] = useState<Section>("home");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderContent = () => {
    switch (active) {
      case "search":
        return <SearchSection />;
      case "generator":
        return <GeneratorSection />;
      case "stenography":
        return <StenographySection />;
      case "distribution":
        return <DistributionSection />;
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
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[hsl(var(--navy))] flex items-center justify-center">
                <Icon name="User" size={12} className="text-white" />
              </div>
              <span className="text-xs font-medium text-[hsl(var(--foreground))]">Судья</span>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto py-6">{renderContent()}</div>

        <footer className="bg-white border-t border-[hsl(var(--border))] px-8 py-3 flex items-center justify-between">
          <span className="text-xs text-[hsl(var(--muted-foreground))] font-mono-ru">
            ГАС «Судопроизводство 1.0» · АИС поддержки судопроизводства
          </span>
          <span className="text-xs text-[hsl(var(--muted-foreground))]">{new Date().getFullYear()} · v1.0</span>
        </footer>
      </main>
    </div>
  );
}
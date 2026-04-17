import { useState } from "react";
import { Header } from "../components/Header";
import type { EmotionTag } from "../types";

const INITIAL_TAGS: EmotionTag[] = [
  { id: "1", name: "기쁨", color: "#FFD700", created_at: "2026-01-01T00:00:00Z" },
  { id: "2", name: "슬픔", color: "#4A90D9", created_at: "2026-01-01T00:00:00Z" },
  { id: "3", name: "분노", color: "#E74C3C", created_at: "2026-01-01T00:00:00Z" },
  { id: "4", name: "평온", color: "#2ECC71", created_at: "2026-01-01T00:00:00Z" },
  { id: "5", name: "불안", color: "#9B59B6", created_at: "2026-01-01T00:00:00Z" },
];

export const Emotions = () => {
  const [tags, setTags] = useState<EmotionTag[]>(INITIAL_TAGS);
  const [newTag, setNewTag] = useState("");
  const [newColor, setNewColor] = useState("#D4724A");

  const handleAdd = () => {
    if (!newTag.trim()) return;

    const tag: EmotionTag = {
      id: crypto.randomUUID(),
      name: newTag.trim(),
      color: newColor,
      created_at: new Date().toISOString(),
    };

    setTags((prev) => [...prev, tag]);
    setNewTag("");
  };

  const handleDelete = (id: string) => {
    setTags((prev) => prev.filter((tag) => tag.id !== id));
  };

  return (
    <div>
      <Header title="감정 태그 관리" />
      <div className="p-6">
        <div className="mb-6 flex items-center gap-3">
          <input
            type="text"
            placeholder="새 감정 태그"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            className="rounded-lg border border-[var(--ember-border)] bg-[var(--ember-bg)] px-4 py-2 text-sm text-[var(--ember-text)] outline-none placeholder:text-[var(--ember-muted)] focus:border-[var(--ember-accent)]"
          />
          <input
            type="color"
            value={newColor}
            onChange={(e) => setNewColor(e.target.value)}
            className="h-9 w-9 cursor-pointer rounded border-none bg-transparent"
          />
          <button
            type="button"
            onClick={handleAdd}
            className="rounded-lg bg-[var(--ember-accent)] px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            추가
          </button>
        </div>

        <div className="flex flex-wrap gap-3">
          {tags.map((tag) => (
            <div
              key={tag.id}
              className="flex items-center gap-2 rounded-full border border-[var(--ember-border)] bg-[var(--ember-card)] px-4 py-2"
            >
              <span
                className="inline-block h-3 w-3 rounded-full"
                style={{ backgroundColor: tag.color }}
              />
              <span className="text-sm text-[var(--ember-text)]">
                {tag.name}
              </span>
              <button
                type="button"
                onClick={() => handleDelete(tag.id)}
                className="ml-1 text-[var(--ember-muted)] transition-colors hover:text-red-400"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

import { Header } from "../components/Header";
import type { Fortune } from "../types";
import { formatDate } from "../lib/utils";

const PLACEHOLDER_FORTUNES: Fortune[] = [
  {
    id: "1",
    user_id: "user1",
    content: "오늘은 새로운 시작이 기다리고 있어요. 작은 용기가 큰 변화를 만듭니다.",
    emotion_tag: "기쁨",
    created_at: "2026-04-15T09:00:00Z",
  },
  {
    id: "2",
    user_id: "user2",
    content: "잠시 멈추고 깊은 숨을 쉬어보세요. 평온함 속에서 답을 찾을 수 있어요.",
    emotion_tag: "평온",
    created_at: "2026-04-15T10:30:00Z",
  },
];

export const Fortunes = () => {
  const fortunes = PLACEHOLDER_FORTUNES;

  return (
    <div>
      <Header title="운세 모니터링" />
      <div className="p-6">
        <div className="flex flex-col gap-4">
          {fortunes.map((fortune) => (
            <div
              key={fortune.id}
              className="rounded-xl border border-[var(--ember-border)] bg-[var(--ember-card)] p-5"
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="rounded-full bg-[var(--ember-accent)]/20 px-3 py-0.5 text-xs font-medium text-[var(--ember-accent)]">
                  {fortune.emotion_tag}
                </span>
                <span className="text-xs text-[var(--ember-muted)]">
                  {formatDate(fortune.created_at)}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-[var(--ember-text)]">
                {fortune.content}
              </p>
              <p className="mt-2 text-xs text-[var(--ember-muted)]">
                유저: {fortune.user_id}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

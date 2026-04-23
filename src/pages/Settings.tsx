import { useState } from 'react';
import { Header } from '../components/Header';

export const Settings = () => {
  const [siteName, setSiteName] = useState('Ember');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [maxFortunesPerDay, setMaxFortunesPerDay] = useState('3');

  const handleSave = () => {
    // TODO: Supabase에 설정 저장
    alert('설정이 저장되었습니다. (placeholder)');
  };

  return (
    <div>
      <Header title="시스템 설정" />
      <div className="p-6">
        <div className="max-w-lg rounded-xl border border-[var(--ember-border)] bg-[var(--ember-card)] p-6">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="siteName" className="text-sm font-medium text-[var(--ember-text)]">
                사이트 이름
              </label>
              <input
                id="siteName"
                type="text"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                className="rounded-lg border border-[var(--ember-border)] bg-[var(--ember-bg)] px-4 py-2 text-sm text-[var(--ember-text)] outline-none focus:border-[var(--ember-accent)]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="maxFortunes" className="text-sm font-medium text-[var(--ember-text)]">
                일일 운세 생성 제한
              </label>
              <input
                id="maxFortunes"
                type="number"
                value={maxFortunesPerDay}
                onChange={(e) => setMaxFortunesPerDay(e.target.value)}
                className="rounded-lg border border-[var(--ember-border)] bg-[var(--ember-bg)] px-4 py-2 text-sm text-[var(--ember-text)] outline-none focus:border-[var(--ember-accent)]"
              />
            </div>

            <div className="flex items-center justify-between">
              <label htmlFor="maintenance" className="text-sm font-medium text-[var(--ember-text)]">
                점검 모드
              </label>
              <button
                id="maintenance"
                type="button"
                onClick={() => setMaintenanceMode((prev) => !prev)}
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  maintenanceMode ? 'bg-[var(--ember-accent)]' : 'bg-[var(--ember-border)]'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                    maintenanceMode ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <button
              type="button"
              onClick={handleSave}
              className="mt-2 rounded-lg bg-[var(--ember-accent)] px-4 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

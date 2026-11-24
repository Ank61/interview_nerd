import { create } from 'zustand';

export type Toast = {
  id: number;
  kind: 'xp' | 'badge' | 'level' | 'info' | 'error';
  title: string;
  sub?: string;
  emoji?: string;
};

type ToastState = {
  queue: Toast[];
  push: (t: Omit<Toast, 'id'>) => void;
  shift: () => void;
};

let id = 0;

export const useToast = create<ToastState>((set) => ({
  queue: [],
  push: (t) =>
    set((s) => {
      // Merge rapid XP toasts so a burst of answers doesn't stack up.
      const last = s.queue[s.queue.length - 1];
      if (t.kind === 'xp' && last?.kind === 'xp' && s.queue.length > 1) {
        const a = parseInt(last.title.replace(/\D/g, ''), 10) || 0;
        const b = parseInt(t.title.replace(/\D/g, ''), 10) || 0;
        return { queue: [...s.queue.slice(0, -1), { ...last, title: `+${a + b} XP`, sub: t.sub }] };
      }
      return { queue: [...s.queue, { ...t, id: ++id }].slice(-5) };
    }),
  shift: () => set((s) => ({ queue: s.queue.slice(1) })),
}));

export const toast = (t: Omit<Toast, 'id'>) => useToast.getState().push(t);

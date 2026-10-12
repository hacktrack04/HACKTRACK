import type { Task } from './project';
export const factorNames = ['Urgency', 'Requirement importance', 'Blocking impact', 'Judging impact', 'Demo impact', 'MVP importance'] as const;
export const factorMaximums = [20, 20, 15, 15, 15, 15];
const profiles: Record<number, number[]> = {
  1: [19, 20, 15, 12, 14, 15],
  2: [18, 19, 12, 11, 14, 15],
  3: [18, 17, 8, 14, 15, 14],
  4: [16, 14, 4, 15, 14, 12],
  5: [7, 8, 1, 4, 6, 5],
};
export function rankTasks(tasks: Task[]) {
  return tasks.filter(task => task.status !== 'Done').map(task => {
    const contributions = profiles[task.id] ?? [10, 12, 5, 8, 8, 10];
    return { ...task, contributions, score: contributions.reduce((sum, value) => sum + value, 0) };
  }).sort((a,b) => b.score - a.score || a.id - b.id);
}
export const scopeCreep = [
  { id: 'themes', title: 'Build custom themes & appearance settings', reason: 'Non-MVP personalization. It won’t improve the core demo.', hours: 2, owner: 'AM' },
  { id: 'analytics', title: 'Add advanced analytics dashboards', reason: 'Non-MVP reporting. The current progress view is enough for judging.', hours: 3, owner: 'PP' },
  { id: 'integrations', title: 'Connect third-party productivity tools', reason: 'Non-MVP integrations introduce risk without proving the core idea.', hours: 3, owner: 'SC' },
];
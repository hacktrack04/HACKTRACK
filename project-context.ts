import { createContext } from 'react';
import type { ProjectDetails, TeamDetails } from './creation-schema';
import type { Task } from './project';

export type ProjectState = {
  project: ProjectDetails | null;
  team: TeamDetails | null;
  createProject: (value: ProjectDetails) => void;
  createTeam: (value: TeamDetails) => void;
  tasks: Task[];
  updateTask: (id: number, status: Task['status']) => void;
  addTask: (task: Omit<Task, 'id'>) => void;
  dismissed: string[];
  dismiss: (id: string) => void;
};

// Keep context identity outside the component refresh boundary. A refreshed
// provider and an already-mounted lazy page must read the same context object.
export const ProjectContext = createContext<ProjectState | null>(null);
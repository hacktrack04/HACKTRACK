import { createFileRoute } from '@tanstack/react-router';
import { TasksView, pageMeta } from '@/components/hacktrack/views';
export const Route = createFileRoute('/tasks')({head:()=>pageMeta('Tasks','Tasks for LaunchPad — focused hackathon decision support with HackTrack.'),component:TasksView});

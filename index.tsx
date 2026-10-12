import { createFileRoute } from '@tanstack/react-router';
import { Dashboard, pageMeta } from '@/components/hacktrack/views';
export const Route = createFileRoute('/')({head:()=>pageMeta('Dashboard','LaunchPad hackathon progress, priority tasks, and time-aware recommendations.'),component:Dashboard});

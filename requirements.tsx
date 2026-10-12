import { createFileRoute } from '@tanstack/react-router';
import { RequirementsView, pageMeta } from '@/components/hacktrack/views';
export const Route = createFileRoute('/requirements')({head:()=>pageMeta('Requirements','Requirements for LaunchPad — focused hackathon decision support with HackTrack.'),component:RequirementsView});

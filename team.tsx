import { createFileRoute } from '@tanstack/react-router';
import { TeamView, pageMeta } from '@/components/hacktrack/views';
export const Route = createFileRoute('/team')({head:()=>pageMeta('Team','Team for LaunchPad — focused hackathon decision support with HackTrack.'),component:TeamView});

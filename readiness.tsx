import { createFileRoute } from '@tanstack/react-router';
import { ReadinessView, pageMeta } from '@/components/hacktrack/views';
export const Route = createFileRoute('/readiness')({head:()=>pageMeta('Demo readiness','Demo readiness for LaunchPad — focused hackathon decision support with HackTrack.'),component:ReadinessView});

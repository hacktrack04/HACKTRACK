import { createFileRoute } from '@tanstack/react-router';
import { MvpView, pageMeta } from '@/components/hacktrack/views';
export const Route = createFileRoute('/mvp')({head:()=>pageMeta('MVP scope','MVP scope for LaunchPad — focused hackathon decision support with HackTrack.'),component:MvpView});

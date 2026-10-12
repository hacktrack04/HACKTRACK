import { createFileRoute } from '@tanstack/react-router';
import { pageMeta } from '@/components/hacktrack/views';
import { RankedRecommendations } from '@/components/hacktrack/recommendations';
export const Route = createFileRoute('/recommendations')({head:()=>pageMeta('Recommendations','Ranked next actions, priority score breakdowns, and scope-creep flags for LaunchPad.'),component:RankedRecommendations});

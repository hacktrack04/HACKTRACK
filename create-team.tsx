import { createFileRoute } from '@tanstack/react-router';
import { CreateTeamView } from '@/components/hacktrack/creation';
import { pageMeta } from '@/components/hacktrack/views';
export const Route = createFileRoute('/create-team')({ head: () => pageMeta('Create Team', 'Create your HackTrack team and add member email invitations.'), component: CreateTeamView });
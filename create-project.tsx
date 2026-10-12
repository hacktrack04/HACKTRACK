import { createFileRoute } from '@tanstack/react-router';
import { CreateProjectView } from '@/components/hacktrack/creation';
import { pageMeta } from '@/components/hacktrack/views';
export const Route = createFileRoute('/create-project')({ head: () => pageMeta('Create Project', 'Create a HackTrack project with a problem statement, deadline, and tech stack.'), component: CreateProjectView });
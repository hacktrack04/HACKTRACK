import { z } from 'zod';

export const techTagSchema = z.string().trim().min(1, 'Enter a tech stack tag.').max(40, 'Tags must be 40 characters or fewer.').regex(/^[\p{L}\p{N} .+#/_-]+$/u, 'Use letters, numbers, spaces, or . + # / _ - in tags.');
export const projectSchema = z.object({
  name: z.string().trim().min(1, 'Project name is required.').max(100, 'Use 100 characters or fewer.'),
  problemStatement: z.string().trim().min(1, 'Problem statement is required.').max(2000, 'Use 2,000 characters or fewer.'),
  deadline: z.string().min(1, 'Deadline is required.').refine(value => /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value) && Number.isFinite(new Date(value).getTime()), 'Enter a valid deadline date and time.'),
  techStack: z.array(techTagSchema).max(12, 'Add up to 12 tech stack tags.'),
});
export const inviteEmailSchema = z.string().trim().email('Enter a valid email address.').max(255, 'Email must be 255 characters or fewer.');
export const teamSchema = z.object({
  name: z.string().trim().min(1, 'Team name is required.').max(100, 'Use 100 characters or fewer.'),
  invitations: z.array(inviteEmailSchema).max(20, 'Add up to 20 members.').refine(emails => new Set(emails.map(email => email.toLowerCase())).size === emails.length, 'This email has already been added.'),
});
export type ProjectDetails = z.infer<typeof projectSchema>;
export type TeamDetails = z.infer<typeof teamSchema>;
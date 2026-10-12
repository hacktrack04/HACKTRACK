import { describe, expect, it } from 'vitest';
import { projectSchema, teamSchema } from '@/components/hacktrack/creation-schema';

const project = { name: 'LaunchPad', problemStatement: 'Help teams prioritize hackathon work.', deadline: '2026-10-14T18:00', techStack: ['React', 'TypeScript'] };
describe('creation validation', () => {
  it('requires a nonempty problem statement', () => {
    for (const problemStatement of ['', '   \n ']) {
      const result = projectSchema.safeParse({ ...project, problemStatement });
      expect(result.success).toBe(false);
      if (!result.success) expect(result.error.flatten().fieldErrors.problemStatement).toContain('Problem statement is required.');
    }
  });
  it('accepts project name, problem statement, deadline and tech stack tags', () => {
    expect(projectSchema.parse(project)).toEqual(project);
  });
  it('rejects invalid member emails', () => {
    expect(teamSchema.safeParse({ name: 'Builders', invitations: ['not-an-email'] }).success).toBe(false);
    expect(teamSchema.parse({ name: 'Builders', invitations: ['builder@example.com'] }).invitations).toEqual(['builder@example.com']);
  });
  it('rejects duplicate member invitations', () => {
    expect(teamSchema.safeParse({ name: 'Builders', invitations: ['builder@example.com', 'BUILDER@example.com'] }).success).toBe(false);
  });
  it('rejects an invalid date-time', () => {
    expect(projectSchema.safeParse({ ...project, deadline: 'not-a-date' }).success).toBe(false);
  });
});
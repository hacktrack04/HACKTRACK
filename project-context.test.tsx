import { fireEvent, render, screen, cleanup } from '@testing-library/react';
import { afterEach, expect, it } from 'vitest';
import { ProjectProvider, useProject } from '@/components/hacktrack/project';

afterEach(cleanup);
function Consumer() {
  const { tasks, updateTask } = useProject();
  const task = tasks.find(value => value.id === 1);
  return <button onClick={() => updateTask(1, 'Done')}>{task?.status}</button>;
}
it('keeps shared provider state accessible when a page consumer remounts', () => {
  const view = render(<ProjectProvider><Consumer key="first" /></ProjectProvider>);
  fireEvent.click(screen.getByRole('button', { name: 'In progress' }));
  view.rerender(<ProjectProvider><Consumer key="next-page" /></ProjectProvider>);
  expect(screen.getByRole('button', { name: 'Done' })).toBeInTheDocument();
});
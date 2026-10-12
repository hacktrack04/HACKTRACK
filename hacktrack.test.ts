import { describe, it, expect } from 'vitest';
import { completion, getCountdown } from '@/components/hacktrack/project';

describe('HackTrack time and progress', () => {
  it('counts down the remaining hours, minutes and seconds', () => {
    expect(getCountdown(67325000, 0)).toEqual({ hours: 18, minutes: 42, seconds: 5 });
    expect(getCountdown(67325000, 1000)).toEqual({ hours: 18, minutes: 42, seconds: 4 });
  });
  it('stops at zero after the deadline', () => {
    expect(getCountdown(1000, 2000)).toEqual({ hours: 0, minutes: 0, seconds: 0 });
  });
  it('only counts completed tasks toward progress', () => {
    expect(completion([{id:1,title:'Demo',owner:'AM',priority:'High',status:'Done',hours:1},{id:2,title:'Pitch',owner:'JW',priority:'High',status:'In progress',hours:1}])).toBe(50);
    expect(completion([])).toBe(0);
  });
});
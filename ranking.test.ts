import { describe,it,expect } from 'vitest';
import { rankTasks,factorNames,factorMaximums,scopeCreep } from '@/components/hacktrack/ranking';
import type { Task } from '@/components/hacktrack/project';
const tasks:Task[]=[{id:4,title:'Pitch',status:'To do',owner:'JW',priority:'Medium',hours:2},{id:1,title:'API',status:'In progress',owner:'SC',priority:'High',hours:3},{id:2,title:'Onboarding',status:'Done',owner:'AM',priority:'High',hours:2}];
describe('Recommendation ranking',()=>{
 it('ranks open tasks by priority score out of 100',()=>{expect(rankTasks(tasks).map(t=>[t.id,t.score])).toEqual([[1,95],[4,75]]);});
 it('includes all six factor contributions and sums them into the score',()=>{expect(factorNames).toEqual(['Urgency','Requirement importance','Blocking impact','Judging impact','Demo impact','MVP importance']);expect(factorMaximums.reduce((a,b)=>a+b,0)).toBe(100);for(const task of rankTasks(tasks)){expect(task.contributions).toHaveLength(6);expect(task.contributions.reduce((a,b)=>a+b,0)).toBe(task.score);task.contributions.forEach((value,i)=>expect(value).toBeLessThanOrEqual(factorMaximums[i] ?? 0));}});
 it('flags non-MVP work as scope creep',()=>{expect(scopeCreep).toHaveLength(3);expect(scopeCreep.every(t=>t.reason.startsWith('Non-MVP'))).toBe(true);});
});
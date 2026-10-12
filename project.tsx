import { useContext, useState, type ReactNode } from 'react';
import { projectSchema, teamSchema, type ProjectDetails, type TeamDetails } from './creation-schema';
import { ProjectContext } from './project-context';
export type Task = { id: number; title: string; owner: string; priority: 'High' | 'Medium' | 'Low'; status: 'To do' | 'In progress' | 'Done'; hours: number };
export const members = [{name:'Alex Morgan', initials:'AM', role:'Frontend developer', work:'Dashboard & UI', color:''}, {name:'Sarah Chen', initials:'SC',role:'Backend developer',work:'API & authentication',color:'green'}, {name:'James Wilson',initials:'JW',role:'Product designer',work:'Design & pitch deck',color:'amber'}, {name:'Priya Patel',initials:'PP',role:'Full-stack developer',work:'Integrations & testing',color:'neutral'}];
const initialTasks:Task[] = [
 {id:1,title:'Connect frontend to recommendation API',owner:'SC',priority:'High',status:'In progress',hours:3},
 {id:2,title:'Build project onboarding flow',owner:'AM',priority:'High',status:'In progress',hours:2},
 {id:3,title:'Test the end-to-end demo flow',owner:'PP',priority:'High',status:'To do',hours:2},
 {id:4,title:'Prepare pitch deck & demo script',owner:'JW',priority:'Medium',status:'To do',hours:1.5},
 {id:5,title:'Polish dashboard empty states',owner:'AM',priority:'Low',status:'To do',hours:1},
 {id:6,title:'Set up project & design system',owner:'AM',priority:'High',status:'Done',hours:2},
 {id:7,title:'Build core recommendation engine',owner:'SC',priority:'High',status:'Done',hours:4},
 {id:8,title:'Define user journey & wireframes',owner:'JW',priority:'Medium',status:'Done',hours:2},
 {id:9,title:'Create database schema',owner:'PP',priority:'High',status:'Done',hours:2},
 {id:10,title:'Implement requirement capture',owner:'AM',priority:'High',status:'Done',hours:3},
 {id:11,title:'Create task management views',owner:'PP',priority:'Medium',status:'Done',hours:2},
 {id:12,title:'Write API validation tests',owner:'SC',priority:'Medium',status:'Done',hours:1},
];
export function ProjectProvider({children}:{children:ReactNode}) {
 const [tasks,setTasks]=useState(initialTasks); const [dismissed,setDismissed]=useState<string[]>([]);
 const [project,setProject]=useState<ProjectDetails|null>(null); const [team,setTeam]=useState<TeamDetails|null>(null);
 return <ProjectContext.Provider value={{project,team,createProject:value=>setProject(projectSchema.parse(value)),createTeam:value=>setTeam(teamSchema.parse(value)),tasks, updateTask:(id,status)=>setTasks(prev=>prev.map(t=>t.id===id?{...t,status}:t)), addTask:task=>setTasks(prev=>[...prev,{...task,id:Math.max(...prev.map(t=>t.id))+1}]), dismissed,dismiss:id=>setDismissed(prev=>[...prev,id])}}>{children}</ProjectContext.Provider>;
}
export function useProject(){const value=useContext(ProjectContext);if(!value)throw new Error('ProjectProvider required');return value;}
export function getCountdown(deadline:number,now:number){const seconds=Math.max(0,Math.floor((deadline-now)/1000));return {hours:Math.floor(seconds/3600),minutes:Math.floor(seconds%3600/60),seconds:seconds%60};}
export function completion(tasks:Task[]){return tasks.length ? Math.round(tasks.filter(t=>t.status==='Done').length/tasks.length*100):0;}

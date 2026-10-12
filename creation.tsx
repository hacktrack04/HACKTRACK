import { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { ArrowLeft, ArrowRight, Plus, Users, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProject } from './project';
import { inviteEmailSchema, projectSchema, teamSchema, techTagSchema } from './creation-schema';

type Errors = {name?:string | undefined; problemStatement?:string | undefined; deadline?:string | undefined; techStack?:string | undefined; invitations?:string | undefined; [key:string]:string | undefined};
function ErrorText({id,message}:{id:string;message:string | undefined}) {
  return message ? <p id={id} role="alert" className="form-error">{message}</p> : null;
}

export function CreateProjectView() {
  const { createProject } = useProject();
  const navigate = useNavigate();
  const [name,setName] = useState('');
  const [problemStatement,setProblemStatement] = useState('');
  const [deadline,setDeadline] = useState('');
  const [techStack,setTechStack] = useState<string[]>([]);
  const [tag,setTag] = useState('');
  const [errors,setErrors] = useState<Errors>({});
  function addTag() {
    const result = techTagSchema.safeParse(tag);
    if (!result.success) { setErrors(prev=>({...prev,techStack:result.error.issues[0]?.message})); return; }
    if (techStack.length >= 12) { setErrors(prev=>({...prev,techStack:'Add up to 12 tech stack tags.'})); return; }
    if (techStack.some(value=>value.toLowerCase()===result.data.toLowerCase())) { setErrors(prev=>({...prev,techStack:'This tag has already been added.'})); return; }
    setTechStack(prev=>[...prev,result.data]); setTag(''); setErrors(prev=>({...prev,techStack:undefined}));
  }
  return <main className="page"><div className="creation-heading"><Button variant="link" className="px-0" asChild><Link to="/"><ArrowLeft/>Dashboard</Link></Button><h1>Create Project</h1></div>
    <form noValidate className="creation-form" onSubmit={event=>{
      event.preventDefault();
      const pendingTag = tag.trim();
      const result = projectSchema.safeParse({name,problemStatement,deadline,techStack:pendingTag ? [...techStack,pendingTag] : techStack});
      if (!result.success) { const next:Errors={}; for (const issue of result.error.issues) { const key=String(issue.path[0]); if (!next[key]) next[key]=issue.message; } setErrors(next); return; }
      createProject(result.data); void navigate({to:'/'});
    }}>
      <label className="form-label" htmlFor="project-name">Project name<input id="project-name" className="form-input" required maxLength={100} value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. LaunchPad" aria-invalid={Boolean(errors.name)} aria-describedby="name-error"/><ErrorText id="name-error" message={errors.name}/></label>
      <label className="form-label" htmlFor="problem-statement">Problem statement <span className="text-muted-foreground">Required</span><textarea id="problem-statement" className="form-input" rows={5} required maxLength={2000} value={problemStatement} onChange={e=>setProblemStatement(e.target.value)} placeholder="What problem is your team solving?" aria-invalid={Boolean(errors.problemStatement)} aria-describedby="problem-error"/><ErrorText id="problem-error" message={errors.problemStatement}/></label>
      <label className="form-label" htmlFor="project-deadline">Deadline date-time<input id="project-deadline" type="datetime-local" className="form-input" required value={deadline} onChange={e=>setDeadline(e.target.value)} aria-invalid={Boolean(errors.deadline)} aria-describedby="deadline-error"/><span className="text-muted-foreground text-xs">Your local time</span><ErrorText id="deadline-error" message={errors.deadline}/></label>
      <div><label className="form-label" htmlFor="tech-stack">Tech stack tags</label><div className="creation-input-row mt-2"><input id="tech-stack" className="form-input" maxLength={40} value={tag} onChange={e=>setTag(e.target.value)} placeholder="e.g. React" aria-invalid={Boolean(errors.techStack)} aria-describedby="tags-error" onKeyDown={e=>{if(e.key==='Enter'){e.preventDefault();addTag();}}}/><Button type="button" variant="outline" size="icon" aria-label="Add tech stack tag" title="Add tag" onClick={addTag}><Plus/></Button></div><ErrorText id="tags-error" message={errors.techStack}/><div className="creation-tags">{techStack.map(value=><span className="chip primary" key={value}>{value}<Button type="button" variant="ghost" size="icon" className="tag-remove" title={`Remove ${value}`} aria-label={`Remove ${value}`} onClick={()=>setTechStack(prev=>prev.filter(item=>item!==value))}><X size={12}/></Button></span>)}</div></div>
      <div className="creation-actions"><Button type="button" variant="outline" asChild><Link to="/">Cancel</Link></Button><Button type="submit">Create project<ArrowRight/></Button></div>
    </form></main>;
}

export function CreateTeamView() {
  const {createTeam} = useProject(); const navigate=useNavigate();
  const [name,setName]=useState(''); const [email,setEmail]=useState(''); const [invitations,setInvitations]=useState<string[]>([]); const [errors,setErrors]=useState<Errors>({});
  function addInvite() {
    const result=inviteEmailSchema.safeParse(email);
    if (!result.success) {setErrors(prev=>({...prev,invitations:result.error.issues[0]?.message}));return;}
    const next=teamSchema.shape.invitations.safeParse([...invitations,result.data]);
    if (!next.success) {setErrors(prev=>({...prev,invitations:next.error.issues[0]?.message}));return;}
    setInvitations(next.data);setEmail('');setErrors(prev=>({...prev,invitations:undefined}));
  }
  return <main className="page"><div className="creation-heading"><Button variant="link" className="px-0" asChild><Link to="/team"><ArrowLeft/>Team</Link></Button><h1>Create Team</h1></div><form noValidate className="creation-form" onSubmit={event=>{
    event.preventDefault();const result=teamSchema.safeParse({name,invitations:email.trim() ? [...invitations,email.trim()] : invitations});
    if (!result.success) {const next:Errors={};for(const issue of result.error.issues){const key=String(issue.path[0]);if(!next[key])next[key]=issue.message;}setErrors(next);return;}
    createTeam(result.data);void navigate({to:'/'});
  }}><label className="form-label" htmlFor="team-name">Team name<input id="team-name" className="form-input" required maxLength={100} value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. The Builders" aria-invalid={Boolean(errors.name)} aria-describedby="team-name-error"/><ErrorText id="team-name-error" message={errors.name}/></label>
    <div><label className="form-label" htmlFor="invite-email">Invite member by email</label><div className="creation-input-row mt-2"><input id="invite-email" type="email" maxLength={255} className="form-input" value={email} onChange={e=>setEmail(e.target.value)} placeholder="teammate@example.com" aria-invalid={Boolean(errors.invitations)} aria-describedby="invite-error" onKeyDown={e=>{if(e.key==='Enter'){e.preventDefault();addInvite();}}}/><Button type="button" variant="outline" size="icon" title="Add member" aria-label="Add member email" onClick={addInvite}><Plus/></Button></div><ErrorText id="invite-error" message={errors.invitations}/><p className="text-xs text-muted-foreground mt-2">Demo invitations only — no emails will be sent.</p><ul className="mt-4 divide-y divide-border">{invitations.map(value=><li className="invite-row" key={value}><Users size={16} className="text-primary"/><span>{value}</span><Button type="button" variant="ghost" size="icon" title={`Remove ${value}`} aria-label={`Remove ${value}`} onClick={()=>setInvitations(prev=>prev.filter(item=>item!==value))}><X/></Button></li>)}</ul></div>
    <div className="creation-actions"><Button variant="outline" type="button" asChild><Link to="/team">Cancel</Link></Button><Button type="submit">Create team<ArrowRight/></Button></div>
  </form></main>;
}
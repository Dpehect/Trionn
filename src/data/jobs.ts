export type Job = {
  hiringStatus: "Talent network";
  slug: string; title: string; discipline: string; location: string; type: string;
  summary: string; responsibilities: string[]; requirements: string[];
};
export const jobs: Job[] = [
 {hiringStatus:'Talent network',slug:'senior-full-stack-engineer',title:'Senior Full-Stack Engineer',discipline:'Engineering',location:'Helsinki / Remote EU',type:'Full-time',summary:'Own product architecture and ship refined web platforms with a small senior team.',responsibilities:['Lead Next.js and TypeScript product delivery','Design resilient APIs and data models','Review implementation quality and mentor teammates'],requirements:['Strong React and TypeScript experience','Production backend and cloud experience','Clear written English and product judgement']},
 {hiringStatus:'Talent network',slug:'product-designer',title:'Product Designer',discipline:'Design',location:'Helsinki / Hybrid',type:'Full-time',summary:'Turn complex software into clear, distinctive and accessible product experiences.',responsibilities:['Shape flows from discovery to polished UI','Build coherent design systems','Prototype and validate interaction concepts'],requirements:['Strong product design portfolio','Figma and prototyping fluency','Comfort collaborating directly with engineers']},
 {hiringStatus:'Talent network',slug:'ai-automation-engineer',title:'AI Automation Engineer',discipline:'AI Systems',location:'Remote EU',type:'Contract / Full-time',summary:'Build dependable AI agents, workflow automations and human-in-the-loop systems.',responsibilities:['Implement LLM workflows and tool integrations','Evaluate reliability, latency and cost','Connect agents to real business systems'],requirements:['Python or TypeScript backend experience','Knowledge of LLM evaluation and retrieval','Security-minded integration experience']}
];
export const getJob=(slug:string)=>jobs.find((job)=>job.slug===slug);

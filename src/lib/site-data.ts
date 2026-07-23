export const navigation = [
  { label: "Index", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const loaderTokens = ["INITIALIZING", "MOTION", "TYPOGRAPHY", "CANVAS", "INTERFACE", "READY"] as const;

export type Project = {
  slug: string; title: string; client: string; year: string; discipline: string;
  ratio: "portrait" | "landscape" | "square" | "wide"; palette: [string,string,string]; index: string;
  summary: string; role: string; services: string[]; challenge: string; solution: string;
};

export const projects: Project[] = [
  { slug:"softbridge",title:"Softbridge",client:"Digital Product Studio",year:"2026",discipline:"Direction / Development",ratio:"portrait",palette:["#ff6738","#f5d8c8","#1a1a1a"],index:"01",summary:"A modular identity and cinematic portfolio for an independent digital product studio.",role:"Creative developer",services:["Art direction","Interface design","Motion system","Front-end development"],challenge:"Turn a broad service offering into a focused experience without relying on conventional agency patterns.",solution:"A disciplined editorial grid, large typography and a compact motion language create a clear, memorable rhythm." },
  { slug:"seam",title:"Seam Archive",client:"Editorial Commerce",year:"2026",discipline:"Web Design / Motion",ratio:"landscape",palette:["#d6ddc4","#273c2e","#efe8da"],index:"02",summary:"An editorial storefront where product discovery behaves like browsing a living archive.",role:"Design and build",services:["Experience design","Commerce UI","Motion direction"],challenge:"Balance storytelling with a frictionless purchase path.",solution:"Flexible product chapters, restrained transitions and persistent commerce controls preserve both atmosphere and utility." },
  { slug:"atlas",title:"Atlas Objects",client:"Independent Furniture",year:"2025",discipline:"Creative Development",ratio:"square",palette:["#2450c6","#e6ca51","#ece9df"],index:"03",summary:"A spatial catalogue for sculptural furniture and limited-edition objects.",role:"Creative development",services:["WebGL concept","Interaction","Front-end"],challenge:"Represent scale and tactility through a flat screen.",solution:"Layered compositions, calibrated depth and material-led transitions make every object feel physical." },
  { slug:"forma",title:"Forma No. 4",client:"Architecture Practice",year:"2025",discipline:"Identity / Interaction",ratio:"portrait",palette:["#b83b33","#e4d4b5","#26231e"],index:"04",summary:"A systematic portfolio for an architecture practice working across interiors and public space.",role:"Design engineer",services:["Digital identity","Editorial system","Development"],challenge:"Make dense project information legible without losing visual confidence.",solution:"A strict information hierarchy and asymmetric image rhythm let technical content remain calm and accessible." },
  { slug:"nadir",title:"Nadir Studio",client:"Fashion Direction",year:"2025",discipline:"WebGL / Development",ratio:"wide",palette:["#7c6cff","#e7e2f4","#17151d"],index:"05",summary:"A seasonal digital runway built around movement, texture and controlled interruption.",role:"Creative developer",services:["Motion design","WebGL","Performance engineering"],challenge:"Create a high-impact fashion experience that still performs on mobile hardware.",solution:"Selective WebGL, compressed media and DOM-first motion deliver atmosphere without an unnecessarily heavy scene." },
  { slug:"field",title:"Field Notes",client:"Cultural Platform",year:"2024",discipline:"Editorial / Build",ratio:"landscape",palette:["#ee493d","#1e5272","#f0e9d7"],index:"06",summary:"A publishing platform connecting essays, visual research and cultural programming.",role:"Product designer",services:["Editorial UX","Design system","Development"],challenge:"Support long-form reading while keeping discovery playful.",solution:"A typographic index, contextual links and flexible story templates produce a connected reading environment." },
];

export function reportWebVitals(metric:{name:string;value:number;id:string}) {
  if(process.env.NODE_ENV!=="production") return;
  const body=JSON.stringify(metric);
  if(navigator.sendBeacon) navigator.sendBeacon("/api/vitals",body);
}

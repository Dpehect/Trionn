type Level="info"|"warn"|"error";

export function log(level:Level,event:string,context:Record<string,unknown>={}) {
  const payload={level,event,context,timestamp:new Date().toISOString()};
  if(level==="error") console.error(JSON.stringify(payload));
  else if(level==="warn") console.warn(JSON.stringify(payload));
  else console.info(JSON.stringify(payload));
}

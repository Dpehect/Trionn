"use client";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Plus, Trash2 } from "lucide-react";
import type { EditableBlock } from "@/lib/case-study-block-schema";

function Item({block,onRemove}:{block:EditableBlock;onRemove:(id:string)=>void}) {
  const {attributes,listeners,setNodeRef,transform,transition}=useSortable({id:block.id});
  return <article ref={setNodeRef} style={{transform:CSS.Transform.toString(transform),transition}} className="border hairline bg-[var(--surface-raised)] p-5">
    <div className="flex items-center justify-between">
      <button type="button" {...attributes} {...listeners} aria-label="Drag block"><GripVertical/></button>
      <span className="eyebrow">{block.type}</span>
      <button type="button" onClick={()=>onRemove(block.id)} aria-label="Remove block"><Trash2 size={17}/></button>
    </div>
    <pre className="mt-5 overflow-auto text-xs text-[var(--text-secondary)]">{JSON.stringify(block,null,2)}</pre>
  </article>;
}

export function BlockEditor({value,onChange}:{value:EditableBlock[];onChange:(v:EditableBlock[])=>void}) {
  function add(type:EditableBlock["type"]) {
    const id=crypto.randomUUID();
    const block:EditableBlock =
      type==="text" ? {id,type,eyebrow:"Context",title:"New section",body:"Describe this chapter."} :
      type==="media" ? {id,type,mediaId:null,title:"Media",ratio:"16/9"} :
      type==="metric" ? {id,type,items:[{label:"Metric",value:"0"}]} :
      {id,type,quote:"Quote",attribution:"Client"};
    onChange([...value,block]);
  }

  return <section className="grid gap-5">
    <div className="flex flex-wrap gap-2">
      {(["text","media","metric","quote"] as const).map(type=>
        <button key={type} type="button" onClick={()=>add(type)} className="btn-secondary"><Plus size={15}/>{type}</button>
      )}
    </div>
    <DndContext collisionDetection={closestCenter} onDragEnd={({active,over})=>{
      if(!over||active.id===over.id)return;
      const oldIndex=value.findIndex(x=>x.id===active.id);
      const newIndex=value.findIndex(x=>x.id===over.id);
      onChange(arrayMove(value,oldIndex,newIndex));
    }}>
      <SortableContext items={value.map(x=>x.id)} strategy={verticalListSortingStrategy}>
        <div className="grid gap-4">{value.map(block=><Item key={block.id} block={block} onRemove={id=>onChange(value.filter(x=>x.id!==id))}/>)}</div>
      </SortableContext>
    </DndContext>
  </section>;
}

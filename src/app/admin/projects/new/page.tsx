import { ProjectEditor } from "@/components/admin/project-editor";

export default function NewProjectPage() {
  return (
    <div>
      <p className="eyebrow">Create</p>
      <h1 className="display-lg mt-6">NEW PROJECT</h1>
      <div className="mt-10">
        <ProjectEditor />
      </div>
    </div>
  );
}

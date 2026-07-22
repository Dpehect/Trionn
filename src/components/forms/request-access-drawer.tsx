"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpRight, CheckCircle2, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Drawer } from "vaul";
import { z } from "zod";
import { useProductStore } from "@/store/use-product-store";

const requestSchema = z.object({
  name: z.string().min(2, "Enter your name."),
  email: z.string().email("Enter a valid work email."),
  company: z.string().min(2, "Enter your company or team."),
  teamSize: z.string().min(1, "Choose a team size."),
  goal: z.string().min(12, "Tell us a little more about the product."),
});

type RequestValues = z.infer<typeof requestSchema>;

export function RequestAccessDrawer() {
  const open = useProductStore((state) => state.requestOpen);
  const setOpen = useProductStore((state) => state.setRequestOpen);
  const form = useForm<RequestValues>({
    resolver: zodResolver(requestSchema),
    defaultValues: { name: "", email: "", company: "", teamSize: "", goal: "" },
  });

  const submit = (values: RequestValues) => {
    toast.success("Workspace request received", {
      description: `${values.company} has been added to the private beta review queue.`,
      icon: <CheckCircle2 size={18} />,
    });
    form.reset();
    setOpen(false);
  };

  return (
    <Drawer.Root direction="right" open={open} onOpenChange={setOpen}>
      <Drawer.Portal>
        <Drawer.Overlay className="drawer-overlay" />
        <Drawer.Content className="request-drawer" aria-describedby="request-description">
          <div className="drawer-head">
            <div>
              <span>PRIVATE BETA / 2026</span>
              <Drawer.Title>Request a Trionn workspace.</Drawer.Title>
            </div>
            <Drawer.Close className="drawer-close" aria-label="Close request form"><X size={20} /></Drawer.Close>
          </div>
          <Drawer.Description id="request-description">
            Tell us what you are building. We review each workspace for product fit, collaboration scope and beta availability.
          </Drawer.Description>

          <form className="request-form" onSubmit={form.handleSubmit(submit)} noValidate>
            <label>
              <span>Name</span>
              <input {...form.register("name")} placeholder="Your name" />
              {form.formState.errors.name && <small>{form.formState.errors.name.message}</small>}
            </label>
            <label>
              <span>Work email</span>
              <input type="email" {...form.register("email")} placeholder="you@company.com" />
              {form.formState.errors.email && <small>{form.formState.errors.email.message}</small>}
            </label>
            <label>
              <span>Company / team</span>
              <input {...form.register("company")} placeholder="Company or product team" />
              {form.formState.errors.company && <small>{form.formState.errors.company.message}</small>}
            </label>
            <label>
              <span>Product team size</span>
              <select {...form.register("teamSize")} defaultValue="">
                <option value="" disabled>Select team size</option>
                <option value="1-5">1–5</option>
                <option value="6-15">6–15</option>
                <option value="16-40">16–40</option>
                <option value="40+">40+</option>
              </select>
              {form.formState.errors.teamSize && <small>{form.formState.errors.teamSize.message}</small>}
            </label>
            <label>
              <span>What are you trying to ship?</span>
              <textarea {...form.register("goal")} placeholder="Describe the product, current workflow and launch horizon." />
              {form.formState.errors.goal && <small>{form.formState.errors.goal.message}</small>}
            </label>
            <button className="button button-primary drawer-submit" type="submit" disabled={form.formState.isSubmitting}>
              Send request <ArrowUpRight size={17} />
            </button>
          </form>
          <p className="drawer-note">No credit card. No automated sales sequence. Your request goes to a real product review.</p>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

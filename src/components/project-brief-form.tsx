"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  projectBriefSchema,
  type ProjectBriefInput,
} from "@/lib/project-brief-schema";
import { toast, Toaster } from "sonner";
import { ArrowLeft, ArrowRight } from "lucide-react";

const serviceOptions = [
  "Strategy",
  "Experience design",
  "Motion",
  "Creative development",
  "WebGL",
  "Product engineering",
];

const steps = [
  "Identity",
  "Project",
  "Scope",
  "Details",
  "Review",
];

export function ProjectBriefForm() {
  const [step, setStep] = useState(0);
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<ProjectBriefInput>({
    resolver: zodResolver(projectBriefSchema),
    defaultValues: { services: [], honeypot: "" },
  });

  const values = watch();
  const selectedServices = values.services ?? [];

  const fieldsByStep = useMemo(
    () => [
      ["name", "email", "company"],
      ["projectType", "website"],
      ["budget", "timeline", "services"],
      ["message"],
      [],
    ] as const,
    []
  );

  async function next() {
    const valid = await trigger(fieldsByStep[step] as any);
    if (valid) setStep((current) => Math.min(current + 1, steps.length - 1));
  }

  function toggleService(service: string) {
    const next = selectedServices.includes(service)
      ? selectedServices.filter((item) => item !== service)
      : [...selectedServices, service];
    setValue("services", next, { shouldValidate: true });
  }

  async function onSubmit(data: ProjectBriefInput) {
    const response = await fetch("/api/briefs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      toast.error("Your brief could not be sent.");
      return;
    }

    setSent(true);
    toast.success("Project brief received.");
  }

  if (sent) {
    return (
      <div className="border hairline p-8 md:p-12">
        <p className="eyebrow">Brief received</p>
        <h2 className="display-lg mt-6">THANK YOU.</h2>
        <p className="body-lg text-muted mt-8 max-w-xl">
          We will review the scope and respond with a clear next step.
        </p>
      </div>
    );
  }

  return (
    <>
      <Toaster theme="dark" />
      <form onSubmit={handleSubmit(onSubmit)} className="border hairline p-6 md:p-10">
        <div className="flex items-center justify-between border-b hairline pb-5">
          <p className="eyebrow">
            Step {step + 1} / {steps.length}
          </p>
          <p className="eyebrow">{steps[step]}</p>
        </div>

        <input
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          {...register("honeypot")}
        />

        <div className="min-h-[28rem] py-10">
          {step === 0 && (
            <div className="grid gap-6">
              <input className="border-b hairline bg-transparent py-4 outline-none" placeholder="Your name" {...register("name")} />
              <input className="border-b hairline bg-transparent py-4 outline-none" placeholder="Email" type="email" {...register("email")} />
              <input className="border-b hairline bg-transparent py-4 outline-none" placeholder="Company" {...register("company")} />
              {(errors.name || errors.email || errors.company) && (
                <p className="text-sm text-[var(--status-error)]">Complete the required identity fields.</p>
              )}
            </div>
          )}

          {step === 1 && (
            <div className="grid gap-8">
              <div>
                <p className="eyebrow">Project type</p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {["Brand platform", "Product experience", "Campaign", "Commerce", "Other"].map((item) => (
                    <label key={item} className="flex cursor-pointer items-center gap-3 border hairline p-4">
                      <input type="radio" value={item} {...register("projectType")} />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
              </div>
              <input className="border-b hairline bg-transparent py-4 outline-none" placeholder="Current website (optional)" {...register("website")} />
            </div>
          )}

          {step === 2 && (
            <div className="grid gap-10">
              <div>
                <p className="eyebrow">Budget</p>
                <select className="mt-4 w-full border-b hairline bg-transparent py-4 outline-none" defaultValue="" {...register("budget")}>
                  <option value="" disabled>Select budget</option>
                  <option value="10-25k">10–25k</option>
                  <option value="25-50k">25–50k</option>
                  <option value="50-100k">50–100k</option>
                  <option value="100k+">100k+</option>
                </select>
              </div>

              <div>
                <p className="eyebrow">Timeline</p>
                <select className="mt-4 w-full border-b hairline bg-transparent py-4 outline-none" defaultValue="" {...register("timeline")}>
                  <option value="" disabled>Select timeline</option>
                  <option value="ASAP">ASAP</option>
                  <option value="1-3 months">1–3 months</option>
                  <option value="3-6 months">3–6 months</option>
                  <option value="Flexible">Flexible</option>
                </select>
              </div>

              <div>
                <p className="eyebrow">Services</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {serviceOptions.map((service) => (
                    <button
                      type="button"
                      key={service}
                      onClick={() => toggleService(service)}
                      className={
                        selectedServices.includes(service)
                          ? "rounded-full bg-[var(--accent-primary)] px-4 py-3 text-xs uppercase tracking-[.13em] text-black"
                          : "rounded-full border hairline px-4 py-3 text-xs uppercase tracking-[.13em]"
                      }
                    >
                      {service}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <p className="eyebrow">The challenge</p>
              <textarea
                className="mt-5 min-h-72 w-full border hairline bg-transparent p-5 outline-none"
                placeholder="What must change, what does success mean, and where is the difficult part?"
                {...register("message")}
              />
              {errors.message && <p className="mt-3 text-sm text-[var(--status-error)]">{errors.message.message}</p>}
            </div>
          )}

          {step === 4 && (
            <div>
              <p className="eyebrow">Review</p>
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <div><span className="eyebrow">Name</span><p className="mt-2">{values.name}</p></div>
                <div><span className="eyebrow">Company</span><p className="mt-2">{values.company}</p></div>
                <div><span className="eyebrow">Project</span><p className="mt-2">{values.projectType}</p></div>
                <div><span className="eyebrow">Budget</span><p className="mt-2">{values.budget}</p></div>
                <div className="md:col-span-2"><span className="eyebrow">Services</span><p className="mt-2">{selectedServices.join(" · ")}</p></div>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-t hairline pt-5">
          <button
            type="button"
            disabled={step === 0}
            onClick={() => setStep((current) => Math.max(0, current - 1))}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[.14em] disabled:opacity-30"
          >
            <ArrowLeft size={15} /> Back
          </button>

          {step < steps.length - 1 ? (
            <button type="button" onClick={next} className="btn-primary">
              Continue <ArrowRight size={15} />
            </button>
          ) : (
            <button disabled={isSubmitting} className="btn-primary">
              {isSubmitting ? "Sending…" : "Send brief"}
            </button>
          )}
        </div>
      </form>
    </>
  );
}

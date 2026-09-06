import { useState, type FormEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { apiPost } from "@/lib/api";
import { LOAN_TYPES, type Enquiry, type EnquiryCreate } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type FormMode = "application" | "contact";

interface FormState {
  full_name: string;
  mobile: string;
  email: string;
  city: string;
  loan_type: string;
  loan_amount: string;
  employment_type: string;
  message: string;
}

const initialState: FormState = { full_name: "", mobile: "", email: "", city: "", loan_type: "", loan_amount: "", employment_type: "", message: "" };

export default function EnquiryForm({ mode = "application" }: { mode?: FormMode }) {
  const [form, setForm] = useState<FormState>(initialState);
  const queryClient = useQueryClient();
  const isContact = mode === "contact";
  const prefix = isContact ? "contact" : "loan-application";
  const mutation = useMutation({
    mutationFn: (payload: EnquiryCreate) => apiPost<Enquiry>("/enquiries", payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enquiries"] });
      setForm(initialState);
      toast.success(isContact ? "Thanks — our team will get back to you shortly." : "Application received — an advisor will call you soon.");
    },
    onError: () => toast.error("We could not submit this right now. Please call us on +91 8558900022."),
  });

  const update = (field: keyof FormState, value: string) => setForm((current) => ({ ...current, [field]: value }));
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload: EnquiryCreate = {
      kind: isContact ? "contact" : "loan_application",
      full_name: form.full_name,
      mobile: form.mobile,
      email: form.email,
      city: form.city,
      message: form.message || undefined,
      ...(isContact ? {} : { loan_type: form.loan_type, loan_amount: Number(form.loan_amount), employment_type: form.employment_type }),
    };
    mutation.mutate(payload);
  };

  return <Card className="overflow-hidden border-slate-200/80 bg-white shadow-xl shadow-sky-900/5" data-testid={`${prefix}-form-card`}><CardContent className="p-6 sm:p-8"><div className="mb-7 flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600" data-testid={`${prefix}-form-eyebrow`}>{isContact ? "We are listening" : "Start your journey"}</p><h2 className="mt-2 font-heading text-2xl font-bold text-slate-900" data-testid={`${prefix}-form-title`}>{isContact ? "Send us an enquiry" : "Tell us what you need"}</h2></div><span className="hidden rounded-full bg-emerald-50 p-3 text-emerald-600 sm:block" data-testid={`${prefix}-form-icon`}><CheckCircle2 className="size-5" /></span></div><form onSubmit={submit} className="space-y-5" data-testid={`${prefix}-form`}>
    <div className="grid gap-5 sm:grid-cols-2"><Field label="Full name" id={`${prefix}-full-name`} value={form.full_name} onChange={(value) => update("full_name", value)} required placeholder="Your full name" /><Field label="Mobile number" id={`${prefix}-mobile`} type="tel" value={form.mobile} onChange={(value) => update("mobile", value)} required placeholder="10-digit mobile number" /></div>
    <div className="grid gap-5 sm:grid-cols-2"><Field label="Email address" id={`${prefix}-email`} type="email" value={form.email} onChange={(value) => update("email", value)} required placeholder="you@example.com" /><Field label="City / location" id={`${prefix}-city`} value={form.city} onChange={(value) => update("city", value)} required placeholder="Ferozepur City" /></div>
    {!isContact && <><div className="grid gap-5 sm:grid-cols-2"><SelectField label="Loan type" id={`${prefix}-loan-type`} value={form.loan_type} onChange={(value) => update("loan_type", value)} options={LOAN_TYPES} required placeholder="Select a loan" /><Field label="Required amount (₹)" id={`${prefix}-loan-amount`} type="number" value={form.loan_amount} onChange={(value) => update("loan_amount", value)} required placeholder="e.g. 500000" /></div><SelectField label="Employment / business type" id={`${prefix}-employment-type`} value={form.employment_type} onChange={(value) => update("employment_type", value)} options={["Salaried Employee", "Self-Employed Professional", "Business Owner / MSME", "Farmer / Agricultural", "Other"]} required placeholder="Choose one" /></>}
    <div><label htmlFor={`${prefix}-message`} className="mb-2 block text-sm font-semibold text-slate-700" data-testid={`${prefix}-message-label`}>{isContact ? "How can we help?" : "Additional notes (optional)"}</label><Textarea id={`${prefix}-message`} value={form.message} onChange={(event) => update("message", event.target.value)} placeholder={isContact ? "Tell us what you would like to know..." : "Share any details that can help our advisor..."} className="min-h-28 resize-none rounded-xl border-slate-200 bg-slate-50/60 focus-visible:ring-sky-500" data-testid={`${prefix}-message-input`} /></div>
    <Button type="submit" size="lg" disabled={mutation.isPending} className="w-full rounded-xl bg-sky-600 font-bold shadow-lg shadow-sky-600/15 hover:bg-sky-700" data-testid={`${prefix}-submit-button`}>{mutation.isPending ? <><Loader2 className="mr-2 size-4 animate-spin" /> Sending securely...</> : <>{isContact ? "Send enquiry" : "Submit application"}<Send className="ml-2 size-4" /></>}</Button>
    <p className="text-center text-xs leading-5 text-slate-500" data-testid={`${prefix}-form-note`}>Your details stay confidential. A Ganesh Enterprises advisor will call you within business hours.</p>
  </form></CardContent></Card>;
}

function Field({ label, id, value, onChange, type = "text", required = false, placeholder }: { label: string; id: string; value: string; onChange: (value: string) => void; type?: string; required?: boolean; placeholder: string }) {
  return <div><label htmlFor={id} className="mb-2 block text-sm font-semibold text-slate-700" data-testid={`${id}-label`}>{label}{required && <span className="ml-1 text-sky-600">*</span>}</label><Input id={id} type={type} value={value} onChange={(event) => onChange(event.target.value)} required={required} placeholder={placeholder} className="h-11 rounded-xl border-slate-200 bg-slate-50/60 focus-visible:ring-sky-500" data-testid={`${id}-input`} /></div>;
}

function SelectField({ label, id, value, onChange, options, required, placeholder }: { label: string; id: string; value: string; onChange: (value: string) => void; options: readonly string[]; required?: boolean; placeholder: string }) {
  return <div><label htmlFor={id} className="mb-2 block text-sm font-semibold text-slate-700" data-testid={`${id}-label`}>{label}{required && <span className="ml-1 text-sky-600">*</span>}</label><select id={id} value={value} onChange={(event) => onChange(event.target.value)} required={required} className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3 text-sm text-slate-700 outline-none transition-all focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20" data-testid={`${id}-select`}><option value="" disabled>{placeholder}</option>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select></div>;
}
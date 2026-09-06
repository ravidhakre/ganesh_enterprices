import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  ["What documents are needed for a loan?", "Usually we need identity proof, address proof, income or business proof and recent bank statements. The exact list depends on your chosen loan and profile."],
  ["Can I apply with a low CIBIL score?", "Every profile is reviewed individually. Our advisors can help you understand suitable options, including secured funding and FD-backed credit solutions."],
  ["How quickly will I hear back?", "Once your enquiry is submitted, our team aims to call you within business hours. Some instant and private funding cases can move faster after document review."],
  ["Are there any hidden charges?", "We explain applicable interest, processing fees and partner terms before you proceed. You are never asked to pay for a promise of approval."],
  ["Can business owners and self-employed professionals apply?", "Yes. We work with MSMEs, shop owners, professionals, farmers and salaried applicants across Punjab and beyond."],
];

export default function FAQList() {
  const [active, setActive] = useState<number | null>(0);
  return <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white" data-testid="faq-list">{faqs.map(([question, answer], index) => <div key={question} data-testid={`faq-item-${index + 1}`}><button type="button" onClick={() => setActive(active === index ? null : index)} className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left" aria-expanded={active === index} data-testid={`faq-question-${index + 1}`}><span className="font-heading text-base font-semibold text-slate-800">{question}</span><ChevronDown className={`size-5 shrink-0 text-sky-600 transition-transform duration-300 ${active === index ? "rotate-180" : ""}`} /></button>{active === index && <div className="px-5 pb-5 pr-12 text-sm leading-7 text-slate-600" data-testid={`faq-answer-${index + 1}`}>{answer}</div>}</div>)}</div>;
}
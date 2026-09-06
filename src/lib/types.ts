export const LOAN_TYPES = [
  "Personal Loan",
  "Business Loan",
  "Instant Loan",
  "Home Loan",
  "Loan Against Property",
  "Credit Card",
  "FD Against Credit Card",
  "Private Funding",
] as const;

export type LoanType = (typeof LOAN_TYPES)[number];

export interface EnquiryCreate {
  kind: "loan_application" | "contact";
  full_name: string;
  mobile: string;
  email: string;
  city: string;
  loan_type?: string;
  loan_amount?: number;
  employment_type?: string;
  message?: string;
}

export interface Enquiry extends EnquiryCreate {
  id: string;
  created_at: string;
}

export interface LoanProduct {
  name: LoanType;
  eyebrow: string;
  description: string;
  interest: string;
  amount: string;
  tenure: string;
  icon: string;
}
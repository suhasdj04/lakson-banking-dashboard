import { useEffect, useState, type FormEvent } from 'react';
import { ArrowLeft, Check, CheckCircle2, CircleDollarSign, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import type { Product } from '@/types';
import { categoryLabel } from '@/lib/utils';

interface ApplicationDialogProps {
  product: Product | null;
  onOpenChange: (open: boolean) => void;
}

function amountLabel(product: Product): string {
  if (product.type === 'credit_card') return 'Desired credit limit';
  if (product.type === 'loan') return 'Requested loan amount';
  if (product.type === 'investment') return 'Initial investment amount';
  return 'Initial deposit amount';
}

export function ApplicationDialog({ product, onOpenChange }: ApplicationDialogProps) {
  const [submitted, setSubmitted] = useState(false);
  const [acknowledged, setAcknowledged] = useState(false);

  useEffect(() => {
    setSubmitted(false);
    setAcknowledged(false);
  }, [product?.id]);

  function submitApplication(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity() || !acknowledged) return;
    setSubmitted(true);
    toast.success('Demo application validated', { description: 'Nothing was sent to a financial institution.' });
  }

  return (
    <Dialog open={Boolean(product)} onOpenChange={onOpenChange}>
      {product && (
        <DialogContent className="max-w-lg">
          {submitted ? (
            <div className="px-6 py-9 text-center sm:px-9">
              <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-[#e5f2e9] text-[#32744d] dark:bg-[#1e3528] dark:text-[#a4d6b5]"><CheckCircle2 className="size-7" /></div>
              <Badge variant="subtle" className="mt-5">DEMO CONFIRMATION</Badge>
              <DialogTitle className="mt-3 text-2xl">Your details look good.</DialogTitle>
              <DialogDescription className="mx-auto mt-2 max-w-sm leading-6">This sample application was validated in this preview only. No account was opened and no personal information was sent or stored.</DialogDescription>
              <Button className="mt-7 w-full sm:w-auto" onClick={() => onOpenChange(false)}><Check className="size-4" /> Done</Button>
            </div>
          ) : (
            <>
              <DialogHeader className="pr-14">
                <div className="mb-3 flex size-10 items-center justify-center rounded-[14px] bg-[#eaf2ec] text-[#1f6448] dark:bg-[#20392b] dark:text-[#a9d7b8]"><CircleDollarSign className="size-5" /></div>
                <DialogTitle>Apply for a product</DialogTitle>
                <DialogDescription>Tell us a little about what you need. This is a demo form and does not submit to a bank.</DialogDescription>
              </DialogHeader>
              <form onSubmit={submitApplication} className="space-y-4 px-6 pb-7 sm:px-7">
                <div className="rounded-xl border border-line bg-muted/40 px-3.5 py-3">
                  <p className="section-eyebrow">Selected product</p><p className="mt-1 text-sm font-semibold">{product.name}</p><p className="mt-0.5 text-[11px] text-muted-foreground">{categoryLabel(product.type)}</p>
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="applicant-name" className="text-xs font-semibold">Full name <span className="text-rose-600">*</span></label>
                  <Input id="applicant-name" name="name" placeholder="e.g. Alex Smith" autoComplete="name" minLength={2} maxLength={80} required />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="applicant-email" className="text-xs font-semibold">Email address <span className="text-rose-600">*</span></label>
                  <Input id="applicant-email" name="email" type="email" placeholder="you@example.com" autoComplete="email" maxLength={120} required />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="requested-amount" className="text-xs font-semibold">{amountLabel(product)} <span className="text-rose-600">*</span></label>
                  <div className="relative"><span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">₹</span><Input id="requested-amount" name="amount" type="number" inputMode="numeric" min="1000" max="100000000" step="1000" placeholder="25,000" className="pl-8" required /></div>
                  <p className="text-[10px] text-muted-foreground">Enter a demo amount between ₹1,000 and ₹10,00,00,000.</p>
                </div>
                <label className="flex cursor-pointer items-start gap-2.5 rounded-xl border border-line p-3 text-[11px] leading-5 text-muted-foreground">
                  <input type="checkbox" checked={acknowledged} onChange={(event) => setAcknowledged(event.target.checked)} className="mt-1 size-3.5 accent-[#1d6a4a]" required />
                  <span>I understand this is a demonstration. No real application or financial transaction will be submitted.</span>
                </label>
                <p className="-mt-2 text-[10px] text-muted-foreground">Required to validate this sample application.</p>
                <div className="flex items-start gap-2 text-[10px] leading-4 text-muted-foreground"><ShieldCheck className="mt-0.5 size-3.5 shrink-0 text-emerald" />Do not enter real financial or sensitive personal information.</div>
                <div className="flex flex-col-reverse gap-2 pt-1 sm:flex-row sm:justify-between">
                  <Button type="button" variant="outline" onClick={() => onOpenChange(false)}><ArrowLeft className="size-4" /> Cancel</Button>
                  <Button type="submit">Validate demo application</Button>
                </div>
              </form>
            </>
          )}
        </DialogContent>
      )}
    </Dialog>
  );
}

import React, { useState } from 'react';
import { Copy, Check, Braces, ChevronDown } from 'lucide-react';

const samplePayload = {
  brand_name: 'Minimalist',
  campaign_title: 'Minimalist 8% Glycolic Acid Exfoliating Glow Campaign 2026',
  campaign_type: 'PAID',
  brand_instagram_url: 'https://www.instagram.com/beminimalist__',
  application_form_url: 'https://forms.gle/HWCd4DqUaEEB6ryr9',
  images: ['https://example.com/image-1.jpg'],
  compensation: {
    summary: '₹3,000 - ₹8,000',
    product_value: '₹899',
    product_provided: true,
    terms: 'Payment cleared within 15 business days',
    tiers: [
      { range: '5k to 10k', min_followers: 5000, max_followers: 10000, payout: 3000 },
      { range: '25k+', min_followers: 25000, max_followers: null, payout: 8000 },
    ],
  },
  deliverables: ['1 IG Reel', '1 IG Story'],
  ad_rights: '60 Days Digital Ad Rights',
  categories: ['Skincare', 'Beauty', 'Lifestyle'],
};

export default function PayloadPage() {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(JSON.stringify(samplePayload, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Payload Reference</h1>
          <p className="text-slate-500 text-xs font-semibold mt-1">
            Contract schema required by the Spring Boot backend ingestion pipeline.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={copy}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition shadow-sm"
          >
            {copied ? <><Check className="w-3.5 h-3.5" /> Copied</> : <><Copy className="w-3.5 h-3.5" /> Copy JSON</>}
          </button>

          <div className="flex items-center gap-2.5 pl-3 border-l border-slate-200">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-black text-xs flex items-center justify-center">
              RM
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-xs font-black text-slate-900 leading-none">Rohan Mandal</p>
              <p className="text-[11px] font-bold text-slate-400 mt-0.5">Admin</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
        <pre className="p-5 rounded-xl bg-slate-900 text-blue-200 text-xs font-mono overflow-x-auto max-h-[620px] leading-relaxed">
          {JSON.stringify(samplePayload, null, 2)}
        </pre>
      </div>
    </div>
  );
}
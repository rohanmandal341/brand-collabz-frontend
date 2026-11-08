import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, FileText, Wallet, Package, CalendarDays, Users, UserRound, MapPin } from 'lucide-react';
import SafeImg from './SafeImg';
import PaidBadge from './PaidBadge';
import { applyUrl } from '../../services/api';
// src/components/campaign/CampaignRow.jsx (Snippet)
import { trackConversion } from "../../services/analytics";

import { comp, elig, sched, payoutLabel, followersLabel, genderLabel, formatDate, initials } from '../../utils/format';

function Stat({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 min-w-0">
      <span className="w-11 h-11 shrink-0 rounded-xl bg-violet-50 text-violet-600 grid place-items-center"><Icon className="w-5 h-5" /></span>
      <div className="min-w-0">
        <p className="text-xs font-medium text-[#5d5877]">{label}</p>
        <p className="text-[15px] font-extrabold truncate">{value}</p>
      </div>
    </div>
  );
}

export default function CampaignRow({ campaign }) {
  const [i, setI] = useState(0);
  const images = campaign.images?.length ? campaign.images : [null];
  const c = comp(campaign), e = elig(campaign), s = sched(campaign);
  const notes = (campaign.importantRequirements?.length ? campaign.importantRequirements : campaign.deliverables || []).slice(0, 3);
  const locations = e.locations || [];
  const go = (d) => (ev) => { ev.preventDefault(); setI((p) => (p + d + images.length) % images.length); };
  const detail = `/campaigns/${campaign.id}`;

  return (
    <article className="card p-3 lg:p-4 grid gap-5 lg:grid-cols-[340px_1fr_330px]">
      {/* Gallery */}
      <div className="relative rounded-2xl overflow-hidden bg-violet-50 aspect-[4/3] lg:aspect-auto lg:min-h-[230px]">
        <Link to={detail} aria-label={`View ${campaign.campaignTitle}`}>
          <SafeImg src={images[i]} alt={campaign.brandName} className="absolute inset-0 w-full h-full object-cover" />
        </Link>
        {images.length > 1 && (
          <>
            <button onClick={go(-1)} aria-label="Previous image" className="absolute left-3 bottom-3 w-9 h-9 rounded-full bg-white/95 shadow grid place-items-center hover:bg-white"><ChevronLeft className="w-4 h-4" /></button>
            <button onClick={go(1)} aria-label="Next image" className="absolute right-3 bottom-3 w-9 h-9 rounded-full bg-white/95 shadow grid place-items-center hover:bg-white"><ChevronRight className="w-4 h-4" /></button>
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.slice(0, 6).map((_, k) => (
                <span key={k} className={`h-1.5 rounded-full transition-all ${k === i ? 'w-4 bg-white' : 'w-1.5 bg-white/60'}`} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Main info */}
      <div className="min-w-0 flex flex-col justify-between gap-4 lg:py-1">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-[#150f33] text-white text-sm font-extrabold grid place-items-center">{initials(campaign.brandName)}</span>
            <span className="font-bold text-[15px]">{campaign.brandName}</span>
          </div>
          <div className="mt-3 flex items-start justify-between gap-3">
            <h3 className="text-xl font-extrabold leading-snug">
              <Link to={detail} className="hover:text-violet-700 transition-colors">{campaign.campaignTitle}</Link>
            </h3>
            <PaidBadge campaign={campaign} />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-[#e7e3f2]">
          <Stat icon={Wallet} label="Payout" value={payoutLabel(campaign)} />
          <Stat icon={Package} label="Product provided" value={c.product_provided ? 'Yes' : 'No'} />
          <Stat icon={CalendarDays} label="Go live date" value={formatDate(s.go_live_date) || 'To be announced'} />
        </div>

        <div className="grid sm:grid-cols-3 gap-4 rounded-2xl border border-[#e7e3f2] bg-[#faf9fe] p-4">
          <Stat icon={Users} label="Followers" value={followersLabel(campaign)} />
          <Stat icon={UserRound} label="Gender" value={genderLabel(campaign)} />
          <Stat icon={MapPin} label="Location" value={locations.length ? locations.slice(0, 3).join(', ') : 'Pan India'} />
        </div>
      </div>

      {/* Requirements + actions */}
      <div className="rounded-2xl bg-violet-50/70 p-4 flex flex-col justify-between gap-4">
        <div>
          <h4 className="flex items-center gap-2 font-extrabold text-[15px]"><FileText className="w-4 h-4 text-violet-600" />Key requirements</h4>
          {notes.length > 0 ? (
            <ul className="mt-3 space-y-2 text-sm text-[#3d3856] leading-snug">
              {notes.map((n, k) => (
                <li key={k} className="flex gap-2.5"><span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0" /><span className="line-clamp-2">{n}</span></li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-[#5d5877]">Full brief is on the details page.</p>
          )}
        </div>
        <div className="flex gap-2">
          <Link to={detail} className="btn btn-outline flex-1">View details</Link>
<a
  href={campaign.applyProxyUrl || applyUrl(campaign.id)}
  target="_blank"
  rel="noreferrer"
  onClick={() => trackConversion(campaign.id)}
  className="btn btn-primary flex-1"
>
  Apply now <ArrowRight className="w-4 h-4" />
</a>
        </div>
      </div>
    </article>
  );
}

export function CampaignRowSkeleton() {
  return (
    <div className="card p-4 grid gap-5 lg:grid-cols-[340px_1fr_330px]">
      <div className="skeleton h-56" />
      <div className="space-y-4"><div className="skeleton h-6 w-1/3" /><div className="skeleton h-8 w-4/5" /><div className="skeleton h-16" /><div className="skeleton h-20" /></div>
      <div className="skeleton h-56" />
    </div>
  );
}

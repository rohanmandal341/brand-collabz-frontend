
import React from 'react';
import { Banknote, Package } from 'lucide-react';
import { isPaid } from '../../utils/format';

export default function PaidBadge({ campaign }) {
  const paid = isPaid(campaign);
  const Icon = paid ? Banknote : Package;

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-extrabold shadow-sm ${
      paid
        ? 'bg-[#302019] text-white'
        : 'bg-[#fff0ca] text-[#79551c]'
    }`}>
      <Icon size={12} />
      {paid ? 'Paid' : 'Barter'}
    </span>
  );
}

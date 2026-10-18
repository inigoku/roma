import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

export type AsterixIllustrationType =
  | 'romulus_remus'
  | 'senate_debate'
  | 'legion_march'
  | 'hannibal_elephant'
  | 'spartacus_revolt'
  | 'caesar_rubicon'
  | 'augustus_pax'
  | 'centurion_trophy'
  | 'roman_camp'
  | 'aqueduct_building'
  | 'roman_economy'
  | 'empire_crisis';

interface Props {
  type: AsterixIllustrationType;
  className?: string;
  caption?: string;
}

/**
 * AsterixIllustration component:
 * Renderitza les il·lustracions estil Astèrix i permet pujar o visualitzar les vinyetes originals.
 */
export const AsterixIllustration: React.FC<Props> = ({ 
  type, 
  className = 'w-full h-auto', 
  caption 
}) => {
  const [customImageUrl, setCustomImageUrl] = useState<string | null>(null);

  // Sync state whenever the illustration type changes
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`roma_comic_img_${type}`);
      setCustomImageUrl(saved || null);
    } catch {
      setCustomImageUrl(null);
    }
  }, [type]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setCustomImageUrl(result);
          try {
            localStorage.setItem(`roma_comic_img_${type}`, result);
          } catch {}
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center group relative">
      <div className={`overflow-hidden rounded-xl border-2 border-[#381617] bg-[#fbf6e9] shadow-sm relative ${className}`}>
        {customImageUrl ? (
          <img
            src={customImageUrl}
            alt={caption || type}
            className="w-full h-full object-cover rounded-lg"
            referrerPolicy="no-referrer"
          />
        ) : (
          renderIllustrationSvg(type)
        )}

        {/* Canviar / Restaurar imatge de la vinyeta */}
        <div className="absolute top-2 right-2 flex items-center gap-1.5 opacity-90 hover:opacity-100 transition-opacity z-10">
          <label className="cursor-pointer bg-[#240a0c]/85 hover:bg-[#381215] text-[#f7d984] border border-[#d4af37]/50 px-2 py-0.5 rounded text-[10px] font-mono font-medium flex items-center gap-1 backdrop-blur-xs shadow-sm">
            <span>📷 Imatge</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
          {customImageUrl && (
            <button
              onClick={() => {
                setCustomImageUrl(null);
                try {
                  localStorage.removeItem(`roma_comic_img_${type}`);
                  localStorage.removeItem(`roma_nanobanana_${type}`);
                } catch {}
              }}
              className="bg-black/75 hover:bg-black text-amber-200 hover:text-white px-2 py-0.5 rounded text-[10px] font-mono flex items-center gap-1 backdrop-blur-xs transition-colors shadow-sm"
              title="Restaurar còmic per defecte"
            >
              <RefreshCw className="w-3 h-3 text-amber-300" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {caption && (
        <span className="font-comic font-serif italic text-[11px] text-[#6d5143] mt-1.5 text-center font-medium">
          « {caption} »
        </span>
      )}
    </div>
  );
};

function renderIllustrationSvg(type: AsterixIllustrationType) {
  switch (type) {
    case 'romulus_remus':
      return (
        <svg viewBox="0 0 400 240" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="sky1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#87ceeb" />
              <stop offset="100%" stopColor="#e0f4ff" />
            </linearGradient>
            <linearGradient id="hill" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#7dbd42" />
              <stop offset="100%" stopColor="#4f8524" />
            </linearGradient>
          </defs>

          {/* Sky and sun */}
          <rect width="400" height="240" fill="url(#sky1)" />
          <circle cx="340" cy="50" r="28" fill="#ffd13b" stroke="#1d1d1d" strokeWidth="2.5" />
          {/* Comic sunbeams */}
          <path d="M340 12 L340 4 M340 88 L340 96 M302 50 L294 50 M378 50 L386 50 M315 25 L308 18 M365 75 L372 82 M315 75 L308 82 M365 25 L372 18" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />

          {/* Palatine Hill and Tiber River */}
          <path d="M-10 180 Q100 130 240 155 Q330 140 410 170 L410 250 L-10 250 Z" fill="url(#hill)" stroke="#222" strokeWidth="3" />
          <path d="M-10 215 Q140 195 260 210 Q340 220 410 210 L410 240 L-10 240 Z" fill="#4fa4c8" stroke="#1d4354" strokeWidth="2.5" />

          {/* Little Roman thatched hut on Palatine */}
          <polygon points="50,135 75,105 100,135" fill="#c7924e" stroke="#222" strokeWidth="2.5" />
          <rect x="58" y="135" width="34" height="25" fill="#f0dbb9" stroke="#222" strokeWidth="2" />
          <rect x="70" y="145" width="10" height="15" fill="#693b16" stroke="#222" strokeWidth="1.5" />

          {/* Luperca the Comic She-Wolf */}
          <g transform="translate(160, 105)">
            {/* Tail */}
            <path d="M-15 45 Q-30 30 -25 15" stroke="#4a3e3d" strokeWidth="8" strokeLinecap="round" fill="none" />
            {/* Body */}
            <ellipse cx="40" cy="40" rx="45" ry="26" fill="#756763" stroke="#222" strokeWidth="3" />
            {/* Legs */}
            <rect x="10" y="55" width="10" height="28" rx="4" fill="#5c504d" stroke="#222" strokeWidth="2.5" />
            <rect x="25" y="52" width="10" height="30" rx="4" fill="#756763" stroke="#222" strokeWidth="2.5" />
            <rect x="55" y="55" width="10" height="28" rx="4" fill="#5c504d" stroke="#222" strokeWidth="2.5" />
            <rect x="70" y="52" width="10" height="30" rx="4" fill="#756763" stroke="#222" strokeWidth="2.5" />
            {/* Wolf Head with big comic expression */}
            <ellipse cx="85" cy="22" rx="20" ry="18" fill="#756763" stroke="#222" strokeWidth="3" />
            {/* Wolf snout */}
            <ellipse cx="102" cy="26" rx="14" ry="10" fill="#8f7e7a" stroke="#222" strokeWidth="2.5" />
            <circle cx="112" cy="23" r="4.5" fill="#111" />
            {/* Wolf ears */}
            <polygon points="76,8 84,-5 90,8" fill="#5c504d" stroke="#222" strokeWidth="2.5" />
            <polygon points="90,8 96,-5 102,8" fill="#5c504d" stroke="#222" strokeWidth="2.5" />
            {/* Friendly smiling comic wolf eye */}
            <circle cx="86" cy="16" r="4.5" fill="#fff" stroke="#111" strokeWidth="1.5" />
            <circle cx="88" cy="16" r="2.5" fill="#111" />
            {/* Proud wolf smile */}
            <path d="M96 30 Q104 36 100 40" stroke="#222" strokeWidth="2" fill="none" />
          </g>

          {/* Baby Romulus & Remus drinking milk (Asterix style babies with chubby cheeks) */}
          <g transform="translate(195, 155)">
            {/* Baby 1 (Romulus with tiny wooden sword!) */}
            <circle cx="0" cy="0" r="11" fill="#fed7aa" stroke="#222" strokeWidth="2" />
            <circle cx="-3" cy="-2" r="2" fill="#111" />
            <circle cx="3" cy="-2" r="2" fill="#111" />
            <ellipse cx="0" cy="1" rx="3.5" ry="2.5" fill="#fca5a5" stroke="#222" strokeWidth="1" />
            <path d="M-4 5 Q0 9 4 5" stroke="#222" strokeWidth="1.5" fill="none" />
            {/* Baby body */}
            <ellipse cx="0" cy="14" rx="10" ry="8" fill="#fed7aa" stroke="#222" strokeWidth="2" />
            <path d="M-8 8 L-14 16 L-10 18" stroke="#fed7aa" strokeWidth="5" strokeLinecap="round" />
            {/* Mini Roman helmet on baby */}
            <ellipse cx="0" cy="-9" rx="12" ry="5" fill="#d97706" stroke="#222" strokeWidth="2" />
            <path d="M-2 -18 L0 -9 L2 -18" stroke="#dc2626" strokeWidth="4" strokeLinecap="round" />

            {/* Baby 2 (Remus) */}
            <g transform="translate(28, 2)">
              <circle cx="0" cy="0" r="11" fill="#fed7aa" stroke="#222" strokeWidth="2" />
              <circle cx="-3" cy="-2" r="2" fill="#111" />
              <circle cx="3" cy="-2" r="2" fill="#111" />
              <ellipse cx="0" cy="1" rx="3.5" ry="2.5" fill="#fca5a5" stroke="#222" strokeWidth="1" />
              <path d="M-4 5 Q0 9 4 5" stroke="#222" strokeWidth="1.5" fill="none" />
              <ellipse cx="0" cy="14" rx="10" ry="8" fill="#fed7aa" stroke="#222" strokeWidth="2" />
            </g>
          </g>

          {/* Speech bubble comic Asterix style */}
          <g transform="translate(290, 80)">
            <path d="M0 0 Q60 -20 80 15 Q75 45 20 40 L5 55 L10 38 Q-10 35 0 0 Z" fill="#ffffff" stroke="#222" strokeWidth="2.5" />
            <text x="14" y="24" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="bold" fontSize="11" fill="#8b1e24">ROMA 753 aC!</text>
          </g>
        </svg>
      );

    case 'senate_debate':
      return (
        <svg viewBox="0 0 400 240" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Roman Curia interior with marble columns */}
          <rect width="400" height="240" fill="#f5ede0" />
          {/* Marble columns */}
          <rect x="20" y="10" width="28" height="220" fill="#e8d8be" stroke="#222" strokeWidth="2.5" />
          <rect x="14" y="5" width="40" height="12" fill="#cbb48e" stroke="#222" strokeWidth="2" />
          <rect x="14" y="222" width="40" height="12" fill="#cbb48e" stroke="#222" strokeWidth="2" />

          <rect x="352" y="10" width="28" height="220" fill="#e8d8be" stroke="#222" strokeWidth="2.5" />
          <rect x="346" y="5" width="40" height="12" fill="#cbb48e" stroke="#222" strokeWidth="2" />
          <rect x="346" y="222" width="40" height="12" fill="#cbb48e" stroke="#222" strokeWidth="2" />

          {/* SPQR Inscription on back wall */}
          <rect x="150" y="25" width="100" height="32" rx="6" fill="#8b1e24" stroke="#eab308" strokeWidth="2.5" />
          <text x="200" y="47" textAnchor="middle" fontFamily="'Cinzel', serif" fontWeight="900" fontSize="18" fill="#fde047" letterSpacing="3">SPQR</text>

          {/* Angry Patrician Senator (Asterix style: big bulbous nose, Laurel wreath, white toga with red stripe) */}
          <g transform="translate(100, 75)">
            {/* Toga Body */}
            <path d="M0 65 Q30 50 60 65 L55 155 Q25 160 5 155 Z" fill="#ffffff" stroke="#222" strokeWidth="3" />
            {/* Red Senatus stripe */}
            <path d="M15 65 Q25 110 20 155" stroke="#991b1b" strokeWidth="9" fill="none" />
            <path d="M15 65 Q25 110 20 155" stroke="#222" strokeWidth="1.5" fill="none" />
            {/* Hand gesturing passionately */}
            <path d="M55 75 Q75 60 90 70" stroke="#fbcfe8" strokeWidth="9" strokeLinecap="round" />
            <circle cx="92" cy="70" r="5" fill="#fbcfe8" stroke="#222" strokeWidth="2" />

            {/* Head */}
            <ellipse cx="28" cy="30" rx="20" ry="24" fill="#fbcfe8" stroke="#222" strokeWidth="3" />
            {/* Big Asterix-style nose */}
            <path d="M38 25 C55 23 58 42 38 42" fill="#f472b6" stroke="#222" strokeWidth="2.5" />
            {/* Angry white eyebrows & eyes */}
            <path d="M22 18 L34 26" stroke="#222" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="28" cy="26" r="3" fill="#111" />
            <path d="M10 20 L2 24" stroke="#e5e7eb" strokeWidth="6" strokeLinecap="round" />
            {/* Laurel Wreath */}
            <path d="M8 12 Q28 -2 48 10" stroke="#15803d" strokeWidth="5" strokeLinecap="round" fill="none" />
            <circle cx="16" cy="8" r="3" fill="#22c55e" />
            <circle cx="32" cy="5" r="3" fill="#22c55e" />
            <circle cx="44" cy="9" r="3" fill="#22c55e" />
            {/* Open shouting mouth */}
            <path d="M24 45 Q35 55 42 44 Z" fill="#881337" stroke="#222" strokeWidth="2" />
          </g>

          {/* Plebeian Tribune shouting "VETO!" (wearing simple brown tunic, shouting back) */}
          <g transform="translate(250, 85)">
            {/* Tunic body */}
            <path d="M0 60 Q25 55 45 60 L40 145 Q20 150 0 145 Z" fill="#92400e" stroke="#222" strokeWidth="3" />
            {/* Raised finger stopping the law */}
            <path d="M-5 70 Q-25 45 -30 25" stroke="#fbcfe8" strokeWidth="8" strokeLinecap="round" />
            <circle cx="-30" cy="23" r="5" fill="#fbcfe8" stroke="#222" strokeWidth="2" />

            {/* Head */}
            <circle cx="22" cy="28" r="20" fill="#fed7aa" stroke="#222" strokeWidth="3" />
            {/* Comic beard */}
            <path d="M8 35 Q22 62 38 35 Z" fill="#451a03" stroke="#222" strokeWidth="2.5" />
            {/* Big round nose */}
            <circle cx="14" cy="27" r="9" fill="#f97316" stroke="#222" strokeWidth="2.5" />
            {/* Determined eye */}
            <circle cx="20" cy="18" r="3" fill="#111" />
            <path d="M12 14 L26 14" stroke="#451a03" strokeWidth="3.5" strokeLinecap="round" />
          </g>

          {/* Giant Comic "VETO!" Speech Bubble */}
          <g transform="translate(200, 25)">
            <path d="M0 0 L40 -15 L120 -15 L120 30 L30 30 L10 45 Z" fill="#fef08a" stroke="#222" strokeWidth="3" />
            <text x="65" y="16" fontFamily="'Cinzel', Impact, sans-serif" fontWeight="900" fontSize="22" fill="#b91c1c" textAnchor="middle">VETO!</text>
          </g>
        </svg>
      );

    case 'legion_march':
      return (
        <svg viewBox="0 0 400 240" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="sky_march" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#bae6fd" />
              <stop offset="100%" stopColor="#fef3c7" />
            </linearGradient>
          </defs>
          <rect width="400" height="240" fill="url(#sky_march)" />

          {/* Roman Road: Via Appia stone paving */}
          <path d="M-10 180 L410 180 L410 240 L-10 240 Z" fill="#d6d3d1" stroke="#222" strokeWidth="3" />
          {/* Paving stones */}
          <path d="M10 200 L60 200 M90 195 L150 195 M180 205 L240 205 M270 198 L340 198 M370 202 L410 202" stroke="#78716c" strokeWidth="2.5" />
          <path d="M40 220 L110 220 M140 225 L210 225 M250 218 L320 218 M350 225 L400 225" stroke="#78716c" strokeWidth="2.5" />

          {/* Milestone (Milliarium) */}
          <rect x="25" y="150" width="22" height="45" rx="3" fill="#e7e5e4" stroke="#222" strokeWidth="2.5" />
          <text x="36" y="170" fontFamily="sans-serif" fontSize="7" fontWeight="bold" textAnchor="middle" fill="#881337">VIA</text>
          <text x="36" y="180" fontFamily="sans-serif" fontSize="6" fontWeight="bold" textAnchor="middle" fill="#881337">ROMA</text>

          {/* Centurion Marching with transversal horsehair helmet (Asterix caricature style) */}
          <g transform="translate(130, 45)">
            {/* Legionary Spear (Pilum) */}
            <line x1="8" y1="15" x2="8" y2="155" stroke="#78350f" strokeWidth="4.5" strokeLinecap="round" />
            <polygon points="4,15 8,-5 12,15" fill="#94a3b8" stroke="#222" strokeWidth="2" />

            {/* Red Cloak flying behind */}
            <path d="M5 70 Q-30 65 -45 100 Q-20 120 5 120 Z" fill="#b91c1c" stroke="#222" strokeWidth="2.5" />

            {/* Legs with Caligae sandals */}
            <rect x="20" y="125" width="10" height="35" rx="4" fill="#fed7aa" stroke="#222" strokeWidth="2.5" />
            <rect x="42" y="120" width="10" height="40" rx="4" fill="#fed7aa" stroke="#222" strokeWidth="2.5" />
            {/* Sandal laces */}
            <line x1="18" y1="140" x2="32" y2="140" stroke="#78350f" strokeWidth="2.5" />
            <line x1="18" y1="150" x2="32" y2="150" stroke="#78350f" strokeWidth="2.5" />
            <line x1="40" y1="140" x2="54" y2="140" stroke="#78350f" strokeWidth="2.5" />
            <line x1="40" y1="150" x2="54" y2="150" stroke="#78350f" strokeWidth="2.5" />

            {/* Segmented Armor (Lorica Segmentata) */}
            <path d="M15 65 Q35 60 55 65 L50 125 Q35 130 15 125 Z" fill="#cbd5e1" stroke="#222" strokeWidth="3" />
            {/* Armor strips */}
            <path d="M15 80 Q35 75 54 80" stroke="#475569" strokeWidth="3" />
            <path d="M15 95 Q35 90 53 95" stroke="#475569" strokeWidth="3" />
            <path d="M16 110 Q35 105 52 110" stroke="#475569" strokeWidth="3" />

            {/* Giant Red Curved Scutum Shield */}
            <g transform="translate(48, 60)">
              <rect x="0" y="0" width="45" height="75" rx="8" fill="#dc2626" stroke="#222" strokeWidth="3" />
              {/* Golden Umbo boss */}
              <circle cx="22" cy="37" r="10" fill="#facc15" stroke="#222" strokeWidth="2.5" />
              {/* Golden winged thunderbolt insignia */}
              <path d="M22 15 L22 60 M5 37 L40 37 M12 25 L32 50 M12 50 L32 25" stroke="#facc15" strokeWidth="3" strokeLinecap="round" />
            </g>

            {/* Funny Asterix-style Roman face */}
            <circle cx="34" cy="38" r="18" fill="#fed7aa" stroke="#222" strokeWidth="2.5" />
            {/* Big red comical nose */}
            <ellipse cx="48" cy="40" rx="9" ry="7" fill="#f87171" stroke="#222" strokeWidth="2.5" />
            {/* Big black comic moustache */}
            <path d="M38 46 Q50 56 60 48" stroke="#1e293b" strokeWidth="4.5" strokeLinecap="round" fill="none" />
            {/* Determined eyes */}
            <circle cx="42" cy="32" r="3" fill="#111" />

            {/* Roman Helmet (Galea) with huge red transverse crest */}
            <path d="M20 28 Q36 12 52 28 Z" fill="#eab308" stroke="#222" strokeWidth="2.5" />
            {/* Red Crest (Crista) */}
            <path d="M12 12 Q36 -6 60 12 L56 5 Q36 -14 16 5 Z" fill="#ef4444" stroke="#222" strokeWidth="2" />
            {/* Cheek guards */}
            <path d="M26 34 L28 48 L34 44" fill="#eab308" stroke="#222" strokeWidth="2" />
          </g>

          {/* Marching legionary behind him (repeating rhythm) */}
          <g transform="translate(260, 55)">
            <line x1="8" y1="15" x2="8" y2="155" stroke="#78350f" strokeWidth="4" strokeLinecap="round" />
            <polygon points="4,15 8,-5 12,15" fill="#94a3b8" stroke="#222" strokeWidth="2" />
            {/* Shield */}
            <rect x="25" y="55" width="40" height="70" rx="8" fill="#dc2626" stroke="#222" strokeWidth="3" />
            <circle cx="45" cy="90" r="8" fill="#facc15" stroke="#222" strokeWidth="2" />
            {/* Helmet */}
            <circle cx="20" cy="38" r="15" fill="#fed7aa" stroke="#222" strokeWidth="2" />
            <ellipse cx="30" cy="40" rx="7" ry="5" fill="#f87171" stroke="#222" strokeWidth="2" />
            <path d="M10 28 Q24 16 38 28 Z" fill="#eab308" stroke="#222" strokeWidth="2" />
            <path d="M15 15 Q26 0 37 15" stroke="#dc2626" strokeWidth="6" strokeLinecap="round" fill="none" />
          </g>

          {/* Standard Bearer (Aquilifer) Eagle in top right */}
          <g transform="translate(355, 30)">
            <line x1="15" y1="0" x2="15" y2="180" stroke="#b45309" strokeWidth="4" strokeLinecap="round" />
            <circle cx="15" cy="18" r="14" fill="#facc15" stroke="#222" strokeWidth="2.5" />
            {/* Golden Roman Eagle */}
            <path d="M8 22 Q15 10 22 22 L15 14 Z" fill="#854d0e" stroke="#222" strokeWidth="1.5" />
          </g>

          {/* Funny sound effect: "ILS SONT FOUS CES ROMAINS!" / "UN, DEUX! UN, DEUX!" */}
          <g transform="translate(70, 20)">
            <path d="M0 10 L20 0 L140 0 L140 35 L30 35 Z" fill="#ffffff" stroke="#222" strokeWidth="2" />
            <text x="80" y="23" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="900" fontSize="12" fill="#8b1e24" textAnchor="middle">UN! DOS! UN! DOS!</text>
          </g>
        </svg>
      );

    case 'hannibal_elephant':
      return (
        <svg viewBox="0 0 400 240" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Snowy Alps Mountain backdrop */}
          <rect width="400" height="240" fill="#cffafe" />
          {/* Jagged snowy mountains */}
          <polygon points="-20,180 80,40 180,180" fill="#93c5fd" stroke="#1e3a8a" strokeWidth="2" />
          <polygon points="50,85 80,40 110,85 95,75 80,90 65,75" fill="#ffffff" />

          <polygon points="120,200 240,20 360,200" fill="#60a5fa" stroke="#1e3a8a" strokeWidth="2" />
          <polygon points="200,80 240,20 280,80 260,65 240,85 220,65" fill="#ffffff" />

          <polygon points="280,210 350,70 420,210" fill="#93c5fd" stroke="#1e3a8a" strokeWidth="2" />

          {/* Snowy path */}
          <path d="M-10 200 Q150 170 410 210 L410 240 L-10 240 Z" fill="#f1f5f9" stroke="#334155" strokeWidth="2.5" />

          {/* Giant Asterix-style Funny War Elephant with woolen scarf! */}
          <g transform="translate(140, 80)">
            {/* Elephant body */}
            <ellipse cx="60" cy="55" rx="55" ry="40" fill="#64748b" stroke="#222" strokeWidth="3" />
            {/* Tail */}
            <path d="M5 55 Q-15 65 -10 80" stroke="#475569" strokeWidth="4" strokeLinecap="round" fill="none" />
            {/* Thick sturdy legs */}
            <rect x="25" y="75" width="18" height="35" rx="5" fill="#475569" stroke="#222" strokeWidth="2.5" />
            <rect x="50" y="70" width="18" height="40" rx="5" fill="#64748b" stroke="#222" strokeWidth="2.5" />
            <rect x="75" y="75" width="18" height="35" rx="5" fill="#475569" stroke="#222" strokeWidth="2.5" />
            <rect x="95" y="70" width="18" height="40" rx="5" fill="#64748b" stroke="#222" strokeWidth="2.5" />

            {/* Elephant Head with huge floppy ear */}
            <circle cx="115" cy="40" r="26" fill="#64748b" stroke="#222" strokeWidth="3" />
            <ellipse cx="98" cy="35" rx="14" ry="22" fill="#475569" stroke="#222" strokeWidth="2.5" />

            {/* Big curved trunk holding an icicle or shivering */}
            <path d="M135 45 Q155 55 145 80 Q138 95 125 90" stroke="#64748b" strokeWidth="12" strokeLinecap="round" fill="none" />
            <path d="M135 45 Q155 55 145 80 Q138 95 125 90" stroke="#222" strokeWidth="2" strokeLinecap="round" fill="none" />

            {/* Ivory tusk */}
            <path d="M128 55 Q155 60 160 45" stroke="#fef08a" strokeWidth="6" strokeLinecap="round" fill="none" />
            <path d="M128 55 Q155 60 160 45" stroke="#222" strokeWidth="1.5" strokeLinecap="round" fill="none" />

            {/* Eye shivering in the cold */}
            <circle cx="120" cy="30" r="4.5" fill="#ffffff" stroke="#222" strokeWidth="1.5" />
            <circle cx="122" cy="30" r="2.5" fill="#111" />

            {/* Funny winter scarf wrapped around elephant neck */}
            <path d="M95 50 Q120 58 135 48" stroke="#dc2626" strokeWidth="12" strokeLinecap="round" fill="none" />
            <path d="M120 55 L125 78" stroke="#dc2626" strokeWidth="8" strokeLinecap="round" />
          </g>

          {/* General Hannibal Barca riding on top in Carthaginean armor */}
          <g transform="translate(180, 50)">
            <ellipse cx="20" cy="18" rx="12" ry="14" fill="#fed7aa" stroke="#222" strokeWidth="2" />
            {/* Proud beard & fierce moustache */}
            <path d="M10 22 Q20 38 30 22 Z" fill="#172554" stroke="#222" strokeWidth="2" />
            <circle cx="28" cy="16" r="6" fill="#f97316" stroke="#222" strokeWidth="1.5" />
            <circle cx="23" cy="12" r="2.5" fill="#111" />
            {/* Phrygian / Carthaginean bronze helmet with horsehair */}
            <path d="M10 10 Q20 -4 30 10 Z" fill="#d97706" stroke="#222" strokeWidth="2" />
            <path d="M26 -2 Q35 -14 30 -2" stroke="#ea580c" strokeWidth="5" strokeLinecap="round" />
            {/* Hannibal pointing forward to Italy */}
            <line x1="28" y1="26" x2="60" y2="18" stroke="#fed7aa" strokeWidth="6" strokeLinecap="round" />
            <polygon points="60,14 70,18 60,22" fill="#fed7aa" />
          </g>

          {/* Shivering sign: "ITÀLIA -> ALPS 218 aC" */}
          <g transform="translate(30, 140)">
            <rect x="0" y="0" width="85" height="35" rx="4" fill="#fef08a" stroke="#222" strokeWidth="2" />
            <text x="42" y="16" fontFamily="'Cinzel', sans-serif" fontWeight="bold" fontSize="9" textAnchor="middle" fill="#881337">CAP A ROMA!</text>
            <text x="42" y="28" fontFamily="sans-serif" fontWeight="bold" fontSize="8" textAnchor="middle" fill="#1e3a8a">218 aC · BRRR!</text>
          </g>
        </svg>
      );

    case 'spartacus_revolt':
      return (
        <svg viewBox="0 0 400 240" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Fiery sunset sky near Mount Vesuvius */}
          <defs>
            <linearGradient id="fireSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="60%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#fef08a" />
            </linearGradient>
          </defs>
          <rect width="400" height="240" fill="url(#fireSky)" />

          {/* Mount Vesuvius silhouette in background */}
          <polygon points="40,200 160,90 280,200" fill="#78350f" stroke="#222" strokeWidth="2.5" />
          {/* Smoke from crater */}
          <ellipse cx="160" cy="80" rx="25" ry="12" fill="#cbd5e1" opacity="0.8" />
          <ellipse cx="175" cy="65" rx="35" ry="14" fill="#94a3b8" opacity="0.7" />

          {/* Ground */}
          <path d="M-10 190 Q200 180 410 195 L410 240 L-10 240 Z" fill="#854d0e" stroke="#222" strokeWidth="3" />

          {/* Spartacus the Thracian Gladiator breaking chains! (Heroic Asterix style) */}
          <g transform="translate(170, 70)">
            {/* Muscular gladiator body (like Obelix/Asterix hero) */}
            <path d="M10 50 Q30 45 50 50 L45 105 Q30 110 15 105 Z" fill="#fed7aa" stroke="#222" strokeWidth="3" />
            {/* Leather subligaculum loincloth */}
            <rect x="15" y="95" width="30" height="25" rx="3" fill="#78350f" stroke="#222" strokeWidth="2" />
            {/* Strong legs */}
            <rect x="16" y="115" width="12" height="30" rx="3" fill="#fed7aa" stroke="#222" strokeWidth="2.5" />
            <rect x="32" y="115" width="12" height="30" rx="3" fill="#fed7aa" stroke="#222" strokeWidth="2.5" />

            {/* Left arm breaking iron chain */}
            <path d="M12 55 Q-15 35 -30 45" stroke="#fed7aa" strokeWidth="12" strokeLinecap="round" />
            <rect x="-35" y="38" width="12" height="14" rx="2" fill="#475569" stroke="#222" strokeWidth="2" />
            {/* Broken chain links flying */}
            <ellipse cx="-48" cy="30" rx="5" ry="8" fill="none" stroke="#222" strokeWidth="3" transform="rotate(30 -48 30)" />
            <ellipse cx="-55" cy="50" rx="5" ry="8" fill="none" stroke="#222" strokeWidth="3" transform="rotate(-40 -55 50)" />

            {/* Right arm wielding a gladiator sword (gladius) */}
            <path d="M48 55 Q75 35 90 20" stroke="#fed7aa" strokeWidth="12" strokeLinecap="round" />
            {/* Short sword */}
            <line x1="88" y1="22" x2="125" y2="-5" stroke="#cbd5e1" strokeWidth="6" strokeLinecap="round" />
            <line x1="88" y1="22" x2="125" y2="-5" stroke="#222" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="88" cy="22" r="5" fill="#d97706" stroke="#222" strokeWidth="2" />

            {/* Spartacus Head */}
            <circle cx="30" cy="28" r="18" fill="#fed7aa" stroke="#222" strokeWidth="2.5" />
            {/* Wild heroic blonde/brown hair */}
            <path d="M14 20 Q30 -2 46 20 Z" fill="#b45309" stroke="#222" strokeWidth="2.5" />
            {/* Big friendly warrior nose */}
            <ellipse cx="40" cy="30" rx="7" ry="6" fill="#f87171" stroke="#222" strokeWidth="2" />
            {/* Shouting mouth */}
            <path d="M28 38 Q35 48 44 38 Z" fill="#881337" stroke="#222" strokeWidth="1.5" />
          </g>

          {/* Shouting: "LLIBERTAT! 73 aC" */}
          <g transform="translate(240, 30)">
            <path d="M0 10 L25 -10 L130 -10 L130 35 L40 35 Z" fill="#ffffff" stroke="#222" strokeWidth="2.5" />
            <text x="75" y="12" fontFamily="'Cinzel', sans-serif" fontWeight="900" fontSize="13" fill="#b91c1c" textAnchor="middle">LLIBERTAT!</text>
            <text x="75" y="27" fontFamily="sans-serif" fontWeight="bold" fontSize="9" fill="#78350f" textAnchor="middle">73 aC · CÀPUA</text>
          </g>
        </svg>
      );

    case 'caesar_rubicon':
      return (
        <svg viewBox="0 0 400 240" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Twilight sky over the river Rubicon */}
          <defs>
            <linearGradient id="twilight" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4338ca" />
              <stop offset="60%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#f472b6" />
            </linearGradient>
          </defs>
          <rect width="400" height="240" fill="url(#twilight)" />

          {/* Rubicon River running across */}
          <path d="M-10 150 Q180 120 410 150 L410 240 L-10 240 Z" fill="#38bdf8" stroke="#0284c7" strokeWidth="3" />
          {/* Water ripples */}
          <path d="M30 180 Q60 175 90 180 M150 170 Q180 165 210 170 M260 185 Q300 180 340 185" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />

          {/* River bank */}
          <path d="M-10 150 Q100 135 180 145 L180 240 L-10 240 Z" fill="#84cc16" stroke="#222" strokeWidth="2.5" />

          {/* Boundary stone marking Roman border */}
          <rect x="35" y="110" width="30" height="45" rx="3" fill="#e2e8f0" stroke="#222" strokeWidth="2" />
          <text x="50" y="128" fontFamily="'Cinzel', serif" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#b91c1c">FLVMEN</text>
          <text x="50" y="140" fontFamily="'Cinzel', serif" fontSize="7" fontWeight="bold" textAnchor="middle" fill="#1e293b">RVBICO</text>

          {/* Julius Caesar (Asterix style: distinguished Roman hooked nose, bald on crown with comb-over laurel wreath, purple imperator cloak) */}
          <g transform="translate(110, 65)">
            {/* White horse */}
            <g transform="translate(10, 20)">
              {/* Horse body */}
              <ellipse cx="60" cy="50" rx="45" ry="30" fill="#f8fafc" stroke="#222" strokeWidth="3" />
              {/* Horse legs in river */}
              <rect x="30" y="70" width="10" height="35" rx="4" fill="#f8fafc" stroke="#222" strokeWidth="2" />
              <rect x="50" y="70" width="10" height="40" rx="4" fill="#e2e8f0" stroke="#222" strokeWidth="2" />
              <rect x="75" y="70" width="10" height="35" rx="4" fill="#f8fafc" stroke="#222" strokeWidth="2" />
              <rect x="90" y="70" width="10" height="40" rx="4" fill="#e2e8f0" stroke="#222" strokeWidth="2" />
              {/* Horse head */}
              <polygon points="90,40 120,10 130,25 105,60" fill="#f8fafc" stroke="#222" strokeWidth="2.5" />
              <circle cx="115" cy="22" r="3" fill="#111" />
              {/* Red harness */}
              <path d="M100 45 L125 18 L110 35 Z" fill="none" stroke="#dc2626" strokeWidth="2" />
            </g>

            {/* Julius Caesar riding */}
            <g transform="translate(50, -5)">
              {/* Purple Commander Cloak (Paludamentum) */}
              <path d="M-15 45 Q-35 40 -40 70 Q-15 85 10 75 Z" fill="#7e22ce" stroke="#222" strokeWidth="2.5" />
              {/* Armor */}
              <ellipse cx="5" cy="50" rx="14" ry="20" fill="#d97706" stroke="#222" strokeWidth="2.5" />

              {/* Caesar Head (The iconic Asterix Caesar!) */}
              <ellipse cx="12" cy="22" rx="14" ry="18" fill="#fed7aa" stroke="#222" strokeWidth="2.5" />
              {/* Very prominent aristocratic Roman nose (Asterix signature!) */}
              <path d="M18 16 Q34 22 24 29 L16 28" fill="#fed7aa" stroke="#222" strokeWidth="2.5" />
              {/* Golden Laurel Wreath */}
              <path d="M0 12 Q14 2 26 12" stroke="#15803d" strokeWidth="4" strokeLinecap="round" fill="none" />
              <circle cx="6" cy="7" r="2.5" fill="#facc15" />
              <circle cx="16" cy="5" r="2.5" fill="#facc15" />
              {/* Smug authoritative smirk */}
              <circle cx="18" cy="18" r="2.5" fill="#111" />
              <path d="M14 34 Q22 38 26 31" stroke="#222" strokeWidth="2" fill="none" />

              {/* Hand tossing the dice into the air! */}
              <path d="M10 40 Q30 20 45 15" stroke="#fed7aa" strokeWidth="7" strokeLinecap="round" />
              {/* Flying 3D Roman dice (Alea) */}
              <g transform="translate(55, 5)">
                <rect x="0" y="0" width="14" height="14" rx="2" fill="#ffffff" stroke="#222" strokeWidth="1.5" />
                <circle cx="4" cy="4" r="1.5" fill="#dc2626" />
                <circle cx="7" cy="7" r="1.5" fill="#dc2626" />
                <circle cx="10" cy="10" r="1.5" fill="#dc2626" />
              </g>
            </g>
          </g>

          {/* Famous Speech Bubble: "ALEA IACTA EST!" */}
          <g transform="translate(220, 20)">
            <path d="M0 10 L20 -5 L160 -5 L160 40 L30 40 L10 55 Z" fill="#ffffff" stroke="#222" strokeWidth="2.5" />
            <text x="90" y="16" fontFamily="'Cinzel', serif" fontWeight="900" fontSize="13" fill="#7e22ce" textAnchor="middle">ALEA IACTA EST!</text>
            <text x="90" y="32" fontFamily="sans-serif" fontWeight="bold" fontSize="9" fill="#1e293b" textAnchor="middle">«La sort està tirada» (49 aC)</text>
          </g>
        </svg>
      );

    case 'augustus_pax':
      return (
        <svg viewBox="0 0 400 240" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Bright Mediterranean Blue Sky over imperial Rome */}
          <rect width="400" height="240" fill="#e0f2fe" />

          {/* Marble Roman temple with pediment and statues in background */}
          <polygon points="120,70 200,25 280,70" fill="#f8fafc" stroke="#222" strokeWidth="2.5" />
          {/* Temple columns */}
          <rect x="135" y="70" width="12" height="90" fill="#f1f5f9" stroke="#222" strokeWidth="2" />
          <rect x="165" y="70" width="12" height="90" fill="#f1f5f9" stroke="#222" strokeWidth="2" />
          <rect x="195" y="70" width="12" height="90" fill="#f1f5f9" stroke="#222" strokeWidth="2" />
          <rect x="225" y="70" width="12" height="90" fill="#f1f5f9" stroke="#222" strokeWidth="2" />
          <rect x="255" y="70" width="12" height="90" fill="#f1f5f9" stroke="#222" strokeWidth="2" />
          {/* Altar with laurel */}
          <rect x="100" y="160" width="200" height="20" fill="#e2e8f0" stroke="#222" strokeWidth="2" />

          {/* Floor tiles */}
          <path d="M-10 180 L410 180 L410 240 L-10 240 Z" fill="#e7e5e4" stroke="#222" strokeWidth="2.5" />

          {/* Emperor Augustus (Prima Porta style, comic adaptation) */}
          <g transform="translate(170, 60)">
            {/* White and Gold Toga of Emperor */}
            <path d="M10 60 Q30 55 50 60 L45 130 Q30 135 15 130 Z" fill="#ffffff" stroke="#222" strokeWidth="3" />
            {/* Imperial Gold Sash */}
            <path d="M10 65 Q25 95 45 130" stroke="#facc15" strokeWidth="9" fill="none" />
            <path d="M10 65 Q25 95 45 130" stroke="#222" strokeWidth="1.5" fill="none" />

            {/* Emperor Augustus Head */}
            <circle cx="30" cy="30" r="18" fill="#fed7aa" stroke="#222" strokeWidth="2.5" />
            {/* Young, dignified comic face with Augustus distinctive curly bangs */}
            <path d="M16 20 Q30 6 44 20 Z" fill="#78350f" stroke="#222" strokeWidth="2" />
            <ellipse cx="38" cy="30" rx="7" ry="6" fill="#fca5a5" stroke="#222" strokeWidth="2" />
            <circle cx="34" cy="24" r="2.5" fill="#111" />
            {/* Serene wise smile */}
            <path d="M26 38 Q34 44 42 38" stroke="#222" strokeWidth="2" fill="none" />
            {/* Golden Emperor Crown */}
            <path d="M18 16 Q30 8 42 16" stroke="#eab308" strokeWidth="4" strokeLinecap="round" fill="none" />

            {/* Imperial Roman gesture (Adlocutio: arm raised bringing peace) */}
            <path d="M48 65 Q70 45 85 40" stroke="#fed7aa" strokeWidth="9" strokeLinecap="round" />
            <circle cx="88" cy="38" r="5" fill="#fed7aa" stroke="#222" strokeWidth="2" />

            {/* Dove of Peace (Pax Romana) resting near him */}
            <g transform="translate(95, 20)">
              <ellipse cx="10" cy="10" rx="10" ry="7" fill="#ffffff" stroke="#222" strokeWidth="1.5" />
              <polygon points="5,8 -5,0 0,12" fill="#ffffff" stroke="#222" strokeWidth="1.5" />
              <polygon points="18,10 24,12 18,14" fill="#f59e0b" />
              <circle cx="15" cy="8" r="1.5" fill="#111" />
              {/* Olive branch in beak */}
              <line x1="22" y1="13" x2="30" y2="10" stroke="#15803d" strokeWidth="2" />
              <circle cx="28" cy="9" r="2" fill="#22c55e" />
            </g>
          </g>

          {/* Comic speech bubble with Augustus' famous quote */}
          <g transform="translate(20, 25)">
            <path d="M0 0 L145 0 L145 50 L20 50 L5 65 Z" fill="#fef9c3" stroke="#222" strokeWidth="2.5" />
            <text x="72" y="18" fontFamily="'Cinzel', serif" fontWeight="bold" fontSize="10" fill="#991b1b" textAnchor="middle">PAX ROMANA (27 aC)</text>
            <text x="72" y="32" fontFamily="sans-serif" fontSize="8" fill="#334155" textAnchor="middle">«Vaig trobar una Roma de maons</text>
            <text x="72" y="44" fontFamily="sans-serif" fontSize="8" fill="#334155" textAnchor="middle">i us deixo una ciutat de marbre!»</text>
          </g>
        </svg>
      );

    case 'centurion_trophy':
      return (
        <svg viewBox="0 0 300 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <rect width="300" height="200" fill="#fef3c7" />
          {/* Laurel circle frame */}
          <circle cx="150" cy="100" r="85" fill="#fde68a" stroke="#d97706" strokeWidth="3" />

          {/* Centurion chest-up smiling proudly */}
          <g transform="translate(100, 35)">
            {/* Shoulders */}
            <path d="M5 85 Q50 70 95 85 L90 140 L10 140 Z" fill="#dc2626" stroke="#222" strokeWidth="3" />
            {/* Bronze cuirass */}
            <rect x="25" y="80" width="50" height="55" rx="6" fill="#f59e0b" stroke="#222" strokeWidth="2.5" />
            <circle cx="50" cy="105" r="10" fill="#d97706" stroke="#222" strokeWidth="2" />

            {/* Centurion Face */}
            <circle cx="50" cy="50" r="24" fill="#fed7aa" stroke="#222" strokeWidth="2.5" />
            {/* Giant friendly Asterix-centurion nose */}
            <ellipse cx="64" cy="52" rx="10" ry="8" fill="#f87171" stroke="#222" strokeWidth="2.5" />
            {/* Big black cheerful moustache */}
            <path d="M38 60 Q50 72 65 60" stroke="#1e293b" strokeWidth="5" strokeLinecap="round" fill="none" />
            <circle cx="58" cy="42" r="3" fill="#111" />

            {/* Centurion helmet with huge red brush crest */}
            <path d="M28 36 Q50 16 72 36 Z" fill="#eab308" stroke="#222" strokeWidth="2.5" />
            {/* Transversal brush */}
            <path d="M15 16 Q50 -8 85 16 L80 6 Q50 -16 20 6 Z" fill="#ef4444" stroke="#222" strokeWidth="2" />
          </g>

          <text x="150" y="185" fontFamily="'Cinzel', serif" fontWeight="900" fontSize="14" fill="#7f1d1d" textAnchor="middle">AVE VICTOR!</text>
        </svg>
      );

    case 'aqueduct_building':
      return (
        <svg viewBox="0 0 400 240" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Sky */}
          <rect width="400" height="240" fill="#e0f2fe" />
          <circle cx="340" cy="40" r="22" fill="#fde047" stroke="#ca8a04" strokeWidth="2" />

          {/* Green valley in Catalonia (Tarraco Pont del Diable inspired) */}
          <path d="M-10 180 Q120 160 220 190 Q320 165 410 180 L410 240 L-10 240 Z" fill="#65a30d" stroke="#222" strokeWidth="2.5" />

          {/* Double tier Roman Aqueduct across the valley */}
          <g transform="translate(10, 60)">
            {/* Lower Tier Arches */}
            <rect x="0" y="60" width="380" height="60" fill="#e2d4be" stroke="#222" strokeWidth="3" />
            <path d="M40 120 A30 30 0 0 1 100 120 Z" fill="#e0f2fe" stroke="#222" strokeWidth="3" />
            <path d="M140 120 A30 30 0 0 1 200 120 Z" fill="#e0f2fe" stroke="#222" strokeWidth="3" />
            <path d="M240 120 A30 30 0 0 1 300 120 Z" fill="#e0f2fe" stroke="#222" strokeWidth="3" />

            {/* Upper Tier Arches */}
            <rect x="0" y="10" width="380" height="50" fill="#ebdcc8" stroke="#222" strokeWidth="2.5" />
            <path d="M25 60 A18 18 0 0 1 61 60 Z" fill="#e0f2fe" stroke="#222" strokeWidth="2.5" />
            <path d="M85 60 A18 18 0 0 1 121 60 Z" fill="#e0f2fe" stroke="#222" strokeWidth="2.5" />
            <path d="M145 60 A18 18 0 0 1 181 60 Z" fill="#e0f2fe" stroke="#222" strokeWidth="2.5" />
            <path d="M205 60 A18 18 0 0 1 241 60 Z" fill="#e0f2fe" stroke="#222" strokeWidth="2.5" />
            <path d="M265 60 A18 18 0 0 1 301 60 Z" fill="#e0f2fe" stroke="#222" strokeWidth="2.5" />
            <path d="M325 60 A18 18 0 0 1 361 60 Z" fill="#e0f2fe" stroke="#222" strokeWidth="2.5" />

            {/* Water Channel on Top */}
            <rect x="0" y="0" width="380" height="10" fill="#0284c7" stroke="#222" strokeWidth="2" />
            {/* Water splashing out end */}
            <path d="M380 5 Q395 10 390 25" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" fill="none" />
          </g>

          {/* Funny Roman Engineer on top with Chorobates leveling tool */}
          <g transform="translate(150, 20)">
            <ellipse cx="15" cy="22" rx="10" ry="12" fill="#fed7aa" stroke="#222" strokeWidth="2" />
            {/* Big Asterix bulbous nose */}
            <ellipse cx="23" cy="23" rx="5" ry="4" fill="#f87171" stroke="#222" strokeWidth="1.5" />
            {/* Green tunic */}
            <rect x="8" y="32" width="14" height="20" fill="#059669" stroke="#222" strokeWidth="2" />
            {/* Wooden ruler / measuring rod */}
            <line x1="-15" y1="52" x2="45" y2="52" stroke="#b45309" strokeWidth="4" strokeLinecap="round" />
            <line x1="15" y1="40" x2="15" y2="52" stroke="#222" strokeWidth="2" />
          </g>

          {/* Label banner */}
          <g transform="translate(20, 190)">
            <rect x="0" y="0" width="180" height="30" rx="6" fill="#fef3c7" stroke="#222" strokeWidth="2" />
            <text x="90" y="15" fontFamily="'Cinzel', serif" fontWeight="bold" fontSize="9" fill="#881337" textAnchor="middle">ENGINYERIA ROMANA</text>
            <text x="90" y="25" fontFamily="sans-serif" fontSize="7" fill="#475569" textAnchor="middle">Pont del Diable (Tàrraco) · Aigua pura!</text>
          </g>
        </svg>
      );

    case 'roman_camp':
    default:
      return (
        <svg viewBox="0 0 400 240" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="240" fill="#bae6fd" />
          {/* Wooden Palisade wall of the Castrum */}
          <path d="M-10 170 L410 170 L410 240 L-10 240 Z" fill="#84cc16" />

          {/* Wooden stakes wall (Vallum) */}
          <g transform="translate(0, 110)">
            {[...Array(20)].map((_, i) => (
              <polygon
                key={i}
                points={`${i * 20 + 2},60 ${i * 20 + 10},10 ${i * 20 + 18},60`}
                fill={i % 2 === 0 ? '#b45309' : '#92400e'}
                stroke="#222"
                strokeWidth="2"
              />
            ))}
          </g>

          {/* Watchtower (Turris) with Roman soldier peering out */}
          <g transform="translate(280, 40)">
            <rect x="10" y="30" width="60" height="110" fill="#78350f" stroke="#222" strokeWidth="3" />
            <polygon points="5,30 40,0 75,30" fill="#b91c1c" stroke="#222" strokeWidth="2.5" />
            {/* Guard peeking out with binoculars/hands */}
            <circle cx="40" cy="50" r="10" fill="#fed7aa" stroke="#222" strokeWidth="1.5" />
            <ellipse cx="46" cy="51" rx="4" ry="3" fill="#f87171" stroke="#222" strokeWidth="1" />
            <path d="M30 44 Q40 35 50 44 Z" fill="#eab308" stroke="#222" strokeWidth="1.5" />
          </g>

          {/* Camp Entrance Gate with SPQR Red Banner */}
          <rect x="100" y="110" width="100" height="70" fill="#451a03" stroke="#222" strokeWidth="3" />
          <rect x="110" y="90" width="80" height="20" fill="#b91c1c" stroke="#facc15" strokeWidth="2" />
          <text x="150" y="104" fontFamily="'Cinzel', serif" fontWeight="900" fontSize="11" fill="#fef08a" textAnchor="middle">CASTRVM</text>

          {/* Sentry guard at gate looking alert (Asterix style) */}
          <g transform="translate(60, 115)">
            <rect x="10" y="35" width="18" height="35" rx="3" fill="#cbd5e1" stroke="#222" strokeWidth="2" />
            <circle cx="19" cy="22" r="12" fill="#fed7aa" stroke="#222" strokeWidth="2" />
            <ellipse cx="28" cy="23" rx="5" ry="4" fill="#f87171" stroke="#222" strokeWidth="1.5" />
            <path d="M10 16 Q19 7 28 16 Z" fill="#eab308" stroke="#222" strokeWidth="2" />
            <path d="M15 6 Q20 -4 25 6" stroke="#dc2626" strokeWidth="4" strokeLinecap="round" />
            <line x1="36" y1="5" x2="36" y2="70" stroke="#78350f" strokeWidth="3.5" />
          </g>
        </svg>
      );

    case 'roman_economy':
      return (
        <svg viewBox="0 0 400 240" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="sky_econ" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#7dd3fc" />
              <stop offset="100%" stopColor="#fef08a" />
            </linearGradient>
            <linearGradient id="field_gold" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="100%" stopColor="#ca8a04" />
            </linearGradient>
          </defs>
          <rect width="400" height="240" fill="url(#sky_econ)" />
          {/* Sunny Mediterranean rolling hills */}
          <path d="M-10 160 Q80 120 200 145 Q320 125 410 160 L410 240 L-10 240 Z" fill="#65a30d" stroke="#222" strokeWidth="2.5" />
          {/* Golden Wheat Fields (Trilogia mediterrània: Blat) */}
          <path d="M-10 190 Q120 170 250 185 Q350 175 410 200 L410 240 L-10 240 Z" fill="url(#field_gold)" stroke="#222" strokeWidth="2" />

          {/* Roman Via with Milestones & Paving */}
          <path d="M-10 215 L410 215 L410 240 L-10 240 Z" fill="#a8a29e" stroke="#222" strokeWidth="2" />
          <path d="M20 227 L80 227 M120 223 L190 223 M230 228 L310 228 M340 223 L400 223" stroke="#78716c" strokeWidth="2" />

          {/* Olive Tree (Trilogia: Oliva) */}
          <g transform="translate(40, 105)">
            <path d="M25 50 Q20 30 15 10 Q30 5 35 50" fill="#78350f" stroke="#222" strokeWidth="2" />
            <circle cx="15" cy="15" r="18" fill="#4d7c0f" stroke="#222" strokeWidth="2" />
            <circle cx="32" cy="10" r="16" fill="#65a30d" stroke="#222" strokeWidth="2" />
            {/* Olives */}
            <circle cx="12" cy="16" r="3" fill="#1e293b" />
            <circle cx="28" cy="14" r="3" fill="#1e293b" />
          </g>

          {/* Vineyard Vines & Grapes (Trilogia: Vinya) */}
          <g transform="translate(100, 130)">
            <line x1="0" y1="35" x2="0" y2="10" stroke="#78350f" strokeWidth="3" />
            <line x1="30" y1="35" x2="30" y2="10" stroke="#78350f" strokeWidth="3" />
            <line x1="-5" y1="12" x2="35" y2="12" stroke="#78350f" strokeWidth="2" />
            <path d="M5 10 Q15 0 25 10" fill="#84cc16" stroke="#222" strokeWidth="1.5" />
            {/* Bunch of purple grapes */}
            <circle cx="15" cy="20" r="4" fill="#7e22ce" />
            <circle cx="12" cy="25" r="3.5" fill="#6b21a8" />
            <circle cx="18" cy="25" r="3.5" fill="#6b21a8" />
            <circle cx="15" cy="29" r="3" fill="#581c87" />
          </g>

          {/* Roman Farmer with Arada Romana (Plough pulled by oxen/plow) */}
          <g transform="translate(180, 120)">
            {/* Wooden Roman Plow (Arada Romana) */}
            <path d="M40 50 L10 40 L-10 42" stroke="#78350f" strokeWidth="4" strokeLinecap="round" />
            {/* Iron plowshare (Rella de ferro) */}
            <polygon points="-12,40 -20,48 -8,45" fill="#475569" stroke="#222" strokeWidth="1.5" />
            <line x1="10" y1="40" x2="20" y2="20" stroke="#78350f" strokeWidth="3" />

            {/* Funny Asterix-style Roman peasant farmer */}
            <ellipse cx="25" cy="25" rx="8" ry="14" fill="#d97706" stroke="#222" strokeWidth="2" />
            <circle cx="25" cy="8" r="9" fill="#fed7aa" stroke="#222" strokeWidth="2" />
            <ellipse cx="32" cy="8" rx="4" ry="3" fill="#f87171" stroke="#222" strokeWidth="1.5" />
            <path d="M18 2 Q25 -5 32 2" stroke="#b45309" strokeWidth="2" fill="none" />
          </g>

          {/* Amphoras of Wine and Oil & Gold/Silver Roman Denarii Coins */}
          <g transform="translate(290, 135)">
            {/* Amphora 1 (Oil) */}
            <path d="M10 25 Q20 30 20 50 Q10 55 0 50 Q0 30 10 25 Z" fill="#ea580c" stroke="#222" strokeWidth="2" />
            <path d="M8 25 L8 20 L12 20 L12 25" fill="#ea580c" stroke="#222" strokeWidth="1.5" />
            <path d="M4 23 Q-2 32 6 36" fill="none" stroke="#222" strokeWidth="2" />
            <path d="M16 23 Q22 32 14 36" fill="none" stroke="#222" strokeWidth="2" />

            {/* Amphora 2 (Wine) */}
            <path d="M35 30 Q45 35 45 52 Q35 56 25 52 Q25 35 35 30 Z" fill="#c2410c" stroke="#222" strokeWidth="2" />

            {/* Roman Gold and Silver Denarii Coins */}
            <ellipse cx="65" cy="48" rx="12" ry="7" fill="#facc15" stroke="#222" strokeWidth="2" />
            <text x="65" y="50" fontSize="6" fontWeight="bold" fontFamily="'Cinzel', serif" textAnchor="middle" fill="#78350f">SPQR</text>
            <ellipse cx="58" cy="53" rx="10" ry="6" fill="#e2e8f0" stroke="#222" strokeWidth="1.5" />
            <ellipse cx="74" cy="53" rx="9" ry="5.5" fill="#facc15" stroke="#222" strokeWidth="1.5" />
          </g>

          {/* Milestone sign on the road */}
          <g transform="translate(15, 175)">
            <rect x="0" y="0" width="16" height="35" rx="3" fill="#e7e5e4" stroke="#222" strokeWidth="2" />
            <text x="8" y="14" fontSize="5.5" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle" fill="#881337">VIA</text>
            <text x="8" y="24" fontSize="5" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle" fill="#881337">ROMA</text>
          </g>
        </svg>
      );

    case 'empire_crisis':
      return (
        <svg viewBox="0 0 400 240" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="sky_crisis" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="50%" stopColor="#991b1b" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>
          </defs>
          <rect width="400" height="240" fill="url(#sky_crisis)" />

          {/* Burning Rome / Barbarian Invasion skyline with smoke */}
          <path d="M0 160 L60 130 L110 155 L160 120 L210 150 L270 125 L330 155 L400 135 L400 240 L0 240 Z" fill="#1e293b" stroke="#0f172a" strokeWidth="2.5" />
          {/* Smoke clouds */}
          <circle cx="80" cy="110" r="22" fill="#334155" opacity="0.7" />
          <circle cx="170" cy="95" r="28" fill="#334155" opacity="0.6" />
          <circle cx="280" cy="100" r="25" fill="#334155" opacity="0.7" />

          {/* Broken Roman Stone Wall (Aurelian Wall breach) */}
          <path d="M-10 180 L180 180 L200 200 L230 180 L410 180 L410 240 L-10 240 Z" fill="#78716c" stroke="#222" strokeWidth="3" />
          {/* Cracked wall lines */}
          <path d="M70 185 L90 215 M150 185 L140 210 M290 185 L310 215" stroke="#44403c" strokeWidth="2" />

          {/* Division banner 395 dC (Occident vs Orient) */}
          <g transform="translate(130, 25)">
            <rect x="0" y="0" width="140" height="34" rx="6" fill="#1c0809" stroke="#d4af37" strokeWidth="2" />
            <text x="70" y="15" fontFamily="'Cinzel', serif" fontWeight="bold" fontSize="9" fill="#fde047" textAnchor="middle">DIVISIÓ DE TEODOSI (395)</text>
            <text x="70" y="27" fontFamily="sans-serif" fontSize="8" fill="#e2e8f0" textAnchor="middle">Occident (Roma) · Orient (Bizanci)</text>
          </g>

          {/* Barbarian Warrior with Winged Helmet (Visigoth / Alaric / Odoacre) */}
          <g transform="translate(60, 115)">
            {/* Tunic & trousers */}
            <path d="M10 40 Q25 35 40 40 L35 85 L15 85 Z" fill="#b45309" stroke="#222" strokeWidth="2.5" />
            {/* Round Barbarian Shield with metal boss */}
            <circle cx="10" cy="55" r="20" fill="#dc2626" stroke="#222" strokeWidth="2.5" />
            <circle cx="10" cy="55" r="7" fill="#facc15" stroke="#222" strokeWidth="2" />
            {/* Battle Axe (Francisca) */}
            <line x1="40" y1="25" x2="55" y2="75" stroke="#78350f" strokeWidth="3.5" />
            <polygon points="36,25 48,18 46,32" fill="#94a3b8" stroke="#222" strokeWidth="2" />

            {/* Head with mustache and Asterix-style big nose */}
            <circle cx="25" cy="22" r="13" fill="#fed7aa" stroke="#222" strokeWidth="2" />
            {/* Yellow bushy warrior mustache */}
            <path d="M14 26 Q25 36 36 26" stroke="#facc15" strokeWidth="4" strokeLinecap="round" />
            <ellipse cx="25" cy="18" rx="5" ry="4" fill="#f87171" stroke="#222" strokeWidth="1.5" />
            {/* Barbarian Helmet with Horns/Wings */}
            <path d="M12 16 Q25 4 38 16 Z" fill="#94a3b8" stroke="#222" strokeWidth="2" />
            {/* Horn left */}
            <path d="M12 12 Q5 5 2 12" stroke="#e2e8f0" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            {/* Horn right */}
            <path d="M38 12 Q45 5 48 12" stroke="#e2e8f0" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          </g>

          {/* Deposed Emperor Romulus Augustulus with fallen crown (476 dC) */}
          <g transform="translate(250, 125)">
            {/* Purple imperial toga on ground */}
            <path d="M15 45 Q30 35 45 45 L50 85 L10 85 Z" fill="#581c87" stroke="#222" strokeWidth="2.5" />
            <circle cx="30" cy="25" r="12" fill="#fed7aa" stroke="#222" strokeWidth="2" />
            <ellipse cx="38" cy="25" rx="4" ry="3.5" fill="#f87171" stroke="#222" strokeWidth="1.5" />
            <path d="M22 32 Q30 38 38 32" stroke="#7e22ce" strokeWidth="2" fill="none" />
            {/* Sad expression */}
            <circle cx="27" cy="21" r="1.5" fill="#111" />
            <circle cx="35" cy="21" r="1.5" fill="#111" />

            {/* Fallen golden crown on ground */}
            <polygon points="65,75 70,63 75,75 80,63 85,75" fill="#facc15" stroke="#222" strokeWidth="1.5" />
            <rect x="65" y="75" width="20" height="5" fill="#facc15" stroke="#222" strokeWidth="1.5" />
          </g>

          {/* Year 476 dC milestone tablet */}
          <g transform="translate(145, 170)">
            <rect x="0" y="0" width="110" height="40" rx="4" fill="#fef3c7" stroke="#78350f" strokeWidth="2" />
            <text x="55" y="16" fontFamily="'Cinzel', serif" fontWeight="900" fontSize="12" fill="#991b1b" textAnchor="middle">ANY 476 dC</text>
            <text x="55" y="30" fontFamily="sans-serif" fontWeight="bold" fontSize="7.5" fill="#78350f" textAnchor="middle">Fi de l'Antiguitat · Comença l'Edat Mitjana</text>
          </g>
        </svg>
      );
  }
}

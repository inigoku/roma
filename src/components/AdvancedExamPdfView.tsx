import React, { useState } from 'react';
import { 
  Printer, 
  FileText, 
  CheckCircle2, 
  Copy, 
  Check, 
  ArrowLeft, 
  GraduationCap, 
  Info,
  SlidersHorizontal,
  Sparkles,
  BookOpen,
  Download,
  ExternalLink,
  HelpCircle,
  X,
  AlertTriangle
} from 'lucide-react';
import { downloadPrintableFile, openInNewTabForPrint } from '../utils/printHelper';

interface AdvancedExamPdfViewProps {
  onBack?: () => void;
}

export const AdvancedExamPdfView: React.FC<AdvancedExamPdfViewProps> = ({ onBack }) => {
  // 'standard' = Nivell adaptat a 2n d'ESO (equilibrat, clar i complet per a un alumne de 10)
  // 'advanced' = Nivell ampliació / repte màxim (per a màxima profunditat acadèmica)
  const [difficulty, setDifficulty] = useState<'standard' | 'advanced'>('standard');
  const [showSolutions, setShowSolutions] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const getExamTitle = () => {
    const level = difficulty === 'standard' ? "2n d'ESO" : "Ampliació";
    const mode = showSolutions ? "Solucionari" : "Model d'Examen";
    return `Examen Roma Antiga - ${level} (${mode})`;
  };

  const getExamFilename = () => {
    const level = difficulty === 'standard' ? '2n-eso' : 'ampliacio';
    const mode = showSolutions ? 'solucions' : 'preguntes';
    return `examen-roma-antiga-${level}-${mode}`;
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 4500);
  };

  const handleDownloadHtml = () => {
    const ok = downloadPrintableFile('exam-printable-document', getExamFilename(), getExamTitle());
    if (ok) {
      triggerToast("Document HTML llest per imprimir descarregat! Obre'l al teu navegador i s'activarà el menú d'impressora o Desar com a PDF.");
    }
  };

  const handleOpenNewTab = () => {
    const ok = openInNewTabForPrint('exam-printable-document', getExamTitle());
    if (!ok) {
      handleDownloadHtml();
    } else {
      triggerToast("S'ha obert el document en una finestra nova llest per imprimir.");
    }
  };

  const handlePrint = () => {
    // Els navegadors dins d'un iframe sovint bloquegen window.print() o fallen en silenci.
    try {
      window.print();
      // Mostrem el panell per si el navegador no ha mostrat el diàleg
      setShowPrintModal(true);
    } catch (e) {
      console.warn("window.print() blocat pel navegador o iframe:", e);
      // Descarreguem automàticament el document llest per imprimir
      handleDownloadHtml();
      setShowPrintModal(true);
    }
  };

  const handleCopyText = () => {
    const content = document.getElementById('exam-printable-document');
    if (content) {
      navigator.clipboard.writeText(content.innerText);
      setCopied(true);
      triggerToast("Text complet copiat al porta-retalls! Ja el pots enganxar a Word o Google Docs.");
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-[#ede8dc] text-neutral-900 pb-16 font-sans">
      {/* Top Action Bar (Hidden in Print) */}
      <div className="no-print sticky top-0 z-50 bg-[#1c0809] border-b-2 border-[#b88c32] shadow-xl text-amber-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {onBack && (
              <button
                onClick={onBack}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-amber-200 hover:text-white transition-colors text-xs font-semibold cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Tornar</span>
              </button>
            )}
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-[#8b1e24] rounded-lg border border-amber-400/40 text-amber-200">
                <GraduationCap className="w-5 h-5" />
              </span>
              <div>
                <h2 className="font-cinzel font-bold text-sm sm:text-base tracking-wide text-white flex items-center gap-2">
                  Examen Imprimible de la Roma Antiga (PDF)
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold border ${
                    difficulty === 'standard' 
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                      : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  }`}>
                    {difficulty === 'standard' ? 'Nivell 2n d’ESO' : 'Nivell Ampliació'}
                  </span>
                </h2>
                <p className="text-[11px] text-amber-200/75 hidden sm:block">
                  Avaluació dels 9 temes del temari · Format estàndard DIN-A4 llest per imprimir o desar
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {/* Level Selector */}
            <div className="inline-flex rounded-lg bg-[#2b0f12] p-1 border border-[#9b722b]/60">
              <button
                onClick={() => setDifficulty('standard')}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  difficulty === 'standard'
                    ? 'bg-emerald-700 text-white shadow-xs font-bold'
                    : 'text-amber-200/70 hover:text-amber-100'
                }`}
                title="Nivell ajustat i clar per a un bon alumne de 2n d'ESO"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Nivell 2n d’ESO</span>
              </button>
              <button
                onClick={() => setDifficulty('advanced')}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  difficulty === 'advanced'
                    ? 'bg-[#8b1e24] text-white shadow-xs font-bold'
                    : 'text-amber-200/70 hover:text-amber-100'
                }`}
                title="Nivell superior d'aprofundiment acadèmic"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Nivell Ampliació</span>
              </button>
            </div>

            {/* View Mode Toggle */}
            <div className="inline-flex rounded-lg bg-[#2b0f12] p-1 border border-[#9b722b]/50">
              <button
                onClick={() => setShowSolutions(false)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  !showSolutions
                    ? 'bg-[#8b1e24] text-white shadow-xs'
                    : 'text-amber-200/70 hover:text-amber-100'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Examen</span> en Blanc
              </button>
              <button
                onClick={() => setShowSolutions(true)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  showSolutions
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-amber-200/70 hover:text-amber-100'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Solucionari</span>
              </button>
            </div>

            {/* Copy button */}
            <button
              onClick={handleCopyText}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-amber-200 bg-white/5 hover:bg-white/10 border border-amber-500/30 rounded-lg transition-colors cursor-pointer"
              title="Copiar el text complet per enganxar-lo a Word o Google Docs"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span className="hidden lg:inline">{copied ? 'Copiat!' : 'Copiar Text'}</span>
            </button>

            {/* Direct Download Printable File Button (Always works inside iframes!) */}
            <button
              onClick={handleDownloadHtml}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-lg shadow-md hover:shadow-lg transition-all transform active:scale-95 cursor-pointer border border-emerald-400/40"
              title="Descarrega el fitxer preparat per imprimir o desar en PDF amb 1 sol clic"
            >
              <Download className="w-4 h-4" />
              <span>Descarregar Imprimible (.html / PDF)</span>
            </button>

            {/* Print / Save to PDF Button */}
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold text-xs sm:text-sm rounded-lg shadow-md hover:shadow-lg transition-all transform active:scale-95 cursor-pointer"
              title="Obrir el diàleg d'impressora o desar en PDF"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir</span>
            </button>

            {/* Print Help / Options Modal Button */}
            <button
              onClick={() => setShowPrintModal(true)}
              className="flex items-center gap-1 px-2 py-1.5 bg-white/10 hover:bg-white/20 text-amber-200 rounded-lg text-xs font-semibold cursor-pointer border border-amber-400/30"
              title="Com imprimir si el teu navegador bloqueja la impressió directa"
            >
              <HelpCircle className="w-4 h-4 text-amber-300" />
              <span className="hidden sm:inline">Ajuda</span>
            </button>
          </div>
        </div>

        {/* Informative notification subbar */}
        <div className="bg-[#120405] border-t border-[#3b1518] px-4 py-1.5 text-[11px] text-amber-200/90 text-center flex items-center justify-center gap-2">
          <Info className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>
            {difficulty === 'standard' 
              ? 'Nivell 2n d’ESO actiu: preguntes assequibles, ben guiades i que cobreixen completament els 9 temes.'
              : 'Nivell Ampliació actiu: anàlisi aprofundida de fonts clàssiques i causals per a màxim repte intel·lectual.'}
            {' '}
            {showSolutions
              ? '(Mostrant Solucionari amb respostes model).'
              : '(Format examen per respondre a mà o amb ordinador).'}
          </span>
        </div>
      </div>

      {/* Main Printable Container (A4 layout styling) */}
      <div className="max-w-4xl mx-auto my-6 px-3 sm:px-6">
        <div
          id="exam-printable-document"
          className="bg-white text-neutral-900 shadow-2xl rounded-xl sm:border sm:border-neutral-300 p-6 sm:p-10 print:p-0 print:border-none print:shadow-none print:rounded-none"
          style={{ fontFamily: "'Plus Jakarta Sans', Georgia, serif" }}
        >
          {/* =========================================================================
              HEADER OF THE EXAM (STANDARD OR ADVANCED)
             ========================================================================= */}
          <div className="border-b-2 border-neutral-900 pb-4 mb-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-900 text-amber-300 font-cinzel font-black flex items-center justify-center text-lg rounded border-2 border-amber-500 shadow-inner shrink-0 print:border-neutral-900">
                  SPQR
                </div>
                <div>
                  <h3 className="font-cinzel text-[11px] font-bold tracking-wider text-red-950 uppercase print:text-neutral-900">
                    Departament de Ciències Socials, Geografia i Història · 2n d’ESO
                  </h3>
                  <h1 className="font-cinzel text-lg sm:text-xl font-black text-neutral-900 mt-0.5 tracking-tight leading-snug">
                    {difficulty === 'standard'
                      ? 'PROVA D’AVALUACIÓ GLOBAL: LA ROMA ANTIGA'
                      : 'PROVA EXTRAORDINÀRIA D’APROFUNDIMENT: LA ROMA ANTIGA'}
                  </h1>
                  <p className="text-xs font-semibold text-neutral-700">
                    Dels orígens de la ciutat a la caiguda de l'Imperi Romà d'Occident (753 aC – 476 dC)
                  </p>
                  <p className="text-[10px] text-neutral-500 italic">
                    {difficulty === 'standard'
                      ? 'Cobreix els 9 temes del temari oficial: Monarquia, República, Guerres Púniques, Crisi, Cèsar, Imperi, Romanització i Cristianisme'
                      : 'Nivell d’excel·lència i aprofundiment conceptual per a alumnes amb domini avançat del temari'}
                  </p>
                </div>
              </div>

              {/* Status Badge */}
              <div className="text-right shrink-0">
                <div className={`px-2.5 py-1 rounded text-[11px] font-bold border inline-block ${
                  showSolutions 
                    ? 'bg-amber-100 text-amber-900 border-amber-400' 
                    : 'bg-neutral-100 text-neutral-800 border-neutral-400'
                }`}>
                  {showSolutions ? 'SOLUCIONARI DOCENT' : 'MODEL D’EXAMEN'}
                </div>
                <div className="text-[10px] text-neutral-500 mt-1 font-mono font-bold">Puntuació: /10.0 punts</div>
              </div>
            </div>

            {/* Student Info Box */}
            <div className="mt-4 grid grid-cols-12 gap-3 text-xs border border-neutral-800 rounded p-2.5 bg-neutral-50/70 print:bg-white print:border-neutral-900">
              <div className="col-span-12 sm:col-span-6 flex items-center gap-2">
                <span className="font-bold text-neutral-800">Nom i cognoms de l'alumne/a:</span>
                <span className="border-b border-dotted border-neutral-600 flex-1 h-5 inline-block"></span>
              </div>
              <div className="col-span-6 sm:col-span-3 flex items-center gap-2">
                <span className="font-bold text-neutral-800">Curs i Grup:</span>
                <span className="border-b border-dotted border-neutral-600 flex-1 h-5 inline-block"></span>
              </div>
              <div className="col-span-6 sm:col-span-3 flex items-center gap-2">
                <span className="font-bold text-neutral-800">Data:</span>
                <span className="border-b border-dotted border-neutral-600 flex-1 h-5 inline-block"></span>
              </div>

              <div className="col-span-12 pt-2 border-t border-neutral-300 grid grid-cols-12 gap-2 text-[11px]">
                <div className="col-span-4 sm:col-span-4">
                  <span className="font-bold text-neutral-700">Temps recomanat:</span> 55-60 minuts
                </div>
                <div className="col-span-4 sm:col-span-4 text-center">
                  <span className="font-bold text-neutral-700">Criteris:</span> Claredat i precisió històrica
                </div>
                <div className="col-span-4 sm:col-span-4 text-right">
                  <span className="font-bold text-neutral-900 bg-amber-200/80 px-2 py-0.5 rounded border border-amber-400">
                    Nota final: _____ / 10
                  </span>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="mt-2.5 text-[11px] text-neutral-600 leading-relaxed bg-amber-50/50 p-2 rounded border border-amber-200/70 print:bg-white print:border-neutral-300">
              <strong>Instruccions:</strong> Llegeix atentament cadascuna de les preguntes abans de respondre. Respon amb frases completes, utilitzant el vocabulari històric treballat a classe (com patricis, plebeus, senat, legions, calçades, edicte, etc.). L'examen consta de 5 parts i suma un total de 10 punts.
            </div>
          </div>

          {/* =========================================================================
              EXAM BODY: STANDARD LEVEL (2n d'ESO - ACCESSIBLE, CLEAR & BALANCED)
             ========================================================================= */}
          {difficulty === 'standard' ? (
            <div>
              {/* BLOC 1: COMPRENSIÓ DE TEXT I PERSONATGES CLAU (2.0 PUNTS) */}
              <section className="mb-6 print-avoid-break">
                <div className="flex items-center justify-between bg-neutral-900 text-white px-3 py-1.5 rounded-t font-cinzel text-xs font-bold tracking-wide">
                  <span>BLOC 1: TEXT HISTÒRIC I COMPRENSIÓ (JULI CÈSAR I EL RUBICÓ)</span>
                  <span className="text-amber-300 font-mono">2.0 PUNTS</span>
                </div>
                <div className="border border-neutral-900 border-t-0 p-4 rounded-b space-y-4">
                  <div className="bg-amber-50/60 border-l-4 border-red-800 p-3 italic text-xs text-neutral-800 leading-relaxed print:bg-white">
                    <p className="font-bold not-italic font-cinzel text-neutral-900 mb-1">
                      Lectura adaptada: Juli Cèsar pren una decisió històrica (any 49 aC)
                    </p>
                    «Després de deu anys de campanyes militars, Juli Cèsar havia conquerit la Gàl·lia i s'havia convertit en el general més aclamat pel poble i pels seus soldats. Tanmateix, a Roma, els membres del Senat i el seu antic aliat Pompeu tenien por que Cèsar acumulés massa poder i volgués manar sol com un rei. Per això, el Senat li va exigir que dissolgués les seves legions i tornés a Roma com un ciutadà particular, sense armes.
                    Cèsar va arribar amb la seva estimada Legió XIII a la riba del riu Rubicó, un petit curs d'aigua que marcava la frontera sagrada d'Itàlia. Segons la llei de la República, cap general podia creuar aquest límit acompanyat de soldats armats, perquè això es considerava un cop d'estat i una declaració de guerra.
                    Cèsar es va aturar uns instants pensatiu i va dir als seus oficials: "Si no passo el riu, em destruiran a mi; però si el passo, començarà una gran guerra civil". Llavors, prenent la decisió definitiva, va exclamar la famosa frase: "Alea iacta est!" (La sort està tirada!) i va ordenar a les seves legions avançar cap a Roma.»
                  </div>

                  {/* Q 1.1 */}
                  <div className="space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-bold text-neutral-900">
                        1.1. Per què el Senat de Roma tenia por de Juli Cèsar i quina ordre li van enviar quan va acabar de conquerir la Gàl·lia?
                      </p>
                      <span className="text-[11px] font-mono text-neutral-600 font-bold shrink-0">[0.70 p.]</span>
                    </div>
                    {showSolutions ? (
                      <div className="bg-emerald-50 border border-emerald-400 rounded p-2 text-xs text-emerald-950">
                        <strong>Resposta model:</strong> El Senat i Pompeu temien Cèsar perquè s'havia fet immensament popular, ric i poderós gràcies a la victòria a la Gàl·lia, i tenien por que volgués proclamar-se tirà o rei de Roma. Per això, li van ordenar dissoldre el seu exèrcit (les seves legions) i tornar a Roma desarmat com un ciutadà qualsevol.
                      </div>
                    ) : (
                      <div className="space-y-1.5 pt-1">
                        <div className="border-b border-dotted border-neutral-400 h-5"></div>
                        <div className="border-b border-dotted border-neutral-400 h-5"></div>
                      </div>
                    )}
                  </div>

                  {/* Q 1.2 */}
                  <div className="space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-bold text-neutral-900">
                        1.2. Quina norma sagrada prohibia creuar el riu Rubicó amb soldats i què va significar la famosa frase <em>«Alea iacta est»</em>?
                      </p>
                      <span className="text-[11px] font-mono text-neutral-600 font-bold shrink-0">[0.70 p.]</span>
                    </div>
                    {showSolutions ? (
                      <div className="bg-emerald-50 border border-emerald-400 rounded p-2 text-xs text-emerald-950">
                        <strong>Resposta model:</strong> El riu Rubicó marcava la frontera militar d'Itàlia; la llei de la República prohibia que cap general hi entrés amb legions armades sense autorització del Senat, ja que era considerat alta traïció i inici de rebel·lió. La frase «Alea iacta est» (la sort està tirada) significava que ja no hi havia marxa enrere i que el seu destí es decidiria a les armes en una guerra civil.
                      </div>
                    ) : (
                      <div className="space-y-1.5 pt-1">
                        <div className="border-b border-dotted border-neutral-400 h-5"></div>
                        <div className="border-b border-dotted border-neutral-400 h-5"></div>
                      </div>
                    )}
                  </div>

                  {/* Q 1.3 */}
                  <div className="space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-bold text-neutral-900">
                        1.3. Després de la mort de Cèsar (44 aC), el seu fill adoptiu Octavi August va concentrar tot el poder l'any 27 aC. Com s'anomena aquesta nova etapa de Roma i quin títol va adoptar August en comptes de dir-se "rei"?
                      </p>
                      <span className="text-[11px] font-mono text-neutral-600 font-bold shrink-0">[0.60 p.]</span>
                    </div>
                    {showSolutions ? (
                      <div className="bg-emerald-50 border border-emerald-400 rounded p-2 text-xs text-emerald-950">
                        <strong>Resposta model:</strong> S'anomena l'<strong>Imperi Romà</strong>. August va evitar anomenar-se "rei" (un títol molt odiat a Roma que havia causat l'assassinat de Cèsar) i va adoptar títols com a <strong>Emperador (Imperator)</strong>, <strong>Príncep (Princeps</strong>, primer ciutadà) i <strong>August</strong> (beneït pels déus), controlant l'exèrcit i el Senat.
                      </div>
                    ) : (
                      <div className="space-y-1.5 pt-1">
                        <div className="border-b border-dotted border-neutral-400 h-5"></div>
                        <div className="border-b border-dotted border-neutral-400 h-5"></div>
                      </div>
                    )}
                  </div>
                </div>
              </section>

              {/* BLOC 2: PREGUNTES CURTES DELS 9 TEMES (3.0 PUNTS) */}
              <section className="mb-6 print-avoid-break">
                <div className="flex items-center justify-between bg-neutral-900 text-white px-3 py-1.5 rounded-t font-cinzel text-xs font-bold tracking-wide">
                  <span>BLOC 2: PREGUNTES DEL TEMARI (6 PREGUNTES DIRECTES)</span>
                  <span className="text-amber-300 font-mono">3.0 PUNTS (6 x 0.50 p.)</span>
                </div>
                <div className="border border-neutral-900 border-t-0 p-4 rounded-b space-y-4">
                  {/* 2.1 Monarquia */}
                  <div className="space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-bold text-neutral-900">
                        2.1. [Tema 1: Orígens i Monarquia] Quina diferència hi ha entre la llegenda de Ròmul i Rem i l'origen històric real de Roma? Esmenta una millora important que els reis etruscos van construir a la ciutat.
                      </p>
                      <span className="text-[11px] font-mono text-neutral-600 font-bold shrink-0">[0.50 p.]</span>
                    </div>
                    {showSolutions ? (
                      <div className="bg-emerald-50 border border-emerald-400 rounded p-2 text-xs text-emerald-950">
                        <strong>Resposta model:</strong> La llegenda diu que Roma la van fundar dos germans bessons amamantats per una lloba l'any 753 aC. La realitat històrica demostra que va néixer de la unió de diversos poblats de pastors i agricultors llatins al turó Palatí, al costat del riu Tíber. Els etruscos van transformar aquests poblats en una veritable ciutat: van construir la <strong>Cloaca Màxima</strong> (clavegueram per assecar els pantans), les primeres muralles de pedra i el temple de Júpiter.
                      </div>
                    ) : (
                      <div className="space-y-1.5 pt-1">
                        <div className="border-b border-dotted border-neutral-400 h-5"></div>
                        <div className="border-b border-dotted border-neutral-400 h-5"></div>
                      </div>
                    )}
                  </div>

                  {/* 2.2 República */}
                  <div className="space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-bold text-neutral-900">
                        2.2. [Tema 2: La República i Societat] Explica qui eren els <strong>patricis</strong> i qui eren els <strong>plebeus</strong>. Quin càrrec van aconseguir els plebeus per defensar-se de les injustícies patrícees?
                      </p>
                      <span className="text-[11px] font-mono text-neutral-600 font-bold shrink-0">[0.50 p.]</span>
                    </div>
                    {showSolutions ? (
                      <div className="bg-emerald-50 border border-emerald-400 rounded p-2 text-xs text-emerald-950">
                        <strong>Resposta model:</strong> Els <strong>patricis</strong> eren la minoria aristocràtica rica, propietària de les millors terres i els únics que governaven. Els <strong>plebeus</strong> eren la majoria de la població lliure (camperols, artesans, comerciants) que pagaven impostos i lluitaven a l'exèrcit però no tenien drets polítics. Després de la vaga del Mont Sacre, els plebeus van aconseguir el <strong>Tribú de la Plebs</strong> (un magistrat amb poder de vet per protegir-los) i la <strong>Llei de les XII Taules</strong> (lleis escrites iguals per a tothom).
                      </div>
                    ) : (
                      <div className="space-y-1.5 pt-1">
                        <div className="border-b border-dotted border-neutral-400 h-5"></div>
                        <div className="border-b border-dotted border-neutral-400 h-5"></div>
                      </div>
                    )}
                  </div>

                  {/* 2.3 Guerres Púniques */}
                  <div className="space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-bold text-neutral-900">
                        2.3. [Temes 3 i 4: Guerres Púniques i Mare Nostrum] Contra quina gran ciutat del nord d'Àfrica va lluitar Roma durant les Guerres Púniques? Qui va ser Anníbal i per què els romans van començar a anomenar el mar Mediterrani <em>«Mare Nostrum»</em>?
                      </p>
                      <span className="text-[11px] font-mono text-neutral-600 font-bold shrink-0">[0.50 p.]</span>
                    </div>
                    {showSolutions ? (
                      <div className="bg-emerald-50 border border-emerald-400 rounded p-2 text-xs text-emerald-950">
                        <strong>Resposta model:</strong> Roma va lluitar contra <strong>Cartago</strong> pel control del Mediterrani occidental. <strong>Anníbal Barca</strong> va ser el cèlebre general cartaginès que va travessar els Pirineus i els Alps amb elefants de guerra per envair Itàlia. Després de derrotar Cartago a la batalla de Zama (202 aC), Roma es va convertir en l'única gran potència naval i territorial del Mediterrani, anomenant-lo «Mare Nostrum» (el nostre mar) perquè dominava totes les seves costes.
                      </div>
                    ) : (
                      <div className="space-y-1.5 pt-1">
                        <div className="border-b border-dotted border-neutral-400 h-5"></div>
                        <div className="border-b border-dotted border-neutral-400 h-5"></div>
                      </div>
                    )}
                  </div>

                  {/* 2.4 Crisi República */}
                  <div className="space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-bold text-neutral-900">
                        2.4. [Tema 5: La Crisi del Segle I aC] Per què les grans conquestes militars van enriquir els nobles patricis amb <em>latifundis</em> d'esclaus però en canvi van arruïnar milers de petits camperols romans lliures?
                      </p>
                      <span className="text-[11px] font-mono text-neutral-600 font-bold shrink-0">[0.50 p.]</span>
                    </div>
                    {showSolutions ? (
                      <div className="bg-emerald-50 border border-emerald-400 rounded p-2 text-xs text-emerald-950">
                        <strong>Resposta model:</strong> Els petits camperols havien de marxar durant molts anys a fer de soldats a les guerres llunyanes; en tornar, trobaven els seus camps arruïnats. A més, no podien competir amb els patricis rics, que creaven enormes finques (latifundis) utilitzant mà d'obra gratuïta de milers de presoners de guerra convertits en esclaus. Per això, molts camperols van haver de vendre les seves terres i emigrar a la ciutat de Roma sense feina.
                      </div>
                    ) : (
                      <div className="space-y-1.5 pt-1">
                        <div className="border-b border-dotted border-neutral-400 h-5"></div>
                        <div className="border-b border-dotted border-neutral-400 h-5"></div>
                      </div>
                    )}
                  </div>

                  {/* 2.5 Romanització */}
                  <div className="space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-bold text-neutral-900">
                        2.5. [Temes 7 i 8: La Romanització i les Ciutats] Què entenem per <strong>romanització</strong>? Esmenta 3 elements o costums romans que els pobles d'Hispània van adoptar (ex: llengua, monuments, lleis, etc.).
                      </p>
                      <span className="text-[11px] font-mono text-neutral-600 font-bold shrink-0">[0.50 p.]</span>
                    </div>
                    {showSolutions ? (
                      <div className="bg-emerald-50 border border-emerald-400 rounded p-2 text-xs text-emerald-950">
                        <strong>Resposta model:</strong> La romanització és el procés pel qual els pobles conquerits per Roma van anar adoptant la forma de vida, la cultura i les lleis romanes. Tres elements fonamentals van ser: 1) <strong>La llengua llatina</strong> (de la qual deriven el català i el castellà); 2) <strong>La vida urbana i les grans obres públiques</strong> (aqüeductes, teatres, termes, calçades com la Via Augusta); 3) <strong>El Dret Romà</strong> i la moneda comuna.
                      </div>
                    ) : (
                      <div className="space-y-1.5 pt-1">
                        <div className="border-b border-dotted border-neutral-400 h-5"></div>
                        <div className="border-b border-dotted border-neutral-400 h-5"></div>
                      </div>
                    )}
                  </div>

                  {/* 2.6 Cristianisme i Fi */}
                  <div className="space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-bold text-neutral-900">
                        2.6. [Temes 8 i 9: El Cristianisme i la Caiguda de l'Imperi] Per què els romans perseguien inicialment els cristians i quin emperador va donar llibertat religiosa amb l'Edicte de Milà (313 dC)? Quin any es va produir la caiguda de l'Imperi Romà d'Occident?
                      </p>
                      <span className="text-[11px] font-mono text-neutral-600 font-bold shrink-0">[0.50 p.]</span>
                    </div>
                    {showSolutions ? (
                      <div className="bg-emerald-50 border border-emerald-400 rounded p-2 text-xs text-emerald-950">
                        <strong>Resposta model:</strong> Eren perseguits perquè la seva religió monoteista els prohibia adorar els déus romans oficials i es negaven a retre culte a l'emperador com a déu, fet que les autoritats consideraven un acte de rebel·lió. L'emperador <strong>Constantí el Gran</strong> va aturar les persecucions i va concedir la llibertat religiosa amb l'<strong>Edicte de Milà l'any 313 dC</strong>. L'Imperi Romà d'Occident va caure definitivament l'any <strong>476 dC</strong> quan el darrer emperador, Ròmul Augústul, va ser deposat pel rei germànic Odoacre.
                      </div>
                    ) : (
                      <div className="space-y-1.5 pt-1">
                        <div className="border-b border-dotted border-neutral-400 h-5"></div>
                        <div className="border-b border-dotted border-neutral-400 h-5"></div>
                      </div>
                    )}
                  </div>
                </div>
              </section>

              {/* BLOC 3: RELACIONAR CONCEPTES I DEFINICIONS (1.5 PUNTS) */}
              <section className="mb-6 print-avoid-break">
                <div className="flex items-center justify-between bg-neutral-900 text-white px-3 py-1.5 rounded-t font-cinzel text-xs font-bold tracking-wide">
                  <span>BLOC 3: CONCEPTES I ELEMENTS CLAU DE LA ROMA ANTIGA</span>
                  <span className="text-amber-300 font-mono">1.5 PUNTS (6 x 0.25 p.)</span>
                </div>
                <div className="border border-neutral-900 border-t-0 p-4 rounded-b">
                  <p className="text-xs text-neutral-700 mb-3">
                    Relaciona cada concepte romà de la columna esquerra amb la seva explicació corresponent escrivint la lletra correcta entre els parèntesis:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    {/* Concept column */}
                    <div className="space-y-2 bg-neutral-50 p-3 rounded border border-neutral-200">
                      <p className="font-bold text-neutral-900 uppercase tracking-wider text-[11px] border-b pb-1">
                        Conceptes Romans
                      </p>
                      <div><strong>[ A ]</strong> Senat Romà</div>
                      <div><strong>[ B ]</strong> Aqüeducte</div>
                      <div><strong>[ C ]</strong> Via Augusta</div>
                      <div><strong>[ D ]</strong> Pax Romana</div>
                      <div><strong>[ E ]</strong> Limes</div>
                      <div><strong>[ F ]</strong> Pobles germànics (bàrbars)</div>
                    </div>

                    {/* Definitions column */}
                    <div className="space-y-2">
                      <p className="font-bold text-neutral-900 uppercase tracking-wider text-[11px] border-b pb-1">
                        Definicions i Funcions
                      </p>

                      <div className="flex items-start gap-2">
                        <span className="font-bold font-mono text-red-900 min-w-8">
                          {showSolutions ? '( B )' : '(   )'}
                        </span>
                        <span>Gran construcció d'enginyeria amb arcs que portava aigua neta des de la muntanya fins a les ciutats.</span>
                      </div>

                      <div className="flex items-start gap-2">
                        <span className="font-bold font-mono text-red-900 min-w-8">
                          {showSolutions ? '( A )' : '(   )'}
                        </span>
                        <span>Assemblea principal formada per patricis i ciutadans il·lustres que dirigia la política exterior i les finances.</span>
                      </div>

                      <div className="flex items-start gap-2">
                        <span className="font-bold font-mono text-red-900 min-w-8">
                          {showSolutions ? '( D )' : '(   )'}
                        </span>
                        <span>Període de gran pau, ordre i prosperitat als segles I i II dC iniciat per l'emperador Octavi August.</span>
                      </div>

                      <div className="flex items-start gap-2">
                        <span className="font-bold font-mono text-red-900 min-w-8">
                          {showSolutions ? '( C )' : '(   )'}
                        </span>
                        <span>La calçada romana principal que recorria tota la costa del Mediterrani, des dels Pirineus fins a Cadis.</span>
                      </div>

                      <div className="flex items-start gap-2">
                        <span className="font-bold font-mono text-red-900 min-w-8">
                          {showSolutions ? '( E )' : '(   )'}
                        </span>
                        <span>Frontera fortificada de l'Imperi defensada per legions militars, torres de vigilància i muralles.</span>
                      </div>

                      <div className="flex items-start gap-2">
                        <span className="font-bold font-mono text-red-900 min-w-8">
                          {showSolutions ? '( F )' : '(   )'}
                        </span>
                        <span>Pobles del nord i est d'Europa (visigots, vàndals, francs...) que van penetrar i posar fi a l'Imperi d'Occident.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* BLOC 4: EIX CRONOLÒGIC I ETAPES (1.5 PUNTS) */}
              <section className="mb-6 print-page-break print-avoid-break">
                <div className="flex items-center justify-between bg-neutral-900 text-white px-3 py-1.5 rounded-t font-cinzel text-xs font-bold tracking-wide">
                  <span>BLOC 4: EIX CRONOLÒGIC I ETAPES HISTÒRIQUES</span>
                  <span className="text-amber-300 font-mono">1.5 PUNTS</span>
                </div>
                <div className="border border-neutral-900 border-t-0 p-4 rounded-b space-y-3">
                  <p className="text-xs text-neutral-700">
                    Ordena cronològicament els següents 6 esdeveniments de l'<strong>1 al 6</strong> (de més antic a més modern) i escriu a quina etapa correspon cadascun (<strong>Monarquia</strong>, <strong>República</strong> o <strong>Imperi Romà</strong>):
                  </p>

                  <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse border border-neutral-300">
                      <thead>
                        <tr className="bg-neutral-100 text-neutral-900 text-left">
                          <th className="border border-neutral-300 p-2 w-12 text-center">Ordre</th>
                          <th className="border border-neutral-300 p-2">Fet Històric</th>
                          <th className="border border-neutral-300 p-2 w-28 text-center">Data / Any</th>
                          <th className="border border-neutral-300 p-2 w-36 text-center">Etapa de Roma</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {
                            order: '2',
                            event: "Expulsió de l'últim rei Tarquini el Superb i proclamació de la República.",
                            date: '509 aC',
                            stage: 'República'
                          },
                          {
                            order: '4',
                            event: "Octavi rep del Senat el títol d'August i comença l'etapa imperial.",
                            date: '27 aC',
                            stage: 'Imperi Romà'
                          },
                          {
                            order: '1',
                            event: "Fundació llegendària de Roma per Ròmul i Rem al turó Palatí.",
                            date: '753 aC',
                            stage: 'Monarquia'
                          },
                          {
                            order: '5',
                            event: "L'emperador Constantí autoritza el cristianisme amb l'Edicte de Milà.",
                            date: '313 dC',
                            stage: 'Imperi Romà'
                          },
                          {
                            order: '3',
                            event: "Desembarcament dels romans a Empúries durant la Segona Guerra Púnica.",
                            date: '218 aC',
                            stage: 'República'
                          },
                          {
                            order: '6',
                            event: "Deposició de Ròmul Augústul i caiguda de l'Imperi Romà d'Occident.",
                            date: '476 dC',
                            stage: 'Fi de l’Imperi Romà'
                          }
                        ].map((row, idx) => (
                          <tr key={idx} className="hover:bg-neutral-50">
                            <td className="border border-neutral-300 p-2 text-center font-bold font-mono">
                              {showSolutions ? row.order : '___'}
                            </td>
                            <td className="border border-neutral-300 p-2 font-medium">
                              {row.event}
                            </td>
                            <td className="border border-neutral-300 p-2 text-center font-mono text-[11px]">
                              {showSolutions ? (
                                <span className="font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded">
                                  {row.date}
                                </span>
                              ) : (
                                '________'
                              )}
                            </td>
                            <td className="border border-neutral-300 p-2 text-center text-[11px]">
                              {showSolutions ? (
                                <span className="font-semibold text-neutral-800">
                                  {row.stage}
                                </span>
                              ) : (
                                '____________'
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

              {/* BLOC 5: PETITA REDACCIÓ GUIADA (2.0 PUNTS) */}
              <section className="mb-6 print-avoid-break">
                <div className="flex items-center justify-between bg-neutral-900 text-white px-3 py-1.5 rounded-t font-cinzel text-xs font-bold tracking-wide">
                  <span>BLOC 5: BREU REDACCIÓ GUIADA SOBRE LA VIDA A ROMA</span>
                  <span className="text-amber-300 font-mono">2.0 PUNTS</span>
                </div>
                <div className="border border-neutral-900 border-t-0 p-4 rounded-b space-y-3">
                  <div className="text-xs text-neutral-800 space-y-1">
                    <p className="font-bold">
                      Tema de la redacció: «Com era la vida en una ciutat romana com Tàrraco (Tarragona)?»
                    </p>
                    <p className="text-[11px] text-neutral-600">
                      Escriu una composició breu i ben organitzada (d'unes 8 a 10 línies) responent clarament a aquests tres punts:
                    </p>
                    <ol className="list-decimal pl-5 text-[11px] text-neutral-700 space-y-1">
                      <li><strong>On vivien els habitants:</strong> Quina diferència hi havia entre la casa d'una família rica (<em>domus</em>) i els blocs de pisos de la gent senzilla (<em>insulae</em>)?</li>
                      <li><strong>La vida pública:</strong> Quins edificis o llocs visitaven els ciutadans per reunir-se, comprar o divertir-se (com el Fòrum, les termes, el teatre o el circ)?</li>
                      <li><strong>L'herència romana:</strong> Quines coses dels romans continuem utilitzant nosaltres avui dia (per exemple, les nostres ciutats, la llengua, les lleis o els monuments)?</li>
                    </ol>
                  </div>

                  {showSolutions ? (
                    <div className="bg-emerald-50 border border-emerald-400 rounded p-3 text-xs text-emerald-950 space-y-2">
                      <p className="font-bold text-emerald-900 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" /> Resposta Model & Rúbrica de Qualificació (2.0 punts):
                      </p>
                      <p className="leading-relaxed">
                        A les ciutats romanes com Tàrraco hi havia grans diferències en la manera de viure. Les famílies riques vivien en luxoses cases individuals anomenades <strong>domus</strong>, amb un pati central descobert (atri) per recollir l'aigua de la pluja, mosaics a terra i estances còmodes. En canvi, la gent humil i els treballadors vivien en edificis de pisos estrets de fusta i maó anomenats <strong>insulae</strong>, que sovint patien incendis i no tenien aigua corrent.
                      </p>
                      <p className="leading-relaxed">
                        Els ciutadans passaven gran part del dia al carrer. Al matí anaven al <strong>Fòrum</strong> per parlar de política, fer compres al mercat i resar als temples. A la tarda anaven a relaxar-se a les <strong>termes</strong> (banys públics amb aigua calenta i freda) o assistien a espectacles gratuïts: curses de quadrigues al <strong>circ</strong>, obres de teatre o lluites de gladiadors a l'<strong>amfiteatre</strong>. Avui dia encara conservem una enorme herència romana: la nostra llengua (el català prové del llatí vulgar), el traçat de moltes ciutats i carreteres, el dret i les lleis, i monuments com l'aqüeducte de Tarragona.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2 pt-1">
                      {Array.from({ length: 9 }).map((_, i) => (
                        <div key={i} className="border-b border-dotted border-neutral-400 h-5"></div>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            </div>
          ) : (
            /* =========================================================================
               EXAM BODY: ADVANCED / AMPLIFICACIÓ LEVEL (PRESERVED HIGH CHALLENGE)
               ========================================================================= */
            <div>
              {/* ADVANCED BLOC 1 */}
              <section className="mb-6 print-avoid-break">
                <div className="flex items-center justify-between bg-neutral-900 text-white px-3 py-1.5 rounded-t font-cinzel text-xs font-bold tracking-wide">
                  <span>BLOC 1: COMENTARI DE TEXT I FONTS HISTÒRIQUES (NIVELL AVANÇAT)</span>
                  <span className="text-amber-300 font-mono">2.0 PUNTS</span>
                </div>
                <div className="border border-neutral-900 border-t-0 p-4 rounded-b space-y-4">
                  <div className="bg-amber-50/50 border-l-4 border-red-800 p-3 italic text-xs text-neutral-800 leading-relaxed print:bg-white">
                    <p className="font-bold not-italic font-cinzel text-neutral-900 mb-1">
                      Font Històrica: Gai Suetoni Tranquil, «Vida dels dotze cèsars: Juli Cèsar», 31-32
                    </p>
                    «Quan la notícia va arribar que la intercessió dels tribuns havia estat rebutjada i que ells mateixos havien hagut d'abandonar Roma, Cèsar va aturar-se a la vora del riu Rubicó, que era el límit de la seva província de la Gàl·lia Cisalpina. Tornant-se cap als qui l'acompanyaven, va dir: “Fins aquest moment, companys, encara podem retrocedir; però si travessem aquest petit pont, tot haurà de decidir-se per les armes”. Mentre dubtava, va exclamar amb veu ferma: “Anem allà on els prodigis dels déus i la injustícia dels nostres enemics ens criden. La sort està tirada (Alea iacta est!)”. I manant a la Legió XIII travessar el curs d'aigua, va iniciar la marxa sobre Itàlia.»
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-bold text-neutral-900">
                        1.1. Contextualitza històricament el text (any 49 aC): Quina llei sagrada de la República violava Cèsar en travessar el Rubicó amb legions armades i per què el Senat encapçalat per Pompeu considerava aquest acte com una declaració de guerra civil?
                      </p>
                      <span className="text-[11px] font-mono text-neutral-600 font-bold shrink-0">[0.75 p.]</span>
                    </div>
                    {showSolutions ? (
                      <div className="bg-emerald-50 border border-emerald-400 rounded p-2.5 text-xs text-emerald-950">
                        El Rubicó delimitava la frontera entre la província militar de la Gàl·lia Cisalpina i el territori cívic d'Itàlia (on imperava la llei romana). Cap general amb comandament militar (<em>imperium</em>) podia traspassar aquest límit acompanyat d'un exèrcit en armes sense llicència del Senat romà. En creuar armat, Cèsar desafiava l'autoritat del Senat fent inevitable la guerra civil.
                      </div>
                    ) : (
                      <div className="space-y-1.5 pt-1">
                        <div className="border-b border-dotted border-neutral-400 h-5"></div>
                        <div className="border-b border-dotted border-neutral-400 h-5"></div>
                        <div className="border-b border-dotted border-neutral-400 h-5"></div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-bold text-neutral-900">
                        1.2. De Cèsar a August: Com va aconseguir el seu fill adoptiu Octavi August (a partir del 27 aC) concentrar tot el poder absolut sense proclamar-se rei i mantenint l'aparença de la República?
                      </p>
                      <span className="text-[11px] font-mono text-neutral-600 font-bold shrink-0">[0.75 p.]</span>
                    </div>
                    {showSolutions ? (
                      <div className="bg-emerald-50 border border-emerald-400 rounded p-2.5 text-xs text-emerald-950">
                        Va mantenir nominalment el Senat, els comicis i els magistrats, però va concentrar en la seva persona els títols de Príncep (cap del Senat), Imperator (comandant suprem de l'exèrcit), Potestat Tribunícia (inviolabilitat i dret de vet) i Pontífex Màxim (cap de la religió).
                      </div>
                    ) : (
                      <div className="space-y-1.5 pt-1">
                        <div className="border-b border-dotted border-neutral-400 h-5"></div>
                        <div className="border-b border-dotted border-neutral-400 h-5"></div>
                        <div className="border-b border-dotted border-neutral-400 h-5"></div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-bold text-neutral-900">
                        1.3. Quina va ser la funció original de la Guàrdia Pretoriana creada per August i per què durant la Crisi del Segle III dC va esdevenir un factor d'anarquia militar?
                      </p>
                      <span className="text-[11px] font-mono text-neutral-600 font-bold shrink-0">[0.50 p.]</span>
                    </div>
                    {showSolutions ? (
                      <div className="bg-emerald-50 border border-emerald-400 rounded p-2.5 text-xs text-emerald-950">
                        La seva funció inicial era protegir l'emperador i la seva família a Roma. Durant el segle III dC, els pretorians i legions van utilitzar la força de les armes per proclamar i assassinar emperadors a canvi de sumes de diners (<em>donativum</em>), causant greu inestabilitat.
                      </div>
                    ) : (
                      <div className="space-y-1.5 pt-1">
                        <div className="border-b border-dotted border-neutral-400 h-5"></div>
                        <div className="border-b border-dotted border-neutral-400 h-5"></div>
                      </div>
                    )}
                  </div>
                </div>
              </section>

              {/* ADVANCED BLOC 2 */}
              <section className="mb-6 print-avoid-break">
                <div className="flex items-center justify-between bg-neutral-900 text-white px-3 py-1.5 rounded-t font-cinzel text-xs font-bold tracking-wide">
                  <span>BLOC 2: CAUSALITAT HISTÒRICA I DESENVOLUPAMENT (6 TEMES AVANÇATS)</span>
                  <span className="text-amber-300 font-mono">3.0 PUNTS (6 x 0.50 p.)</span>
                </div>
                <div className="border border-neutral-900 border-t-0 p-4 rounded-b space-y-4">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-neutral-900">
                      2.1. [Monarquia] Quina gran transformació urbana van aportar els reis etruscos i quin motiu va desencadenar la revolta del 509 aC que va posar fi a la monarquia?
                    </p>
                    {showSolutions ? (
                      <div className="bg-emerald-50 border border-emerald-400 rounded p-2 text-xs text-emerald-950">
                        Van drenar els pantans amb la Cloaca Maxima, van construir muralles de pedra i van bastir el temple de Júpiter. La fi va arribar el 509 aC pel despotisme tirànic de Tarquini el Superb i l'ultratge a Lucrècia.
                      </div>
                    ) : (
                      <div className="space-y-1.5 pt-1"><div className="border-b border-dotted border-neutral-400 h-5"></div><div className="border-b border-dotted border-neutral-400 h-5"></div></div>
                    )}
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs font-bold text-neutral-900">
                      2.2. [República] Per què la vaga del Mont Sacre (494 aC) va forçar els patricis a concedir drets als plebeus? Explica el Tribú de la Plebs i la Llei de les XII Taules.
                    </p>
                    {showSolutions ? (
                      <div className="bg-emerald-50 border border-emerald-400 rounded p-2 text-xs text-emerald-950">
                        Els plebeus eren la infanteria de l'exèrcit i la força de treball; sense ells Roma quedava indefensa. Van obtenir el Tribú de la Plebs (magistrat amb dret de veto) i les primeres lleis escrites públiques (XII Taules).
                      </div>
                    ) : (
                      <div className="space-y-1.5 pt-1"><div className="border-b border-dotted border-neutral-400 h-5"></div><div className="border-b border-dotted border-neutral-400 h-5"></div></div>
                    )}
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs font-bold text-neutral-900">
                      2.3. [Guerres Púniques] Compara l'encerclament d'Anníbal a Cannes (216 aC) amb la resposta d'Escipió l'Africà a Zama (202 aC) i les conseqüències sobre el "Mare Nostrum".
                    </p>
                    {showSolutions ? (
                      <div className="bg-emerald-50 border border-emerald-400 rounded p-2 text-xs text-emerald-950">
                        A Cannes Anníbal va envoltar les legions romanes en una maniobra magistral. Escipió va canviar l'estratègia portant la guerra a Hispània i després directament a l'Àfrica, neutralitzant els elefants a Zama i garantint el control absolut de Roma sobre el Mediterrani.
                      </div>
                    ) : (
                      <div className="space-y-1.5 pt-1"><div className="border-b border-dotted border-neutral-400 h-5"></div><div className="border-b border-dotted border-neutral-400 h-5"></div></div>
                    )}
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs font-bold text-neutral-900">
                      2.4. [Crisi Segle I aC] Explica com la fallida dels camperols i la reforma militar de Gai Mari (107 aC) van transformar l'exèrcit en una eina per als cops d'estat dels generals.
                    </p>
                    {showSolutions ? (
                      <div className="bg-emerald-50 border border-emerald-400 rounded p-2 text-xs text-emerald-950">
                        Mari va professionalitzar l'exèrcit obrint-lo als pobres a canvi de sou i promeses de terres. Els soldats van passar a ser lleials al seu general i no pas a la República, facilitant guerres civils i dictadures.
                      </div>
                    ) : (
                      <div className="space-y-1.5 pt-1"><div className="border-b border-dotted border-neutral-400 h-5"></div><div className="border-b border-dotted border-neutral-400 h-5"></div></div>
                    )}
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs font-bold text-neutral-900">
                      2.5. [Romanització] Anomena els 4 instruments fonamentals de la romanització i com la trilogia mediterrània s'articulava amb el comerç imperial i la Via Augusta.
                    </p>
                    {showSolutions ? (
                      <div className="bg-emerald-50 border border-emerald-400 rounded p-2 text-xs text-emerald-950">
                        Instruments: llengua llatina, dret romà, xarxa urbana/monuments i calçades amb l'exèrcit. La trilogia (blat, oli i vi) es produïa a gran escala a Hispània i es transportava en ànfores cap a Roma a través del mar i les calçades.
                      </div>
                    ) : (
                      <div className="space-y-1.5 pt-1"><div className="border-b border-dotted border-neutral-400 h-5"></div><div className="border-b border-dotted border-neutral-400 h-5"></div></div>
                    )}
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs font-bold text-neutral-900">
                      2.6. [Cristianisme i Caiguda] Analitza la transcendència dels edictes de Constantí (313 dC) i Teodosi (380 dC) i la cadena de causes que va culminar en la caiguda del 476 dC.
                    </p>
                    {showSolutions ? (
                      <div className="bg-emerald-50 border border-emerald-400 rounded p-2 text-xs text-emerald-950">
                        Constantí va donar tolerància amb l'Edicte de Milà (313 dC) i Teodosi el va fer religió única oficial (380 dC). La caiguda del 476 dC respon a la fi de conquestes, crisi econòmica, divisió de l'Imperi el 395 dC i invasions germàniques.
                      </div>
                    ) : (
                      <div className="space-y-1.5 pt-1"><div className="border-b border-dotted border-neutral-400 h-5"></div><div className="border-b border-dotted border-neutral-400 h-5"></div></div>
                    )}
                  </div>
                </div>
              </section>

              {/* ADVANCED BLOC 3 */}
              <section className="mb-6 print-avoid-break">
                <div className="flex items-center justify-between bg-neutral-900 text-white px-3 py-1.5 rounded-t font-cinzel text-xs font-bold tracking-wide">
                  <span>BLOC 3: INSTITUCIONS, SOCIETAT I CONCEPTES DE PRECISIÓ</span>
                  <span className="text-amber-300 font-mono">1.5 PUNTS</span>
                </div>
                <div className="border border-neutral-900 border-t-0 p-4 rounded-b">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1.5 bg-neutral-50 p-3 rounded border border-neutral-200">
                      <div><strong>[ A ]</strong> Cursus Honorum</div>
                      <div><strong>[ B ]</strong> Edicte de Caracal·la (212 dC)</div>
                      <div><strong>[ C ]</strong> Dictador Republicà</div>
                      <div><strong>[ D ]</strong> Limes</div>
                      <div><strong>[ E ]</strong> Divisió de Teodosi (395 dC)</div>
                      <div><strong>[ F ]</strong> Arada romana</div>
                      <div><strong>[ G ]</strong> Latifundi</div>
                      <div><strong>[ H ]</strong> Odoacre</div>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex items-start gap-2">
                        <span className="font-bold font-mono text-red-900">{showSolutions ? '( B )' : '(   )'}</span>
                        <span>Concessió de la ciutadania romana a tots els homes lliures de l'Imperi.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="font-bold font-mono text-red-900">{showSolutions ? '( A )' : '(   )'}</span>
                        <span>Carrera política reglada (Qüestor, Edil, Pretor, Cònsol).</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="font-bold font-mono text-red-900">{showSolutions ? '( C )' : '(   )'}</span>
                        <span>Magistratura extraordinària amb poder absolut concedida durant màxim 6 mesos.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="font-bold font-mono text-red-900">{showSolutions ? '( E )' : '(   )'}</span>
                        <span>Partició formal de l'Imperi en Occident (Honori) i Orient (Arcadi).</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="font-bold font-mono text-red-900">{showSolutions ? '( D )' : '(   )'}</span>
                        <span>Frontera fortificada amb campaments legionaris i muralles.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="font-bold font-mono text-red-900">{showSolutions ? '( G )' : '(   )'}</span>
                        <span>Gran propietat agrícola aristocràtica explotada amb esclaus.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="font-bold font-mono text-red-900">{showSolutions ? '( F )' : '(   )'}</span>
                        <span>Innovació tècnica de fusta i ferro arrossegada per bous per llaurar més profund.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="font-bold font-mono text-red-900">{showSolutions ? '( H )' : '(   )'}</span>
                        <span>Cabdill bàrbar que va deposar Ròmul Augústul el 476 dC.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* ADVANCED BLOC 4 */}
              <section className="mb-6 print-page-break print-avoid-break">
                <div className="flex items-center justify-between bg-neutral-900 text-white px-3 py-1.5 rounded-t font-cinzel text-xs font-bold tracking-wide">
                  <span>BLOC 4: EIX CRONOLÒGIC I SINCRONIA HISTÒRICA</span>
                  <span className="text-amber-300 font-mono">1.5 PUNTS</span>
                </div>
                <div className="border border-neutral-900 border-t-0 p-4 rounded-b">
                  <table className="w-full text-xs border-collapse border border-neutral-300">
                    <thead>
                      <tr className="bg-neutral-100">
                        <th className="border p-2 w-12 text-center">Ordre</th>
                        <th className="border p-2">Esdeveniment Històric</th>
                        <th className="border p-2 w-28 text-center">Data</th>
                        <th className="border p-2 w-36 text-center">Etapa</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { o: '2', e: "Revolta contra Tarquini el Superb i proclamació de la República.", d: '509 aC', p: 'República' },
                        { o: '3', e: "Desembarcament a Empúries (Guerres Púniques).", d: '218 aC', p: 'República' },
                        { o: '1', e: "Fundació de Roma al Palatí per Ròmul i Rem.", d: '753 aC', p: 'Monarquia' },
                        { o: '5', e: "Edicte de Milà per l'emperador Constantí.", d: '313 dC', p: 'Imperi Romà' },
                        { o: '4', e: "Octavi rep el títol d'August i funda el Principat.", d: '27 aC', p: 'Imperi Romà' },
                        { o: '6', e: "Deposició de Ròmul Augústul per Odoacre.", d: '476 dC', p: 'Fi d’Occident' }
                      ].map((item, idx) => (
                        <tr key={idx}>
                          <td className="border p-2 text-center font-bold font-mono">{showSolutions ? item.o : '___'}</td>
                          <td className="border p-2">{item.e}</td>
                          <td className="border p-2 text-center font-mono">{showSolutions ? item.d : '________'}</td>
                          <td className="border p-2 text-center">{showSolutions ? item.p : '____________'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* ADVANCED BLOC 5 */}
              <section className="mb-6 print-avoid-break">
                <div className="flex items-center justify-between bg-neutral-900 text-white px-3 py-1.5 rounded-t font-cinzel text-xs font-bold tracking-wide">
                  <span>BLOC 5: SÍNTESI I DISSERTACIÓ COMPARATIVA</span>
                  <span className="text-amber-300 font-mono">2.0 PUNTS</span>
                </div>
                <div className="border border-neutral-900 border-t-0 p-4 rounded-b space-y-3">
                  <p className="text-xs font-bold">
                    Tema: «De ciutadà-soldat a colon rural: la transformació econòmica i social de Roma».
                  </p>
                  <p className="text-[11px] text-neutral-600">
                    Analitza en dos paràgrafs: 1) El model originari de ciutadà-soldat camperol i com les conquestes van crear latifundis d'esclaus arruïnant el camperolat lliure; 2) La ruralització a partir del segle III dC quan la manca d'esclaus i la inseguretat van empènyer la població a treballar com a colons sotmesos als patrons a les vil·les rurals (arrel del feudalisme).
                  </p>
                  {showSolutions ? (
                    <div className="bg-emerald-50 border border-emerald-400 rounded p-2.5 text-xs text-emerald-950 space-y-1.5">
                      <p><strong>Criteris de correcció:</strong></p>
                      <p>1. Descripció del ciutadà-pagès de la República primerenca i l'impacte de les conquestes massives (latifundis d'esclaus, ruïna de la petita propietat, migració a Roma, fracàs de les reformes dels germans Grac).</p>
                      <p>2. Crisi del segle III dC: fi de les conquestes, aturada de l'oferta d'esclaus, inflació, pressió dels bàrbars i fugida de les ciutats cap al camp (sistema del colonat com a precedent directe de la servitud feudal medieval).</p>
                    </div>
                  ) : (
                    <div className="space-y-2 pt-1">
                      {Array.from({ length: 9 }).map((_, i) => (
                        <div key={i} className="border-b border-dotted border-neutral-400 h-5"></div>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            </div>
          )}

          {/* =========================================================================
              OFFICIAL FOOTER & RUBRIC (PRINTED AT BOTTOM)
             ========================================================================= */}
          <div className="mt-8 pt-4 border-t-2 border-neutral-900 grid grid-cols-12 gap-4 text-xs">
            <div className="col-span-8 space-y-1">
              <p className="font-bold text-neutral-800">Criteris d'Avaluació Competencial de la Prova:</p>
              <ul className="list-disc pl-4 text-[10px] text-neutral-600 space-y-0.5">
                <li>Comprensió de textos històrics i contextualització cronològica (753 aC – 476 dC).</li>
                <li>Identificació de causes i conseqüències en la transformació política (Monarquia, República i Imperi).</li>
                <li>Reconeixement de la romanització i del llegat material, urbanístic i lingüístic a la península Ibèrica.</li>
                <li>Expressió escrita clara amb vocabulari històric propi de l'etapa de Secundària.</li>
              </ul>
            </div>
            <div className="col-span-4 border border-neutral-400 rounded p-2 text-center bg-neutral-50 print:bg-white flex flex-col justify-between">
              <span className="text-[10px] text-neutral-500 font-bold uppercase">Signatura del Professor/a</span>
              <div className="border-b border-neutral-300 my-4"></div>
              <span className="text-[9px] text-neutral-400">Data de revisió i qualificació</span>
            </div>
          </div>
        </div>

        {/* Bottom Screen Actions (Hidden on Print) */}
        <div className="no-print mt-6 bg-[#1c0809] border border-[#b88c32] rounded-xl p-4 sm:p-6 text-amber-50 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h4 className="font-cinzel font-bold text-sm sm:text-base text-amber-200">
              Tot a punt per imprimir o avaluar l'examen
            </h4>
            <p className="text-xs text-amber-100/70 mt-0.5">
              Tria el format que millor s'adapti a les teves necessitats per portar-lo a classe o desar-lo en PDF.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap justify-center">
            <button
              onClick={handleDownloadHtml}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-lg shadow cursor-pointer transition-all active:scale-95 border border-emerald-400/40"
            >
              <Download className="w-4 h-4" />
              <span>Descarregar Imprimible (.html / PDF)</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold text-xs sm:text-sm rounded-lg shadow cursor-pointer transition-all active:scale-95"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir</span>
            </button>
            <button
              onClick={handleCopyText}
              className="flex items-center gap-1.5 px-3 py-2 bg-white/10 hover:bg-white/20 text-amber-200 rounded-lg text-xs font-semibold cursor-pointer border border-amber-400/30"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copiat!' : 'Copiar Text'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="no-print fixed bottom-5 right-5 z-50 max-w-md bg-neutral-900 border-2 border-emerald-500 text-white p-4 rounded-xl shadow-2xl flex items-start gap-3 animate-bounce-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="text-xs">
            <p className="font-bold text-emerald-300">Acció completada amb èxit</p>
            <p className="text-neutral-200 mt-0.5 leading-relaxed">{toastMessage}</p>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-neutral-400 hover:text-white p-1 ml-auto cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Print Options & Troubleshooting Modal */}
      {showPrintModal && (
        <div className="no-print fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#1f090b] border-2 border-[#b88c32] rounded-2xl max-w-lg w-full text-amber-50 shadow-2xl overflow-hidden animate-fade-in">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-[#4d161a] bg-[#140405] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="p-2 bg-[#8b1e24] text-amber-300 rounded-lg border border-amber-400/30">
                  <Printer className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="font-cinzel font-bold text-base sm:text-lg text-white">
                    Com vols imprimir l'examen?
                  </h3>
                  <p className="text-xs text-amber-200/70">
                    Opcions garantides per a ordinadors i navegadors
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowPrintModal(false)}
                className="text-amber-200/70 hover:text-white p-1 rounded-lg hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 space-y-3.5 text-xs">
              <div className="bg-amber-950/40 border border-amber-500/30 p-3 rounded-lg text-amber-200/90 leading-relaxed flex items-start gap-2.5">
                <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Nota sobre el navegador:</strong> Quan una aplicació web s'executa dins d'un marc o visor (iframe), els navegadors moderns bloquegen el menú d'impressió directe per seguretat. Fes servir aquestes alternatives:
                </span>
              </div>

              {/* Option 1: Direct Download */}
              <div
                onClick={() => {
                  handleDownloadHtml();
                  setShowPrintModal(false);
                }}
                className="p-3.5 rounded-xl border border-emerald-500/40 bg-emerald-950/30 hover:bg-emerald-900/40 cursor-pointer transition-all hover:scale-[1.01] group flex items-start gap-3.5"
              >
                <div className="p-2.5 bg-emerald-600 rounded-lg text-white shrink-0 shadow">
                  <Download className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h5 className="font-bold text-white text-sm group-hover:text-emerald-300">
                      1. Descarregar document imprimible (.html)
                    </h5>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded border border-emerald-500/40">
                      Recomanat
                    </span>
                  </div>
                  <p className="text-emerald-100/80 mt-1 leading-relaxed">
                    Es descarrega a la teva carpeta. En fer-hi clic, s'obre al navegador (Chrome, Edge o Safari) i <strong>s'activa automàticament el diàleg d'impressora o Desar PDF</strong> amb marges A4 perfectes.
                  </p>
                </div>
              </div>

              {/* Option 2: Open in new tab */}
              <div
                onClick={() => {
                  handleOpenNewTab();
                  setShowPrintModal(false);
                }}
                className="p-3.5 rounded-xl border border-amber-500/30 bg-white/5 hover:bg-white/10 cursor-pointer transition-all hover:scale-[1.01] group flex items-start gap-3.5"
              >
                <div className="p-2.5 bg-[#8b1e24] text-amber-300 rounded-lg shrink-0 border border-amber-400/30">
                  <ExternalLink className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h5 className="font-bold text-white text-sm group-hover:text-amber-300">
                    2. Obrir en una pestanya nova
                  </h5>
                  <p className="text-amber-100/75 mt-1 leading-relaxed">
                    Genera una vista autònoma fora d'aquesta finestra perquè puguis prémer <code>Ctrl + P</code> o fer clic a Imprimir sense cap restricció.
                  </p>
                </div>
              </div>

              {/* Option 3: Force print attempt */}
              <div
                onClick={() => {
                  try {
                    window.print();
                  } catch (e) {
                    console.error(e);
                  }
                }}
                className="p-3 rounded-lg border border-white/10 bg-black/20 hover:bg-black/30 cursor-pointer transition-all flex items-center justify-between text-amber-200/80 hover:text-white"
              >
                <div className="flex items-center gap-2.5">
                  <Printer className="w-4 h-4 text-amber-400" />
                  <span>Intentar diàleg d'impressió directe al navegador</span>
                </div>
                <span className="text-[10px] font-mono text-amber-300/60">(Ctrl + P)</span>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-[#140405] border-t border-[#4d161a] flex justify-end gap-2">
              <button
                onClick={() => setShowPrintModal(false)}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-amber-200 rounded-lg text-xs font-semibold cursor-pointer"
              >
                Tancar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


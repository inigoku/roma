/**
 * Utilitats per a impressió segura i exportació de documents en entorns web i iframes sandboxed.
 * Soluciona el problema de bloqueig de 'window.print()' en iframes de navegadors moderns.
 */

interface PrintOptions {
  elementId: string;
  title: string;
  filename?: string;
  autoDownloadOnFail?: boolean;
}

/**
 * Genera el codi HTML complet i autònom per a una impressió perfecta en format DIN-A4.
 */
export function generatePrintableHtmlDocument(elementHtml: string, title: string): string {
  return `<!DOCTYPE html>
<html lang="ca">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A4 portrait;
      margin: 14mm 16mm 14mm 16mm;
    }
    
    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    body {
      margin: 0;
      padding: 24px;
      background-color: #f7f6f2;
      color: #1a1a1a;
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      line-height: 1.45;
      font-size: 13px;
    }

    .printable-wrapper {
      max-width: 820px;
      margin: 0 auto;
      background: #ffffff;
      padding: 32px 36px;
      box-shadow: 0 4px 18px rgba(0,0,0,0.08);
      border-radius: 8px;
    }

    /* Accions superiors visibles en pantalla, amagades en impressió */
    .top-toolbar {
      max-width: 820px;
      margin: 0 auto 16px auto;
      padding: 12px 18px;
      background: #1c0809;
      color: #fef3c7;
      border-radius: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    }

    .btn-print {
      background: linear-gradient(135deg, #f59e0b, #d97706);
      color: #000;
      font-weight: 700;
      border: none;
      padding: 8px 18px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 13px;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    .btn-print:hover {
      background: #fbbf24;
    }

    .toolbar-info {
      font-size: 12px;
      color: #fde68a;
    }

    /* Tipografies */
    .font-cinzel {
      font-family: 'Cinzel', Georgia, serif;
    }

    /* Evitar trencaments de pàgina inadequats */
    h1, h2, h3, h4 {
      break-after: avoid;
      page-break-after: avoid;
    }

    .break-inside-avoid, section, article, .border {
      break-inside: avoid;
      page-break-inside: avoid;
    }

    /* Ocultar elements no imprimibles */
    .no-print {
      display: none !important;
    }

    @media print {
      body {
        padding: 0 !important;
        background: transparent !important;
      }
      .top-toolbar {
        display: none !important;
      }
      .printable-wrapper {
        box-shadow: none !important;
        padding: 0 !important;
        border: none !important;
        max-width: 100% !important;
      }
    }
  </style>
</head>
<body>
  <div class="top-toolbar">
    <div class="toolbar-info">
      🏛️ <strong>Document preparat per imprimir o desar en PDF</strong>
    </div>
    <button class="btn-print" onclick="window.print()">
      🖨️ Imprimir ara (o Desar PDF)
    </button>
  </div>

  <div class="printable-wrapper">
    ${elementHtml}
  </div>

  <script>
    // Obrir automàticament el diàleg d'impressió en carregar la pàgina
    window.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => {
        try {
          window.print();
        } catch (e) {
          console.warn('Auto print triggered with note:', e);
        }
      }, 400);
    });
  </script>
</body>
</html>`;
}

/**
 * Descarrega directament un fitxer HTML llest per imprimir.
 * Sempre funciona en qualsevol navegador, incloent navegadors mòbils i iframes sandboxed.
 */
export function downloadPrintableFile(elementId: string, filename: string, title: string): boolean {
  try {
    const el = document.getElementById(elementId);
    if (!el) {
      console.error(`Element amb id "${elementId}" no trobat.`);
      return false;
    }

    const fullHtml = generatePrintableHtmlDocument(el.innerHTML, title);
    const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = filename.endsWith('.html') ? filename : `${filename}.html`;
    document.body.appendChild(a);
    a.click();
    
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 200);

    return true;
  } catch (err) {
    console.error('Error descarregant fitxer imprimible:', err);
    return false;
  }
}

/**
 * Obre el document en una nova pestanya/finestra per imprimir-lo lliurement fora de l'iframe.
 */
export function openInNewTabForPrint(elementId: string, title: string): boolean {
  try {
    const el = document.getElementById(elementId);
    if (!el) return false;

    const fullHtml = generatePrintableHtmlDocument(el.innerHTML, title);
    const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8' });
    const blobUrl = URL.createObjectURL(blob);

    const win = window.open(blobUrl, '_blank');
    if (!win) {
      // Bloquejat per bloquejador de finestres emergents
      return false;
    }
    return true;
  } catch (err) {
    console.warn('No s’ha pogut obrir la pestanya nova:', err);
    return false;
  }
}

/**
 * Tenta executar window.print(). Si falla o està bloquejat per un iframe sandbox,
 * retorna false perquè la interfície pugui oferir la descàrrega directa o l'obertura en nova pestanya.
 */
export function executePrintWithFallback(options: PrintOptions): { success: boolean; error?: string } {
  try {
    // Si estem dins d'un iframe, window.print() pot estar prohibit
    const isInsideIframe = window.self !== window.top;
    
    try {
      window.print();
      return { success: true };
    } catch (printErr: any) {
      console.warn('window.print() ha fallat o ha estat blocat per l’iframe:', printErr);
      
      if (options.autoDownloadOnFail) {
        downloadPrintableFile(
          options.elementId, 
          options.filename || 'examen-roma-antiga.html', 
          options.title
        );
      }
      return { success: false, error: printErr?.message || 'Impressió directa bloquejada per l’entorn iframe.' };
    }
  } catch (outerErr: any) {
    return { success: false, error: outerErr?.message || 'Error desconegut en imprimir.' };
  }
}

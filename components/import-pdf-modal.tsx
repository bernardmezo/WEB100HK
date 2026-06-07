'use client';

import { useState, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { FileUp, Loader2, Check, AlertCircle, X, Search } from 'lucide-react';
import { ActivityType } from '@/lib/types';

interface ImportPdfModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (items: { name: string; type: ActivityType }[]) => void;
}

interface ExtractionResult {
  proker: string[];
  agenda: string[];
}

export function ImportPdfModal({ open, onOpenChange, onConfirm }: ImportPdfModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ExtractionResult | null>(null);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateAndSetFile = (selectedFile: File | undefined) => {
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf') {
        setError('Mohon pilih file PDF yang valid.');
        return;
      }
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    validateAndSetFile(selectedFile);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFile = e.dataTransfer.files?.[0];
    validateAndSetFile(droppedFile);
  };

  const extractTextFromPdf = async (file: File): Promise<string> => {
    // Dynamic import to avoid SSR errors
    const pdfjsLib = await import('pdfjs-dist');
    const version = pdfjsLib.version;
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${version}/build/pdf.worker.min.mjs`;

    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item: any) => item.str).join(' ');
      fullText += pageText + '\n';
    }

    return fullText;
  };

  const parseActivitiesFromText = (text: string): ExtractionResult => {
    const proker: string[] = [];
    const agenda: string[] = [];

    const lines = text.split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 5);

    lines.forEach(line => {
      const cleanLine = line.replace(/^[\d\w\W]{1,3}\.\s*|^[-•*]\s*/, '').trim();
      
      if (cleanLine.length < 5 || cleanLine.length > 100) return;

      const lowerLine = cleanLine.toLowerCase();
      const isHeader = /daftar|tabel|lampiran|pengesahan|proker|agenda|kegiatan|periode/i.test(lowerLine) && cleanLine.split(' ').length < 4;
      if (isHeader) return;

      if (lowerLine.includes('proker') || lowerLine.includes('program kerja')) {
        proker.push(cleanLine.replace(/proker|program kerja/i, '').replace(/^[:\s-]+/, '').trim());
      } else if (lowerLine.includes('agenda')) {
        agenda.push(cleanLine.replace(/agenda/i, '').replace(/^[:\s-]+/, '').trim());
      } else {
        if (cleanLine.split(' ').length >= 2) {
          proker.push(cleanLine);
        }
      }
    });

    return {
      proker: Array.from(new Set(proker)).filter(n => n.length > 3),
      agenda: Array.from(new Set(agenda)).filter(n => n.length > 3),
    };
  };

  const handleProcess = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      const text = await extractTextFromPdf(file);
      const data = parseActivitiesFromText(text);
      
      if (data.proker.length === 0 && data.agenda.length === 0) {
        throw new Error('Tidak dapat menemukan daftar kegiatan. Pastikan PDF berisi teks yang dapat dibaca (bukan hasil scan gambar).');
      }

      setResult(data);
      
      const all = new Set<string>();
      data.proker.forEach(name => all.add(`proker:${name}`));
      data.agenda.forEach(name => all.add(`agenda:${name}`));
      setSelectedItems(all);
    } catch (err) {
      console.error('Processing error:', err);
      setError('Gagal memproses PDF. Pastikan file valid dan bukan hasil scan gambar.');
    } finally {
      setLoading(false);
    }
  };

  const toggleItem = (type: ActivityType, name: string) => {
    const key = `${type}:${name}`;
    const newSelected = new Set(selectedItems);
    if (newSelected.has(key)) {
      newSelected.delete(key);
    } else {
      newSelected.add(key);
    }
    setSelectedItems(newSelected);
  };

  const handleConfirm = () => {
    if (!result) return;

    const confirmedItems: { name: string; type: ActivityType }[] = [];
    selectedItems.forEach(key => {
      const [type, name] = key.split(':');
      confirmedItems.push({ name, type: type as ActivityType });
    });

    onConfirm(confirmedItems);
    onOpenChange(false);
    reset();
  };

  const reset = () => {
    setFile(null);
    setResult(null);
    setError(null);
    setSelectedItems(new Set());
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) reset(); onOpenChange(v); }}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Import dari PDF Raker</DialogTitle>
          <DialogDescription>
            Ekstrak daftar Program Kerja dan Agenda secara lokal tanpa AI (Cepat & Stabil).
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-hidden py-4">
          {!result ? (
            <div className="space-y-4">
              <div
                className={`border-2 border-dashed rounded-xl p-8 text-center space-y-3 transition-colors cursor-pointer ${
                  file ? 'border-emerald-500/50 bg-emerald-500/5' : 'border-border hover:border-emerald-500/50'
                }`}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept=".pdf"
                  onChange={handleFileChange}
                />
                <div className="flex justify-center">
                  <div className={`h-12 w-12 rounded-full flex items-center justify-center ${file ? 'bg-emerald-500/20 text-emerald-500' : 'bg-secondary text-muted-foreground'}`}>
                    {file ? <Check className="h-6 w-6" /> : <FileUp className="h-6 w-6" />}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium">
                    {file ? file.name : 'Pilih atau drop file PDF Raker'}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Pastikan PDF berisi teks (Bukan Scan Gambar)
                  </p>
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {error}
                </div>
              )}

              <Button
                className="w-full bg-emerald-600 hover:bg-emerald-700"
                disabled={!file || loading}
                onClick={handleProcess}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Membaca Dokumen...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    Ekstrak Daftar Kegiatan
                  </>
                )}
              </Button>
            </div>
          ) : (
            <div className="space-y-4 h-full flex flex-col">
              <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
                <span>Hasil Ekstraksi Lokal:</span>
                <Button variant="ghost" size="sm" className="h-auto py-0 text-xs" onClick={() => setResult(null)}>
                  <X className="h-3 w-3 mr-1" /> Ganti File
                </Button>
              </div>

              <ScrollArea className="flex-1 pr-3">
                <div className="space-y-6">
                  {/* Proker */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 px-1">
                      <Badge className="bg-emerald-600/10 text-emerald-500 border-emerald-600/20">Proker</Badge>
                      <span className="text-xs font-medium">{result.proker.length} ditemukan</span>
                    </div>
                    {result.proker.length === 0 ? (
                      <p className="text-xs text-muted-foreground italic px-2">Tidak ditemukan Program Kerja.</p>
                    ) : (
                      <div className="grid gap-2">
                        {result.proker.map((name, i) => (
                          <div
                            key={`p-${i}`}
                            className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                              selectedItems.has(`proker:${name}`)
                                ? 'border-emerald-500/50 bg-emerald-500/5'
                                : 'border-border/50 hover:border-border bg-secondary/20'
                            }`}
                            onClick={() => toggleItem('proker', name)}
                          >
                            <div className={`h-4 w-4 rounded border flex items-center justify-center transition-colors ${
                                selectedItems.has(`proker:${name}`)
                                  ? 'bg-emerald-500 border-emerald-500 text-white'
                                  : 'border-muted-foreground/30'
                              }`}>
                              {selectedItems.has(`proker:${name}`) && <Check className="h-3 w-3" />}
                            </div>
                            <span className="text-sm flex-1">{name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Agenda */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 px-1">
                      <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20">Agenda</Badge>
                      <span className="text-xs font-medium">{result.agenda.length} ditemukan</span>
                    </div>
                    {result.agenda.length === 0 ? (
                      <p className="text-xs text-muted-foreground italic px-2">Tidak ditemukan Agenda.</p>
                    ) : (
                      <div className="grid gap-2">
                        {result.agenda.map((name, i) => (
                          <div
                            key={`a-${i}`}
                            className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                              selectedItems.has(`agenda:${name}`)
                                ? 'border-amber-500/50 bg-amber-500/5'
                                : 'border-border/50 hover:border-border bg-secondary/20'
                            }`}
                            onClick={() => toggleItem('agenda', name)}
                          >
                            <div className={`h-4 w-4 rounded border flex items-center justify-center transition-colors ${
                                selectedItems.has(`agenda:${name}`)
                                  ? 'bg-amber-500 border-amber-500 text-white'
                                  : 'border-muted-foreground/30'
                              }`}>
                              {selectedItems.has(`agenda:${name}`) && <Check className="h-3 w-3" />}
                            </div>
                            <span className="text-sm flex-1">{name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </ScrollArea>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
            Batal
          </Button>
          {result && (
            <Button onClick={handleConfirm} className="bg-emerald-600 hover:bg-emerald-700" disabled={selectedItems.size === 0}>
              Import {selectedItems.size} Item
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

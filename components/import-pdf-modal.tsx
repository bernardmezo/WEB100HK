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
import { FileUp, Loader2, Check, AlertCircle, X, Sparkles } from 'lucide-react';
import { ActivityType } from '@/lib/types';

interface ImportPdfModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (items: { name: string; type: ActivityType }[]) => void;
}

interface ExtractionResult {
  items: string[];
}

export function ImportPdfModal({ open, onOpenChange, onConfirm }: ImportPdfModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ExtractionResult | null>(null);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [itemTypes, setItemTypes] = useState<Record<string, ActivityType>>({});
  const [editedNames, setEditedNames] = useState<Record<string, string>>({});
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

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve((reader.result as string).split(',')[1]);
      reader.onerror = (error) => reject(error);
    });
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

  const handleProcess = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      const base64 = await fileToBase64(file);
      const response = await fetch('/api/extract-raker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pdfBase64: base64 }),
      });

      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.message || json.error || 'Gagal memproses dengan AI.');
      }
      
      if (!json.items || json.items.length === 0) {
        throw new Error('AI tidak dapat menemukan daftar kegiatan. Pastikan PDF berisi teks yang jelas.');
      }

      setResult(json);
      
      const allSelected = new Set<string>();
      const initialTypes: Record<string, ActivityType> = {};
      const initialNames: Record<string, string> = {};
      
      json.items.forEach((name: string, index: number) => {
        const key = `item-${index}`;
        allSelected.add(key);
        // Default based on keyword search
        const isAgenda = name.toLowerCase().includes('agenda');
        initialTypes[key] = isAgenda ? 'agenda' : 'proker';
        initialNames[key] = name;
      });
      
      setSelectedItems(allSelected);
      setItemTypes(initialTypes);
      setEditedNames(initialNames);
    } catch (err) {
      console.error('Processing error:', err);
      setError(err instanceof Error ? err.message : 'Gagal memproses PDF.');
    } finally {
      setLoading(false);
    }
  };

  const toggleItem = (key: string) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(key)) {
      newSelected.delete(key);
    } else {
      newSelected.add(key);
    }
    setSelectedItems(newSelected);
  };

  const setType = (key: string, type: ActivityType) => {
    setItemTypes(prev => ({ ...prev, [key]: type }));
  };

  const handleNameChange = (key: string, newName: string) => {
    setEditedNames(prev => ({ ...prev, [key]: newName }));
  };

  const handleConfirm = () => {
    if (!result) return;

    const confirmedItems: { name: string; type: ActivityType }[] = [];
    selectedItems.forEach(key => {
      const name = editedNames[key]?.trim();
      if (name) {
        confirmedItems.push({ 
          name, 
          type: itemTypes[key] || 'proker' 
        });
      }
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
    setItemTypes({});
    setEditedNames({});
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) reset(); onOpenChange(v); }}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Import dari PDF Raker (AI)</DialogTitle>
          <DialogDescription>
            Gunakan AI untuk mengekstrak daftar kegiatan secara otomatis dari dokumen PDF.
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
                    Mendukung PDF Scan & Teks melalui AI
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
                className="w-full bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-700/20"
                disabled={!file || loading}
                onClick={handleProcess}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    AI sedang menganalisis dokumen...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Ekstrak Daftar Kegiatan (AI)
                  </>
                )}
              </Button>
            </div>
          ) : (
            <div className="space-y-4 h-full flex flex-col">
              <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="h-3 w-3 text-emerald-500" />
                  Verifikasi Hasil Ekstraksi:
                </span>
                <Button variant="ghost" size="sm" className="h-auto py-0 text-xs hover:text-rose-500" onClick={() => setResult(null)}>
                  <X className="h-3 w-3 mr-1" /> Ganti File
                </Button>
              </div>

              <ScrollArea className="h-[350px] pr-3 -mr-3">
                <div className="space-y-3 pb-4">
                  {result.items.map((_, i) => {
                    const key = `item-${i}`;
                    const isSelected = selectedItems.has(key);
                    
                    return (
                      <div
                        key={key}
                        className={`flex flex-col gap-3 p-3 rounded-lg border transition-all ${
                          isSelected
                            ? 'border-emerald-500/40 bg-emerald-500/5'
                            : 'border-border/50 bg-secondary/10 opacity-60'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div 
                            className={`h-4 w-4 rounded border flex items-center justify-center cursor-pointer transition-colors ${
                              isSelected
                                ? 'bg-emerald-500 border-emerald-500 text-white'
                                : 'border-muted-foreground/30'
                            }`}
                            onClick={() => toggleItem(key)}
                          >
                            {isSelected && <Check className="h-3 w-3" />}
                          </div>
                          
                          {isSelected ? (
                            <input
                              type="text"
                              value={editedNames[key] || ''}
                              onChange={(e) => handleNameChange(key, e.target.value)}
                              className="flex-1 bg-background border border-emerald-500/20 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500/40"
                              placeholder="Edit nama kegiatan..."
                            />
                          ) : (
                            <span className="text-sm font-medium flex-1 cursor-pointer truncate" onClick={() => toggleItem(key)}>
                              {editedNames[key]}
                            </span>
                          )}
                        </div>

                        {isSelected && (
                          <div className="flex items-center gap-2 pl-7">
                            <button
                              onClick={() => setType(key, 'proker')}
                              className={`px-3 py-1 rounded-full text-[10px] border transition-all ${
                                itemTypes[key] === 'proker'
                                  ? 'bg-emerald-600/20 border-emerald-600/30 text-emerald-700 font-semibold'
                                  : 'bg-transparent border-border text-muted-foreground hover:border-emerald-600/30'
                              }`}
                            >
                              Proker
                            </button>
                            <button
                              onClick={() => setType(key, 'agenda')}
                              className={`px-3 py-1 rounded-full text-[10px] border transition-all ${
                                itemTypes[key] === 'agenda'
                                  ? 'bg-amber-500/20 border-amber-500/30 text-amber-700 font-semibold'
                                  : 'bg-transparent border-border text-muted-foreground hover:border-amber-500/30'
                              }`}
                            >
                              Agenda
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
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

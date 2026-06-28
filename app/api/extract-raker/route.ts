import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: NextRequest) {
  try {
    const { pdfBase64 } = await req.json();

    if (!pdfBase64) {
      return NextResponse.json({ error: 'No PDF content provided' }, { status: 400 });
    }

    // Mendukung hingga 4 API Key sebagai cadangan
    const apiKeys = [
      process.env.GEMINI_API_KEY,
      process.env.GEMINI_API_KEY_2,
      process.env.GEMINI_API_KEY_3,
      process.env.GEMINI_API_KEY_4,
      process.env.GOOGLE_GENERATIVE_AI_API_KEY
    ].filter(Boolean) as string[];

    if (apiKeys.length === 0) {
      return NextResponse.json({ 
        error: 'Gemini API key not configured. Tambahkan GEMINI_API_KEY di .env' 
      }, { status: 500 });
    }

    const modelNames = [
      'gemini-2.5-flash', 
      'gemini-3.5-flash', 
      'gemini-3.1-flash-lite',
      'gemini-2-flash',
      'gemini-1.5-flash' // Keeping as legacy fallback
    ];
    
    const prompt = `Kamu adalah asisten yang bertugas mengekstrak daftar Program Kerja dan Agenda dari dokumen Rapat Kerja (Raker) organisasi mahasiswa.

Tugas utamamu adalah mengekstrak HANYA NAMA-NAMA dari Program Kerja dan Agenda yang ditemukan di dalam dokumen. 
JANGAN sertakan deskripsi, tujuan, sasaran, atau detail lainnya.

Kembalikan HANYA JSON dengan format berikut:
{
  "items": ["Nama Kegiatan 1", "Nama Kegiatan 2", ...]
}

Pastikan:
- Nama yang diekstrak ringkas (biasanya 2-7 kata).
- Hapus prefix seperti nomor (1., 2.) atau bullet point.
- Jika tidak ditemukan, kembalikan array kosong.
- JANGAN berikan teks penjelasan apapun di luar JSON.`;

    let text = '';
    let success = false;
    let lastError: any = null;

    // Coba setiap API Key yang tersedia
    for (let i = 0; i < apiKeys.length; i++) {
      const apiKey = apiKeys[i];
      console.log(`Menggunakan API Key #${i + 1}`);
      const genAI = new GoogleGenerativeAI(apiKey);

      for (const modelName of modelNames) {
        try {
          console.log(`Attempting extraction with model: ${modelName} using API Key #${i + 1}`);
          const model = genAI.getGenerativeModel({ model: modelName });
          
          const result = await model.generateContent([
            {
              inlineData: {
                data: pdfBase64,
                mimeType: 'application/pdf',
              },
            },
            prompt,
          ]);

          const response = await result.response;
          text = response.text();
          if (text) {
            success = true;
            break;
          }
        } catch (err: any) {
          lastError = err;
          console.error(`Model ${modelName} with API Key #${i + 1} failed:`, err.message);
          
          // Jika kuota habis (429 / RESOURCE_EXHAUSTED), break model loop, lanjut ke API key berikutnya
          const isQuotaError =
            err.status === 429 ||
            err.message?.includes('429') ||
            err.message?.includes('quota') ||
            err.message?.toLowerCase().includes('too many requests') ||
            err.message?.includes('RESOURCE_EXHAUSTED') ||
            err.message?.includes('Resource has been exhausted') ||
            err.message?.includes('QuotaFailure');
          if (isQuotaError) {
            console.warn(`API Key #${i + 1} quota habis, mencoba key berikutnya...`);
            break;
          }
        }
      }

      if (success) {
        break; // Jika berhasil, keluar dari loop API key
      }
    }

    if (!success) {
      // If we reach here, all models failed. 
      // This often means the API Key doesn't have access to these models.
      return NextResponse.json({ 
        error: 'Semua model AI gagal merespon (404 Not Found).',
        details: 'Ini biasanya terjadi jika API Key Anda bukan dari Google AI Studio (aistudio.google.com) atau belum mengaktifkan "Generative Language API" di Google Cloud.',
        message: lastError?.message
      }, { status: 404 });
    }
    
    // Clean up potentially returned markdown code blocks
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const cleanJson = jsonMatch ? jsonMatch[0] : text;
    
    try {
      const json = JSON.parse(cleanJson);
      // Ensure we return the flat items structure
      if (json.proker && json.agenda && !json.items) {
        json.items = [...json.proker, ...json.agenda];
      }
      return NextResponse.json(json);
    } catch (parseError) {
      console.error('Failed to parse JSON from Gemini response:', text, parseError);
      return NextResponse.json({ 
        error: 'AI returned invalid JSON', 
        details: text,
        raw: cleanJson 
      }, { status: 500 });
    }
  } catch (error: any) {
    console.error('Internal server error details:', error);
    
    // Check for common Gemini errors
    const errorMessage = error.message || 'Unknown error';
    let status = 500;
    let type = 'internal_error';

    if (errorMessage.includes('model') || errorMessage.includes('not found')) {
      type = 'model_error';
      status = 404;
    } else if (errorMessage.includes('API key')) {
      type = 'auth_error';
      status = 401;
    }

    return NextResponse.json({ 
      error: 'Gagal memproses dengan AI',
      type,
      message: errorMessage,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status });
  }
}

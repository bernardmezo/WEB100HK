import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: NextRequest) {
  try {
    const { pdfBase64 } = await req.json();

    if (!pdfBase64) {
      return NextResponse.json({ error: 'No PDF content provided' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Gemini API key not configured (GEMINI_API_KEY or GOOGLE_GENERATIVE_AI_API_KEY)' }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    
    // List of models available in the 2026 environment
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

    for (const modelName of modelNames) {
      try {
        console.log(`Attempting extraction with model: ${modelName}`);
        // Let the SDK choose the best API version automatically
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
        console.error(`Model ${modelName} failed:`, err.message);
        // If it's a 404, we continue to the next model
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

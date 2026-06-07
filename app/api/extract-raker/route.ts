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
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-001' });

    const prompt = `Kamu adalah asisten yang bertugas mengekstrak daftar Program Kerja dan Agenda dari dokumen Rapat Kerja (Raker) organisasi mahasiswa.

Dari dokumen yang diberikan, ekstrak HANYA:
1. Nama-nama Program Kerja (kegiatan besar, bersifat satu kali, melibatkan mahasiswa melalui open recruitment/delegasi, memiliki kepanitiaan OC dan SC)
2. Nama-nama Agenda (kegiatan internal pengurus, tidak memiliki kepanitiaan formal)

Kembalikan HANYA JSON dengan format berikut, tanpa penjelasan apapun:
{
  "proker": ["Nama Proker 1", "Nama Proker 2", ...],
  "agenda": ["Nama Agenda 1", "Nama Agenda 2", ...]
}

Jika tidak ditemukan proker atau agenda, kembalikan array kosong [].
Jangan tambahkan komentar, markdown, atau teks apapun di luar JSON.`;

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
    let text = response.text();
    
    // Clean up potentially returned markdown code blocks
    text = text.replace(/```json\n?/, '').replace(/```\n?/, '').trim();
    
    try {
      const json = JSON.parse(text);
      return NextResponse.json(json);
    } catch (parseError) {
      console.error('Failed to parse JSON from Gemini response:', text, parseError);
      return NextResponse.json({ error: 'AI returned invalid JSON', details: text }, { status: 500 });
    }
  } catch (error: any) {
    console.error('Internal server error details:', error);
    return NextResponse.json({ 
      error: 'Internal server error', 
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
}

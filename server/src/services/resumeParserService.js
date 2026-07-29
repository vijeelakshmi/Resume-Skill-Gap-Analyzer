import fs from 'fs';
import mammoth from 'mammoth';
import pdfParse from 'pdf-parse-fixed'; //  works directly

export async function parseResume(filePath, mimeType) {
  try {
    let text = '';

    //  PDF Parsing (WORKING)
    if (mimeType === 'application/pdf') {
      const buffer = fs.readFileSync(filePath);
      const data = await pdfParse(buffer);
      text = data.text;
    }

    //  DOCX Parsing
    else if (
      mimeType.includes('word') ||
      mimeType.includes('document') ||
      filePath.endsWith('.docx')
    ) {
      const result = await mammoth.extractRawText({ path: filePath });
      text = result.value;
    }

    //  TXT fallback
    else {
      text = fs.readFileSync(filePath, 'utf8');
    }

    if (!text || text.trim().length === 0) {
      throw new Error('No readable content found');
    }

    return text.replace(/\s+/g, ' ').trim();

  } catch (err) {
    console.error("Parse Error:", err);
    throw new Error(`Failed to parse resume: ${err.message}`);
  }
}
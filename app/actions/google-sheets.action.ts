'use server';
import { google } from "googleapis";
import { promises as fs } from 'fs';

export async function getSheetData() { 
    const file = await fs.readFile(process.cwd() + '/google_config.json', 'utf8');
  const configData = JSON.parse(file);
  const glAuth = await google.auth.getClient({
        projectId: "summerapp-427120",
        credentials: {
            "type": configData.type,
            "project_id": configData.project_id,
            "private_key_id": configData.private_key_id,
            "private_key": process.env.GOOGLE_API_KEY,
            "client_email": configData.client_email,
            "universe_domain": configData.universe_domain
        },
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const glSheets = google.sheets({ version: "v4", auth: glAuth });

    const data = await glSheets.spreadsheets.values.get({
        spreadsheetId: "1oKyOEjHRjveqYzABq8a9HU0539cPF861CFU89gk2EhA",
        range: 'B2:J',
    });

    if(!data || !data.data.values) {
        return [];
    }

    return data.data.values as string[][];
}
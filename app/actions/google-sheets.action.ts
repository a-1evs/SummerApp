"use server"
import {google} from "googleapis"

export async function getSheetData() {
    const glAuth = await google.auth.getClient({
        projectId: "summerapp-427120",
        credentials: {
            "type": "service_account",
            "project_id": "summerapp-427120",
            "private_key_id": "1f644853d0a7ce0f0d056313999a93e2935c1561",
            "private_key": process.env.GOOGLE_API_KEY,
            "client_email": "devaccount@summerapp-427120.iam.gserviceaccount.com",
            "universe_domain": "googleapis.com"
        },
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    })

    const glSheets = google.sheets({version: "v4", auth: glAuth})

    const data = await glSheets.spreadsheets.values.get({
        spreadsheetId: "1oKyOEjHRjveqYzABq8a9HU0539cPF861CFU89gk2EhA",
        range: "B2:J",
    })

    if (!data || !data.data.values) {
        return []
    }

    return data.data.values as string[][]
}

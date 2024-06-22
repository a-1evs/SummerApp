"use server"
import React, { useEffect, useRef } from "react";
import { getSheetData } from "../actions/google-sheets.action";
import EventDisplayComponent from "@/components/displayPage";

export default async function EventDisplay() {
  const sheetData = await getSheetData();

  return <EventDisplayComponent sheetData={sheetData || null} />
}

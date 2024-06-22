"use client";
import { getSheetData } from "../actions/google-sheets.action";
import { Button } from "@/components/ui/button";

export default function Page() {

  const handleOnGetSheetDataClick = async () => {
    const response = await getSheetData();
    console.log(response)
  };

  return <Button className="m-10" onClick={handleOnGetSheetDataClick}>Get Sheet Data</Button>;
}
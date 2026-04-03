import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const topic = req.nextUrl.searchParams.get("topic");
  const pageToken = req.nextUrl.searchParams.get("pageToken") || "";

  if (!topic) {
    return NextResponse.json({ error: "No topic provided" }, { status: 400 });
  }

  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/search?` +
      `part=snippet` +
      `&q=${encodeURIComponent(topic + " explicado documental")}` +
      `&type=video` +
      `&videoDuration=medium` +
      `&relevanceLanguage=es` +
      `&maxResults=6` +
      `&pageToken=${pageToken}` +
      `&key=${process.env.YOUTUBE_API_KEY}`
  );

  const data = await res.json();
  return NextResponse.json(data);
}
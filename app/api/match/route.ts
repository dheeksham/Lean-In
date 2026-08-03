import { NextRequest, NextResponse } from "next/server";
import { MEMBER } from "@/lib/member";
import { rankCircles } from "@/lib/scoring";
import { getSupabaseClient } from "@/lib/supabase";
import type { IntakeAnswers } from "@/lib/types";

export async function POST(request: NextRequest) {
  const answers = (await request.json()) as Partial<IntakeAnswers>;

  if (!answers.goals?.length || !answers.stage || !answers.format) {
    return NextResponse.json(
      { error: "goals, stage, and format are all required." },
      { status: 400 }
    );
  }

  const supabase = getSupabaseClient();
  const { data, error } = await supabase.from("circles").select("*");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const matches = rankCircles(data ?? [], answers as IntakeAnswers, MEMBER.city);
  return NextResponse.json({ matches });
}

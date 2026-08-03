import { NextRequest, NextResponse } from "next/server";
import { MEMBER } from "@/lib/member";
import { getSupabaseClient } from "@/lib/supabase";

export async function GET() {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("join_requests")
    .select("*")
    .eq("member_name", MEMBER.name)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ requests: data ?? [] });
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as { circleId?: string };

  if (!body.circleId) {
    return NextResponse.json({ error: "circleId is required." }, { status: 400 });
  }

  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("join_requests")
    .insert({ circle_id: body.circleId, member_name: MEMBER.name })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ request: data });
}

export async function DELETE(request: NextRequest) {
  const body = (await request.json()) as { circleId?: string };

  if (!body.circleId) {
    return NextResponse.json({ error: "circleId is required." }, { status: 400 });
  }

  const supabase = getSupabaseClient();
  const { error } = await supabase
    .from("join_requests")
    .delete()
    .eq("circle_id", body.circleId)
    .eq("member_name", MEMBER.name);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

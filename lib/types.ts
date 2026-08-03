export type Goal = "negotiation" | "leadership" | "transition" | "confidence";
export type Stage = "early" | "mid" | "senior";
export type MeetingFormat = "virtual" | "in-person" | "either";
export type CircleFormat = "in-person" | "hybrid" | "virtual";

export interface Circle {
  id: string;
  name: string;
  blurb: string;
  focus: string[];
  stage: string[];
  format: CircleFormat;
  city: string | null;
  members: number;
  started: string;
  open: boolean;
  image_url: string | null;
}

export interface MatchResult extends Circle {
  score: number;
  reasons: string[];
}

export interface IntakeAnswers {
  goals: Goal[];
  stage: Stage;
  format: MeetingFormat;
}

export interface JoinRequestRow {
  id: string;
  circle_id: string;
  member_name: string;
  status: string;
  created_at: string;
}

/** Shared status vocabulary used across mission, projects and AI lab. */
export type Status =
  | "Completed"
  | "Building"
  | "Learning"
  | "Exploring"
  | "Planned"
  | "Coming Soon";

export const statusOrder: Status[] = [
  "Building",
  "Learning",
  "Exploring",
  "Completed",
  "Planned",
  "Coming Soon",
];
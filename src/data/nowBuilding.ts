export interface NowBuildingItem {
  title: string;
  detail: string;
}

/** Home "Now Building" — keep this alive and current. */
export const nowBuilding: NowBuildingItem[] = [
  {
    title: "Sunny Game Cafe",
    detail: "Full-stack cafe booking system — testing & deployment in progress",
  },
  { title: "Garage ERP Backend", detail: "Spring Boot service + REST layer" },
  { title: "Oracle Java Certification", detail: "Studying toward the exam" },
  { title: "Google ADK Experiments", detail: "First agent prototypes" },
];

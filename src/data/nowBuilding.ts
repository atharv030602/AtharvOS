export interface NowBuildingItem {
  title: string;
  detail: string;
}

/** Home "Now Building" — keep this alive and current. */
export const nowBuilding: NowBuildingItem[] = [
  { title: "Garage ERP Backend", detail: "Spring Boot service + REST layer" },
  { title: "Spring Boot APIs", detail: "Auth, billing & inventory endpoints" },
  { title: "Oracle Java Certification", detail: "Studying toward the exam" },
  { title: "Google ADK Experiments", detail: "First agent prototypes" },
];
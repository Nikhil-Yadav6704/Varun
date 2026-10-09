export type Severity = "SEVERE" | "HIGH" | "MODERATE";

export interface Anomaly {
  id: string;
  name: string;
  short: string;
  severity: Severity;
  lat: number;
  lon: number;
  efi: number;
  confidence: number;
  physics: number;
  area: number;
  checks: { name: string; score: number; pass: boolean }[];
}

export const anomalies: Anomaly[] = [
  {
    id: "amphan-core",
    name: "Cyclone Amphan Core",
    short: "Amphan Core",
    severity: "SEVERE",
    lat: 21.62,
    lon: 88.31,
    efi: 0.94,
    confidence: 0.87,
    physics: 0.92,
    area: 142,
    checks: [
      { name: "Mass Conservation", score: 0.94, pass: true },
      { name: "Wind–Pressure Consistency", score: 0.91, pass: true },
      { name: "Moisture Convergence", score: 0.9, pass: true },
    ],
  },
  {
    id: "cloudburst-hp",
    name: "Cloudburst Cluster — Himachal Pradesh",
    short: "Cloudburst Cluster",
    severity: "HIGH",
    lat: 31.1,
    lon: 77.17,
    efi: 0.81,
    confidence: 0.78,
    physics: 0.85,
    area: 64,
    checks: [
      { name: "Mass Conservation", score: 0.87, pass: true },
      { name: "Wind–Pressure Consistency", score: 0.85, pass: true },
      { name: "Moisture Convergence", score: 0.86, pass: true },
    ],
  },
  {
    id: "coastal-odisha",
    name: "Coastal Wind Anomaly — Odisha",
    short: "Coastal Wind Anomaly",
    severity: "MODERATE",
    lat: 19.8,
    lon: 85.83,
    efi: 0.58,
    confidence: 0.63,
    physics: 0.9,
    area: 97,
    checks: [
      { name: "Mass Conservation", score: 0.93, pass: true },
      { name: "Wind–Pressure Consistency", score: 0.88, pass: true },
      { name: "Moisture Convergence", score: 0.61, pass: false },
    ],
  },
];

export const getAnomaly = (id: string) => anomalies.find((a) => a.id === id);

export const fmtCoords = (a: { lat: number; lon: number }) =>
  `${a.lat.toFixed(2)}°N, ${a.lon.toFixed(2)}°E`;

export const sevColor: Record<Severity, string> = {
  SEVERE: "var(--accent-red)",
  HIGH: "var(--accent-amber)",
  MODERATE: "var(--accent-cyan)",
};

/* --------------------------------------------------------------------------
   Engagement catalogue — what Alpha offers and how partners plug in.
   Split into two audiences:
     - SERVICES: waste-producing clients (B2B sales motion). They get a
       way to handle waste responsibly without dumping.
     - PARTNERSHIPS: capital / strategic / international relationships
       (investor + tech-licensing motion). They get a stake in Alpha's
       expansion.
   Both arrays share the same shape so the EngagementSection component can
   render either set with the same UX (cards on desktop, chip-to-modal on
   mobile). Each item's `id` becomes the value the /contact form uses
   when pre-populating the dropdown via `?topic={id}`.
-------------------------------------------------------------------------- */

export interface EngagementModel {
  /** Stable key. Used in URL hashes (#id) and in /contact?topic={id}. */
  id: string;
  /** Card heading. */
  label: string;
  /** One-line subtitle in mono caps, shown under the heading. */
  note: string;
  /** Long-form body paragraph shown on desktop card + inside the modal. */
  body: string;
  /** Bullet list of concrete commitments / characteristics. */
  bullets: string[];
}

/* ---------- Services — for waste producers --------------------------- */

export const services: EngagementModel[] = [
  {
    id: "on-site-processing",
    label: "On-site processing",
    note: "Alpha installs and operates a unit at your plant.",
    body:
      "Alpha sets up and runs a dedicated processing line inside the producer's own facility. We fund the equipment, supply the operating team, and take the waste through the full Alpha process on the producer's site. The waste never leaves the boundary; the producer keeps the carbon credits, the CSR narrative, and the ESG reporting.",
    bullets: [
      "Alpha funds and operates the on-site line",
      "Waste never leaves the producer's premises",
      "Producer retains carbon credits and CSR reporting",
    ],
  },
  {
    id: "collection",
    label: "Collection",
    note: "Send your waste to Alpha's hub instead of to landfill.",
    body:
      "For producers who don't want machinery on site, Alpha collects the waste under a multi-year MOU and processes it at our regional hub. Replaces landfill, dumping fees, and the regulatory burden of waste storage with a single tracked outbound stream. Volume scales with the producer's output.",
    bullets: [
      "Year-round waste collection under a multi-year MOU",
      "Single outbound stream replaces landfill + dumping fees",
      "Volume scales with the producer's output",
    ],
  },
  {
    id: "sustainability-advisory",
    label: "Sustainability advisory & R&D",
    note: "Strategy, trials, and research for novel streams.",
    body:
      "Alpha works with the producer's engineering and sustainability team to design a tailored waste-handling strategy: site visits, stream-by-stream characterisation, trial runs of new chemistries inside our R&D facility, and structured findings. Useful when the waste is unusual, when regulation is in flux, or when the producer wants to validate a route before committing to a long-term contract.",
    bullets: [
      "On-site assessment and stream characterisation",
      "Pilot trials run in Alpha's DSIR-recognised R&D centre",
      "Findings delivered as a structured strategy document",
    ],
  },
];

/* ---------- Partnerships — for capital / strategic relationships ------ */

export const partnerships: EngagementModel[] = [
  {
    id: "investment",
    label: "Investment",
    note: "Indian capital. Alpha retains stewardship.",
    body:
      "Equity participation from Indian institutional partners and accredited investors backing Alpha's expansion. Capital funds the move from current operating footprint to industrial throughput — standardised commercial machinery and the first regional hubs. Alpha retains the patented process, operational supervision, and a meaningful equity stake in every project, so process control and economic incentives stay aligned.",
    bullets: [
      "Equity participation for Indian investors",
      "Government of India PLI approval in hand",
      "Alpha retains operational stewardship and equity",
    ],
  },
  {
    id: "licensing",
    label: "Licensing",
    note: "International partners. Alpha supervises.",
    body:
      "For international partners deploying Alpha's process in their own region. The partner funds the build, runs the line, and operates under local regulation. Alpha provides the technology transfer, the technical supervision, and retains a meaningful equity interest — skin in the game on every licensed plant. We don't sell the technology; we partner around it.",
    bullets: [
      "Patented process licensed for an agreed territory",
      "Partner funds the build and operates the line",
      "Alpha supervises technically and retains equity",
    ],
  },
  {
    id: "collaboration",
    label: "Collaboration",
    note: "Two-way technology exchange.",
    body:
      "A research-led partnership with international institutes, steel producers, and recycling operators. Alpha contributes its patented process and operational know-how; partners contribute complementary capabilities — new waste streams, new geographies, new chemistries. Shared R&D, shared IP where it makes sense, shared upside.",
    bullets: [
      "Two-way technology exchange with strategic partners",
      "Joint R&D into new waste streams and chemistries",
      "Cross-border applications under CBAM and similar",
    ],
  },
];

/* ---------- Lookup helpers ----------------------------------------------- */

export const allEngagements: EngagementModel[] = [...services, ...partnerships];

export function findEngagement(id: string | null | undefined): EngagementModel | null {
  if (!id) return null;
  return allEngagements.find((m) => m.id === id) ?? null;
}

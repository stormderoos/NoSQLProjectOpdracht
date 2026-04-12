import { useState } from "react";

const OWNER = "#user-owner-id";
const BOX_W = 220;
const HEADER_H = 34;
const ROW_H = 22;
const PAD = 8;

const entities = {
  User: {
    color: "#2563EB", bg: "#EFF6FF", border: "#2563EB",
    x: 60, y: 200,
    fields: [
      { name: "_id", type: "ObjectId", pk: true },
      { name: "username", type: "String" },
      { name: "email", type: "String" },
      { name: "password", type: "String (hashed)" },
      { name: "role", type: "'user'|'admin'" },
      { name: "profileImgUrl", type: "String" },
      { name: "gender", type: "String" },
    ],
  },
  Club: {
    color: "#16A34A", bg: "#F0FDF4", border: "#16A34A",
    x: 500, y: 80,
    fields: [
      { name: "_id", type: "ObjectId", pk: true },
      { name: "name", type: "String" },
      { name: "location", type: "String" },
      { name: "logoUrl", type: "String" },
      { name: "players[]", type: "ObjectId[]", fk: "Player" },
      { name: "createdBy", type: "ObjectId", fk: "User" },
    ],
  },
  Player: {
    color: "#D97706", bg: "#FFFBEB", border: "#D97706",
    x: 500, y: 380,
    fields: [
      { name: "_id", type: "ObjectId", pk: true },
      { name: "firstName", type: "String" },
      { name: "lastName", type: "String" },
      { name: "position", type: "String (enum)" },
      { name: "clubId", type: "ObjectId", fk: "Club" },
      { name: "birthdate", type: "Date" },
      { name: "goals", type: "Number" },
      { name: "assists", type: "Number" },
      { name: "profileImageUrl", type: "String" },
    ],
  },
  Match: {
    color: "#DC2626", bg: "#FFF1F2", border: "#DC2626",
    x: 920, y: 200,
    fields: [
      { name: "_id", type: "ObjectId", pk: true },
      { name: "date", type: "Date" },
      { name: "location", type: "String" },
      { name: "home_club_id", type: "ObjectId", fk: "Club" },
      { name: "away_club_id", type: "ObjectId", fk: "Club" },
      { name: "score_home", type: "Number" },
      { name: "score_away", type: "Number" },
      { name: "scorers[]", type: "ScoreEntry (embed)" },
      { name: "assisters[]", type: "AssistEntry (embed)" },
    ],
  },
};

function bh(e) { return HEADER_H + e.fields.length * ROW_H + PAD; }
function cx(e) { return e.x + BOX_W / 2; }
function cy(e) { return e.y + bh(e) / 2; }

function curve(x1, y1, x2, y2) {
  const mx = (x1 + x2) / 2;
  return `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`;
}

const mongoRels = [
  { from: "User",   fSide: "right", to: "Club",   tSide: "left",  label: "createdBy",    fy: 0.25, ty: 0.78 },
  { from: "Club",   fSide: "bottom",to: "Player",  tSide: "top",   label: "players[]",    fy: 1,    ty: 0 },
  { from: "Club",   fSide: "right", to: "Match",   tSide: "left",  label: "home_club_id", fy: 0.35, ty: 0.35 },
  { from: "Club",   fSide: "right", to: "Match",   tSide: "left",  label: "away_club_id", fy: 0.55, ty: 0.55 },
];

function getPort(e, side, frac = 0.5) {
  const h = bh(e);
  if (side === "right")  return [e.x + BOX_W,  e.y + h * frac];
  if (side === "left")   return [e.x,           e.y + h * frac];
  if (side === "bottom") return [e.x + BOX_W * frac, e.y + h];
  if (side === "top")    return [e.x + BOX_W * frac, e.y];
  return [cx(e), cy(e)];
}

export default function ERD() {
  const [hov, setHov] = useState(null);
  const svgW = 1200, svgH = 640;

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", background: "#F8FAFC", borderRadius: 12, padding: 16, maxWidth: 1220 }}>
      <div style={{ marginBottom: 8 }}>
        <span style={{ fontWeight: 700, fontSize: 16, color: "#1E293B" }}>ERD — Football API (NoSQL IVT2.2)</span>
        <span style={{ marginLeft: 16, fontSize: 12, color: "#64748B" }}>MongoDB + Neo4j</span>
      </div>
      <div style={{ display: "flex", gap: 16, fontSize: 11, marginBottom: 10, flexWrap: "wrap" }}>
        {[
          { color: "#FBBF24", label: "PK – Primary Key" },
          { color: "#FCA5A5", label: "FK – Foreign Key / referentie" },
          { color: "#94A3B8", label: "─ ─  MongoDB referentie" },
          { color: "#6366F1", label: "─ ─  Neo4j relatie" },
        ].map(l => (
          <span key={l.label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 14, height: 10, background: l.color, borderRadius: 2, display: "inline-block" }} />
            {l.label}
          </span>
        ))}
      </div>
      <svg width={svgW} height={svgH} viewBox={`0 0 ${svgW} ${svgH}`}>
        <defs>
          {["mongo","neo-f","neo-fc"].map(id => (
            <marker key={id} id={`arr-${id}`} markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill={id === "mongo" ? "#94A3B8" : id === "neo-f" ? "#6366F1" : "#8B5CF6"} />
            </marker>
          ))}
        </defs>

        {/* MongoDB relation lines */}
        {mongoRels.map((r, i) => {
          const fe = entities[r.from], te = entities[r.to];
          const [x1, y1] = getPort(fe, r.fSide, r.fy);
          const [x2, y2] = getPort(te, r.tSide, r.ty);
          const mid = [(x1+x2)/2, Math.min(y1,y2) - 14 - i*4];
          return (
            <g key={i}>
              <path d={curve(x1, y1, x2, y2)} fill="none" stroke="#94A3B8" strokeWidth="1.5"
                strokeDasharray="5,3" markerEnd="url(#arr-mongo)" />
              <text x={(x1+x2)/2} y={(y1+y2)/2 - 8} fontSize="10" fill="#64748B"
                textAnchor="middle" fontStyle="italic">{r.label}</text>
            </g>
          );
        })}

        {/* Neo4j: FOLLOWS self-loop on User */}
        {(() => {
          const u = entities.User;
          const tx = u.x + BOX_W * 0.5, ty = u.y;
          const lx = u.x + BOX_W * 0.25;
          return (
            <g>
              <path d={`M${tx},${ty} C${tx + 30},${ty - 70} ${lx - 30},${ty - 70} ${lx},${ty}`}
                fill="none" stroke="#6366F1" strokeWidth="2" strokeDasharray="5,3" markerEnd="url(#arr-neo-f)" />
              <text x={u.x + BOX_W * 0.38} y={ty - 54} fontSize="10" fill="#6366F1" fontWeight="600" textAnchor="middle">FOLLOWS</text>
            </g>
          );
        })()}

        {/* Neo4j: FOLLOWS_CLUB User → Club */}
        {(() => {
          const u = entities.User, c = entities.Club;
          const [x1, y1] = getPort(u, "right", 0.12);
          const [x2, y2] = getPort(c, "left", 0.15);
          return (
            <g>
              <path d={curve(x1, y1, x2, y2)} fill="none" stroke="#8B5CF6"
                strokeWidth="2" strokeDasharray="5,3" markerEnd="url(#arr-neo-fc)" />
              <text x={(x1+x2)/2} y={Math.min(y1,y2) - 10} fontSize="10" fill="#8B5CF6"
                fontWeight="600" textAnchor="middle">FOLLOWS_CLUB</text>
            </g>
          );
        })()}

        {/* Entity boxes */}
        {Object.entries(entities).map(([name, e]) => {
          const h = bh(e);
          const isHov = hov === name;
          return (
            <g key={name} onMouseEnter={() => setHov(name)} onMouseLeave={() => setHov(null)}
              style={{ cursor: "default", filter: isHov ? "drop-shadow(0 4px 12px rgba(0,0,0,.18))" : "drop-shadow(0 2px 4px rgba(0,0,0,.08))" }}>
              <rect x={e.x} y={e.y} width={BOX_W} height={h} rx={7}
                fill={e.bg} stroke={e.border} strokeWidth="2" />
              {/* Header */}
              <rect x={e.x} y={e.y} width={BOX_W} height={HEADER_H} rx={7} fill={e.color} />
              <rect x={e.x} y={e.y + HEADER_H - 6} width={BOX_W} height={6} fill={e.color} />
              <text x={e.x + BOX_W / 2} y={e.y + 22} fontSize="13" fontWeight="700"
                fill="white" textAnchor="middle">{name}</text>
              {/* Fields */}
              {e.fields.map((f, i) => {
                const ry = e.y + HEADER_H + PAD / 2 + i * ROW_H;
                const isPK = !!f.pk, isFK = !!f.fk;
                return (
                  <g key={f.name}>
                    {(isPK || isFK) && (
                      <rect x={e.x + 6} y={ry + 2} width={22} height={14} rx={3}
                        fill={isPK ? "#FBBF24" : "#FCA5A5"} />
                    )}
                    {(isPK || isFK) && (
                      <text x={e.x + 17} y={ry + 13} fontSize="8" fill="white"
                        textAnchor="middle" fontWeight="700">{isPK ? "PK" : "FK"}</text>
                    )}
                    <text x={e.x + (isPK || isFK ? 34 : 10)} y={ry + 13}
                      fontSize="11" fill={isPK ? "#1E293B" : "#374151"} fontWeight={isPK ? "600" : "400"}>{f.name}</text>
                    <text x={e.x + BOX_W - 6} y={ry + 13} fontSize="9" fill="#9CA3AF"
                      textAnchor="end">{f.type}</text>
                    {i < e.fields.length - 1 && (
                      <line x1={e.x + 4} y1={ry + ROW_H} x2={e.x + BOX_W - 4} y2={ry + ROW_H}
                        stroke={e.border} strokeOpacity="0.15" />
                    )}
                  </g>
                );
              })}
            </g>
          );
        })}

        {/* Neo4j badge */}
        <rect x={24} y={svgH - 60} width={280} height={50} rx={8}
          fill="white" stroke="#E2E8F0" strokeWidth="1.5" />
        <text x={36} y={svgH - 42} fontSize="11" fontWeight="700" fill="#475569">Neo4j graaf (naast MongoDB)</text>
        <circle cx={36} cy={svgH - 26} r={4} fill="#6366F1" />
        <text x={46} y={svgH - 22} fontSize="10" fill="#6366F1">(User)-[:FOLLOWS]-&gt;(User)</text>
        <circle cx={168} cy={svgH - 26} r={4} fill="#8B5CF6" />
        <text x={178} y={svgH - 22} fontSize="10" fill="#8B5CF6">-[:FOLLOWS_CLUB]-&gt;(Club)</text>
      </svg>
    </div>
  );
}

import { useMemo, useState } from "react";
import styled from "styled-components";
import { players } from "../../data/players";
import { fullName, getOverall, type Player } from "../../data/types";

type SortKey = "name" | "position" | "campus" | "year" | "speed" | "shooting" | "passing" | "defense" | "physicality" | "goaltending" | "overall";

interface Column {
  key: SortKey;
  label: string;
  align?: "left" | "right";
}

const columns: Column[] = [
  { key: "name", label: "Player" },
  { key: "position", label: "Pos" },
  { key: "campus", label: "Campus" },
  { key: "year", label: "Class" },
  { key: "speed", label: "SPD", align: "right" },
  { key: "shooting", label: "SHO", align: "right" },
  { key: "passing", label: "PAS", align: "right" },
  { key: "defense", label: "DEF", align: "right" },
  { key: "physicality", label: "PHY", align: "right" },
  { key: "goaltending", label: "GLT", align: "right" },
  { key: "overall", label: "OVR", align: "right" },
];

const sortValue = (p: Player, key: SortKey): string | number => {
  switch (key) {
    case "name":
      return fullName(p);
    case "overall":
      return getOverall(p);
    case "position":
    case "campus":
    case "year":
      return p[key];
    default:
      return p.stats[key];
  }
};

const Shell = styled.div`
  padding: 128px 6vw 80px;
  max-width: 1320px;
  margin: 0 auto;
`;

const Heading = styled.div`
  margin-bottom: 28px;
  h1 {
    font-size: clamp(28px, 4vw, 42px);
    font-weight: 800;
    color: ${({ theme }) => theme.colors.ivory};
  }
  p {
    margin-top: 8px;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.slate};
  }
`;

const TableWrap = styled.div`
  overflow-x: auto;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  min-width: 820px;
`;

const Thead = styled.thead`
  background: rgba(255, 255, 255, 0.05);
`;

const Th = styled.th<{ $align?: "left" | "right"; $active: boolean }>`
  text-align: ${({ $align }) => $align ?? "left"};
  padding: 14px 16px;
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ $active, theme }) => ($active ? theme.colors.ivory : theme.colors.slate)};
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  transition: color 160ms ease;

  &:hover {
    color: ${({ theme }) => theme.colors.ivory};
  }
`;

const Tr = styled.tr`
  transition: background 150ms ease;
  &:nth-of-type(odd) {
    background: rgba(255, 255, 255, 0.02);
  }
  &:hover {
    background: rgba(176, 35, 73, 0.14);
  }
`;

const Td = styled.td<{ $align?: "left" | "right" }>`
  padding: 12px 16px;
  text-align: ${({ $align }) => $align ?? "left"};
  color: ${({ theme }) => theme.colors.ivory};
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  white-space: nowrap;
`;

const NameCell = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;

  span {
    font-family: ${({ theme }) => theme.font.mono};
    font-size: 11px;
    color: ${({ theme }) => theme.colors.slate};
  }
`;

const OverallCell = styled.span<{ $tier: "gold" | "maroon" | "slate" }>`
  font-weight: 800;
  color: ${({ $tier, theme }) =>
    $tier === "gold" ? theme.colors.gold : $tier === "maroon" ? theme.colors.maroonLight : theme.colors.slate};
`;

const SortArrow = styled.span`
  margin-left: 4px;
  font-size: 10px;
`;

export const RosterTable = () => {
  const [sortKey, setSortKey] = useState<SortKey>("overall");
  const [direction, setDirection] = useState<1 | -1>(-1);

  const sorted = useMemo(() => {
    return [...players].sort((a, b) => {
      const av = sortValue(a, sortKey);
      const bv = sortValue(b, sortKey);
      if (typeof av === "number" && typeof bv === "number") return (av - bv) * direction;
      return String(av).localeCompare(String(bv)) * direction;
    });
  }, [sortKey, direction]);

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setDirection((d) => (d === 1 ? -1 : 1));
    } else {
      setSortKey(key);
      setDirection(-1);
    }
  };

  return (
    <Shell>
      <Heading>
        <h1>Roster Board</h1>
        <p>Data-dense view of the full stat sheet. Click any column to sort.</p>
      </Heading>
      <TableWrap>
        <Table>
          <Thead>
            <tr>
              {columns.map((col) => (
                <Th
                  key={col.key}
                  $align={col.align}
                  $active={sortKey === col.key}
                  onClick={() => handleSort(col.key)}
                  scope="col"
                >
                  {col.label}
                  {sortKey === col.key && <SortArrow>{direction === 1 ? "▲" : "▼"}</SortArrow>}
                </Th>
              ))}
            </tr>
          </Thead>
          <tbody>
            {sorted.map((player) => {
              const overall = getOverall(player);
              const tier = overall >= 88 ? "gold" : overall >= 78 ? "maroon" : "slate";
              return (
                <Tr key={player.id}>
                  <Td>
                    <NameCell>
                      {fullName(player)} <span>#{player.number}</span>
                    </NameCell>
                  </Td>
                  <Td>{player.position}</Td>
                  <Td>{player.campus}</Td>
                  <Td>{player.year}</Td>
                  <Td $align="right">{player.stats.speed}</Td>
                  <Td $align="right">{player.stats.shooting}</Td>
                  <Td $align="right">{player.stats.passing}</Td>
                  <Td $align="right">{player.stats.defense}</Td>
                  <Td $align="right">{player.stats.physicality}</Td>
                  <Td $align="right">{player.stats.goaltending}</Td>
                  <Td $align="right">
                    <OverallCell $tier={tier}>{overall}</OverallCell>
                  </Td>
                </Tr>
              );
            })}
          </tbody>
        </Table>
      </TableWrap>
    </Shell>
  );
};

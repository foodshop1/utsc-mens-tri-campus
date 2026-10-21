import { useMemo, useState } from "react";
import styled from "styled-components";
import { players } from "../../data/players";
import { fullName, type Player, type Position } from "../../data/types";
import { PlayerCard } from "../PlayerCard/PlayerCard";
import { PlayerModal } from "./PlayerModal";

const filters: Array<{ id: Position | "All"; label: string }> = [
  { id: "All", label: "Full Squad" },
  { id: "Forward", label: "Forwards" },
  { id: "Defense", label: "Defense" },
  { id: "Goalie", label: "Goalies" },
];

const Shell = styled.div`
  padding: 128px 6vw 80px;
  max-width: 1320px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 36px;
`;

const Heading = styled.div`
  h1 {
    font-size: clamp(28px, 4vw, 42px);
    font-weight: 800;
    color: ${({ theme }) => theme.colors.ivory};
  }
  p {
    margin-top: 8px;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.slate};
    max-width: 440px;
  }
`;

const Controls = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
`;

const SearchInput = styled.input`
  padding: 10px 16px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.05);
  color: ${({ theme }) => theme.colors.ivory};
  font-size: 13px;
  width: 200px;
  transition: border-color 160ms ease, background 160ms ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.slate};
  }
  &:focus {
    border-color: ${({ theme }) => theme.colors.maroonBright};
    background: rgba(255, 255, 255, 0.08);
  }
`;

const FilterRow = styled.div`
  display: flex;
  gap: 6px;
  padding: 4px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const FilterChip = styled.button<{ $active: boolean }>`
  padding: 8px 16px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  background: ${({ $active, theme }) => ($active ? theme.colors.ivory : "transparent")};
  color: ${({ $active, theme }) => ($active ? theme.colors.ink : theme.colors.ivory)};
  transition: background 180ms ease, color 180ms ease, transform 150ms cubic-bezier(0.2, 0, 0, 1);

  &:active {
    transform: scale(0.96);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 18px;
`;

const EmptyState = styled.div`
  padding: 60px 0;
  text-align: center;
  color: ${({ theme }) => theme.colors.slate};
  font-size: 14px;
`;

export const TeamGrid = () => {
  const [filter, setFilter] = useState<Position | "All">("All");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Player | null>(null);

  const visible = useMemo(() => {
    return players.filter((p) => {
      const matchesFilter = filter === "All" || p.position === filter;
      const matchesQuery = fullName(p).toLowerCase().includes(query.trim().toLowerCase());
      return matchesFilter && matchesQuery;
    });
  }, [filter, query]);

  return (
    <Shell>
      <Header>
        <Heading>
          <h1>Team Builder</h1>
          <p>Browse the full squad FIFA-card style — filter by position, search by name, tap a card for the full breakdown.</p>
        </Heading>
        <Controls>
          <SearchInput
            placeholder="Search player…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search players"
          />
          <FilterRow role="tablist" aria-label="Filter by position">
            {filters.map((f) => (
              <FilterChip key={f.id} $active={filter === f.id} onClick={() => setFilter(f.id)}>
                {f.label}
              </FilterChip>
            ))}
          </FilterRow>
        </Controls>
      </Header>

      {visible.length > 0 ? (
        <Grid>
          {visible.map((player, index) => (
            <PlayerCard key={player.id} player={player} index={index} onSelect={setSelected} />
          ))}
        </Grid>
      ) : (
        <EmptyState>No players match “{query}”.</EmptyState>
      )}

      <PlayerModal player={selected} onClose={() => setSelected(null)} />
    </Shell>
  );
};

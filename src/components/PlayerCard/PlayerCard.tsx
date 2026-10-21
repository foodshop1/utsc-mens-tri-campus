import { motion } from "framer-motion";
import styled from "styled-components";
import type { Player } from "../../data/types";
import { fullName, getOverall, overallTier } from "../../data/types";
import { PlayerPortrait } from "./PlayerPortrait";

interface PlayerCardProps {
  player: Player;
  index: number;
  onSelect: (player: Player) => void;
}

const tierGradient = {
  gold: "linear-gradient(165deg, #3a3222 0%, #241f16 70%)",
  maroon: "linear-gradient(165deg, #58132a 0%, #2c0712 70%)",
  slate: "linear-gradient(165deg, #312a2c 0%, #1c1618 70%)",
} as const;

const tierBorder = {
  gold: "#c9a24b",
  maroon: "#b02349",
  slate: "#6b5b5e",
} as const;

const Card = styled(motion.button)<{ $tier: keyof typeof tierGradient }>`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px 14px 16px;
  border-radius: 24px;
  border: 1px solid ${({ $tier }) => tierBorder[$tier]}55;
  background: ${({ $tier }) => tierGradient[$tier]};
  box-shadow: ${({ theme }) => theme.shadow.card};
  text-align: center;
  transition:
    transform 180ms cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 180ms ease,
    border-color 180ms ease;

  &:hover {
    transform: translateY(-6px);
    border-color: ${({ $tier }) => tierBorder[$tier]};
    box-shadow: ${({ theme }) => theme.shadow.raised};
  }

  &:active {
    transform: translateY(-2px) scale(0.97);
    transition: transform 120ms cubic-bezier(0.2, 0, 0, 1);
  }
`;

const BadgeRow = styled.div`
  position: absolute;
  top: 14px;
  left: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1;
`;

const Overall = styled.span<{ $tier: keyof typeof tierGradient }>`
  font-family: ${({ theme }) => theme.font.display};
  font-weight: 800;
  font-size: 26px;
  color: ${({ $tier }) => tierBorder[$tier]};
`;

const PositionTag = styled.span`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 10px;
  letter-spacing: 0.06em;
  color: ${({ theme }) => theme.colors.slate};
  margin-top: 2px;
`;

const NumberTag = styled.span`
  position: absolute;
  top: 14px;
  right: 14px;
  font-family: ${({ theme }) => theme.font.display};
  font-weight: 700;
  font-size: 15px;
  color: ${({ theme }) => theme.colors.ivory};
  opacity: 0.55;
`;

const Name = styled.h3`
  font-size: 15px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.ivory};
`;

const Sub = styled.span`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.slate};
  font-family: ${({ theme }) => theme.font.mono};
`;

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px 14px;
  width: 100%;
  margin-top: 4px;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
`;

const StatCell = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
`;

const StatValue = styled.span`
  font-family: ${({ theme }) => theme.font.display};
  font-weight: 700;
  font-size: 15px;
  color: ${({ theme }) => theme.colors.ivory};
`;

const StatKey = styled.span`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 9px;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.slate};
`;

const abbreviated: Array<{ key: keyof Player["stats"]; label: string }> = [
  { key: "speed", label: "SPD" },
  { key: "shooting", label: "SHO" },
  { key: "passing", label: "PAS" },
  { key: "defense", label: "DEF" },
  { key: "physicality", label: "PHY" },
  { key: "goaltending", label: "GLT" },
];

export const PlayerCard = ({ player, index, onSelect }: PlayerCardProps) => {
  const overall = getOverall(player);
  const tier = overallTier(overall);
  const visibleStats =
    player.position === "Goalie"
      ? abbreviated.filter((s) => ["goaltending", "speed", "passing", "defense", "physicality"].includes(s.key)).slice(0, 6)
      : abbreviated.filter((s) => s.key !== "goaltending");

  return (
    <Card
      $tier={tier}
      onClick={() => onSelect(player)}
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.3), ease: [0.16, 1, 0.3, 1] }}
      aria-label={`View spotlight for ${fullName(player)}`}
    >
      <BadgeRow>
        <Overall $tier={tier}>{overall}</Overall>
        <PositionTag>{player.position === "Defense" ? "DEF" : player.position === "Goalie" ? "G" : "FWD"}</PositionTag>
      </BadgeRow>
      <NumberTag>#{player.number}</NumberTag>
      <PlayerPortrait player={player} size={84} />
      <div>
        <Name>{fullName(player)}</Name>
        <Sub>
          {player.campus} · {player.year}
        </Sub>
      </div>
      <StatGrid>
        {visibleStats.map((s) => (
          <StatCell key={s.key}>
            <StatValue>{player.stats[s.key]}</StatValue>
            <StatKey>{s.label}</StatKey>
          </StatCell>
        ))}
      </StatGrid>
    </Card>
  );
};

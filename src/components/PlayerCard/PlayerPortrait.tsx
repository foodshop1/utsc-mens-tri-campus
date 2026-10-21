import styled from "styled-components";
import type { Player } from "../../data/types";

interface PlayerPortraitProps {
  player: Player;
  size?: number;
  flat?: boolean;
}

const Frame = styled.div<{ $size: number; $flat: boolean }>`
  position: relative;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: ${({ $flat }) => ($flat ? "16px" : "50%")};
  overflow: hidden;
  background: linear-gradient(
    155deg,
    ${({ theme }) => theme.colors.maroonMid} 0%,
    ${({ theme }) => theme.colors.maroonDeep} 48%,
    ${({ theme }) => theme.colors.maroonDeepest} 100%
  );
  display: grid;
  place-items: center;
  flex-shrink: 0;
  border: 2px solid rgba(255, 255, 255, 0.12);
`;

const WatermarkNumber = styled.span<{ $size: number }>`
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  font-family: ${({ theme }) => theme.font.display};
  font-weight: 800;
  font-size: ${({ $size }) => $size * 0.72}px;
  color: rgba(255, 255, 255, 0.1);
  letter-spacing: -0.04em;
  user-select: none;
  line-height: 1;
`;

const Initials = styled.span<{ $size: number }>`
  position: relative;
  z-index: 1;
  font-family: ${({ theme }) => theme.font.display};
  font-weight: 700;
  font-size: ${({ $size }) => $size * 0.26}px;
  color: ${({ theme }) => theme.colors.ivory};
  letter-spacing: 0.02em;
`;

const Sheen = styled.div`
  position: absolute;
  inset: 0;
  background: ${({ theme }) => theme.gradients.cardSheen};
  mix-blend-mode: screen;
`;

const positionMark: Record<Player["position"], string> = {
  Forward: "FWD",
  Defense: "DEF",
  Goalie: "G",
};

export const PlayerPortrait = ({ player, size = 72, flat = false }: PlayerPortraitProps) => {
  return (
    <Frame $size={size} $flat={flat} aria-hidden="true">
      <WatermarkNumber $size={size}>{player.number}</WatermarkNumber>
      <Sheen />
      <Initials $size={size}>{positionMark[player.position]}</Initials>
    </Frame>
  );
};

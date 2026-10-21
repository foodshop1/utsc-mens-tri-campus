import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import styled from "styled-components";
import type { Player } from "../../data/types";
import { fullName, getOverall } from "../../data/types";
import { PlayerPortrait } from "../PlayerCard/PlayerPortrait";
import { StatBar } from "../PlayerCard/StatBar";

interface PlayerModalProps {
  player: Player | null;
  onClose: () => void;
}

const Backdrop = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 200;
  display: grid;
  place-items: center;
  padding: 24px;
  background: rgba(10, 2, 4, 0.72);
  backdrop-filter: blur(10px);
`;

const Card = styled(motion.div)`
  position: relative;
  width: min(560px, 100%);
  max-height: 86vh;
  overflow-y: auto;
  padding: 36px;
  border-radius: 28px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: linear-gradient(165deg, #58132a 0%, #2c0712 55%, #180307 100%);
  box-shadow: ${({ theme }) => theme.shadow.raised};
`;

const CloseButton = styled.button`
  position: absolute;
  top: 18px;
  right: 18px;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.14);
  color: ${({ theme }) => theme.colors.ivory};
  transition: background 160ms ease, transform 150ms cubic-bezier(0.2, 0, 0, 1);

  &:hover {
    background: rgba(255, 255, 255, 0.16);
  }
  &:active {
    transform: scale(0.92);
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
`;

const HeaderText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Name = styled.h2`
  font-size: 24px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.ivory};
`;

const Meta = styled.span`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 11px;
  letter-spacing: 0.06em;
  color: ${({ theme }) => theme.colors.slate};
  text-transform: uppercase;
`;

const Badges = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 14px;
  flex-wrap: wrap;
`;

const Badge = styled.span`
  padding: 5px 12px;
  border-radius: 999px;
  font-size: 11px;
  font-family: ${({ theme }) => theme.font.mono};
  letter-spacing: 0.04em;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.14);
  color: ${({ theme }) => theme.colors.ivory};
`;

const Bio = styled.p`
  margin-top: 18px;
  font-size: 14px;
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.ivory};
  opacity: 0.85;
`;

const StatStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 22px;
`;

export const PlayerModal = ({ player, onClose }: PlayerModalProps) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      {player && (
        <Backdrop
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <Card
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label={fullName(player)}
          >
            <CloseButton onClick={onClose} aria-label="Close">
              ✕
            </CloseButton>
            <Header>
              <PlayerPortrait player={player} size={76} />
              <HeaderText>
                <Name>{fullName(player)}</Name>
                <Meta>
                  #{player.number} · {player.position} · {player.campus}
                </Meta>
              </HeaderText>
            </Header>
            <Badges>
              <Badge>Overall {getOverall(player)}</Badge>
              <Badge>{player.year}</Badge>
              <Badge>{player.hometown}</Badge>
              <Badge>
                {player.height} / {player.weightLb} lb
              </Badge>
            </Badges>
            <Bio>{player.bio}</Bio>
            <StatStack>
              <StatBar label="Speed" value={player.stats.speed} />
              <StatBar label="Shooting" value={player.stats.shooting} delay={0.03} />
              <StatBar label="Passing" value={player.stats.passing} delay={0.06} />
              <StatBar label="Defense" value={player.stats.defense} delay={0.09} />
              <StatBar label="Physical" value={player.stats.physicality} delay={0.12} />
              <StatBar label="Goaltending" value={player.stats.goaltending} delay={0.15} />
            </StatStack>
          </Card>
        </Backdrop>
      )}
    </AnimatePresence>
  );
};

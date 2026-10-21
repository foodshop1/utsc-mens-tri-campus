import { motion } from "framer-motion";
import styled from "styled-components";
import { players } from "../../data/players";
import { fullName, getOverall } from "../../data/types";
import { PlayerPortrait } from "../PlayerCard/PlayerPortrait";
import { StatBar } from "../PlayerCard/StatBar";
import { useActiveSection } from "../../hooks/useActiveSection";

const positionTint: Record<string, string> = {
  Forward: "radial-gradient(circle at 80% 20%, #8a1a37 0%, #2c0712 60%)",
  Defense: "radial-gradient(circle at 80% 20%, #430a1b 0%, #180307 60%)",
  Goalie: "radial-gradient(circle at 80% 20%, #665318 0%, #241f16 60%)",
};

const Shell = styled.div`
  position: relative;
  padding-top: 64px;
`;

const Scroller = styled.div`
  height: calc(100vh - 64px);
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Section = styled.section<{ $tint: string }>`
  height: 100%;
  min-height: 560px;
  scroll-snap-align: start;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 40px;
  padding: 40px 8vw;
  background: ${({ $tint }) => $tint};
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    padding: 90px 7vw 40px;
    text-align: center;
    justify-content: center;
  }
`;

const PortraitCol = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    order: -1;
  }
`;

const DetailCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  max-width: 480px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    margin: 0 auto;
    align-items: center;
  }
`;

const NumberWatermark = styled.span`
  font-family: ${({ theme }) => theme.font.display};
  font-weight: 800;
  font-size: 15px;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.maroonLight};
  text-transform: uppercase;
`;

const Name = styled.h2`
  font-size: clamp(32px, 5vw, 56px);
  font-weight: 800;
  color: ${({ theme }) => theme.colors.ivory};
  line-height: 1.02;
`;

const MetaRow = styled.div`
  display: flex;
  gap: 18px;
  flex-wrap: wrap;
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 12px;
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.colors.slate};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    justify-content: center;
  }
`;

const Bio = styled.p`
  font-size: 15px;
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.ivory};
  opacity: 0.85;
`;

const StatStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 6px;
  width: 100%;
`;

const OverallBadge = styled.div`
  display: inline-flex;
  align-items: baseline;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.14);
  align-self: flex-start;

  strong {
    font-family: ${({ theme }) => theme.font.display};
    font-size: 16px;
    color: ${({ theme }) => theme.colors.gold};
  }
  span {
    font-family: ${({ theme }) => theme.font.mono};
    font-size: 10px;
    letter-spacing: 0.1em;
    color: ${({ theme }) => theme.colors.slate};
    text-transform: uppercase;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    align-self: center;
  }
`;

const DotNav = styled.div`
  position: fixed;
  right: 22px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 50;
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const Dot = styled.button<{ $active: boolean }>`
  width: ${({ $active }) => ($active ? "10px" : "6px")};
  height: ${({ $active }) => ($active ? "10px" : "6px")};
  border-radius: 999px;
  background: ${({ $active, theme }) => ($active ? theme.colors.ivory : "rgba(255,255,255,0.3)")};
  transition: width 200ms cubic-bezier(0.16, 1, 0.3, 1), height 200ms cubic-bezier(0.16, 1, 0.3, 1), background 200ms ease;

  &:hover {
    background: ${({ theme }) => theme.colors.ivory};
  }
`;

const Counter = styled.div`
  position: fixed;
  left: 22px;
  bottom: 22px;
  z-index: 50;
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 12px;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.slate};

  strong {
    color: ${({ theme }) => theme.colors.ivory};
  }
`;

export const SpotlightScroller = () => {
  const { activeIndex, setRef, scrollToIndex } = useActiveSection<HTMLDivElement>(players.length);

  return (
    <Shell>
      <Scroller>
        {players.map((player, index) => (
          <Section key={player.id} ref={setRef(index)} $tint={positionTint[player.position]}>
            <PortraitCol>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, margin: "-20%" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <PlayerPortrait player={player} size={320} flat />
              </motion.div>
            </PortraitCol>
            <DetailCol>
              <OverallBadge>
                <strong>{getOverall(player)}</strong>
                <span>Overall</span>
              </OverallBadge>
              <NumberWatermark>
                #{player.number} · {player.position}
              </NumberWatermark>
              <Name>{fullName(player)}</Name>
              <MetaRow>
                <span>{player.campus}</span>
                <span>{player.year}</span>
                <span>{player.hometown}</span>
                <span>
                  {player.height} · {player.weightLb} lb
                </span>
              </MetaRow>
              <Bio>{player.bio}</Bio>
              <StatStack>
                <StatBar label="Speed" value={player.stats.speed} delay={0} />
                <StatBar label="Shooting" value={player.stats.shooting} delay={0.05} />
                <StatBar label="Passing" value={player.stats.passing} delay={0.1} />
                <StatBar label="Defense" value={player.stats.defense} delay={0.15} />
                <StatBar label="Physical" value={player.stats.physicality} delay={0.2} />
                {player.position === "Goalie" && (
                  <StatBar label="Goaltending" value={player.stats.goaltending} delay={0.25} />
                )}
              </StatStack>
            </DetailCol>
          </Section>
        ))}
      </Scroller>

      <DotNav>
        {players.map((p, i) => (
          <Dot key={p.id} $active={i === activeIndex} onClick={() => scrollToIndex(i)} aria-label={`Jump to ${fullName(p)}`} />
        ))}
      </DotNav>

      <Counter>
        <strong>{String(activeIndex + 1).padStart(2, "0")}</strong> / {String(players.length).padStart(2, "0")}
      </Counter>
    </Shell>
  );
};

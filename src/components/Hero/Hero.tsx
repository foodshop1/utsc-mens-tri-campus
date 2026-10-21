import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import styled from "styled-components";
import { players } from "../../data/players";
import { fullName } from "../../data/types";
import { PlayerPortrait } from "../PlayerCard/PlayerPortrait";
import type { ViewId } from "../../App.types";

interface HeroProps {
  onNavigate: (view: ViewId) => void;
}

const Section = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  background: ${({ theme }) => theme.gradients.heroBackdrop};
`;

const BackdropLayer = styled(motion.div)`
  position: absolute;
  inset: -10%;
  background-image: repeating-linear-gradient(
    115deg,
    rgba(255, 255, 255, 0.035) 0px,
    rgba(255, 255, 255, 0.035) 2px,
    transparent 2px,
    transparent 64px
  );
  pointer-events: none;
`;

const SlashSvg = styled.svg`
  position: absolute;
  top: 10%;
  right: 4%;
  width: min(24vw, 320px);
  height: auto;
  opacity: 0.5;
  pointer-events: none;
`;

const Content = styled(motion.div)`
  position: relative;
  z-index: 2;
  padding: 0 7vw;
  margin-top: 56px;
`;

const Eyebrow = styled(motion.p)`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 13px;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.maroonLight};
  margin-bottom: 18px;
`;

const Title = styled(motion.h1)`
  font-size: clamp(48px, 10vw, 128px);
  font-weight: 800;
  line-height: 0.96;
  color: ${({ theme }) => theme.colors.ivory};
  text-transform: uppercase;

  span {
    display: block;
    color: transparent;
    -webkit-text-stroke: 2px ${({ theme }) => theme.colors.maroonBright};
  }
`;

const WordSpan = styled(motion.span)`
  display: inline-block;
`;

const Tagline = styled(motion.p)`
  max-width: 540px;
  margin-top: 26px;
  font-size: 17px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.slate};
`;

const CtaRow = styled(motion.div)`
  display: flex;
  gap: 14px;
  margin-top: 38px;
  flex-wrap: wrap;
`;

const PrimaryCta = styled.button`
  padding: 14px 30px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.ivory};
  color: ${({ theme }) => theme.colors.ink};
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0.01em;
  box-shadow: ${({ theme }) => theme.shadow.raised};
  transition: transform 180ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 180ms ease;

  &:hover {
    transform: translateY(-2px);
  }
  &:active {
    transform: scale(0.97);
    transition: transform 120ms cubic-bezier(0.2, 0, 0, 1);
  }
`;

const SecondaryCta = styled.button`
  padding: 14px 30px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.28);
  color: ${({ theme }) => theme.colors.ivory};
  font-weight: 600;
  font-size: 14px;
  transition: border-color 180ms ease, background 180ms ease, transform 180ms cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    border-color: ${({ theme }) => theme.colors.ivory};
    background: rgba(255, 255, 255, 0.06);
  }
  &:active {
    transform: scale(0.97);
    transition: transform 120ms cubic-bezier(0.2, 0, 0, 1);
  }
`;

const MarqueeWrap = styled.div`
  position: relative;
  z-index: 2;
  margin-top: 64px;
  padding: 22px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  mask-image: linear-gradient(90deg, transparent, black 10%, black 90%, transparent);
`;

const MarqueeTrack = styled(motion.div)`
  display: flex;
  gap: 36px;
  width: max-content;
`;

const MarqueeItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
`;

const MarqueeName = styled.span`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 12px;
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.colors.slate};
  white-space: nowrap;
`;

const ScrollCue = styled(motion.button)`
  position: absolute;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 6px;
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.slate};
  transition: color 180ms ease;

  &:hover {
    color: ${({ theme }) => theme.colors.ivory};
  }
  &:active {
    transform: translateX(-50%) scale(0.92);
    transition: transform 120ms cubic-bezier(0.2, 0, 0, 1);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    position: static;
    margin: 28px auto 0;
  }
`;

const Explore = styled.section`
  position: relative;
  padding: 90px 7vw 110px;
  background: ${({ theme }) => theme.colors.ink};
`;

const ExploreHeading = styled.div`
  max-width: 560px;
  margin-bottom: 44px;

  h2 {
    font-size: clamp(26px, 3.4vw, 36px);
    font-weight: 800;
    color: ${({ theme }) => theme.colors.ivory};
  }
  p {
    margin-top: 10px;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.slate};
    line-height: 1.6;
  }
`;

const ExploreGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 18px;
`;

const ExploreCard = styled(motion.button)`
  position: relative;
  text-align: left;
  padding: 28px 24px;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: linear-gradient(165deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 60%),
    ${({ theme }) => theme.colors.maroonDeepest};
  box-shadow: ${({ theme }) => theme.shadow.card};
  transition:
    transform 180ms cubic-bezier(0.16, 1, 0.3, 1),
    border-color 180ms ease,
    box-shadow 180ms ease;

  &:hover {
    transform: translateY(-4px);
    border-color: ${({ theme }) => theme.colors.maroonBright};
    box-shadow: ${({ theme }) => theme.shadow.raised};
  }
  &:active {
    transform: translateY(-1px) scale(0.98);
    transition: transform 120ms cubic-bezier(0.2, 0, 0, 1);
  }
`;

const ExploreTag = styled.span`
  display: inline-block;
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.maroonLight};
`;

const ExploreTitle = styled.h3`
  margin-top: 10px;
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.ivory};
`;

const ExploreBody = styled.p`
  margin-top: 8px;
  font-size: 13px;
  line-height: 1.55;
  color: ${({ theme }) => theme.colors.slate};
`;

const titleWords = ["UTSC", "HOCKEY"];

const exploreCards: Array<{ view: ViewId; tag: string; title: string; body: string }> = [
  {
    view: "spotlight",
    tag: "01 · Spotlight",
    title: "Meet every player",
    body: "Scroll through the full roster one profile at a time — bio, stats, and the number on their back.",
  },
  {
    view: "builder",
    tag: "02 · Team Builder",
    title: "Browse the squad",
    body: "A FIFA-style card grid of the whole team. Filter by position, search by name, tap in for the breakdown.",
  },
  {
    view: "roster",
    tag: "03 · Roster Board",
    title: "Read the stat sheet",
    body: "Every stat, every player, one sortable table for anyone who wants the data-dense view.",
  },
];

export const Hero = ({ onNavigate }: HeroProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const exploreRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const backdropY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const marqueeItems = [...players, ...players];

  const scrollToExplore = () => exploreRef.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
    <Section ref={sectionRef}>
      <BackdropLayer style={{ y: backdropY }} />
      <SlashSvg viewBox="0 0 400 400" fill="none">
        <motion.path
          d="M40 360 L220 40 M100 380 L280 60 M160 390 L340 90"
          stroke="currentColor"
          strokeWidth="3"
          style={{ color: "#d9607c" }}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        />
      </SlashSvg>

      <Content style={{ y: contentY, opacity: contentOpacity }}>
        <Eyebrow initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          Est. 2009 · North / East / South Campus
        </Eyebrow>
        <Title aria-label="Tri-Campus Hockey">
          {titleWords.map((word, i) => (
            <motion.span
              key={word}
              style={{ display: "block" }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              {i === 1 ? <span>{word}</span> : <WordSpan>{word}</WordSpan>}
            </motion.span>
          ))}
        </Title>
        <Tagline initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.55 }}>
          One league, three campuses, one roster. Explore every skater's full
          profile, build a dream lineup, or dig into the stat sheet.
        </Tagline>
        <CtaRow initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7 }}>
          <PrimaryCta onClick={() => onNavigate("spotlight")}>Meet the Team</PrimaryCta>
          <SecondaryCta onClick={() => onNavigate("builder")}>Open Team Builder</SecondaryCta>
        </CtaRow>
      </Content>

      <MarqueeWrap>
        <MarqueeTrack
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
        >
          {marqueeItems.map((p, i) => (
            <MarqueeItem key={`${p.id}-${i}`}>
              <PlayerPortrait player={p} size={34} />
              <MarqueeName>
                #{p.number} {fullName(p)}
              </MarqueeName>
            </MarqueeItem>
          ))}
        </MarqueeTrack>
      </MarqueeWrap>

      <ScrollCue
        onClick={scrollToExplore}
        aria-label="Scroll to explore the team"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <span>Scroll</span>
        <svg width="14" height="20" viewBox="0 0 14 20" fill="none">
          <path d="M7 1V19M7 19L1 13M7 19L13 13" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </ScrollCue>
    </Section>

    <Explore ref={exploreRef}>
      <ExploreHeading>
        <h2>Three ways to see the team</h2>
        <p>Pick a view — jump to one player at a time, browse the full squad as cards, or drop into the raw stat sheet.</p>
      </ExploreHeading>
      <ExploreGrid>
        {exploreCards.map((card, index) => (
          <ExploreCard
            key={card.view}
            onClick={() => onNavigate(card.view)}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <ExploreTag>{card.tag}</ExploreTag>
            <ExploreTitle>{card.title}</ExploreTitle>
            <ExploreBody>{card.body}</ExploreBody>
          </ExploreCard>
        ))}
      </ExploreGrid>
    </Explore>
    </>
  );
};

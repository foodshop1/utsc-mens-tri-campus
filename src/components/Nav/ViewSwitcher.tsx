import { motion } from "framer-motion";
import styled from "styled-components";
import type { ViewId } from "../../App.types";

interface ViewSwitcherProps {
  active: ViewId;
  onChange: (view: ViewId) => void;
}

const views: Array<{ id: ViewId; label: string }> = [
  { id: "home", label: "Home" },
  { id: "spotlight", label: "Spotlight" },
  { id: "builder", label: "Team Builder" },
  { id: "roster", label: "Roster Board" },
];

const Bar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 28px;
  background: rgba(24, 3, 7, 0.72);
  backdrop-filter: blur(14px) saturate(140%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 12px 16px;
    flex-direction: column;
    gap: 10px;
  }
`;

const Wordmark = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
  font-family: ${({ theme }) => theme.font.display};
  font-weight: 800;
  font-size: 17px;
  letter-spacing: 0.02em;
  color: ${({ theme }) => theme.colors.ivory};
  white-space: nowrap;

  span {
    color: ${({ theme }) => theme.colors.maroonBright};
  }
`;

const Tabs = styled.div`
  display: flex;
  gap: 4px;
  padding: 4px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
`;

const Tab = styled.button<{ $active: boolean }>`
  position: relative;
  padding: 7px 16px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.01em;
  color: ${({ $active, theme }) => ($active ? theme.colors.ink : theme.colors.ivory)};
  z-index: 1;
  transition: color 200ms ease;

  &:active {
    transform: scale(0.96);
    transition: transform 120ms cubic-bezier(0.2, 0, 0, 1);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 7px 10px;
    font-size: 12px;
  }
`;

const Pill = styled(motion.div)`
  position: absolute;
  inset: 0;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.ivory};
  z-index: -1;
`;

export const ViewSwitcher = ({ active, onChange }: ViewSwitcherProps) => (
  <Bar aria-label="Primary">
    <Wordmark>
      TRI-CAMPUS <span>HOCKEY</span>
    </Wordmark>
    <Tabs role="tablist" aria-label="Site views">
      {views.map((v) => (
        <Tab
          key={v.id}
          role="tab"
          aria-selected={active === v.id}
          $active={active === v.id}
          onClick={() => onChange(v.id)}
        >
          {active === v.id && <Pill layoutId="active-tab-pill" transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} />}
          {v.label}
        </Tab>
      ))}
    </Tabs>
  </Bar>
);

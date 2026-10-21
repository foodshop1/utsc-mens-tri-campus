import { motion } from "framer-motion";
import styled from "styled-components";

interface StatBarProps {
  label: string;
  value: number;
  delay?: number;
  compact?: boolean;
}

const Row = styled.div<{ $compact: boolean }>`
  display: grid;
  grid-template-columns: ${({ $compact }) => ($compact ? "64px 1fr 30px" : "96px 1fr 36px")};
  align-items: center;
  gap: ${({ $compact }) => ($compact ? "8px" : "14px")};
`;

const Label = styled.span<{ $compact: boolean }>`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: ${({ $compact }) => ($compact ? "10px" : "12px")};
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.slate};
`;

const Track = styled.div<{ $compact: boolean }>`
  position: relative;
  height: ${({ $compact }) => ($compact ? "5px" : "8px")};
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  overflow: hidden;
`;

const Fill = styled(motion.div)<{ $tone: "high" | "mid" | "low" }>`
  position: absolute;
  inset: 0;
  border-radius: 999px;
  background: ${({ $tone, theme }) =>
    $tone === "high"
      ? theme.gradients.goldBadge
      : $tone === "mid"
        ? theme.gradients.rankBadge
        : `linear-gradient(160deg, ${theme.colors.slate}, #4a3f41)`};
`;

const Value = styled.span<{ $compact: boolean }>`
  font-family: ${({ theme }) => theme.font.display};
  font-weight: 700;
  font-size: ${({ $compact }) => ($compact ? "13px" : "15px")};
  text-align: right;
  color: ${({ theme }) => theme.colors.ivory};
`;

const tierOf = (value: number): "high" | "mid" | "low" => {
  if (value >= 85) return "high";
  if (value >= 65) return "mid";
  return "low";
};

export const StatBar = ({ label, value, delay = 0, compact = false }: StatBarProps) => (
  <Row $compact={compact}>
    <Label $compact={compact}>{label}</Label>
    <Track $compact={compact}>
      <Fill
        $tone={tierOf(value)}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: value / 99 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "left", width: "100%" }}
      />
    </Track>
    <Value $compact={compact}>{value}</Value>
  </Row>
);

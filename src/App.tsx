import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import type { ViewId } from "./App.types";
import { Hero } from "./components/Hero/Hero";
import { ViewSwitcher } from "./components/Nav/ViewSwitcher";
import { SpotlightScroller } from "./components/PlayerSpotlight/SpotlightScroller";
import { RosterTable } from "./components/RosterBoard/RosterTable";
import { TeamGrid } from "./components/TeamBuilder/TeamGrid";
import { GlobalStyle } from "./theme/GlobalStyle";
import { theme } from "./theme/theme";

const Page = styled.div`
  min-height: 100vh;
  background: ${({ theme: t }) => t.colors.ink};
`;

const ViewWrap = styled(motion.div)`
  min-height: 100vh;
`;

function App() {
  const [view, setView] = useState<ViewId>("home");

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Page>
        <ViewSwitcher active={view} onChange={setView} />
        <AnimatePresence mode="wait">
          <ViewWrap
            key={view}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {view === "home" && <Hero onNavigate={setView} />}
            {view === "spotlight" && <SpotlightScroller />}
            {view === "builder" && <TeamGrid />}
            {view === "roster" && <RosterTable />}
          </ViewWrap>
        </AnimatePresence>
      </Page>
    </ThemeProvider>
  );
}

export default App;

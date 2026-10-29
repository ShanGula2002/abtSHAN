import { AnimatePresence, MotionConfig } from 'motion/react'
import { Route, Routes, useLocation } from 'react-router'
import ThemeProvider from './context/ThemeProvider.jsx'
import BrandProvider from './context/BrandProvider.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ScrollManager from './components/ScrollManager.jsx'
import Home from './pages/Home.jsx'
import WebDevelopment from './pages/WebDevelopment.jsx'
import GraphicDesign from './pages/GraphicDesign.jsx'
import ContentCreation from './pages/ContentCreation.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  const location = useLocation()

  return (
    // reducedMotion="user": when the visitor's device asks for less motion,
    // movement is switched off and only fades remain.
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
        <BrandProvider>
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <Navbar />
          {/* The old page fades out, then the new one rises in. ScrollManager handles the scroll position. */}
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/work/web-development" element={<WebDevelopment />} />
              <Route path="/work/graphic-design" element={<GraphicDesign />} />
              <Route path="/work/content-creation" element={<ContentCreation />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
          <Footer />
          <ScrollManager />
        </BrandProvider>
      </ThemeProvider>
    </MotionConfig>
  )
}

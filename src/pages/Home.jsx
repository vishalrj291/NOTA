import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import HeroSection from '../components/sections/HeroSection'
import WhySection from '../components/sections/WhySection'
import VisionSection from '../components/sections/VisionSection'
import MissionSection from '../components/sections/MissionSection'
import CampaignsSection from '../components/sections/CampaignsSection'
import KnowledgeSection from '../components/sections/KnowledgeSection'
import FAQSection from '../components/sections/FAQSection'
import ContactSection from '../components/sections/ContactSection'

export default function Home({ onJoinClick }) {
  return (
    <>
      <Helmet>
        <title>NOTA Speaks — An Informed Citizen is the King of Democracy</title>
        <meta name="description" content="NOTA Speaks is an independent citizen-led platform for Legal Awareness, Civic Education, Constitutional Literacy, and Democratic Participation." />
      </Helmet>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <HeroSection onJoinClick={onJoinClick} />
        <WhySection />
        <VisionSection />
        <MissionSection />
        <CampaignsSection />
        <KnowledgeSection />
        <FAQSection />
        <ContactSection onJoinClick={onJoinClick} />
      </motion.div>
    </>
  )
}

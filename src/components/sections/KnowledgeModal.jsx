import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const topicData = {
  'fundamental-rights': {
    title: 'Fundamental Rights',
    label: 'Articles 12–35 · Constitution of India',
    color: '#E8861A',
    icon: '⚖️',
    overview: `The Fundamental Rights are the basic rights guaranteed to every citizen of India by the Constitution. Enshrined in Part III (Articles 12–35), these rights are enforceable in a court of law. They protect individuals against the arbitrary action of the State and ensure a life of dignity, freedom, and equality.`,
    whyItMatters: `Without Fundamental Rights, citizens would have no legal protection against the misuse of State power. These rights are the foundation of India's democratic republic. They are justiciable — meaning if your rights are violated, you can directly petition the Supreme Court under Article 32 or the High Court under Article 226.`,
    rights: [
      { title: 'Right to Equality (Articles 14–18)', desc: 'Equality before law, prohibition of discrimination on grounds of religion, race, caste, sex or place of birth. Abolition of untouchability.' },
      { title: 'Right to Freedom (Articles 19–22)', desc: 'Freedom of speech, assembly, movement, profession. Protection against arbitrary arrest — you cannot be detained without being told the reason.' },
      { title: 'Right Against Exploitation (Articles 23–24)', desc: 'Prohibition of human trafficking, forced labour, and employment of children below 14 years in hazardous jobs.' },
      { title: 'Right to Freedom of Religion (Articles 25–28)', desc: 'Freedom of conscience and freely profess, practice, and propagate religion.' },
      { title: 'Cultural & Educational Rights (Articles 29–30)', desc: 'Right of minorities to conserve their language and culture, and to establish educational institutions.' },
      { title: 'Right to Constitutional Remedies (Article 32)', desc: 'Dr. Ambedkar called this the "Heart and Soul of the Constitution." You can approach the Supreme Court directly if any Fundamental Right is violated.' },
    ],
    examples: [
      'A journalist cannot be jailed for writing critical articles — protected by Article 19(1)(a)',
      'Police cannot hold you in custody for more than 24 hours without a magistrate\'s approval — Article 22',
      'Your employer cannot force you to work without pay — Article 23',
      'A school cannot deny admission based on caste — Article 15',
    ],
    actionSteps: [
      'Know which Article protects which right',
      'If a Fundamental Right is violated, file a Writ Petition in the High Court (Article 226) or Supreme Court (Article 32)',
      'You can also file a complaint with the National Human Rights Commission (NHRC)',
      'Legal aid is available free of cost under the Legal Services Authorities Act',
    ],
    faqs: [
      { q: 'Can Fundamental Rights be suspended?', a: 'Yes, during a National Emergency (Article 352), most rights under Article 19 are suspended. Rights to life and personal liberty (Article 21) cannot be suspended even during emergencies.' },
      { q: 'Are Fundamental Rights absolute?', a: 'No. The State can impose reasonable restrictions in the interest of national security, public order, morality, and the sovereignty of India.' },
      { q: 'Who can claim Fundamental Rights?', a: 'All citizens of India can claim all Fundamental Rights. Some rights, like equality before law (Article 14), are available to all persons including foreigners.' },
    ],
  },
  'rti': {
    title: 'Right to Information',
    label: 'RTI Act 2005',
    color: '#0D1B2A',
    icon: '📄',
    overview: `The Right to Information Act, 2005 empowers every Indian citizen to request information from any public authority. It is one of the most powerful tools of accountability and transparency available to ordinary citizens. Under RTI, government departments must respond within 30 days.`,
    whyItMatters: `RTI has exposed massive corruption, forced accountability, and helped citizens access services they were entitled to. From finding out why your ration card was cancelled to tracking how public funds are being spent — RTI is the citizen's most powerful legal tool against government opacity.`,
    rights: [
      { title: 'Right to Request Information', desc: 'Any citizen can ask for information from any public authority — central, state, or local government body, courts, Parliament, and public sector enterprises.' },
      { title: 'Right to Response in 30 Days', desc: 'The authority must respond within 30 days. If the information concerns life or liberty, the response must come within 48 hours.' },
      { title: 'Right to First Appeal', desc: 'If denied or unsatisfied, appeal to the First Appellate Authority within 30 days. They must respond in 30 days.' },
      { title: 'Right to Second Appeal', desc: 'If still unsatisfied, file a Second Appeal before the Central/State Information Commissioner.' },
    ],
    examples: [
      'A student filed RTI to check if their scholarship was processed — and found it was stuck at the block office',
      'Citizens used RTI to expose illegal construction approvals in their municipality',
      'A patient used RTI to get a copy of their hospital medical records',
      'A job applicant used RTI to find out why their application was rejected for a government post',
    ],
    actionSteps: [
      'Write your RTI application on plain paper — state clearly what information you want',
      'Pay the application fee (₹10 for central government; state fees vary)',
      'Submit to the Public Information Officer (PIO) of the relevant department',
      'Get a receipt with an application number',
      'If denied, file First Appeal within 30 days; Second Appeal within 90 days of PIO order',
    ],
    faqs: [
      { q: 'What information cannot be given under RTI?', a: 'Information that would affect national security, sovereignty, Cabinet papers, personal information with no public interest, information in fiduciary relationship, and information that could endanger someone\'s life.' },
      { q: 'Can I file RTI online?', a: 'Yes! For central government departments, visit https://rtionline.gov.in. Many states also have online RTI portals.' },
      { q: 'What if I don\'t get a response?', a: 'Non-response is deemed a refusal. File a First Appeal immediately. The Information Commissioner can impose penalties of ₹250/day (up to ₹25,000) on errant officers.' },
    ],
  },
  'consumer-rights': {
    title: 'Consumer Rights',
    label: 'Consumer Protection Act 2019',
    color: '#E8861A',
    icon: '🛡️',
    overview: `The Consumer Protection Act 2019 (COPRA) is India's comprehensive law protecting buyers of goods and services. It establishes a three-tier quasi-judicial consumer dispute redressal system: District Commission, State Commission, and National Commission. Every consumer has six fundamental rights under this Act.`,
    whyItMatters: `Millions of Indians face defective products, unfair trade practices, overpricing, and poor services daily. COPRA provides a simple, affordable, and fast mechanism to get justice — you can file a complaint yourself without a lawyer, and the filing fee is nominal.`,
    rights: [
      { title: 'Right to Safety', desc: 'Protection against products and services that are hazardous to life and property.' },
      { title: 'Right to Information', desc: 'Right to be informed about the quality, quantity, potency, purity, standard and price of goods.' },
      { title: 'Right to Choose', desc: 'Right to access to a variety of goods and services at competitive prices.' },
      { title: 'Right to Be Heard', desc: 'Right that consumer interests will receive due consideration at appropriate forums.' },
      { title: 'Right to Redressal', desc: 'Right to seek redressal against unfair trade practices, exploitation, and defective goods/deficient services.' },
      { title: 'Right to Consumer Education', desc: 'Right to acquire knowledge and skills needed to be an informed consumer.' },
    ],
    examples: [
      'You bought a phone that stopped working in 15 days — file a complaint for replacement/refund',
      'A builder delayed your flat delivery by 3 years — claim compensation in consumer court',
      'A hospital charged you for tests that weren\'t conducted — file for deficiency of service',
      'An e-commerce site sold fake branded goods — file for unfair trade practice',
    ],
    actionSteps: [
      'Send a legal notice to the seller/service provider first',
      'If unresolved, file complaint at the District Consumer Commission (for claims up to ₹1 crore)',
      'Online filing at consumerhelpline.gov.in or call 1800-11-4000 (toll-free)',
      'Keep all receipts, bills, and correspondence',
      'No lawyer required for District-level complaints',
    ],
    faqs: [
      { q: 'How much does it cost to file a consumer complaint?', a: 'For claims up to ₹5 lakh: ₹200. Up to ₹10 lakh: ₹400. Up to ₹20 lakh: ₹500. The fee increases proportionally for higher amounts.' },
      { q: 'Can I file online?', a: 'Yes, through the E-Daakhil portal (edaakhil.nic.in) you can file consumer complaints online from anywhere in India.' },
      { q: 'What is the time limit for filing?', a: 'You must file within 2 years from the date the cause of action arose. However, courts may condone delay if there is a sufficient reason.' },
    ],
  },
  'cyber-safety': {
    title: 'Cyber Safety',
    label: 'IT Act 2000 + Digital Rights',
    color: '#0D1B2A',
    icon: '🔐',
    overview: `India has over 800 million internet users, making it the world's second-largest online population. With this scale comes immense vulnerability. Cyber crimes in India rose by 24% in 2023. Every citizen needs to understand their digital rights, recognize online threats, and know how to report cyber crime.`,
    whyItMatters: `From online fraud to digital harassment, from data theft to cyberbullying — the internet is a space where your rights are as important as they are in the physical world. The IT Act 2000 and the DPDP Act 2023 provide legal protections that every citizen should know.`,
    rights: [
      { title: 'Right Against Online Harassment', desc: 'Section 66A (though struck down) — protection through IPC 499, 354D for stalking. Cyberbullying is a criminal offence.' },
      { title: 'Right to Data Privacy', desc: 'Under the Digital Personal Data Protection Act 2023, you have the right to know what data is collected about you and to request its deletion.' },
      { title: 'Right to Report Cybercrime', desc: 'You can file a cybercrime complaint at cybercrime.gov.in or call 1930 (national cybercrime helpline).' },
      { title: 'Protection Against Online Fraud', desc: 'UPI fraud, phishing, fake investment schemes are criminal under IPC Sections 420 and IT Act Sections 66C, 66D.' },
    ],
    examples: [
      'A student received morphed photos with threats — filed cybercrime complaint, perpetrator arrested',
      'A person lost ₹2 lakh to a fake crypto investment site — reported to 1930, money frozen within 24 hours',
      'Social media defamation by an ex-partner — filed complaint under Section 67 of IT Act',
      'Workplace data breach — company penalized under IT Act Section 43A',
    ],
    actionSteps: [
      'Report cybercrime at cybercrime.gov.in or call 1930',
      'For financial fraud, report within 1 hour for best chance of fund freezing',
      'Take screenshots of evidence before reporting',
      'Never share OTP, Aadhaar, or bank details — even with "bank officials"',
      'Enable two-factor authentication on all accounts',
      'Regularly check your credit score for unauthorized loans',
    ],
    faqs: [
      { q: 'I was scammed online. Can I get my money back?', a: 'Possibly, if reported quickly. Call 1930 immediately after any online fraud. The Cyber Crime Cell coordinates with banks to freeze fraudulent accounts. Act within the first few hours.' },
      { q: 'Someone is spreading fake news about me online. What can I do?', a: 'File an FIR under IPC Section 499 (defamation) and IT Act Section 66A (if applicable) or Section 67. Also report to the platform directly and get the content taken down under IT Rules 2021.' },
      { q: 'Are screenshots valid as evidence in court?', a: 'Yes, digital evidence including screenshots, emails, and chat logs are admissible under the Indian Evidence Act (Section 65B) if properly certified.' },
    ],
  },
  'constitution': {
    title: 'Constitution Simplified',
    label: 'The Founding Document of India',
    color: '#E8861A',
    icon: '📜',
    overview: `The Constitution of India came into effect on 26 January 1950. It is the longest written constitution in the world, with 395 Articles (as originally enacted), 22 Parts, and 8 Schedules. It has been amended 106 times since. The Constitution is not just a legal document — it is the collective promise India made to itself.`,
    whyItMatters: `The Constitution is the supreme law of India. All other laws, government actions, and official decisions must conform to the Constitution. If you understand the Constitution, you understand the limits of government power and the extent of your own rights and responsibilities as a citizen.`,
    rights: [
      { title: 'Preamble', desc: 'India is declared a Sovereign, Socialist, Secular, Democratic Republic. It promises Justice, Liberty, Equality, and Fraternity to all citizens.' },
      { title: 'Fundamental Rights (Part III)', desc: 'Articles 12–35: The 6 fundamental rights that every citizen can enforce in court.' },
      { title: 'Directive Principles (Part IV)', desc: 'Articles 36–51: Guidelines to the State for governance — not enforceable in court but fundamental to governance.' },
      { title: 'Fundamental Duties (Part IVA)', desc: 'Article 51A: 11 duties of every citizen, added by the 42nd Amendment in 1976.' },
      { title: 'Separation of Powers', desc: 'Legislature makes laws, Executive implements them, Judiciary interprets them — each checking the others.' },
      { title: 'Federalism', desc: 'Division of powers between Centre and States through Union List, State List, and Concurrent List.' },
    ],
    examples: [
      'The Supreme Court struck down Triple Talaq as unconstitutional — violating Articles 14 & 21',
      'The Right to Education Act (RTE) emerged from Article 21A — education as a Fundamental Right',
      'LGBTQ+ rights were upheld citing Article 21 — right to dignity',
      'Demonetization challenged in court under Article 19(1)(g) — right to trade',
    ],
    actionSteps: [
      'Read the Preamble — it summarizes everything India stands for',
      'Know your 6 Fundamental Rights and which articles protect them',
      'Understand the 3 Lists to know which government is responsible for what',
      'Read key amendments: 42nd (Socialist, Secular), 44th (Emergency provisions), 73rd/74th (Panchayati Raj)',
      'Follow Supreme Court judgments — they shape constitutional interpretation',
    ],
    faqs: [
      { q: 'Can the Constitution be changed?', a: 'Yes, through Article 368, Parliament can amend the Constitution. But the "Basic Structure" doctrine (Kesavananda Bharati case, 1973) says some features like democracy, secularism, and separation of powers cannot be amended away.' },
      { q: 'What is the Preamble?', a: 'The Preamble is the introduction to the Constitution. It declares India to be a Sovereign, Socialist, Secular, Democratic Republic and commits to Justice, Liberty, Equality, and Fraternity.' },
      { q: 'Who drafted the Constitution?', a: 'The Drafting Committee was chaired by Dr. B.R. Ambedkar. The Constituent Assembly had 389 members and took 2 years, 11 months, and 17 days to complete the Constitution.' },
    ],
  },
  'legal-awareness': {
    title: 'Legal Awareness',
    label: 'Law for Everyday Life',
    color: '#0D1B2A',
    icon: '🏛️',
    overview: `Legal awareness means understanding how the law affects your everyday life — from your rights at the workplace to what happens when you get into a traffic dispute, from how to file an FIR to how bail works. Law is not just for lawyers. Every citizen needs a functional understanding of the legal system.`,
    whyItMatters: `Ignorance of the law is not an excuse. When you don't know your rights, you are more vulnerable to exploitation, harassment, and injustice. Legal literacy gives you the power to protect yourself, seek justice, and participate fully in society.`,
    rights: [
      { title: 'Right to File an FIR', desc: 'Police cannot refuse to register an FIR. If they do, you can complain to the SP or file a complaint in a Magistrate\'s court under Section 156(3) CrPC.' },
      { title: 'Right to Free Legal Aid', desc: 'If you cannot afford a lawyer, you are entitled to free legal aid under the Legal Services Authorities Act 1987. NALSA (National Legal Services Authority) provides this.' },
      { title: 'Right to Bail', desc: 'Most non-serious offences are bailable. Even for non-bailable offences, anticipatory bail (Section 438 CrPC) can be sought from a Sessions Court or High Court.' },
      { title: 'Right to Know the Reason for Arrest', desc: 'Article 22(1): You must be informed of the grounds of arrest. You have the right to consult a lawyer of your choice.' },
      { title: 'Right Against Custodial Torture', desc: 'Torture and ill-treatment in custody is illegal and violates Article 21. File a complaint with the NHRC immediately.' },
      { title: 'Right to Silence', desc: 'You cannot be compelled to be a witness against yourself — Article 20(3). You can remain silent during interrogation.' },
    ],
    examples: [
      'Police refused to register an FIR — citizen approached Superintendent of Police, FIR filed the same day',
      'Worker fired without notice — labour court ordered 3 months\' salary as compensation',
      'Tenant evicted illegally — filed for Stay Order in civil court, stayed in property',
      'Accident victim denied treatment — hospital penalized for violating the Golden Hour Rule',
    ],
    actionSteps: [
      'For FIR: Go to the local police station. If refused, approach SP or file in Magistrate court',
      'For free legal aid: Contact your District Legal Services Authority (DLSA)',
      'For labour disputes: Approach the Labour Commissioner or Industrial Tribunal',
      'For property disputes: Civil court is the forum; interim relief through Stay Orders',
      'Emergency legal help: Dial 15100 (NALSA helpline)',
    ],
    faqs: [
      { q: 'What is the difference between bailable and non-bailable offences?', a: 'Bailable offences: bail is a right — the accused must be released on bail if demanded. Non-bailable offences: bail is at the court\'s discretion. Examples of non-bailable: murder, rape, dacoity.' },
      { q: 'Can I record a conversation with police as evidence?', a: 'Yes, audio/video recordings are admissible as evidence under the IT Act and Indian Evidence Act, if authentic and not tampered with.' },
      { q: 'What is an FIR vs a complaint?', a: 'An FIR (First Information Report) is filed for cognizable offences (serious crimes) and police can investigate without court order. A complaint is filed for non-cognizable offences and requires a Magistrate\'s direction to police.' },
    ],
  },
  'civic-participation': {
    title: 'Civic Participation',
    label: 'Your Vote. Your Voice. Your Nation.',
    color: '#E8861A',
    icon: '🗳️',
    overview: `Civic participation is the active engagement of citizens in the democratic process — voting, holding representatives accountable, participating in public consultations, filing grievances, and being informed about governance. Democracy is not a spectator sport.`,
    whyItMatters: `In a democracy, elected representatives derive their power from citizens. When citizens disengage — don't vote, don't ask questions, don't hold accountability — that power goes unchecked. Every action you take as an informed citizen directly shapes the quality of governance you receive.`,
    rights: [
      { title: 'Right to Vote (Article 326)', desc: 'Every Indian citizen above 18 years has the right to vote in elections. Your vote is secret and protected.' },
      { title: 'Right to Contest Elections', desc: 'Any citizen above 25 (Lok Sabha/Vidhan Sabha) or 30 (Rajya Sabha/Vidhan Parishad) can contest elections.' },
      { title: 'Right to NOTA', desc: 'None Of The Above — you can choose NOTA if you don\'t find any candidate worthy. NOTA is a legitimate electoral choice.' },
      { title: 'Right to Grievance Redressal', desc: 'You can file grievances against government officers through CPGRAMS (Centralized Public Grievance Redressal System).' },
      { title: 'Right to Public Consultation', desc: 'Citizens can participate in public hearings for infrastructure projects, environmental clearances, and new policies.' },
    ],
    examples: [
      'A village panchayat\'s budget was scrutinized by citizens using Social Audit — found 40% misappropriation',
      'Youth voters in a constituency increased from 32% to 67% after a NOTA Speaks awareness drive',
      'Citizens\'s RTI applications forced a municipal corporation to restart a delayed road project',
      'A public hearing stopped an illegal industrial plant from being set up near a school',
    ],
    actionSteps: [
      'Register to vote: voterportal.eci.gov.in or visit your local BLO (Booth Level Officer)',
      'Check your voter registration: nvsp.in',
      'Report election violations: 1950 (National Voter Helpline)',
      'File public grievances: pgportal.gov.in (CPGRAMS)',
      'Attend gram sabhas and ward committees — your right and responsibility',
      'Follow your MP/MLA\'s work: egramswaraj.gov.in (for Panchayat), prsindia.org (for Parliament)',
    ],
    faqs: [
      { q: 'What is NOTA and does it have any effect?', a: 'NOTA (None Of The Above) is a ballot option since 2013. Currently NOTA votes are counted but do not cause a re-election even if NOTA gets the most votes. However, its increasing use sends a strong message to political parties.' },
      { q: 'Can I vote if I\'m away from my constituency?', a: 'Not yet for general elections. The Election Commission is piloting remote voting machines for migrant workers. For now, you must travel to your constituency to vote or transfer your voter registration.' },
      { q: 'How do I find my MP/MLA?', a: 'Visit lsq.nic.in (Lok Sabha) or rajyasabha.nic.in (Rajya Sabha). For state MLAs, check your state assembly website. You can attend their public offices (Jan Sampark Karyalay) and raise issues directly.' },
    ],
  },
  'paper-leak': {
    title: 'Paper Leak & Examination Rights',
    label: 'Education Integrity & Student Rights',
    color: '#0D1B2A',
    icon: '📚',
    overview: `Paper leaks in India have affected NEET, UPSC, SSC, state board exams, and countless recruitment tests — robbing millions of genuine students of fair opportunity. In 2024, the NEET paper leak sparked nationwide protests. Every student has rights in the examination system that must be protected.`,
    whyItMatters: `Examination corruption is not just a procedural failure — it is a fundamental rights violation. It denies meritorious students their rightful opportunities, corrupts the education system, and undermines democratic values. Students must know their rights and how to fight for fair processes.`,
    rights: [
      { title: 'Right to Fair Examination', desc: 'Every student has the right to appear in a fair, uncompromised examination. Paper leaks violate Article 14 (equality) and Article 21 (right to livelihood).' },
      { title: 'Right to Information About Results', desc: 'Students can file RTI to access marksheets, answer keys, evaluation criteria, and information about irregularities.' },
      { title: 'Right to Challenge Exam Results', desc: 'If you suspect irregularities, you can approach the High Court for a CBI or SIT probe — multiple courts have ordered such probes.' },
      { title: 'Right Against Victimization for Whistleblowing', desc: 'If you report exam malpractice, you are protected. Retaliation against whistleblowers is illegal.' },
    ],
    examples: [
      'NEET 2024: Supreme Court ordered NTA to submit complete data after students petitioned about paper leak',
      'Bihar paper leak 2024: 17 arrests including paper traders and government officials',
      'Students used RTI to obtain answer keys and challenge wrong answers — multiple marks corrected',
      'Rajasthan teacher recruitment: High Court stayed results after paper leak evidence was presented by students',
    ],
    actionSteps: [
      'If you suspect a paper leak: document everything and report to the exam authority immediately',
      'File an FIR at the local police station — paper leaks are criminal offences',
      'File a PIL (Public Interest Litigation) in the High Court if authorities are inactive',
      'File RTI with the exam conducting body for answer keys, normalisation data, and irregularity reports',
      'Connect with student unions and advocacy organizations for collective action',
    ],
    faqs: [
      { q: 'Is paper leaking a criminal offence?', a: 'Yes. Under the Public Examination (Prevention of Unfair Means) Act 2024, paper leaking can lead to imprisonment of up to 10 years and fines up to ₹1 crore. The Act covers UPSC, SSC, NTA (NEET, JEE), banking exams, and all central recruitment tests.' },
      { q: 'What should I do if I was offered a leaked paper?', a: 'Decline and immediately report to the exam authority and police. You will be protected as a whistleblower. Using a leaked paper, even if offered to you, is also an offence.' },
      { q: 'Can a cancelled exam due to paper leak be reconducted fairly?', a: 'Yes, and courts have ordered this multiple times. However, re-examination must happen within a reasonable timeframe. Students can petition courts if re-examination delays are unreasonable.' },
    ],
  },
}

export default function KnowledgeModal({ topicId, onClose }) {
  const topic = topicData[topicId]

  useEffect(() => {
    if (!topicId) return
    document.body.style.overflow = 'hidden'
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [topicId, onClose])

  return (
    <AnimatePresence>
      {topicId && topic && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-navy/80 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-2xl bg-paper overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="knowledge-modal-title"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-paper border-b border-charcoal/10">
              <div className="flex items-start justify-between p-6">
                <div className="flex-1 pr-4">
                  <span
                    className="inline-block text-[10px] font-semibold tracking-caps uppercase mb-2 px-2 py-0.5"
                    style={{ color: topic.color, background: `${topic.color}15` }}
                  >
                    {topic.label}
                  </span>
                  <h2
                    id="knowledge-modal-title"
                    className="font-serif text-2xl md:text-3xl font-bold text-charcoal leading-tight"
                  >
                    <span className="mr-2">{topic.icon}</span>
                    {topic.title}
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="flex-shrink-0 w-9 h-9 border border-charcoal/15 flex items-center justify-center hover:border-charcoal/40 hover:bg-charcoal/5 transition-all"
                  aria-label="Close"
                >
                  <svg className="w-4 h-4 text-charcoal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 space-y-10">

              {/* Overview */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-6 h-px" style={{ background: topic.color }} />
                  <h3 className="text-[10px] font-semibold tracking-caps uppercase" style={{ color: topic.color }}>Overview</h3>
                </div>
                <p className="text-charcoal/75 leading-relaxed">{topic.overview}</p>
              </section>

              {/* Why It Matters */}
              <section className="border-l-4 pl-5 py-1" style={{ borderColor: topic.color }}>
                <h3 className="font-serif text-lg font-bold text-charcoal mb-2">Why It Matters</h3>
                <p className="text-charcoal/70 leading-relaxed text-sm">{topic.whyItMatters}</p>
              </section>

              {/* Rights & Provisions */}
              <section>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-6 h-px" style={{ background: topic.color }} />
                  <h3 className="text-[10px] font-semibold tracking-caps uppercase" style={{ color: topic.color }}>Rights & Provisions</h3>
                </div>
                <div className="space-y-4">
                  {topic.rights.map((right, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                      className="flex gap-4 p-4 bg-white border border-charcoal/8"
                    >
                      <div
                        className="flex-shrink-0 w-7 h-7 flex items-center justify-center text-xs font-bold text-white"
                        style={{ background: topic.color }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <div>
                        <p className="font-semibold text-charcoal text-sm mb-1">{right.title}</p>
                        <p className="text-charcoal/60 text-xs leading-relaxed">{right.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Real-World Examples */}
              <section>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-6 h-px" style={{ background: topic.color }} />
                  <h3 className="text-[10px] font-semibold tracking-caps uppercase" style={{ color: topic.color }}>Real-World Examples</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {topic.examples.map((example, i) => (
                    <div key={i} className="flex gap-3 p-3 bg-white border border-charcoal/8">
                      <span className="text-lg flex-shrink-0">📌</span>
                      <p className="text-xs text-charcoal/70 leading-relaxed">{example}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Action Steps */}
              <section className="bg-charcoal p-6">
                <h3 className="font-serif text-lg font-bold text-paper mb-4">Actionable Steps</h3>
                <ol className="space-y-3">
                  {topic.actionSteps.map((step, i) => (
                    <li key={i} className="flex gap-3">
                      <span
                        className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-xs font-bold text-charcoal"
                        style={{ background: topic.color }}
                      >
                        {i + 1}
                      </span>
                      <p className="text-paper/80 text-sm leading-relaxed pt-0.5">{step}</p>
                    </li>
                  ))}
                </ol>
              </section>

              {/* FAQs */}
              <section>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-6 h-px" style={{ background: topic.color }} />
                  <h3 className="text-[10px] font-semibold tracking-caps uppercase" style={{ color: topic.color }}>Frequently Asked Questions</h3>
                </div>
                <div className="space-y-4">
                  {topic.faqs.map((faq, i) => (
                    <details key={i} className="group border border-charcoal/10 bg-white">
                      <summary className="flex items-start justify-between gap-4 p-4 cursor-pointer list-none">
                        <span className="font-semibold text-charcoal text-sm leading-snug">{faq.q}</span>
                        <svg className="w-4 h-4 flex-shrink-0 text-charcoal/40 group-open:rotate-45 transition-transform mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                      </summary>
                      <div className="px-4 pb-4">
                        <p className="text-charcoal/65 text-xs leading-relaxed border-t border-charcoal/8 pt-3">{faq.a}</p>
                      </div>
                    </details>
                  ))}
                </div>
              </section>

              {/* Bottom CTA */}
              <div className="border-t border-charcoal/10 pt-6 text-center">
                <p className="text-charcoal/50 text-sm mb-4">Have more questions about {topic.title}?</p>
                <button
                  onClick={onClose}
                  className="btn-secondary text-xs"
                >
                  Explore More Topics
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

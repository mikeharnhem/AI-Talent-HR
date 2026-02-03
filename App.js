import React, { useState, useRef, useEffect } from 'react';

// ============================================================================
// TRANSLATIONS
// ============================================================================
const T = {
  nl: {
    // Header
    nav: { home: 'Home', modules: 'Modules', workflow: 'Workflow', roi: 'ROI', sectors: 'Sectoren', demo: 'Start Demo' },
    
    // Hero
    hero: {
      title: 'AI Talent HR',
      subtitle: 'Intelligent Recruitment & HR Platform',
      description: 'Versnel uw wervingsproces met AI-gestuurde automatisering. Van vacaturecreatie tot onboarding, met meetbare besparingen.',
      cta: 'Start Demo',
      pillars: [
        { icon: '⚡', title: 'Sneller Werven', desc: '50% kortere doorlooptijd' },
        { icon: '💰', title: 'Lagere Kosten', desc: '30% kostenbesparing' },
        { icon: '🎯', title: 'Betere Matches', desc: 'AI-gestuurde screening' },
        { icon: '🕐', title: '24/7 Ondersteuning', desc: 'Altijd beschikbaar' }
      ]
    },
    
    // Market Stats
    stats: {
      title: 'De Nederlandse Arbeidsmarkt',
      subtitle: 'Waarom AI-ondersteuning geen luxe maar noodzaak is',
      items: [
        { value: '109', label: 'Vacatures per 100 werklozen', desc: 'Structureel krappe arbeidsmarkt' },
        { value: '€4.000+', label: 'Gemiddelde cost per hire', desc: 'Directe en indirecte kosten' },
        { value: '62', label: 'Dagen time to hire', desc: 'Gemiddelde doorlooptijd' },
        { value: '50%', label: 'Moeilijk vervulbaar', desc: 'Van alle vacatures' }
      ]
    },
    
    // Personas
    personas: {
      title: 'Kies uw Rol',
      subtitle: 'Ervaar AI Talent HR vanuit uw perspectief',
      items: [
        { id: 'recruiter', icon: '🔍', title: 'Recruiter', desc: 'Werving & selectie specialist', focus: 'Vacatures, screening, matching' },
        { id: 'hr-manager', icon: '👔', title: 'HR Manager', desc: 'Strategisch HR leiderschap', focus: 'Analytics, compliance, planning' },
        { id: 'hiring-manager', icon: '👥', title: 'Hiring Manager', desc: 'Teamleider met vacature', focus: 'Interviews, onboarding, team fit' },
        { id: 'hr-admin', icon: '📋', title: 'HR Administratie', desc: 'Operationele ondersteuning', focus: 'Communicatie, documentatie, proces' }
      ]
    },
    
    // Workflow
    workflow: {
      title: 'AI Recruitment Workflow',
      subtitle: 'Van vacature tot succesvolle onboarding',
      steps: [
        { id: 1, title: 'Vacature', desc: 'AI-gegenereerde vacatureteksten', icon: '📝' },
        { id: 2, title: 'Publicatie', desc: 'Multi-channel distributie', icon: '📢' },
        { id: 3, title: 'Screening', desc: 'Automatische CV-analyse', icon: '🔍' },
        { id: 4, title: 'Matching', desc: 'AI-gestuurde kandidaatranking', icon: '🎯' },
        { id: 5, title: 'Interview', desc: 'Vragen en scorecards', icon: '💬' },
        { id: 6, title: 'Selectie', desc: 'Vergelijkingsrapporten', icon: '✅' },
        { id: 7, title: 'Aanbod', desc: 'Contractgeneratie', icon: '📄' },
        { id: 8, title: 'Onboarding', desc: '30-60-90 dagen plannen', icon: '🚀' }
      ],
      prev: '← Vorige',
      next: 'Volgende →',
      tryModule: 'Probeer deze module'
    },
    
    // Modules
    modules: {
      title: 'Zes AI-Modules',
      subtitle: 'Samen het volledige wervingsproces',
      items: {
        vacancy: { icon: '📝', name: 'Vacature Creatie', desc: 'AI-gegenereerde vacatureteksten', features: ['SEO-optimalisatie', 'Inclusief taalgebruik', 'A/B varianten', 'Auto-vertaling'] },
        screening: { icon: '🔍', name: 'CV Screening', desc: 'Automatische analyse en ranking', features: ['Blind recruitment', 'Skills matching', 'Red flag detectie', 'Transparante scoring'] },
        communication: { icon: '💬', name: 'Communicatie', desc: '24/7 kandidaatinteractie', features: ['Chatbot support', 'Statusupdates', 'Interview scheduling', 'FAQ afhandeling'] },
        interview: { icon: '🎯', name: 'Interview Support', desc: 'Vragen en scorecards', features: ['STAR-methode', 'Competentievragen', 'Vergelijkingsrapporten', 'CV-analyse'] },
        onboarding: { icon: '🚀', name: 'Onboarding', desc: 'Gepersonaliseerde trajecten', features: ['30-60-90 plannen', 'Checklists', 'Buddy-matching', 'Voortgangsmonitoring'] },
        analytics: { icon: '📊', name: 'Analytics', desc: 'Dashboards en planning', features: ['Real-time KPIs', 'Voorspellende planning', 'Bronanalyse', 'Auto-rapportages'] }
      }
    },
    
    // ROI
    roi: {
      title: 'Meetbaar Rendement',
      subtitle: 'Business case voor AI in recruitment',
      kpis: [
        { value: '-50%', label: 'Time to Hire', desc: 'Halvering doorlooptijd' },
        { value: '-30%', label: 'Cost per Hire', desc: 'Lagere wervingskosten' },
        { value: '-70%', label: 'Admin Taken', desc: 'Automatisering routinewerk' },
        { value: '24/7', label: 'Beschikbaarheid', desc: 'Altijd bereikbaar' }
      ],
      calculator: {
        title: 'ROI Calculator',
        hires: 'Aantal hires per jaar',
        current: 'Huidige cost per hire',
        calculate: 'Bereken besparing',
        result: 'Geschatte jaarlijkse besparing',
        disclaimer: '* Gebaseerd op 30% kostenbesparing met AI Talent HR'
      }
    },
    
    // Sectors
    sectors: {
      title: 'Sectortoepassingen',
      subtitle: 'Specifieke oplossingen per branche',
      items: [
        { icon: '🏢', name: 'Corporate HR', desc: 'High-volume werving, employer branding, talentpool management' },
        { icon: '🔎', name: 'Recruitment Bureaus', desc: 'Schaalbare screening, client-rapportages, multi-tenant' },
        { icon: '⚙️', name: 'Industrie & Techniek', desc: 'Skills-based matching, certificering verificatie' },
        { icon: '🏥', name: 'Zorg', desc: 'BIG-verificatie, 24/7 werving, zorgterminologie' },
        { icon: '🎓', name: 'Onderwijs', desc: 'Bevoegdheden-matching, seizoenscampagnes' },
        { icon: '🛍️', name: 'Retail & Hospitality', desc: 'Volume werving, snelle onboarding' }
      ]
    },
    
    // Compliance
    compliance: {
      title: 'Compliance & Regelgeving',
      items: [
        { icon: '🔒', name: 'AVG/GDPR', desc: 'Volledig privacy-compliant' },
        { icon: '🇪🇺', name: 'EU AI Act', desc: 'Hoog-risico AI conform' },
        { icon: '⚖️', name: 'Bias Monitoring', desc: 'Actieve discriminatiepreventie' },
        { icon: '👤', name: 'Human-in-the-Loop', desc: 'Mens beslist altijd' }
      ]
    },
    
    // Chat Interface
    chat: {
      title: 'AI Assistent',
      placeholder: 'Typ of spreek uw vraag...',
      send: 'Verstuur',
      listening: 'Luisteren...',
      micTitle: 'Klik om te spreken',
      aiGen: 'AI genereert...',
      back: '← Terug naar overzicht',
      examples: 'Voorbeeldvragen',
      history: 'Geschiedenis',
      clear: 'Wis gesprek',
      export: 'Exporteer',
      record: 'Opnemen',
      stopRecord: 'Stop opname',
      recordings: 'Opnames',
      exportSession: 'Exporteer Sessie',
      backToDashboard: '← Terug naar Dashboard'
    },
    
    // Footer
    footer: {
      company: 'Nxt Era Solutions',
      tagline: 'In opdracht van HES Consultancy International',
      demo: 'Demo versie',
      copyright: '© 2025 Alle rechten voorbehouden'
    },

    // Module examples
    examples: {
      vacancy: ['Schrijf vacature Software Developer', 'Inclusieve vacaturetekst Sales', 'Vacature met salarisindicatie', 'Marketing Manager vacature'],
      screening: ['Analyseer dit CV', 'Top 5 kandidaten ranken', 'Skills gap analyse', 'Red flags identificeren'],
      communication: ['Uitnodiging gesprek', 'Professionele afwijzing', 'Follow-up na interview', 'Statusupdate kandidaat'],
      interview: ['STAR-vragen leiderschap', 'Technische vragen Developer', 'Scorecard genereren', 'Competentievragen PM'],
      onboarding: ['30-60-90 dagen plan', 'IT onboarding checklist', 'Welkomstmail schrijven', 'Buddy programma opzetten'],
      analytics: ['Time to hire rapport', 'Cost per hire analyse', 'Recruitment funnel', 'Source effectiveness']
    }
  },
  en: {
    // Header
    nav: { home: 'Home', modules: 'Modules', workflow: 'Workflow', roi: 'ROI', sectors: 'Sectors', demo: 'Start Demo' },
    
    // Hero
    hero: {
      title: 'AI Talent HR',
      subtitle: 'Intelligent Recruitment & HR Platform',
      description: 'Accelerate your hiring process with AI-powered automation. From job posting to onboarding, with measurable savings.',
      cta: 'Start Demo',
      pillars: [
        { icon: '⚡', title: 'Faster Hiring', desc: '50% shorter time-to-hire' },
        { icon: '💰', title: 'Lower Costs', desc: '30% cost reduction' },
        { icon: '🎯', title: 'Better Matches', desc: 'AI-powered screening' },
        { icon: '🕐', title: '24/7 Support', desc: 'Always available' }
      ]
    },
    
    // Market Stats
    stats: {
      title: 'The Dutch Labor Market',
      subtitle: 'Why AI support is a necessity, not a luxury',
      items: [
        { value: '109', label: 'Vacancies per 100 unemployed', desc: 'Structural labor shortage' },
        { value: '€4,000+', label: 'Average cost per hire', desc: 'Direct and indirect costs' },
        { value: '62', label: 'Days time to hire', desc: 'Average lead time' },
        { value: '50%', label: 'Hard to fill', desc: 'Of all vacancies' }
      ]
    },
    
    // Personas
    personas: {
      title: 'Choose Your Role',
      subtitle: 'Experience AI Talent HR from your perspective',
      items: [
        { id: 'recruiter', icon: '🔍', title: 'Recruiter', desc: 'Talent acquisition specialist', focus: 'Vacancies, screening, matching' },
        { id: 'hr-manager', icon: '👔', title: 'HR Manager', desc: 'Strategic HR leadership', focus: 'Analytics, compliance, planning' },
        { id: 'hiring-manager', icon: '👥', title: 'Hiring Manager', desc: 'Team lead with vacancy', focus: 'Interviews, onboarding, team fit' },
        { id: 'hr-admin', icon: '📋', title: 'HR Admin', desc: 'Operational support', focus: 'Communication, documentation, process' }
      ]
    },
    
    // Workflow
    workflow: {
      title: 'AI Recruitment Workflow',
      subtitle: 'From vacancy to successful onboarding',
      steps: [
        { id: 1, title: 'Vacancy', desc: 'AI-generated job postings', icon: '📝' },
        { id: 2, title: 'Publication', desc: 'Multi-channel distribution', icon: '📢' },
        { id: 3, title: 'Screening', desc: 'Automated CV analysis', icon: '🔍' },
        { id: 4, title: 'Matching', desc: 'AI-powered candidate ranking', icon: '🎯' },
        { id: 5, title: 'Interview', desc: 'Questions and scorecards', icon: '💬' },
        { id: 6, title: 'Selection', desc: 'Comparison reports', icon: '✅' },
        { id: 7, title: 'Offer', desc: 'Contract generation', icon: '📄' },
        { id: 8, title: 'Onboarding', desc: '30-60-90 day plans', icon: '🚀' }
      ],
      prev: '← Previous',
      next: 'Next →',
      tryModule: 'Try this module'
    },
    
    // Modules
    modules: {
      title: 'Six AI Modules',
      subtitle: 'Complete hiring process coverage',
      items: {
        vacancy: { icon: '📝', name: 'Job Posting', desc: 'AI-generated job descriptions', features: ['SEO optimization', 'Inclusive language', 'A/B variants', 'Auto-translation'] },
        screening: { icon: '🔍', name: 'CV Screening', desc: 'Automated analysis and ranking', features: ['Blind recruitment', 'Skills matching', 'Red flag detection', 'Transparent scoring'] },
        communication: { icon: '💬', name: 'Communication', desc: '24/7 candidate interaction', features: ['Chatbot support', 'Status updates', 'Interview scheduling', 'FAQ handling'] },
        interview: { icon: '🎯', name: 'Interview Support', desc: 'Questions and scorecards', features: ['STAR method', 'Competency questions', 'Comparison reports', 'CV analysis'] },
        onboarding: { icon: '🚀', name: 'Onboarding', desc: 'Personalized trajectories', features: ['30-60-90 plans', 'Checklists', 'Buddy matching', 'Progress monitoring'] },
        analytics: { icon: '📊', name: 'Analytics', desc: 'Dashboards and planning', features: ['Real-time KPIs', 'Predictive planning', 'Source analysis', 'Auto-reports'] }
      }
    },
    
    // ROI
    roi: {
      title: 'Measurable Returns',
      subtitle: 'Business case for AI in recruitment',
      kpis: [
        { value: '-50%', label: 'Time to Hire', desc: 'Halved lead time' },
        { value: '-30%', label: 'Cost per Hire', desc: 'Lower recruitment costs' },
        { value: '-70%', label: 'Admin Tasks', desc: 'Routine automation' },
        { value: '24/7', label: 'Availability', desc: 'Always reachable' }
      ],
      calculator: {
        title: 'ROI Calculator',
        hires: 'Number of hires per year',
        current: 'Current cost per hire',
        calculate: 'Calculate savings',
        result: 'Estimated annual savings',
        disclaimer: '* Based on 30% cost reduction with AI Talent HR'
      }
    },
    
    // Sectors
    sectors: {
      title: 'Sector Applications',
      subtitle: 'Specific solutions per industry',
      items: [
        { icon: '🏢', name: 'Corporate HR', desc: 'High-volume hiring, employer branding, talent pool management' },
        { icon: '🔎', name: 'Recruitment Agencies', desc: 'Scalable screening, client reports, multi-tenant' },
        { icon: '⚙️', name: 'Industry & Tech', desc: 'Skills-based matching, certification verification' },
        { icon: '🏥', name: 'Healthcare', desc: 'License verification, 24/7 recruitment, medical terminology' },
        { icon: '🎓', name: 'Education', desc: 'Qualification matching, seasonal campaigns' },
        { icon: '🛍️', name: 'Retail & Hospitality', desc: 'Volume hiring, fast onboarding' }
      ]
    },
    
    // Compliance
    compliance: {
      title: 'Compliance & Regulations',
      items: [
        { icon: '🔒', name: 'GDPR', desc: 'Fully privacy compliant' },
        { icon: '🇪🇺', name: 'EU AI Act', desc: 'High-risk AI compliant' },
        { icon: '⚖️', name: 'Bias Monitoring', desc: 'Active discrimination prevention' },
        { icon: '👤', name: 'Human-in-the-Loop', desc: 'Human always decides' }
      ]
    },
    
    // Chat Interface
    chat: {
      title: 'AI Assistant',
      placeholder: 'Type or speak your question...',
      send: 'Send',
      listening: 'Listening...',
      micTitle: 'Click to speak',
      aiGen: 'AI generating...',
      back: '← Back to overview',
      examples: 'Example questions',
      history: 'History',
      clear: 'Clear chat',
      export: 'Export',
      record: 'Record',
      stopRecord: 'Stop recording',
      recordings: 'Recordings',
      exportSession: 'Export Session',
      backToDashboard: '← Back to Dashboard'
    },
    
    // Footer
    footer: {
      company: 'Nxt Era Solutions',
      tagline: 'Commissioned by HES Consultancy International',
      demo: 'Demo version',
      copyright: '© 2025 All rights reserved'
    },

    // Module examples
    examples: {
      vacancy: ['Write Software Developer job post', 'Inclusive Sales job posting', 'Job ad with salary range', 'Marketing Manager vacancy'],
      screening: ['Analyze this CV', 'Rank top 5 candidates', 'Skills gap analysis', 'Identify red flags'],
      communication: ['Interview invitation', 'Professional rejection', 'Post-interview follow-up', 'Candidate status update'],
      interview: ['STAR leadership questions', 'Technical Developer questions', 'Generate scorecard', 'PM competency questions'],
      onboarding: ['30-60-90 day plan', 'IT onboarding checklist', 'Write welcome email', 'Set up buddy program'],
      analytics: ['Time to hire report', 'Cost per hire analysis', 'Recruitment funnel', 'Source effectiveness']
    }
  }
};

// ============================================================================
// AI RESPONSES (Simulated)
// ============================================================================
const aiResponses = {
  nl: {
    vacancy: {
      default: `**Vacature Generator** ✨

Ik help u met het schrijven van aantrekkelijke, inclusieve vacatureteksten die geoptimaliseerd zijn voor zoekmachines.

**Wat ik voor u kan doen:**
• Complete vacaturetekst genereren
• SEO-optimalisatie voor Indeed, LinkedIn
• Inclusief taalgebruik controleren
• Salarisindicatie adviseren
• Vertalen naar Engels

**Tip:** Geef functietitel, afdeling en 3-5 kerncompetenties voor het beste resultaat.`,
      software: `**Vacature: Software Developer** 📝

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**🏢 Over ons**
Wij zijn een innovatief tech bedrijf dat impact maakt met schaalbare software oplossingen. Ons team van 45 developers werkt in moderne Agile squads aan producten die dagelijks door 100.000+ gebruikers worden gebruikt.

**💼 Wat ga je doen?**
• Ontwikkelen van schaalbare web applicaties
• Samenwerken in cross-functionele Agile teams
• Code reviews uitvoeren en kennis delen
• Bijdragen aan architectuurbeslissingen
• Mentoren van junior developers

**🎯 Wat vragen wij?**
• 3+ jaar ervaring met JavaScript/TypeScript
• Ervaring met React, Vue of Angular
• Kennis van RESTful APIs en databases
• HBO/WO werk- en denkniveau
• Goede communicatieve vaardigheden

**🎁 Wat bieden wij?**
• Salaris: €4.000 - €5.500 bruto/maand
• 25 vakantiedagen + 5 extra
• Hybride werken (3 dagen thuis)
• Opleidingsbudget €2.000/jaar
• Pensioenregeling en reiskostenvergoeding

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ **SEO Score:** 94/100
✅ **Inclusiviteit:** 92/100
📊 **Verwachte respons:** +35% vs. gemiddeld`
    },
    screening: {
      default: `**CV Screening Module** 🔍

Upload of beschrijf een CV en ik analyseer:

• **Skills Match** — Hoe goed passen de vaardigheden?
• **Ervaring Evaluatie** — Relevante werkervaring beoordelen
• **Opleidingsniveau** — Diploma's en certificeringen
• **Red Flags** — Inconsistenties en hiaten signaleren
• **Ranking Score** — Objectieve matching percentage

**Privacy:** In productie worden namen en foto's automatisch verwijderd voor blind recruitment.`,
      analyseer: `**CV Analyse Rapport** 🔍

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Kandidaat:** [Geanonimiseerd - Blind Recruitment]

**✅ Sterke punten:**
• Relevante werkervaring: 4+ jaar in vergelijkbare functie
• Technische skills matchen 82% met functie-eisen
• Opleiding sluit aan (HBO Informatica)
• Certificeringen: AWS, Scrum Master
• Stabiel loopbaanverloop

**⚠️ Aandachtspunten:**
• Gap van 6 maanden in 2022 (navragen)
• Geen ervaring met specifieke tool X
• Laatste functie korter dan 2 jaar

**📊 Match Score: 78%**

**Aanbeveling:** ✅ Uitnodigen voor gesprek
Prioriteit: Hoog

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`
    },
    communication: {
      default: `**Kandidaat Communicatie** 💬

Ik genereer professionele, persoonlijke berichten voor elke fase:

• **Ontvangstbevestiging** — Direct na sollicitatie
• **Uitnodiging** — Interview scheduling
• **Statusupdate** — Procesinformatie
• **Afwijzing** — Respectvol en constructief
• **Aanbod** — Contractvoorstel
• **Follow-up** — Na gesprekken

**Tip:** Noem de functie en kandidaatnaam voor gepersonaliseerde output.`,
      uitnodiging: `**Uitnodiging Sollicitatiegesprek** ✉️

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Onderwerp:** Uitnodiging gesprek [Functienaam] bij [Bedrijfsnaam]

Beste [Voornaam],

Hartelijk dank voor uw sollicitatie op de functie [Functienaam]. We zijn onder de indruk van uw profiel en nodigen u graag uit voor een kennismakingsgesprek.

**📅 Datum:** [Datum invullen]
**🕐 Tijd:** [Tijd invullen]
**📍 Locatie:** [Adres of Microsoft Teams]
**⏱️ Duur:** 45 minuten

**Gesprekspartners:**
• [Naam], [Functie]
• [Naam], [Functie]

**Voorbereiding:**
Neem indien mogelijk een actueel CV mee en denk na over uw motivatie en loopbaanwensen.

Kunt u uw beschikbaarheid bevestigen door op deze mail te reageren?

Met vriendelijke groet,

[Naam]
[Functie]
[Bedrijfsnaam]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`
    },
    interview: {
      default: `**Interview Ondersteuning** 🎯

Ik help met alle aspecten van het interviewproces:

• **STAR-vragen** — Gestructureerde gedragsvragen
• **Competentievragen** — Functie-specifiek
• **Technische assessments** — Vakinhoudelijke toetsing
• **Scorecards** — Gestandaardiseerde beoordeling
• **Vergelijkingsrapporten** — Objectieve kandidaatvergelijking

**Tip:** Noem de functie en gewenste competenties voor gerichte vragen.`,
      star: `**STAR Leiderschapsvragen** ⭐

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Situatie → Taak → Actie → Resultaat**

**1. Conflictresolutie**
"Beschrijf een situatie waarin u een conflict binnen uw team moest oplossen. Wat was de situatie, uw rol, welke acties ondernam u en wat was het resultaat?"

**2. Verandermanagement**
"Vertel over een keer dat u een verandering moest doorvoeren ondanks weerstand. Hoe pakte u dit aan?"

**3. Moeilijke Beslissing**
"Geef een voorbeeld van een onpopulaire maar noodzakelijke beslissing die u nam. Wat was de impact?"

**4. Team Motiveren**
"Beschrijf hoe u een underperformend team hebt omgedraaid. Welke concrete stappen zette u?"

**5. Stakeholder Management**
"Vertel over een situatie met tegenstrijdige belangen van stakeholders. Hoe navigeerde u dit?"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 **Scorecard gegenereerd** — Beoordeel per vraag op schaal 1-5`
    },
    onboarding: {
      default: `**Onboarding Module** 🚀

Ik creëer gepersonaliseerde inwerktrajecten:

• **30-60-90 dagen plannen** — Gestructureerde doelen
• **Checklists** — Voor HR, manager en nieuwe medewerker
• **Buddy programma** — Matching en begeleiding
• **Kennisbank setup** — Relevante documenten
• **Voortgangsmonitoring** — Mijlpalen tracking

**Tip:** Noem functie, afdeling en ervaringsniveau voor een op maat gemaakt plan.`,
      plan: `**30-60-90 Dagen Onboarding Plan** 🚀

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**📅 EERSTE 30 DAGEN — LEREN**
□ Dag 1: Welkom, rondleiding, IT-setup
□ Week 1: Kennismaken team en stakeholders
□ Week 2: Systemen en processen leren
□ Week 3: Cultuur en waarden begrijpen
□ Week 4: Eerste kleine taken oppakken
✓ Milestone: Basis begrip organisatie

**📅 DAG 30-60 — BIJDRAGEN**
□ Week 5-6: Zelfstandig taken uitvoeren
□ Week 7: Eerste project afronden
□ Week 8: Feedbackgesprek met manager
□ Doorlopend: Netwerk uitbreiden
✓ Milestone: Productieve bijdrage

**📅 DAG 60-90 — IMPACT**
□ Week 9-10: Volledig zelfstandig werken
□ Week 11: Eigen projecten initiëren
□ Week 12: Kennis delen met team
□ Einde: Kwartaaldoelen vaststellen
✓ Milestone: Volwaardig teamlid

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 **Checklists:** HR | Manager | Buddy | Medewerker`
    },
    analytics: {
      default: `**Recruitment Analytics** 📊

Real-time inzichten in uw wervingsproces:

• **Time to Hire** — Doorlooptijd per fase
• **Cost per Hire** — Kostenanalyse
• **Source Effectiveness** — Kanaalperformance
• **Conversion Rates** — Funnel analyse
• **Quality of Hire** — Lange termijn succes
• **Diversity Metrics** — Inclusie rapportage

**Tip:** Vraag naar specifieke KPI's of een volledig dashboard overzicht.`,
      time: `**Time to Hire Analyse** 📊

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**📈 Huidige Metrics (Q4 2025)**

| Fase | Dagen | Benchmark | Status |
|------|-------|-----------|--------|
| Sourcing | 12 | 15 | ✅ -20% |
| Screening | 8 | 12 | ✅ -33% |
| Interviews | 18 | 20 | ✅ -10% |
| Besluit | 5 | 10 | ✅ -50% |
| Offer | 7 | 5 | ⚠️ +40% |

**Totaal: 50 dagen** (Benchmark NL: 62 dagen)
✅ **19% sneller dan gemiddeld**

**🔍 Bottleneck Analyse:**
De Offer-fase duurt langer dan benchmark. 
Advies: Versneld goedkeuringsproces implementeren.

**📉 Trend:** -8 dagen vs. vorig kwartaal

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`
    }
  },
  en: {
    vacancy: {
      default: `**Job Posting Generator** ✨

I help you write attractive, inclusive job postings optimized for search engines.

**What I can do:**
• Generate complete job descriptions
• SEO optimization for Indeed, LinkedIn
• Check inclusive language
• Advise on salary indication
• Translate to Dutch

**Tip:** Provide job title, department and 3-5 key competencies for best results.`,
      software: `**Job Posting: Software Developer** 📝

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**🏢 About Us**
We are an innovative tech company making impact with scalable software solutions. Our team of 45 developers works in modern Agile squads on products used by 100,000+ users daily.

**💼 What You'll Do**
• Develop scalable web applications
• Collaborate in cross-functional Agile teams
• Conduct code reviews and share knowledge
• Contribute to architecture decisions
• Mentor junior developers

**🎯 What We Ask**
• 3+ years experience with JavaScript/TypeScript
• Experience with React, Vue or Angular
• Knowledge of RESTful APIs and databases
• Bachelor's degree or equivalent
• Good communication skills

**🎁 What We Offer**
• Salary: €4,000 - €5,500 gross/month
• 25 vacation days + 5 extra
• Hybrid working (3 days remote)
• Training budget €2,000/year
• Pension plan and travel allowance

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ **SEO Score:** 94/100
✅ **Inclusivity:** 92/100
📊 **Expected response:** +35% vs. average`
    },
    screening: {
      default: `**CV Screening Module** 🔍

Upload or describe a CV and I'll analyze:

• **Skills Match** — How well do skills align?
• **Experience Evaluation** — Assess relevant work history
• **Education Level** — Diplomas and certifications
• **Red Flags** — Identify inconsistencies and gaps
• **Ranking Score** — Objective matching percentage

**Privacy:** In production, names and photos are automatically removed for blind recruitment.`,
      analyseer: `**CV Analysis Report** 🔍

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Candidate:** [Anonymized - Blind Recruitment]

**✅ Strengths:**
• Relevant experience: 4+ years in similar role
• Technical skills match 82% with requirements
• Education aligns (BSc Computer Science)
• Certifications: AWS, Scrum Master
• Stable career progression

**⚠️ Points of Attention:**
• 6-month gap in 2022 (follow up)
• No experience with specific tool X
• Last position shorter than 2 years

**📊 Match Score: 78%**

**Recommendation:** ✅ Invite for interview
Priority: High

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`
    },
    communication: {
      default: `**Candidate Communication** 💬

I generate professional, personalized messages for every stage:

• **Confirmation** — Immediately after application
• **Invitation** — Interview scheduling
• **Status Update** — Process information
• **Rejection** — Respectful and constructive
• **Offer** — Contract proposal
• **Follow-up** — After interviews

**Tip:** Mention function and candidate name for personalized output.`,
      uitnodiging: `**Interview Invitation** ✉️

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Subject:** Interview invitation [Position] at [Company]

Dear [First name],

Thank you for your application for the [Position] role. We are impressed with your profile and would like to invite you for an introductory meeting.

**📅 Date:** [Fill in date]
**🕐 Time:** [Fill in time]
**📍 Location:** [Address or Microsoft Teams]
**⏱️ Duration:** 45 minutes

**Interview Panel:**
• [Name], [Role]
• [Name], [Role]

**Preparation:**
Please bring an updated CV and consider your motivation and career aspirations.

Could you confirm your availability by replying to this email?

Kind regards,

[Name]
[Role]
[Company]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`
    },
    interview: {
      default: `**Interview Support** 🎯

I help with all aspects of the interview process:

• **STAR Questions** — Structured behavioral questions
• **Competency Questions** — Role-specific
• **Technical Assessments** — Professional testing
• **Scorecards** — Standardized evaluation
• **Comparison Reports** — Objective candidate comparison

**Tip:** Mention the role and desired competencies for targeted questions.`,
      star: `**STAR Leadership Questions** ⭐

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Situation → Task → Action → Result**

**1. Conflict Resolution**
"Describe a situation where you had to resolve a conflict within your team. What was the situation, your role, what actions did you take and what was the result?"

**2. Change Management**
"Tell about a time you had to implement change despite resistance. How did you approach this?"

**3. Difficult Decision**
"Give an example of an unpopular but necessary decision you made. What was the impact?"

**4. Team Motivation**
"Describe how you turned around an underperforming team. What concrete steps did you take?"

**5. Stakeholder Management**
"Tell about a situation with conflicting stakeholder interests. How did you navigate this?"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 **Scorecard generated** — Rate each question on scale 1-5`
    },
    onboarding: {
      default: `**Onboarding Module** 🚀

I create personalized onboarding trajectories:

• **30-60-90 day plans** — Structured goals
• **Checklists** — For HR, manager and new employee
• **Buddy program** — Matching and guidance
• **Knowledge base setup** — Relevant documents
• **Progress monitoring** — Milestone tracking

**Tip:** Mention role, department and experience level for a customized plan.`,
      plan: `**30-60-90 Day Onboarding Plan** 🚀

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**📅 FIRST 30 DAYS — LEARN**
□ Day 1: Welcome, tour, IT setup
□ Week 1: Meet team and stakeholders
□ Week 2: Learn systems and processes
□ Week 3: Understand culture and values
□ Week 4: Pick up first small tasks
✓ Milestone: Basic organization understanding

**📅 DAY 30-60 — CONTRIBUTE**
□ Week 5-6: Execute tasks independently
□ Week 7: Complete first project
□ Week 8: Feedback session with manager
□ Ongoing: Expand network
✓ Milestone: Productive contribution

**📅 DAY 60-90 — IMPACT**
□ Week 9-10: Work fully independently
□ Week 11: Initiate own projects
□ Week 12: Share knowledge with team
□ End: Set quarterly goals
✓ Milestone: Full team member

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 **Checklists:** HR | Manager | Buddy | Employee`
    },
    analytics: {
      default: `**Recruitment Analytics** 📊

Real-time insights into your hiring process:

• **Time to Hire** — Lead time per phase
• **Cost per Hire** — Cost analysis
• **Source Effectiveness** — Channel performance
• **Conversion Rates** — Funnel analysis
• **Quality of Hire** — Long-term success
• **Diversity Metrics** — Inclusion reporting

**Tip:** Ask for specific KPIs or a complete dashboard overview.`,
      time: `**Time to Hire Analysis** 📊

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**📈 Current Metrics (Q4 2025)**

| Phase | Days | Benchmark | Status |
|-------|------|-----------|--------|
| Sourcing | 12 | 15 | ✅ -20% |
| Screening | 8 | 12 | ✅ -33% |
| Interviews | 18 | 20 | ✅ -10% |
| Decision | 5 | 10 | ✅ -50% |
| Offer | 7 | 5 | ⚠️ +40% |

**Total: 50 days** (NL Benchmark: 62 days)
✅ **19% faster than average**

**🔍 Bottleneck Analysis:**
Offer phase takes longer than benchmark.
Advice: Implement accelerated approval process.

**📉 Trend:** -8 days vs. previous quarter

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`
    }
  }
};

// ============================================================================
// PERSONA WORKFLOWS
// ============================================================================
const personaWorkflows = {
  recruiter: {
    steps: ['vacancy', 'screening', 'communication', 'interview'],
    primary: ['vacancy', 'screening'],
    description: { nl: 'Focus op werving en selectie', en: 'Focus on talent acquisition' }
  },
  'hr-manager': {
    steps: ['analytics', 'screening', 'onboarding', 'communication'],
    primary: ['analytics', 'onboarding'],
    description: { nl: 'Strategisch overzicht en compliance', en: 'Strategic overview and compliance' }
  },
  'hiring-manager': {
    steps: ['vacancy', 'interview', 'onboarding', 'analytics'],
    primary: ['interview', 'onboarding'],
    description: { nl: 'Team samenstelling en ontwikkeling', en: 'Team composition and development' }
  },
  'hr-admin': {
    steps: ['communication', 'onboarding', 'screening', 'analytics'],
    primary: ['communication', 'onboarding'],
    description: { nl: 'Operationele ondersteuning', en: 'Operational support' }
  }
};

// ============================================================================
// PERSONA PROFILES (Login simulation)
// ============================================================================
const personaProfiles = {
  recruiter: {
    name: { nl: 'Lisa de Vries', en: 'Lisa de Vries' },
    role: { nl: 'Senior Recruiter', en: 'Senior Recruiter' },
    company: 'TechCorp Nederland',
    avatar: '👩‍💼',
    stats: {
      nl: { openVacatures: 12, kandidatenPipeline: 47, gesprekkenWeek: 8, plaatsingenMaand: 3 },
      en: { openVacatures: 12, kandidatenPipeline: 47, gesprekkenWeek: 8, plaatsingenMaand: 3 }
    },
    greeting: {
      nl: 'Goedemorgen Lisa! Je hebt 12 openstaande vacatures en 5 interviews deze week.',
      en: 'Good morning Lisa! You have 12 open vacancies and 5 interviews this week.'
    },
    quickActions: {
      nl: ['Nieuwe vacature maken', 'CV\'s screenen', 'Interview plannen', 'Kandidaat mailen'],
      en: ['Create new vacancy', 'Screen CVs', 'Schedule interview', 'Email candidate']
    }
  },
  'hr-manager': {
    name: { nl: 'Mark Jansen', en: 'Mark Jansen' },
    role: { nl: 'HR Directeur', en: 'HR Director' },
    company: 'TechCorp Nederland',
    avatar: '👨‍💼',
    stats: {
      nl: { teamSize: 8, budgetUsed: '67%', timeToHire: 45, costPerHire: '€3.200' },
      en: { teamSize: 8, budgetUsed: '67%', timeToHire: 45, costPerHire: '€3,200' }
    },
    greeting: {
      nl: 'Welkom terug Mark. Je team heeft deze maand 15% sneller geworven dan vorige maand.',
      en: 'Welcome back Mark. Your team recruited 15% faster this month than last month.'
    },
    quickActions: {
      nl: ['Dashboard bekijken', 'Maandrapport', 'Compliance check', 'Team performance'],
      en: ['View dashboard', 'Monthly report', 'Compliance check', 'Team performance']
    }
  },
  'hiring-manager': {
    name: { nl: 'Sandra Bakker', en: 'Sandra Bakker' },
    role: { nl: 'Engineering Lead', en: 'Engineering Lead' },
    company: 'TechCorp Nederland',
    avatar: '👩‍💻',
    stats: {
      nl: { openRollen: 3, kandidatenShortlist: 8, interviewsGepland: 4, teamGrootte: 12 },
      en: { openRollen: 3, kandidatenShortlist: 8, interviewsGepland: 4, teamGrootte: 12 }
    },
    greeting: {
      nl: 'Hoi Sandra! Er staan 4 interviews gepland voor je Senior Developer positie.',
      en: 'Hi Sandra! You have 4 interviews scheduled for your Senior Developer position.'
    },
    quickActions: {
      nl: ['Interviewvragen', 'Kandidaten vergelijken', 'Scorecard invullen', 'Onboarding starten'],
      en: ['Interview questions', 'Compare candidates', 'Fill scorecard', 'Start onboarding']
    }
  },
  'hr-admin': {
    name: { nl: 'Pieter van Dijk', en: 'Pieter van Dijk' },
    role: { nl: 'HR Coördinator', en: 'HR Coordinator' },
    company: 'TechCorp Nederland',
    avatar: '👨‍💻',
    stats: {
      nl: { nieuweMedewerkers: 4, contractenKlaar: 2, onboardingActief: 6, takenOpen: 12 },
      en: { nieuweMedewerkers: 4, contractenKlaar: 2, onboardingActief: 6, takenOpen: 12 }
    },
    greeting: {
      nl: 'Goedemorgen Pieter! Er zijn 2 contracten klaar voor verzending en 4 nieuwe starters deze maand.',
      en: 'Good morning Pieter! There are 2 contracts ready to send and 4 new starters this month.'
    },
    quickActions: {
      nl: ['Welkomstmail sturen', 'Contract genereren', 'Onboarding checklist', 'Status update'],
      en: ['Send welcome email', 'Generate contract', 'Onboarding checklist', 'Status update']
    }
  }
};

// Persona stat labels
const statLabels = {
  nl: {
    openVacatures: 'Open Vacatures',
    kandidatenPipeline: 'Kandidaten Pipeline',
    gesprekkenWeek: 'Gesprekken/Week',
    plaatsingenMaand: 'Plaatsingen/Maand',
    teamSize: 'Team Grootte',
    budgetUsed: 'Budget Gebruikt',
    timeToHire: 'Time to Hire (dagen)',
    costPerHire: 'Cost per Hire',
    openRollen: 'Open Rollen',
    kandidatenShortlist: 'Shortlist',
    interviewsGepland: 'Interviews Gepland',
    teamGrootte: 'Team Grootte',
    nieuweMedewerkers: 'Nieuwe Medewerkers',
    contractenKlaar: 'Contracten Klaar',
    onboardingActief: 'Onboarding Actief',
    takenOpen: 'Open Taken'
  },
  en: {
    openVacatures: 'Open Vacancies',
    kandidatenPipeline: 'Candidate Pipeline',
    gesprekkenWeek: 'Interviews/Week',
    plaatsingenMaand: 'Placements/Month',
    teamSize: 'Team Size',
    budgetUsed: 'Budget Used',
    timeToHire: 'Time to Hire (days)',
    costPerHire: 'Cost per Hire',
    openRollen: 'Open Roles',
    kandidatenShortlist: 'Shortlist',
    interviewsGepland: 'Interviews Scheduled',
    teamGrootte: 'Team Size',
    nieuweMedewerkers: 'New Employees',
    contractenKlaar: 'Contracts Ready',
    onboardingActief: 'Onboarding Active',
    takenOpen: 'Open Tasks'
  }
};

// ============================================================================
// MAIN APP COMPONENT
// ============================================================================
export default function App() {
  // State
  const [lang, setLang] = useState('nl');
  const [view, setView] = useState('landing'); // landing, persona-login, persona-dashboard, workflow, chat
  const [activeModule, setActiveModule] = useState(null);
  const [activePersona, setActivePersona] = useState(null);
  const [workflowStep, setWorkflowStep] = useState(0);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [listening, setListening] = useState(false);
  const [history, setHistory] = useState([]);
  const [roiHires, setRoiHires] = useState(200);
  const [roiCost, setRoiCost] = useState(4000);
  
  // Recording state
  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [sessionNotes, setSessionNotes] = useState([]);
  
  // Refs
  const chatEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  
  // Translations
  const t = T[lang];
  
  // Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = lang === 'nl' ? 'nl-NL' : 'en-US';
      
      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setListening(false);
      };
      
      recognitionRef.current.onerror = () => setListening(false);
      recognitionRef.current.onend = () => setListening(false);
    }
  }, [lang]);
  
  // Toggle speech recognition
  const toggleListening = () => {
    if (!recognitionRef.current) return;
    if (listening) {
      recognitionRef.current.stop();
      setListening(false);
    } else {
      recognitionRef.current.lang = lang === 'nl' ? 'nl-NL' : 'en-US';
      recognitionRef.current.start();
      setListening(true);
    }
  };
  
  // Audio Recording Functions
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      const chunks = [];
      
      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };
      
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        setRecordedChunks(prev => [...prev, { blob, timestamp: new Date().toISOString() }]);
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorderRef.current.start();
      setIsRecording(true);
      
      // Add to session notes
      setSessionNotes(prev => [...prev, {
        type: 'recording-start',
        timestamp: new Date().toLocaleTimeString(),
        text: lang === 'nl' ? '🎙️ Opname gestart' : '🎙️ Recording started'
      }]);
    } catch (err) {
      console.error('Recording error:', err);
      alert(lang === 'nl' ? 'Microfoon toegang geweigerd' : 'Microphone access denied');
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setSessionNotes(prev => [...prev, {
        type: 'recording-stop',
        timestamp: new Date().toLocaleTimeString(),
        text: lang === 'nl' ? '🎙️ Opname gestopt' : '🎙️ Recording stopped'
      }]);
    }
  };
  
  const downloadRecording = (index) => {
    const recording = recordedChunks[index];
    if (recording) {
      const url = URL.createObjectURL(recording.blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ai-talent-hr-recording-${index + 1}.webm`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };
  
  // Export session as text/markdown
  const exportSession = () => {
    const persona = activePersona ? personaProfiles[activePersona] : null;
    const personaName = persona ? persona.name[lang] : 'Guest';
    const personaRole = persona ? persona.role[lang] : '';
    
    let content = `# AI Talent HR - ${lang === 'nl' ? 'Sessie Rapport' : 'Session Report'}\n\n`;
    content += `**${lang === 'nl' ? 'Datum' : 'Date'}:** ${new Date().toLocaleDateString()}\n`;
    content += `**${lang === 'nl' ? 'Gebruiker' : 'User'}:** ${personaName} (${personaRole})\n`;
    content += `**${lang === 'nl' ? 'Module' : 'Module'}:** ${activeModule ? t.modules.items[activeModule]?.name : '-'}\n\n`;
    content += `---\n\n`;
    content += `## ${lang === 'nl' ? 'Conversatie' : 'Conversation'}\n\n`;
    
    messages.forEach(msg => {
      const role = msg.type === 'user' ? personaName : 'AI Talent HR';
      content += `**${role}:**\n${msg.text}\n\n`;
    });
    
    if (sessionNotes.length > 0) {
      content += `---\n\n## ${lang === 'nl' ? 'Sessie Notities' : 'Session Notes'}\n\n`;
      sessionNotes.forEach(note => {
        content += `- [${note.timestamp}] ${note.text}\n`;
      });
    }
    
    if (recordedChunks.length > 0) {
      content += `\n---\n\n## ${lang === 'nl' ? 'Audio Opnames' : 'Audio Recordings'}\n\n`;
      content += `${recordedChunks.length} ${lang === 'nl' ? 'opname(s) gemaakt tijdens deze sessie' : 'recording(s) made during this session'}\n`;
    }
    
    content += `\n---\n\n*${lang === 'nl' ? 'Gegenereerd door' : 'Generated by'} AI Talent HR - Nxt Era Solutions*`;
    
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-talent-hr-session-${new Date().toISOString().split('T')[0]}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };
  
  // Persona login
  const loginAsPersona = (personaId) => {
    setActivePersona(personaId);
    setView('persona-login');
    // Reset session
    setMessages([]);
    setSessionNotes([]);
    setRecordedChunks([]);
  };
  
  // Enter dashboard after login animation
  const enterDashboard = () => {
    setView('persona-dashboard');
  };
  
  // Get AI response
  const getAIResponse = (query, module) => {
    const responses = aiResponses[lang][module];
    const q = query.toLowerCase();
    
    // Match keywords to responses
    if (module === 'vacancy' && (q.includes('software') || q.includes('developer'))) return responses.software;
    if (module === 'screening' && (q.includes('analyse') || q.includes('cv') || q.includes('analyze'))) return responses.analyseer;
    if (module === 'communication' && (q.includes('uitnodig') || q.includes('invite') || q.includes('gesprek'))) return responses.uitnodiging;
    if (module === 'interview' && (q.includes('star') || q.includes('leider') || q.includes('leader'))) return responses.star;
    if (module === 'onboarding' && (q.includes('plan') || q.includes('30') || q.includes('60') || q.includes('90'))) return responses.plan;
    if (module === 'analytics' && (q.includes('time') || q.includes('hire') || q.includes('doorloop'))) return responses.time;
    
    return responses.default;
  };
  
  // Send message
  const sendMessage = (text) => {
    if (!text.trim() || !activeModule) return;
    
    const userMsg = { type: 'user', text: text.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    
    // Add to history
    if (!history.includes(text.trim().substring(0, 30))) {
      setHistory(prev => [text.trim().substring(0, 30), ...prev].slice(0, 5));
    }
    
    // Simulate AI response
    setTimeout(() => {
      const response = getAIResponse(text, activeModule);
      setMessages(prev => [...prev, { type: 'ai', text: response }]);
      setIsTyping(false);
    }, 1500);
  };
  
  // Start module
  const startModule = (moduleId) => {
    setActiveModule(moduleId);
    setMessages([{ type: 'ai', text: aiResponses[lang][moduleId].default }]);
    setView('chat');
  };
  
  // Start workflow
  const startWorkflow = (personaId) => {
    loginAsPersona(personaId);
  };
  
  // Workflow navigation
  const nextStep = () => {
    if (workflowStep < t.workflow.steps.length - 1) {
      setWorkflowStep(prev => prev + 1);
    }
  };
  
  const prevStep = () => {
    if (workflowStep > 0) {
      setWorkflowStep(prev => prev - 1);
    }
  };
  
  // ROI calculation
  const calculateROI = () => {
    return Math.round(roiHires * roiCost * 0.3);
  };
  
  // Render markdown-like text
  const renderText = (text) => {
    return text.split('\n').map((line, i) => {
      let formatted = line
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/━+/g, '<hr style="border:none;border-top:1px solid #ddd;margin:8px 0"/>')
        .replace(/^• /g, '&bull; ')
        .replace(/^□ /g, '☐ ')
        .replace(/^✓ /g, '✓ ');
      return <div key={i} dangerouslySetInnerHTML={{ __html: formatted || '&nbsp;' }} />;
    });
  };
  
  // ============================================================================
  // RENDER: PERSONA LOGIN
  // ============================================================================
  const renderPersonaLogin = () => {
    const persona = personaProfiles[activePersona];
    if (!persona) return null;
    
    return (
      <div style={styles.loginContainer}>
        <div style={styles.loginCard}>
          <div style={styles.loginAvatar}>{persona.avatar}</div>
          <h2 style={styles.loginName}>{persona.name[lang]}</h2>
          <p style={styles.loginRole}>{persona.role[lang]}</p>
          <p style={styles.loginCompany}>{persona.company}</p>
          
          <div style={styles.loginDivider} />
          
          <p style={styles.loginGreeting}>{persona.greeting[lang]}</p>
          
          <button style={styles.loginButton} onClick={enterDashboard}>
            {lang === 'nl' ? 'Naar Dashboard →' : 'Go to Dashboard →'}
          </button>
          
          <button style={styles.loginBackButton} onClick={() => setView('landing')}>
            {lang === 'nl' ? '← Andere rol kiezen' : '← Choose different role'}
          </button>
        </div>
      </div>
    );
  };
  
  // ============================================================================
  // RENDER: PERSONA DASHBOARD
  // ============================================================================
  const renderPersonaDashboard = () => {
    const persona = personaProfiles[activePersona];
    if (!persona) return null;
    
    const workflow = personaWorkflows[activePersona];
    const stats = persona.stats[lang];
    
    return (
      <div style={styles.dashboardContainer}>
        {/* Dashboard Header */}
        <div style={styles.dashboardHeader}>
          <div style={styles.dashboardUser}>
            <span style={styles.dashboardAvatar}>{persona.avatar}</span>
            <div>
              <strong style={styles.dashboardName}>{persona.name[lang]}</strong>
              <span style={styles.dashboardRole}>{persona.role[lang]} • {persona.company}</span>
            </div>
          </div>
          <div style={styles.dashboardActions}>
            {/* Recording Controls */}
            <button 
              style={{
                ...styles.recordButton,
                ...(isRecording ? styles.recordButtonActive : {})
              }}
              onClick={isRecording ? stopRecording : startRecording}
              title={isRecording ? (lang === 'nl' ? 'Stop opname' : 'Stop recording') : (lang === 'nl' ? 'Start opname' : 'Start recording')}
            >
              {isRecording ? '⏹️' : '🎙️'}
              <span>{isRecording ? (lang === 'nl' ? 'Stop' : 'Stop') : (lang === 'nl' ? 'Opnemen' : 'Record')}</span>
            </button>
            
            <button style={styles.logoutButton} onClick={() => setView('landing')}>
              {lang === 'nl' ? 'Uitloggen' : 'Logout'}
            </button>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div style={styles.dashboardStats}>
          {Object.entries(stats).map(([key, value]) => (
            <div key={key} style={styles.dashStatCard}>
              <div style={styles.dashStatValue}>{value}</div>
              <div style={styles.dashStatLabel}>{statLabels[lang][key]}</div>
            </div>
          ))}
        </div>
        
        {/* Quick Actions */}
        <div style={styles.dashboardSection}>
          <h3 style={styles.dashSectionTitle}>
            {lang === 'nl' ? '⚡ Snelle Acties' : '⚡ Quick Actions'}
          </h3>
          <div style={styles.quickActionsGrid}>
            {persona.quickActions[lang].map((action, i) => (
              <button 
                key={i} 
                style={styles.quickActionBtn}
                onClick={() => {
                  // Map action to module
                  const moduleMap = {
                    0: workflow.primary[0],
                    1: workflow.primary[1] || workflow.primary[0],
                    2: workflow.steps[2] || workflow.primary[0],
                    3: workflow.steps[3] || workflow.primary[0]
                  };
                  startModule(moduleMap[i] || 'vacancy');
                }}
              >
                {action}
              </button>
            ))}
          </div>
        </div>
        
        {/* Recommended Modules */}
        <div style={styles.dashboardSection}>
          <h3 style={styles.dashSectionTitle}>
            {lang === 'nl' ? '🎯 Aanbevolen Modules' : '🎯 Recommended Modules'}
          </h3>
          <div style={styles.recommendedModules}>
            {workflow.primary.map(modId => {
              const mod = t.modules.items[modId];
              return (
                <div 
                  key={modId} 
                  style={styles.recommendedCard}
                  onClick={() => startModule(modId)}
                >
                  <span style={styles.recModIcon}>{mod.icon}</span>
                  <div>
                    <strong>{mod.name}</strong>
                    <p style={styles.recModDesc}>{mod.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* All Modules Grid */}
        <div style={styles.dashboardSection}>
          <h3 style={styles.dashSectionTitle}>
            {lang === 'nl' ? '📦 Alle Modules' : '📦 All Modules'}
          </h3>
          <div style={styles.allModulesGrid}>
            {Object.entries(t.modules.items).map(([id, mod]) => (
              <button 
                key={id} 
                style={{
                  ...styles.moduleBtn,
                  ...(workflow.primary.includes(id) ? styles.moduleBtnPrimary : {})
                }}
                onClick={() => startModule(id)}
              >
                <span>{mod.icon}</span>
                <span>{mod.name}</span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Workflow Preview */}
        <div style={styles.dashboardSection}>
          <h3 style={styles.dashSectionTitle}>
            {lang === 'nl' ? '🔄 Workflow Stappen' : '🔄 Workflow Steps'}
          </h3>
          <button 
            style={styles.workflowPreviewBtn}
            onClick={() => { setWorkflowStep(0); setView('workflow'); }}
          >
            {lang === 'nl' ? 'Bekijk volledige recruitment workflow →' : 'View full recruitment workflow →'}
          </button>
        </div>
        
        {/* Session Info */}
        {(recordedChunks.length > 0 || sessionNotes.length > 0) && (
          <div style={styles.dashboardSection}>
            <h3 style={styles.dashSectionTitle}>
              {lang === 'nl' ? '📋 Sessie Informatie' : '📋 Session Information'}
            </h3>
            <div style={styles.sessionInfo}>
              {recordedChunks.length > 0 && (
                <div style={styles.recordingsList}>
                  <strong>{lang === 'nl' ? 'Opnames:' : 'Recordings:'}</strong>
                  {recordedChunks.map((rec, i) => (
                    <button 
                      key={i} 
                      style={styles.downloadRecBtn}
                      onClick={() => downloadRecording(i)}
                    >
                      🎵 {lang === 'nl' ? 'Opname' : 'Recording'} {i + 1}
                    </button>
                  ))}
                </div>
              )}
              <button style={styles.exportSessionBtn} onClick={exportSession}>
                📄 {lang === 'nl' ? 'Exporteer Sessie Rapport' : 'Export Session Report'}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  // ============================================================================
  // RENDER: LANDING PAGE
  // ============================================================================
  const renderLanding = () => (
    <>
      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={styles.heroText}>
            <h1 style={styles.heroTitle}>{t.hero.title}</h1>
            <p style={styles.heroSubtitle}>{t.hero.subtitle}</p>
            <p style={styles.heroDesc}>{t.hero.description}</p>
            <button style={styles.ctaButton} onClick={() => setView('workflow')}>
              {t.hero.cta} →
            </button>
          </div>
          <div style={styles.pillarsGrid}>
            {t.hero.pillars.map((p, i) => (
              <div key={i} style={styles.pillarCard}>
                <span style={styles.pillarIcon}>{p.icon}</span>
                <strong>{p.title}</strong>
                <span style={styles.pillarDesc}>{p.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Market Stats */}
      <section style={styles.section} id="stats">
        <h2 style={styles.sectionTitle}>{t.stats.title}</h2>
        <p style={styles.sectionSubtitle}>{t.stats.subtitle}</p>
        <div style={styles.statsGrid}>
          {t.stats.items.map((stat, i) => (
            <div key={i} style={styles.statCard}>
              <div style={styles.statValue}>{stat.value}</div>
              <div style={styles.statLabel}>{stat.label}</div>
              <div style={styles.statDesc}>{stat.desc}</div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Personas */}
      <section style={{...styles.section, background: '#f8f9fa'}} id="personas">
        <h2 style={styles.sectionTitle}>{t.personas.title}</h2>
        <p style={styles.sectionSubtitle}>{t.personas.subtitle}</p>
        <div style={styles.personaGrid}>
          {t.personas.items.map((persona) => (
            <div key={persona.id} style={styles.personaCard} onClick={() => startWorkflow(persona.id)}>
              <span style={styles.personaIcon}>{persona.icon}</span>
              <h3 style={styles.personaTitle}>{persona.title}</h3>
              <p style={styles.personaDesc}>{persona.desc}</p>
              <p style={styles.personaFocus}>{persona.focus}</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* Modules */}
      <section style={styles.section} id="modules">
        <h2 style={styles.sectionTitle}>{t.modules.title}</h2>
        <p style={styles.sectionSubtitle}>{t.modules.subtitle}</p>
        <div style={styles.modulesGrid}>
          {Object.entries(t.modules.items).map(([id, mod]) => (
            <div key={id} style={styles.moduleCard} onClick={() => startModule(id)}>
              <span style={styles.moduleIcon}>{mod.icon}</span>
              <h3 style={styles.moduleTitle}>{mod.name}</h3>
              <p style={styles.moduleDesc}>{mod.desc}</p>
              <ul style={styles.moduleFeatures}>
                {mod.features.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>
      
      {/* ROI Section */}
      <section style={styles.roiSection} id="roi">
        <h2 style={{...styles.sectionTitle, color: 'white'}}>{t.roi.title}</h2>
        <p style={{...styles.sectionSubtitle, color: 'rgba(255,255,255,0.8)'}}>{t.roi.subtitle}</p>
        <div style={styles.kpiGrid}>
          {t.roi.kpis.map((kpi, i) => (
            <div key={i} style={styles.kpiCard}>
              <div style={styles.kpiValue}>{kpi.value}</div>
              <div style={styles.kpiLabel}>{kpi.label}</div>
              <div style={styles.kpiDesc}>{kpi.desc}</div>
            </div>
          ))}
        </div>
        <div style={styles.calculatorBox}>
          <h3 style={styles.calcTitle}>{t.roi.calculator.title}</h3>
          <div style={styles.calcInputs}>
            <label style={styles.calcLabel}>
              {t.roi.calculator.hires}
              <input type="number" value={roiHires} onChange={e => setRoiHires(Number(e.target.value))} style={styles.calcInput} />
            </label>
            <label style={styles.calcLabel}>
              {t.roi.calculator.current}
              <input type="number" value={roiCost} onChange={e => setRoiCost(Number(e.target.value))} style={styles.calcInput} />
            </label>
          </div>
          <div style={styles.calcResult}>
            <span>{t.roi.calculator.result}:</span>
            <strong style={styles.calcAmount}>€{calculateROI().toLocaleString()}</strong>
          </div>
          <p style={styles.calcDisclaimer}>{t.roi.calculator.disclaimer}</p>
        </div>
      </section>
      
      {/* Sectors */}
      <section style={styles.section} id="sectors">
        <h2 style={styles.sectionTitle}>{t.sectors.title}</h2>
        <p style={styles.sectionSubtitle}>{t.sectors.subtitle}</p>
        <div style={styles.sectorGrid}>
          {t.sectors.items.map((sector, i) => (
            <div key={i} style={styles.sectorCard}>
              <span style={styles.sectorIcon}>{sector.icon}</span>
              <h3 style={styles.sectorTitle}>{sector.name}</h3>
              <p style={styles.sectorDesc}>{sector.desc}</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* Compliance */}
      <section style={{...styles.section, background: '#f8f9fa'}} id="compliance">
        <h2 style={styles.sectionTitle}>{t.compliance.title}</h2>
        <div style={styles.complianceGrid}>
          {t.compliance.items.map((item, i) => (
            <div key={i} style={styles.complianceBadge}>
              <span style={styles.complianceIcon}>{item.icon}</span>
              <strong>{item.name}</strong>
              <span style={styles.complianceDesc}>{item.desc}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
  
  // ============================================================================
  // RENDER: WORKFLOW VIEW
  // ============================================================================
  const renderWorkflow = () => {
    const step = t.workflow.steps[workflowStep];
    const moduleMap = {
      1: 'vacancy', 2: 'vacancy', 3: 'screening', 4: 'screening',
      5: 'interview', 6: 'interview', 7: 'communication', 8: 'onboarding'
    };
    const linkedModule = moduleMap[step.id];
    
    return (
      <section style={styles.workflowSection}>
        <button 
          style={styles.backButton} 
          onClick={() => setView(activePersona ? 'persona-dashboard' : 'landing')}
        >
          {activePersona 
            ? (lang === 'nl' ? '← Terug naar Dashboard' : '← Back to Dashboard')
            : t.chat.back
          }
        </button>
        
        <h2 style={styles.workflowTitle}>{t.workflow.title}</h2>
        <p style={styles.workflowSubtitle}>{t.workflow.subtitle}</p>
        
        {/* Progress Bar */}
        <div style={styles.progressContainer}>
          {t.workflow.steps.map((s, i) => (
            <div 
              key={i} 
              style={{
                ...styles.progressStep,
                ...(i === workflowStep ? styles.progressStepActive : {}),
                ...(i < workflowStep ? styles.progressStepComplete : {})
              }}
              onClick={() => setWorkflowStep(i)}
            >
              <div style={styles.progressIcon}>{s.icon}</div>
              <div style={styles.progressLabel}>{s.title}</div>
            </div>
          ))}
        </div>
        
        {/* Current Step */}
        <div style={styles.currentStep}>
          <div style={styles.stepIcon}>{step.icon}</div>
          <h3 style={styles.stepTitle}>{step.title}</h3>
          <p style={styles.stepDesc}>{step.desc}</p>
          
          <button style={styles.tryModuleBtn} onClick={() => startModule(linkedModule)}>
            {t.workflow.tryModule} →
          </button>
        </div>
        
        {/* Navigation */}
        <div style={styles.workflowNav}>
          <button 
            style={{...styles.navButton, opacity: workflowStep === 0 ? 0.5 : 1}}
            onClick={prevStep}
            disabled={workflowStep === 0}
          >
            {t.workflow.prev}
          </button>
          <span style={styles.stepIndicator}>
            {workflowStep + 1} / {t.workflow.steps.length}
          </span>
          <button 
            style={{...styles.navButton, opacity: workflowStep === t.workflow.steps.length - 1 ? 0.5 : 1}}
            onClick={nextStep}
            disabled={workflowStep === t.workflow.steps.length - 1}
          >
            {t.workflow.next}
          </button>
        </div>
      </section>
    );
  };
  
  // ============================================================================
  // RENDER: CHAT VIEW
  // ============================================================================
  const renderChat = () => {
    const mod = t.modules.items[activeModule];
    const examples = t.examples[activeModule] || [];
    const persona = activePersona ? personaProfiles[activePersona] : null;
    
    return (
      <div style={styles.chatContainer}>
        {/* Sidebar */}
        <aside style={styles.chatSidebar}>
          <button 
            style={styles.backButtonSmall} 
            onClick={() => setView(activePersona ? 'persona-dashboard' : 'landing')}
          >
            {activePersona 
              ? (lang === 'nl' ? '← Terug naar Dashboard' : '← Back to Dashboard')
              : t.chat.back
            }
          </button>
          
          {/* Persona Info */}
          {persona && (
            <div style={styles.personaInfo}>
              <span style={styles.personaAvatarSmall}>{persona.avatar}</span>
              <div>
                <div style={styles.personaNameSmall}>{persona.name[lang]}</div>
                <div style={styles.personaRoleSmall}>{persona.role[lang]}</div>
              </div>
            </div>
          )}
          
          {/* Recording Controls */}
          <div style={styles.recordControls}>
            <button 
              style={{
                ...styles.recordBtnSmall,
                ...(isRecording ? styles.recordBtnSmallActive : {})
              }}
              onClick={isRecording ? stopRecording : startRecording}
            >
              {isRecording ? '⏹️' : '🎙️'}
              {isRecording 
                ? (lang === 'nl' ? 'Stop' : 'Stop') 
                : (lang === 'nl' ? 'Opnemen' : 'Record')
              }
            </button>
          </div>
          
          <div style={styles.sidebarModule}>
            <span style={styles.sidebarIcon}>{mod?.icon}</span>
            <span style={styles.sidebarName}>{mod?.name}</span>
          </div>
          
          <div style={styles.sidebarSection}>
            <div style={styles.sidebarLabel}>{t.chat.examples}</div>
            {examples.map((ex, i) => (
              <button key={i} style={styles.exampleButton} onClick={() => sendMessage(ex)}>
                {ex}
              </button>
            ))}
          </div>
          
          <div style={styles.sidebarSection}>
            <div style={styles.sidebarLabel}>{t.chat.history}</div>
            <div style={styles.historyList}>
              {history.map((h, i) => (
                <span key={i} style={styles.historyTag}>{h}...</span>
              ))}
            </div>
          </div>
          
          {/* Module Quick Switch */}
          <div style={styles.sidebarSection}>
            <div style={styles.sidebarLabel}>Modules</div>
            <div style={styles.quickModules}>
              {Object.entries(t.modules.items).map(([id, m]) => (
                <button 
                  key={id} 
                  style={{
                    ...styles.quickModuleBtn,
                    ...(id === activeModule ? styles.quickModuleBtnActive : {})
                  }}
                  onClick={() => startModule(id)}
                >
                  {m.icon}
                </button>
              ))}
            </div>
          </div>
          
          {/* Export Button */}
          {messages.length > 0 && (
            <button style={styles.exportBtnSmall} onClick={exportSession}>
              📄 {lang === 'nl' ? 'Exporteer Sessie' : 'Export Session'}
            </button>
          )}
          
          {/* Recordings List */}
          {recordedChunks.length > 0 && (
            <div style={styles.sidebarSection}>
              <div style={styles.sidebarLabel}>
                {lang === 'nl' ? 'Opnames' : 'Recordings'} ({recordedChunks.length})
              </div>
              {recordedChunks.map((rec, i) => (
                <button 
                  key={i} 
                  style={styles.exampleButton}
                  onClick={() => downloadRecording(i)}
                >
                  🎵 {lang === 'nl' ? 'Download' : 'Download'} #{i + 1}
                </button>
              ))}
            </div>
          )}
        </aside>
        
        {/* Main Chat Area */}
        <main style={styles.chatMain}>
          <div style={styles.chatMessages}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                ...styles.message,
                ...(msg.type === 'user' ? styles.messageUser : styles.messageAI)
              }}>
                <div style={{
                  ...styles.messageAvatar,
                  ...(msg.type === 'user' ? styles.avatarUser : styles.avatarAI)
                }}>
                  {msg.type === 'user' ? '👤' : '🤖'}
                </div>
                <div style={{
                  ...styles.messageBubble,
                  ...(msg.type === 'user' ? styles.bubbleUser : styles.bubbleAI)
                }}>
                  {renderText(msg.text)}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div style={{...styles.message, ...styles.messageAI}}>
                <div style={{...styles.messageAvatar, ...styles.avatarAI}}>🤖</div>
                <div style={{...styles.messageBubble, ...styles.bubbleAI}}>
                  <div style={styles.typingIndicator}>
                    <span>{t.chat.aiGen}</span>
                    <div style={styles.dots}>
                      <span style={{...styles.dot, animationDelay: '0s'}} />
                      <span style={{...styles.dot, animationDelay: '0.2s'}} />
                      <span style={{...styles.dot, animationDelay: '0.4s'}} />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
          
          {/* Input Area */}
          <form style={styles.chatInput} onSubmit={e => { e.preventDefault(); sendMessage(input); }}>
            <button 
              type="button" 
              style={{
                ...styles.micButton,
                ...(listening ? styles.micButtonActive : {})
              }}
              onClick={toggleListening}
              title={t.chat.micTitle}
            >
              🎤
            </button>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={listening ? t.chat.listening : t.chat.placeholder}
              style={{
                ...styles.textInput,
                ...(listening ? styles.textInputListening : {})
              }}
            />
            <button type="submit" style={styles.sendButton}>
              {t.chat.send}
            </button>
          </form>
        </main>
      </div>
    );
  };
  
  // ============================================================================
  // MAIN RENDER
  // ============================================================================
  return (
    <div style={styles.app}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.logo} onClick={() => setView('landing')}>
            <span style={styles.logoIcon}>👥</span>
            <span style={styles.logoText}>AI Talent HR</span>
          </div>
          
          {view === 'landing' && (
            <nav style={styles.nav}>
              <a href="#stats" style={styles.navLink}>{t.nav.modules}</a>
              <a href="#personas" style={styles.navLink}>{t.nav.workflow}</a>
              <a href="#roi" style={styles.navLink}>{t.nav.roi}</a>
              <a href="#sectors" style={styles.navLink}>{t.nav.sectors}</a>
            </nav>
          )}
          
          <div style={styles.headerActions}>
            <div style={styles.langToggle}>
              <button 
                style={{...styles.langBtn, ...(lang === 'nl' ? styles.langBtnActive : {})}}
                onClick={() => setLang('nl')}
              >NL</button>
              <button 
                style={{...styles.langBtn, ...(lang === 'en' ? styles.langBtnActive : {})}}
                onClick={() => setLang('en')}
              >EN</button>
            </div>
            {view === 'landing' && (
              <button style={styles.demoButton} onClick={() => setView('workflow')}>
                {t.nav.demo}
              </button>
            )}
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main style={styles.main}>
        {view === 'landing' && renderLanding()}
        {view === 'persona-login' && renderPersonaLogin()}
        {view === 'persona-dashboard' && renderPersonaDashboard()}
        {view === 'workflow' && renderWorkflow()}
        {view === 'chat' && renderChat()}
      </main>
      
      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerLogo}>
            <strong style={{color: '#8E44AD'}}>{t.footer.company}</strong>
            <span>{t.footer.tagline}</span>
          </div>
          <div style={styles.footerLinks}>
            <span style={styles.footerBadge}>{t.footer.demo}</span>
            <span>{t.footer.copyright}</span>
          </div>
        </div>
      </footer>
      
      {/* Global Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:wght@600;700&display=swap');
        
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { font-family: 'Outfit', sans-serif; }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(231,76,60,0.7); }
          50% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(231,76,60,0); }
        }
        
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-4px); }
        }
        
        @media (max-width: 1024px) {
          .hide-mobile { display: none !important; }
        }
      `}</style>
    </div>
  );
}

// ============================================================================
// STYLES
// ============================================================================
const styles = {
  app: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    background: '#fff'
  },
  
  // Header
  header: {
    background: 'linear-gradient(135deg, #1E3A5F 0%, #2C3E50 100%)',
    padding: '0 24px',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  headerContent: {
    maxWidth: 1400,
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 70
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    cursor: 'pointer'
  },
  logoIcon: {
    fontSize: '1.8rem'
  },
  logoText: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '1.5rem',
    fontWeight: 700,
    color: 'white'
  },
  nav: {
    display: 'flex',
    gap: 32
  },
  navLink: {
    color: 'rgba(255,255,255,0.85)',
    textDecoration: 'none',
    fontSize: '0.95rem',
    fontWeight: 500,
    transition: 'color 0.2s',
    ':hover': { color: 'white' }
  },
  headerActions: {
    display: 'flex',
    alignItems: 'center',
    gap: 16
  },
  langToggle: {
    display: 'flex',
    background: 'rgba(255,255,255,0.1)',
    borderRadius: 6,
    overflow: 'hidden'
  },
  langBtn: {
    padding: '6px 12px',
    border: 'none',
    background: 'transparent',
    color: 'rgba(255,255,255,0.7)',
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontWeight: 500
  },
  langBtnActive: {
    background: '#8E44AD',
    color: 'white'
  },
  demoButton: {
    padding: '10px 20px',
    background: 'linear-gradient(135deg, #8E44AD, #9B59B6)',
    border: 'none',
    borderRadius: 8,
    color: 'white',
    fontWeight: 600,
    cursor: 'pointer',
    fontSize: '0.9rem'
  },
  
  // Main
  main: {
    flex: 1
  },
  
  // Hero
  hero: {
    background: 'linear-gradient(135deg, #1E3A5F 0%, #8E44AD 100%)',
    padding: '80px 24px',
    color: 'white'
  },
  heroContent: {
    maxWidth: 1400,
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 60,
    alignItems: 'center'
  },
  heroText: {},
  heroTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '3.5rem',
    fontWeight: 700,
    marginBottom: 16
  },
  heroSubtitle: {
    fontSize: '1.4rem',
    opacity: 0.9,
    marginBottom: 24
  },
  heroDesc: {
    fontSize: '1.1rem',
    opacity: 0.8,
    lineHeight: 1.6,
    marginBottom: 32
  },
  ctaButton: {
    padding: '16px 32px',
    background: 'white',
    border: 'none',
    borderRadius: 10,
    color: '#1E3A5F',
    fontSize: '1.1rem',
    fontWeight: 600,
    cursor: 'pointer'
  },
  pillarsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 20
  },
  pillarCard: {
    background: 'rgba(255,255,255,0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: 12,
    padding: 24,
    display: 'flex',
    flexDirection: 'column',
    gap: 8
  },
  pillarIcon: {
    fontSize: '2rem'
  },
  pillarDesc: {
    opacity: 0.8,
    fontSize: '0.9rem'
  },
  
  // Sections
  section: {
    padding: '80px 24px'
  },
  sectionTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '2.5rem',
    color: '#1E3A5F',
    textAlign: 'center',
    marginBottom: 12
  },
  sectionSubtitle: {
    fontSize: '1.1rem',
    color: '#666',
    textAlign: 'center',
    marginBottom: 48
  },
  
  // Stats
  statsGrid: {
    maxWidth: 1200,
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 24
  },
  statCard: {
    background: 'white',
    borderRadius: 16,
    padding: 32,
    textAlign: 'center',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    border: '1px solid #eee'
  },
  statValue: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '2.8rem',
    fontWeight: 700,
    color: '#8E44AD',
    marginBottom: 8
  },
  statLabel: {
    fontSize: '1rem',
    fontWeight: 600,
    color: '#1E3A5F',
    marginBottom: 4
  },
  statDesc: {
    fontSize: '0.85rem',
    color: '#888'
  },
  
  // Personas
  personaGrid: {
    maxWidth: 1200,
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 24
  },
  personaCard: {
    background: 'white',
    borderRadius: 16,
    padding: 32,
    textAlign: 'center',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    border: '2px solid transparent',
    ':hover': { transform: 'translateY(-4px)', boxShadow: '0 8px 30px rgba(0,0,0,0.12)', borderColor: '#8E44AD' }
  },
  personaIcon: {
    fontSize: '3rem',
    display: 'block',
    marginBottom: 16
  },
  personaTitle: {
    fontSize: '1.2rem',
    color: '#1E3A5F',
    marginBottom: 8
  },
  personaDesc: {
    fontSize: '0.9rem',
    color: '#666',
    marginBottom: 12
  },
  personaFocus: {
    fontSize: '0.8rem',
    color: '#8E44AD',
    fontWeight: 500
  },
  
  // Modules
  modulesGrid: {
    maxWidth: 1200,
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 24
  },
  moduleCard: {
    background: 'white',
    borderRadius: 16,
    padding: 32,
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    cursor: 'pointer',
    transition: 'transform 0.2s',
    border: '1px solid #eee'
  },
  moduleIcon: {
    fontSize: '2.5rem',
    display: 'block',
    marginBottom: 16
  },
  moduleTitle: {
    fontSize: '1.2rem',
    color: '#1E3A5F',
    marginBottom: 8
  },
  moduleDesc: {
    fontSize: '0.9rem',
    color: '#666',
    marginBottom: 16
  },
  moduleFeatures: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  
  // ROI
  roiSection: {
    background: 'linear-gradient(135deg, #1E3A5F 0%, #2C3E50 100%)',
    padding: '80px 24px'
  },
  kpiGrid: {
    maxWidth: 1000,
    margin: '0 auto 48px',
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 24
  },
  kpiCard: {
    background: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 24,
    textAlign: 'center',
    color: 'white'
  },
  kpiValue: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '2.5rem',
    fontWeight: 700,
    color: '#E8DAEF'
  },
  kpiLabel: {
    fontSize: '1rem',
    fontWeight: 600,
    marginTop: 8
  },
  kpiDesc: {
    fontSize: '0.85rem',
    opacity: 0.7,
    marginTop: 4
  },
  calculatorBox: {
    maxWidth: 500,
    margin: '0 auto',
    background: 'white',
    borderRadius: 16,
    padding: 32
  },
  calcTitle: {
    fontSize: '1.2rem',
    color: '#1E3A5F',
    marginBottom: 24,
    textAlign: 'center'
  },
  calcInputs: {
    display: 'flex',
    gap: 16,
    marginBottom: 24
  },
  calcLabel: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    fontSize: '0.9rem',
    color: '#666'
  },
  calcInput: {
    padding: '12px 16px',
    border: '2px solid #eee',
    borderRadius: 8,
    fontSize: '1.1rem',
    fontWeight: 600
  },
  calcResult: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 20px',
    background: '#E8DAEF',
    borderRadius: 10,
    marginBottom: 12
  },
  calcAmount: {
    fontSize: '1.5rem',
    color: '#8E44AD'
  },
  calcDisclaimer: {
    fontSize: '0.8rem',
    color: '#888',
    textAlign: 'center'
  },
  
  // Sectors
  sectorGrid: {
    maxWidth: 1200,
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 24
  },
  sectorCard: {
    background: 'white',
    borderRadius: 16,
    padding: 28,
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    border: '1px solid #eee'
  },
  sectorIcon: {
    fontSize: '2rem',
    display: 'block',
    marginBottom: 12
  },
  sectorTitle: {
    fontSize: '1.1rem',
    color: '#1E3A5F',
    marginBottom: 8
  },
  sectorDesc: {
    fontSize: '0.85rem',
    color: '#666',
    lineHeight: 1.5
  },
  
  // Compliance
  complianceGrid: {
    maxWidth: 1000,
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 24
  },
  complianceBadge: {
    background: 'white',
    borderRadius: 12,
    padding: 24,
    textAlign: 'center',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8
  },
  complianceIcon: {
    fontSize: '2rem'
  },
  complianceDesc: {
    fontSize: '0.8rem',
    color: '#666'
  },
  
  // Workflow
  workflowSection: {
    maxWidth: 1000,
    margin: '0 auto',
    padding: '60px 24px'
  },
  backButton: {
    background: 'none',
    border: 'none',
    color: '#8E44AD',
    fontSize: '1rem',
    cursor: 'pointer',
    marginBottom: 32,
    fontWeight: 500
  },
  workflowTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '2rem',
    color: '#1E3A5F',
    textAlign: 'center',
    marginBottom: 8
  },
  workflowSubtitle: {
    color: '#666',
    textAlign: 'center',
    marginBottom: 48
  },
  progressContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 48,
    position: 'relative'
  },
  progressStep: {
    flex: 1,
    textAlign: 'center',
    cursor: 'pointer',
    opacity: 0.5,
    transition: 'opacity 0.2s'
  },
  progressStepActive: {
    opacity: 1
  },
  progressStepComplete: {
    opacity: 0.8
  },
  progressIcon: {
    width: 48,
    height: 48,
    borderRadius: '50%',
    background: '#f0f0f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 8px',
    fontSize: '1.2rem'
  },
  progressLabel: {
    fontSize: '0.75rem',
    color: '#666'
  },
  currentStep: {
    background: 'linear-gradient(135deg, #1E3A5F, #8E44AD)',
    borderRadius: 20,
    padding: 48,
    textAlign: 'center',
    color: 'white',
    marginBottom: 32
  },
  stepIcon: {
    fontSize: '3rem',
    marginBottom: 16
  },
  stepTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '2rem',
    marginBottom: 12
  },
  stepDesc: {
    fontSize: '1.1rem',
    opacity: 0.9,
    marginBottom: 32
  },
  tryModuleBtn: {
    padding: '14px 28px',
    background: 'white',
    border: 'none',
    borderRadius: 10,
    color: '#1E3A5F',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer'
  },
  workflowNav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  navButton: {
    padding: '12px 24px',
    background: '#f0f0f0',
    border: 'none',
    borderRadius: 8,
    color: '#1E3A5F',
    fontWeight: 600,
    cursor: 'pointer'
  },
  stepIndicator: {
    color: '#888',
    fontWeight: 500
  },
  
  // Chat
  chatContainer: {
    display: 'grid',
    gridTemplateColumns: '300px 1fr',
    height: 'calc(100vh - 70px)'
  },
  chatSidebar: {
    background: 'linear-gradient(180deg, #1E3A5F 0%, #2C3E50 100%)',
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    overflowY: 'auto'
  },
  backButtonSmall: {
    background: 'rgba(255,255,255,0.1)',
    border: 'none',
    borderRadius: 8,
    color: 'white',
    padding: '10px 16px',
    cursor: 'pointer',
    textAlign: 'left',
    fontSize: '0.9rem'
  },
  personaInfo: {
    background: 'rgba(255,255,255,0.05)',
    borderRadius: 10,
    padding: 12,
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    color: 'white'
  },
  personaAvatarSmall: {
    fontSize: '1.5rem'
  },
  personaNameSmall: {
    fontSize: '0.9rem',
    fontWeight: 600
  },
  personaRoleSmall: {
    fontSize: '0.75rem',
    opacity: 0.7
  },
  recordControls: {
    display: 'flex',
    gap: 8
  },
  recordBtnSmall: {
    flex: 1,
    padding: '10px',
    background: 'rgba(255,255,255,0.1)',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: 8,
    color: 'white',
    cursor: 'pointer',
    fontSize: '0.8rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6
  },
  recordBtnSmallActive: {
    background: '#E74C3C',
    borderColor: '#E74C3C'
  },
  exportBtnSmall: {
    width: '100%',
    padding: '10px',
    background: 'linear-gradient(135deg, #8E44AD, #9B59B6)',
    border: 'none',
    borderRadius: 8,
    color: 'white',
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontWeight: 500
  },
  sidebarModule: {
    background: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 16,
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    color: 'white'
  },
  sidebarIcon: {
    fontSize: '1.5rem'
  },
  sidebarName: {
    fontWeight: 600
  },
  sidebarSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8
  },
  sidebarLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: '0.8rem',
    textTransform: 'uppercase',
    letterSpacing: 1
  },
  exampleButton: {
    background: 'rgba(255,255,255,0.1)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 8,
    padding: '10px 12px',
    color: 'white',
    textAlign: 'left',
    cursor: 'pointer',
    fontSize: '0.85rem',
    transition: 'background 0.2s'
  },
  historyList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 6
  },
  historyTag: {
    background: 'rgba(142,68,173,0.4)',
    padding: '4px 10px',
    borderRadius: 20,
    fontSize: '0.75rem',
    color: 'white'
  },
  quickModules: {
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap'
  },
  quickModuleBtn: {
    width: 40,
    height: 40,
    borderRadius: 10,
    border: '1px solid rgba(255,255,255,0.2)',
    background: 'rgba(255,255,255,0.05)',
    fontSize: '1.2rem',
    cursor: 'pointer'
  },
  quickModuleBtnActive: {
    background: '#8E44AD',
    borderColor: '#8E44AD'
  },
  chatMain: {
    display: 'flex',
    flexDirection: 'column',
    background: '#f8f9fa'
  },
  chatMessages: {
    flex: 1,
    overflowY: 'auto',
    padding: 24
  },
  message: {
    display: 'flex',
    gap: 12,
    marginBottom: 16
  },
  messageUser: {
    flexDirection: 'row-reverse'
  },
  messageAI: {},
  messageAvatar: {
    width: 40,
    height: 40,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',
    flexShrink: 0
  },
  avatarUser: {
    background: 'linear-gradient(135deg, #8E44AD, #9B59B6)'
  },
  avatarAI: {
    background: '#e0e0e0'
  },
  messageBubble: {
    maxWidth: '70%',
    padding: 16,
    borderRadius: 16,
    lineHeight: 1.6,
    fontSize: '0.95rem'
  },
  bubbleUser: {
    background: 'linear-gradient(135deg, #8E44AD, #9B59B6)',
    color: 'white',
    borderBottomRightRadius: 4
  },
  bubbleAI: {
    background: 'white',
    color: '#333',
    borderBottomLeftRadius: 4,
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
  },
  typingIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: 10
  },
  dots: {
    display: 'flex',
    gap: 4
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: '50%',
    background: '#8E44AD',
    animation: 'bounce 1.4s infinite'
  },
  chatInput: {
    display: 'flex',
    gap: 12,
    padding: 20,
    background: 'white',
    borderTop: '1px solid #eee'
  },
  micButton: {
    width: 48,
    height: 48,
    borderRadius: '50%',
    border: 'none',
    background: 'linear-gradient(135deg, #1E3A5F, #8E44AD)',
    color: 'white',
    fontSize: '1.2rem',
    cursor: 'pointer'
  },
  micButtonActive: {
    background: '#E74C3C',
    animation: 'pulse 1s infinite'
  },
  textInput: {
    flex: 1,
    padding: '14px 20px',
    border: '2px solid #eee',
    borderRadius: 12,
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.2s'
  },
  textInputListening: {
    borderColor: '#E74C3C',
    background: '#fff5f5'
  },
  sendButton: {
    padding: '14px 28px',
    background: 'linear-gradient(135deg, #1E3A5F, #8E44AD)',
    border: 'none',
    borderRadius: 12,
    color: 'white',
    fontWeight: 600,
    cursor: 'pointer'
  },
  
  // Footer
  footer: {
    background: '#f8f9fa',
    borderTop: '1px solid #eee',
    padding: '24px'
  },
  footerContent: {
    maxWidth: 1400,
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  footerLogo: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4
  },
  footerLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    color: '#888',
    fontSize: '0.85rem'
  },
  footerBadge: {
    background: '#E8DAEF',
    color: '#8E44AD',
    padding: '4px 12px',
    borderRadius: 20,
    fontSize: '0.8rem',
    fontWeight: 500
  },
  
  // Persona Login
  loginContainer: {
    minHeight: 'calc(100vh - 150px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #1E3A5F 0%, #8E44AD 100%)',
    padding: 24
  },
  loginCard: {
    background: 'white',
    borderRadius: 24,
    padding: 48,
    textAlign: 'center',
    maxWidth: 420,
    width: '100%',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
  },
  loginAvatar: {
    fontSize: '4rem',
    marginBottom: 16
  },
  loginName: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '1.8rem',
    color: '#1E3A5F',
    marginBottom: 8
  },
  loginRole: {
    fontSize: '1.1rem',
    color: '#8E44AD',
    fontWeight: 500,
    marginBottom: 4
  },
  loginCompany: {
    fontSize: '0.95rem',
    color: '#888'
  },
  loginDivider: {
    height: 1,
    background: '#eee',
    margin: '24px 0'
  },
  loginGreeting: {
    fontSize: '1rem',
    color: '#555',
    lineHeight: 1.6,
    marginBottom: 32
  },
  loginButton: {
    width: '100%',
    padding: '16px 32px',
    background: 'linear-gradient(135deg, #8E44AD, #9B59B6)',
    border: 'none',
    borderRadius: 12,
    color: 'white',
    fontSize: '1.1rem',
    fontWeight: 600,
    cursor: 'pointer',
    marginBottom: 16
  },
  loginBackButton: {
    background: 'none',
    border: 'none',
    color: '#888',
    fontSize: '0.9rem',
    cursor: 'pointer'
  },
  
  // Persona Dashboard
  dashboardContainer: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '32px 24px'
  },
  dashboardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
    padding: 24,
    background: 'linear-gradient(135deg, #1E3A5F, #2C3E50)',
    borderRadius: 16,
    color: 'white'
  },
  dashboardUser: {
    display: 'flex',
    alignItems: 'center',
    gap: 16
  },
  dashboardAvatar: {
    fontSize: '2.5rem'
  },
  dashboardName: {
    display: 'block',
    fontSize: '1.2rem'
  },
  dashboardRole: {
    fontSize: '0.9rem',
    opacity: 0.8
  },
  dashboardActions: {
    display: 'flex',
    gap: 12
  },
  recordButton: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '10px 20px',
    background: 'rgba(255,255,255,0.1)',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: 10,
    color: 'white',
    cursor: 'pointer',
    fontSize: '0.9rem'
  },
  recordButtonActive: {
    background: '#E74C3C',
    borderColor: '#E74C3C',
    animation: 'pulse 1s infinite'
  },
  logoutButton: {
    padding: '10px 20px',
    background: 'rgba(255,255,255,0.1)',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: 10,
    color: 'white',
    cursor: 'pointer',
    fontSize: '0.9rem'
  },
  dashboardStats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 20,
    marginBottom: 32
  },
  dashStatCard: {
    background: 'white',
    borderRadius: 16,
    padding: 24,
    textAlign: 'center',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    border: '1px solid #eee'
  },
  dashStatValue: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '2rem',
    fontWeight: 700,
    color: '#8E44AD'
  },
  dashStatLabel: {
    fontSize: '0.85rem',
    color: '#666',
    marginTop: 8
  },
  dashboardSection: {
    marginBottom: 32
  },
  dashSectionTitle: {
    fontSize: '1.1rem',
    color: '#1E3A5F',
    marginBottom: 16
  },
  quickActionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 12
  },
  quickActionBtn: {
    padding: '16px 20px',
    background: 'linear-gradient(135deg, #8E44AD, #9B59B6)',
    border: 'none',
    borderRadius: 12,
    color: 'white',
    fontSize: '0.95rem',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'transform 0.2s'
  },
  recommendedModules: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 16
  },
  recommendedCard: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    padding: 24,
    background: 'white',
    borderRadius: 16,
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    cursor: 'pointer',
    border: '2px solid #E8DAEF',
    transition: 'border-color 0.2s'
  },
  recModIcon: {
    fontSize: '2.5rem'
  },
  recModDesc: {
    fontSize: '0.85rem',
    color: '#666',
    marginTop: 4
  },
  allModulesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    gap: 12
  },
  moduleBtn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
    padding: 16,
    background: '#f8f9fa',
    border: '1px solid #eee',
    borderRadius: 12,
    cursor: 'pointer',
    fontSize: '0.85rem',
    color: '#333'
  },
  moduleBtnPrimary: {
    background: '#E8DAEF',
    borderColor: '#8E44AD'
  },
  workflowPreviewBtn: {
    width: '100%',
    padding: '16px 24px',
    background: '#f8f9fa',
    border: '2px dashed #ddd',
    borderRadius: 12,
    fontSize: '1rem',
    color: '#666',
    cursor: 'pointer',
    textAlign: 'center'
  },
  sessionInfo: {
    background: '#f8f9fa',
    borderRadius: 12,
    padding: 20
  },
  recordingsList: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
    flexWrap: 'wrap'
  },
  downloadRecBtn: {
    padding: '8px 16px',
    background: 'white',
    border: '1px solid #ddd',
    borderRadius: 8,
    cursor: 'pointer',
    fontSize: '0.85rem'
  },
  exportSessionBtn: {
    padding: '12px 24px',
    background: 'linear-gradient(135deg, #1E3A5F, #8E44AD)',
    border: 'none',
    borderRadius: 10,
    color: 'white',
    fontSize: '0.95rem',
    fontWeight: 500,
    cursor: 'pointer'
  }
};

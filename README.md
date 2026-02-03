# AI Talent HR - Intelligent Recruitment & HR Platform

![Version](https://img.shields.io/badge/version-2.0.0-purple)
![Status](https://img.shields.io/badge/status-Demo-blue)
![License](https://img.shields.io/badge/license-Proprietary-red)

## 🎯 Overzicht

AI Talent HR is een interactief prototype van een intelligent recruitment- en HR-platform. Het platform demonstreert hoe kunstmatige intelligentie het volledige wervingsproces kan versnellen: van vacaturecreatie tot onboarding, met meetbare besparingen op tijd, kosten en administratieve lasten.

**Demo URL:** https://ai-talent-hr.netlify.app/

## ✨ Nieuwe Features (v2.0)

### Landingspagina
- **Hero Sectie** met 4 waardepijlers (Sneller Werven, Lagere Kosten, Betere Matches, 24/7 Ondersteuning)
- **Marktcijfers** met actuele Nederlandse arbeidsmarktdata
- **ROI Calculator** voor business case berekeningen
- **Sectoroverzicht** met 6 specifieke branche-toepassingen
- **Compliance Badges** (AVG, EU AI Act, Bias Monitoring, Human-in-the-Loop)

### Persona's & Workflows
- **4 Persona's**: Recruiter, HR Manager, Hiring Manager, HR Administratie
- **8-stappen Recruitment Workflow** met navigatie
- **Per persona** aangepaste module-aanbevelingen

### Chat & Spraak
- **🎤 Spraakherkenning** - Spreek vragen in het Nederlands of Engels
- **💬 AI Chat Interface** - Interactieve gesprekken per module
- **📝 Voorbeeldvragen** - Direct klikbare suggesties
- **📊 Geschiedenis** - Recente queries bewaren

### 6 AI Modules
1. **Vacature Creatie** - SEO-geoptimaliseerde vacatureteksten
2. **CV Screening** - Automatische analyse en ranking (blind recruitment)
3. **Communicatie** - 24/7 kandidaat berichten
4. **Interview Support** - STAR-vragen en scorecards
5. **Onboarding** - 30-60-90 dagen plannen
6. **Analytics** - Real-time dashboards en KPI's

## 🚀 Snel Starten

### Vereisten
- Node.js 16+ 
- npm of yarn

### Installatie
```bash
# Clone of download het project
cd ai-talent-hr

# Installeer dependencies
npm install

# Start development server
npm start
```

De applicatie opent op `http://localhost:3000`

### Productie Build
```bash
npm run build
```

### Deployment (Netlify)
1. Push naar GitHub repository
2. Verbind met Netlify
3. Automatische deployment bij elke push

Of handmatig:
```bash
npm run build
# Upload de /build folder naar Netlify
```

## 📁 Project Structuur

```
ai-talent-hr/
├── public/
│   └── index.html          # HTML template met fonts
├── src/
│   ├── index.js            # React entry point
│   └── App.js              # Hoofdcomponent (alles-in-één)
├── netlify.toml            # Netlify configuratie
├── package.json            # Dependencies en scripts
└── README.md               # Deze documentatie
```

## 🎨 Design Systeem

### Kleuren
| Element | Kleur | Hex |
|---------|-------|-----|
| Navy (Primary) | Donkerblauw | `#1E3A5F` |
| Amethyst (Accent) | Paars | `#8E44AD` |
| Lavender | Lichtpaars | `#E8DAEF` |
| Navy Dark | Secundair | `#2C3E50` |

### Typografie
- **Headings:** Playfair Display (serif)
- **Body:** Outfit (sans-serif)

## 🎤 Spraakherkenning

De app gebruikt de Web Speech API:
- Klik de microfoon-knop om te spreken
- Ondersteunt Nederlands (nl-NL) en Engels (en-US)
- Automatische transcriptie naar tekst

**Browser Support:**
- ✅ Chrome (aanbevolen)
- ✅ Edge
- ⚠️ Firefox (beperkt)
- ⚠️ Safari (beperkt)

## 🌍 Tweetalig

Volledige ondersteuning voor:
- 🇳🇱 Nederlands (NL)
- 🇬🇧 Engels (EN)

Wissel via de NL/EN toggle rechtsboven.

## 📊 ROI Metrics

| KPI | Waarde | Toelichting |
|-----|--------|-------------|
| Time to Hire | -50% | Halvering doorlooptijd |
| Cost per Hire | -30% | Lagere wervingskosten |
| Admin Taken | -70% | Automatisering routinewerk |
| Beschikbaarheid | 24/7 | Altijd bereikbaar |

## 🔒 Compliance

- **AVG/GDPR** - Volledig privacy-compliant
- **EU AI Act** - Hoog-risico AI conform (Bijlage III, cat. 4)
- **Bias Monitoring** - Actieve discriminatiepreventie
- **Human-in-the-Loop** - Mens beslist altijd

## 🏢 Doelgroepen

### Per Sector
- Corporate HR
- Recruitment Bureaus
- Industrie & Techniek
- Zorg
- Onderwijs
- Retail & Hospitality

### Per Rol
- HR Directeuren
- Recruitment Managers
- Hiring Managers
- HR Administratie
- IT/Innovatie Directeuren

## 📞 Contact

**Nxt Era Solutions**
- Website: www.nxterasolutions.eu
- Email: mbhes@nxterasolutions.eu

**HES Consultancy International**
- Website: www.hes-consultancy-international.com

## 📄 Licentie

Proprietary - Nxt Era Solutions / HES Consultancy International © 2025

---

**Versie:** 2.0.0  
**Laatste update:** Februari 2026

export type Language = "en" | "ar";

export type TranslationKey = keyof typeof translations.en;

export const translations = {
  en: {
    // Navigation
    nav_about: "About Us",
    nav_services: "Services",
    nav_team: "Team",
    nav_insights: "Insights",
    nav_careers: "Careers",
    nav_contact: "Contact Us",
    select_language: "Language",
    theme_selector: "Appearance",

    // Hero Section
    hero_badge: "Egypt's Elite Legal Counsel",
    hero_heading: "Legal Excellence, Tailored Solutions.",
    hero_subtext: "Over 28 Years of Expertise in Litigation, Corporate Law, and International Arbitration.",
    hero_cta_primary: "Start your consultation",
    hero_cta_secondary: "Explore services",
    hero_trusted_by: "Trusted by Egypt's institutional leaders.",
    hero_acquire_rep: "Acquire quality legal representation.",

    // Lead Form
    lead_title: "Client Intake & Consultation",
    lead_subtitle: "Query our partners directly for high-stakes dispute or corporate advisory.",
    lead_name: "Full Name",
    lead_name_placeholder: "e.g. Dr. Sherif Aly",
    lead_email: "Email Address",
    lead_email_placeholder: "corporate@client.com",
    lead_phone: "Phone Number",
    lead_phone_placeholder: "e.g. +20 100 000 0000",
    lead_practice_area: "Practice Area",
    lead_litigation: "Dispute & Litigation",
    lead_corporate: "Corporate M&A",
    lead_capital: "Capital Markets",
    lead_inquiry: "General Counsel",
    lead_message: "Case Brief / Particulars",
    lead_message_placeholder: "Summarize your case details, jurisdiction, or advisory needs...",
    lead_submit: "Submit Case Brief",
    lead_submitting: "Dispatching Brief...",
    lead_success_title: "Transmission Established",
    lead_success_desc: "Your confidential brief has been sent to our partners. We will respond within 24 hours.",
    lead_submit_another: "File Another Request",

    // Clients Section
    clients_badge: "Institutional Trust",
    clients_title: "Trusted Counsel to Market Leaders",
    clients_subtitle: "Advising premier banking institutions, energy conglomerates, and multinational enterprises across the MENA region.",
    clients_stat_clients: "Corporate Clients",
    clients_stat_volume: "Transaction Counsel",
    clients_stat_rate: "Case Success Rate",
    clients_stat_experience: "Years of Practice",
    clients_cat_all: "All Sectors",
    clients_cat_finance: "Banking & Finance",
    clients_cat_energy: "Energy & Infrastructure",
    clients_cat_realestate: "Real Estate & Dev",
    clients_cat_tech: "Tech & Corporate",

    // About Bento Section
    about_badge: "Our Identity",
    about_title: "A Tradition of Rigorous Legal Defense",
    about_subtitle: "Founded by senior legal advocates, A&A Legal Advisors combines deep statutory mastery with modern corporate legal strategy.",
    about_card1_title: "Strategic Litigation",
    about_card1_desc: "Defending corporate and high-profile clients in complex commercial court proceedings.",
    about_card2_title: "Corporate Governance & M&A",
    about_card2_desc: "Structuring cross-border joint ventures, statutory compliance, and corporate restructures.",
    about_card3_title: "Arbitration & Dispute Resolution",
    about_card3_desc: "International arbitral representation under CRCICA, ICC, and UNCITRAL rules.",

    // Trust & Credibility
    trust_badge: "Prestige & Recognition",
    trust_title: "An Uncompromising Benchmark of Credibility & Authority",
    trust_subtitle: "Our boutique firm is built on a lineage of trust, actively shaping legislation and securing precedents in major commercial tribunals across Egypt and the Middle East.",

    // Case Studies & Outcomes
    case_studies_badge: "Proven Outcomes",
    case_studies_title: "Precedent-Setting Case Results",
    case_studies_subtitle: "Selected portfolio of high-stakes disputes, corporate negotiations, and legislative interventions.",

    // Services Section
    services_badge: "Core Specializations",
    services_title: "Comprehensive Legal Practice Areas",
    services_subtitle: "Tailored legal advice engineered to protect institutional assets, mitigate legal exposure, and navigate regulatory complexity.",
    services_read_more: "Read Practice Details",
    services_view_all: "View All Practice Areas",

    // Case Process & Timeline
    process_badge: "Methodology",
    process_title: "Our Disciplined Case Execution Process",
    process_step1_title: "1. Intake & Risk Assessment",
    process_step1_desc: "In-depth review of contractual documents, statutory risks, and jurisdictional scope.",
    process_step2_title: "2. Strategic Preparation",
    process_step2_desc: "Formulating legal arguments, expert witness testimonies, and precedent analysis.",
    process_step3_title: "3. Court & Tribunal Defense",
    process_step3_desc: "Aggressive oral pleading, brief submissions, and trial advocacy.",
    process_step4_title: "4. Enforcement & Compliance",
    process_step4_desc: "Executing judgments, arbitral awards, and post-litigation corporate compliance.",

    // Leadership Section
    leadership_badge: "Founding Leadership",
    leadership_title: "Advocates of Distinction & Legislative Authority",
    leadership_subtitle: "Our founding partners bring decades of courtroom victory and legislative advisory experience.",
    leadership_view_profile: "View Full Profile",
    leadership_view_all: "View All Team Members",

    // Testimonials & Recognition
    testimonials_badge: "Client Testimonials",
    testimonials_title: "An Uncompromised Legacy of Client Trust",

    // Articles & Newsletter Section
    newsletter_badge: "Legal Insights",
    newsletter_title: "Stay Ahead with Legal & Regulatory Insights",
    newsletter_subtitle: "Quarterly briefs on Egyptian court precedents, M&A legislation, and arbitration developments.",
    newsletter_placeholder: "Enter your executive email...",
    newsletter_button: "Subscribe to Briefs",

    // Team Section
    team_badge: "Leadership & Partners",
    team_title: "Meet Our Founding Partners",
    team_subtitle: "Decades of trial experience from Egypt's top courts and international arbitral forums.",
    team_roster_title: "Legal Team & Associates",
    team_work_with_us: "Work With Us",
    team_join_text: "Join a team built on integrity, deep local law mastery, and client dedication.",

    // Page Specific Headers (About, Services, Team, Insights, Careers, Contact)
    page_about_hero_title: "Architects of High-Stakes Legal Strategy",
    page_about_hero_sub: "Bridging traditional trial mastery with modern commercial intelligence in Cairo.",
    
    page_services_hero_title: "Practice Areas & Legal Solutions",
    page_services_hero_sub: "Specialized legal representation tailored for corporate entities, financial institutions, and investors.",
    
    page_team_hero_title: "Meet Our Senior Advocates & Partners",
    page_team_hero_sub: "A formidable team of litigators, corporate advisors, and arbitration specialists.",
    
    page_insights_hero_title: "Legal Insights & Judicial Precedents",
    page_insights_hero_sub: "Analysis and legislative briefings authored by our senior advocates.",
    
    page_careers_hero_title: "Join Egypt's Premier Legal Firm",
    page_careers_hero_sub: "Build your legal legacy alongside recognized masters of litigation and corporate law.",
    page_careers_apply_now: "Submit Application",
    
    page_contact_hero_title: "Initiate Legal Consultation",
    page_contact_hero_sub: "Connect directly with our partners to discuss your dispute, advisory, or transaction.",

    // Footer
    footer_tagline: "First-class, creative, and business-aware legal representation in Cairo.",
    footer_rights: "All Rights Reserved. A&A Legal Advisors.",
    footer_address: "20, Kawthar St, Al Dokki, Giza — 5th Floor",
    footer_phone: "+20 2 334 565 42",
    footer_email: "info@asalegaladvisors.com",
    footer_quick_links: "Quick Navigation",
    footer_practice_areas: "Practice Specialties",
  },
  ar: {
    // Navigation
    nav_about: "من نحن",
    nav_services: "الخدمات",
    nav_team: "فريق العمل",
    nav_insights: "الرؤى والأبحاث",
    nav_careers: "الوظائف",
    nav_contact: "تواصل معنا",
    select_language: "اللغة",
    theme_selector: "المظهر",

    // Hero Section
    hero_badge: "المستشارون القانونيون الأبرز في مصر",
    hero_heading: "التميز القانوني، حلول مخصصة لمؤسستك.",
    hero_subtext: "أكثر من 28 عاماً من الخبرة الراسخة في التقاضي، قضايا الشركات، والتحكيم الدولي.",
    hero_cta_primary: "ابدأ استشارتك الآن",
    hero_cta_secondary: "استكشف خدماتنا",
    hero_trusted_by: "محل ثقة كبرى الهيئات والمؤسسات الاقتصادية.",
    hero_acquire_rep: "احصل على تمثيل قانوني رفيع المستوى.",

    // Lead Form
    lead_title: "طلب استشارة وحجز قضية",
    lead_subtitle: "تواصل مباشرة مع الشركاء لتقييم قضاياك واستشاراتك التجارية.",
    lead_name: "الاسم بالكامل",
    lead_name_placeholder: "مثال: د. شريف علي",
    lead_email: "البريد الإلكتروني",
    lead_email_placeholder: "corporate@client.com",
    lead_phone: "رقم الهاتف",
    lead_phone_placeholder: "مثال: 01000000000 20+",
    lead_practice_area: "مجال الاستشارة",
    lead_litigation: "التقاضي والنزاعات",
    lead_corporate: "اندماج واستحواذ الشركات",
    lead_capital: "أسواق المال والتمويل",
    lead_inquiry: "استشارات عامة",
    lead_message: "ملخص القضية / تفاصيل الاستشارة",
    lead_message_placeholder: "اكتب موجزاً عن تفاصيل النزاع، الأطراف، أو الاستشارة المطلوبة...",
    lead_submit: "إرسال ملخص الاستشارة",
    lead_submitting: "جاري الإرسال...",
    lead_success_title: "تم إرسال الطلب بنجاح",
    lead_success_desc: "تم استلام طلبك وبيناتك بسريّة تامة. سيقوم أحد الشركاء بالتواصل معك خلال 24 ساعة.",
    lead_submit_another: "تقديم طلب آخر",

    // Clients Section
    clients_badge: "ثقة كبرى المؤسسات",
    clients_title: "الشريك القانوني المفضل لكبرى الشركات",
    clients_subtitle: "نقدم الاستشارات القانونية والتمثيل القضائي لكبرى البنوك، شركات الطاقة، والمجموعات الاستثمارية في منطقة الشرق الأوسط.",
    clients_stat_clients: "شركة ومؤسسة",
    clients_stat_volume: "حجم الصفقات والاستشارات",
    clients_stat_rate: "نسبة نجاح القضايا",
    clients_stat_experience: "عاماً من الخبرة",
    clients_cat_all: "جميع القطاعات",
    clients_cat_finance: "البنوك والخدمات المالية",
    clients_cat_energy: "الطاقة والبنية التحتية",
    clients_cat_realestate: "التطوير العقاري",
    clients_cat_tech: "التكنولوجيا والشركات",

    // About Bento Section
    about_badge: "هويتنا ورسالتنا",
    about_title: "تاريخ عريق من الدفاع القانوني المحكم",
    about_subtitle: "تأسس مكتب عبد الله وأبو النجا على يد كبار المستشارين، ليمزج بين العمق التشريعي والاستراتيجيات القانونية الحديثة للشركات.",
    about_card1_title: "التقاضي والنزاعات الاستراتيجية",
    about_card1_desc: "التمثيل القضائي للشركات والشخصيات المرموقة أمام المحاكم التجارية الاقتصادية.",
    about_card2_title: "حكومة الشركات والاندماج",
    about_card2_desc: "صياغة المشروعات المشتركة، الامتثال التشريعي، وإعادة هيكلة الشركات العابرة للحدود.",
    about_card3_title: "التحكيم وفض النزاعات",
    about_card3_desc: "تمثيل دولي حاسم في منازعات التحكيم وفقاً لقواعد CRCICA و ICC و UNCITRAL.",

    // Trust & Credibility
    trust_badge: "المكانة والاعتماد الدولي",
    trust_title: "معيار لا يضاهى من المصداقية والخبرة القضائية",
    trust_subtitle: "نسهم بفاعلية في صياغة السوابق القضائية أمام كبرى المحاكم وهيئات التحكيم في مصر والمنطقة.",

    // Case Studies & Outcomes
    case_studies_badge: "نتائج مثبتة وسوابق قضائية",
    case_studies_title: "حلول قانونية صانعة للسوابق القضائية",
    case_studies_subtitle: "محفظة مختارة من القضايا الكبرى والمنازعات المعقدة التي حققنا فيها انتصارات استراتيجية حاسمة.",

    // Services Section
    services_badge: "التخصصات الرئيسية",
    services_title: "مجالات الممارسة القانونية الشاملة",
    services_subtitle: "استشارات قانونية دقيقة مخصصة لحماية أصول المؤسسات، تقليل المخاطر التشغيلية، والتعامل مع التعقيدات التنظيمية.",
    services_read_more: "قراءة التفاصيل",
    services_view_all: "عرض جميع تخصصات الممارسة",

    // Case Process & Timeline
    process_badge: "منهجية العمل",
    process_title: "منهجيتنا الدقيقة في إدارة القضايا والنزاعات",
    process_step1_title: "١. تقييم المخاطر والدراسة الأولية",
    process_step1_desc: "فحص شامل للعقود، المخاطر التشريعية، والنطاق القضائي للنزاع.",
    process_step2_title: "٢. الإعداد الاستراتيجي والدفوع",
    process_step2_desc: "صياغة الأسانيد القانونية، تقارير الخبراء، ودراسة السوابق القضائية ذات الصلة.",
    process_step3_title: "٣. الترافع أمام المحاكم وهيئات التحكيم",
    process_step3_desc: "ترافع مذكرات وشفهي حاسم أمام دوائر المحاكم ولجان التحكيم.",
    process_step4_title: "٤. التنفيذ والامتثال",
    process_step4_desc: "تنفيذ الأحكام القضائية وصيغ التحكيم وضمان الامتثال القانوني الكامل.",

    // Leadership Section
    leadership_badge: "القيادة والشركاء",
    leadership_title: "بقيادة كبار المستشارين والشركاء",
    leadership_subtitle: "يمتلك شركاؤنا عقوداً من الانتصارات القضائية والخبرة التشريعية المرموقة.",
    leadership_view_profile: "عرض الملف الشخصي الكامل",
    leadership_view_all: "عرض جميع أعضاء الفريق",

    // Testimonials & Recognition
    testimonials_badge: "آراء وشهادات العملاء",
    testimonials_title: "إرث راسخ من ثقة كبرى المؤسسات والشركات",

    // Articles & Newsletter Section
    newsletter_badge: "الرؤى والتحليلات القانونية",
    newsletter_title: "اشترك في النشرة القانونية والتنظيمية",
    newsletter_subtitle: "تحليلات دورية للسوابق القضائية المصرية، تشريعات الاستثمار، والمستجدات التحكيمية.",
    newsletter_placeholder: "أدخل بريدك الإلكتروني...",
    newsletter_button: "اشتراك في النشرة",

    // Team Section
    team_badge: "القيادة والشركاء",
    team_title: "الشركاء المؤسسون",
    team_subtitle: "خبرات تمتد لعقود أمام المحاكم المصرية وهيئات التحكيم الدولية.",
    team_roster_title: "الفريق القانوني والمستشارون",
    team_work_with_us: "انضم إلى فريقنا",
    team_join_text: "انضم إلى فريق يرتكز على النزاهة، التعمق في القانون المحلي، والالتزام المطلق بالتميز.",

    // Page Specific Headers (About, Services, Team, Insights, Careers, Contact)
    page_about_hero_title: "صنّاع الاستراتيجيات القانونية الحاسمة",
    page_about_hero_sub: "نجمع بين الترافع القضائي الرصين والذكاء التجاري المعاصر في القاهرة.",
    
    page_services_hero_title: "مجالات الممارسة والحلول القانونية",
    page_services_hero_sub: "تمثيل قانوني متخصص مصمم للمؤسسات والشركات والبنوك والمستثمرين.",
    
    page_team_hero_title: "الشركاء وكبار المستشارين",
    page_team_hero_sub: "فريق قانوني متميز من رجال القانون المتخصصين في التقاضي والاستشارات والتحكيم.",
    
    page_insights_hero_title: "الرؤى القانونية والدراسات القضائية",
    page_insights_hero_sub: "تحليلات وموجزات تشريعية من إعداد مستشارينا وشركائنا.",
    
    page_careers_hero_title: "انضم لأحد أبرز مكاتب المحاماة في مصر",
    page_careers_hero_sub: "ابنِ مسيرتك القانونية إلى جانب كبار الأساتذة في مجالات التقاضي والشركات.",
    page_careers_apply_now: "تقديم طلب انضمام",
    
    page_contact_hero_title: "حجز استشارة قانونية",
    page_contact_hero_sub: "تواصل مباشرة مع الشركاء لمناقشة قضاياك أو استشاراتك التجارية.",

    // Footer
    footer_tagline: "مكتب استشارات قانونية رفيع المستوى يقدم حلولاً مبتكرة وحاسمة في القاهرة.",
    footer_rights: "جميع الحقوق محفوظة. عبد الله وأبو النجا للمحاماة والاستشارات القانونية.",
    footer_address: "٢٠ شارع الكوثر، الدقي، الجيزة — الدور الخامس",
    footer_phone: "٠٢ ٣٣٤ ٥٦٥ ٤٢",
    footer_email: "info@asalegaladvisors.com",
    footer_quick_links: "روابط سريعة",
    footer_practice_areas: "التخصصات الرئيسية",
  },
};

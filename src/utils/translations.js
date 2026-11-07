// Centralized translations for English and Albanian
export const translations = {
  en: {
    // Navigation
    nav: {
      home: 'Home',
      projects: 'Projects',
      about: 'About',
      contact: 'Contact',
      services: 'Services',
      switchLanguage: 'Switch Language',
      menu: 'Menu',
      close: 'Close',
      toggleTheme: 'Toggle light and dark mode',
      skipToContent: 'Skip to content',
      mainNavigation: 'Main navigation',
    },
    
    // Home Page
    home: {
      hero: {
        previous: 'Previous project',
        next: 'Next project',
        showProject: 'Show project {n}: {name}',
      },
      statement: {
        label: 'Studio',
        text: 'Arch Studio designs, engineers and oversees buildings from the first sketch to the day you move in. One team for architecture, structure and site monitoring, so nothing gets lost between the drawing and the concrete.',
        cta: 'About us',
      },
      featured: {
        label: 'Featured',
        title: 'Selected work',
        viewAll: 'All projects',
      },
      process: {
        label: 'How we work',
        cta: 'Our services',
        steps: [
          {
            key: 'design',
            title: 'Design',
            text: 'Concept, plans and interiors. We listen first, then sketch, model and refine until the building fits its site, its budget and the people who will live in it.',
          },
          {
            key: 'structure',
            title: 'Structure',
            text: 'Our engineers carry the design into a structure that stands: load calculations, foundations and frame, coordinated with the architecture from day one.',
          },
          {
            key: 'monitor',
            title: 'Monitor',
            text: 'On site until handover. We track progress, quality and budget, and report to you at every milestone, so what gets built is what was designed.',
          },
        ],
      },
      categories: {
        label: 'Browse by type',
        all: 'All projects',
      },
      gallery: {
        label: 'Archive',
        title: 'All projects',
      },
    },

    // Contact call to action (shared by several pages)
    cta: {
      label: 'Start a project',
      title: "Let's build something together",
      text: 'Tell us about your site, your plans and your timeline. We reply within two working days.',
      button: 'Get in touch',
      email: 'info@archstudio.com',
    },
    
    // About Page
    about: {
      title: 'About Arch Studio',
      tagline: 'Crafting spaces that inspire, function beautifully, and stand the test of time.',
      ourStory: {
        title: 'Our Story',
        paragraph1: 'Arch Studio is a forward-thinking architectural practice dedicated to creating exceptional spaces that blend innovative design with functional excellence. Founded on the principle that architecture should enhance human experience, we approach each project with fresh perspective and deep respect for the built environment.',
        paragraph2: 'Our work spans residential, commercial, and interior design, always with a focus on sustainability, craftsmanship, and the unique needs of our clients. We believe that great architecture emerges from the thoughtful integration of form, function, and feeling.',
      },
      ourApproach: {
        title: 'Our Approach',
        designPhilosophy: {
          title: 'Design Philosophy',
          text: 'We create spaces that are not just beautiful, but meaningful. Every design decision is intentional, serving both aesthetic and practical purposes while respecting the environment and context.',
        },
        collaborativeProcess: {
          title: 'Collaborative Process',
          text: 'Architecture is a dialogue. We work closely with clients, consultants, and craftspeople throughout the design and construction process, ensuring that every voice is heard and every detail is considered.',
        },
        sustainableDesign: {
          title: 'Sustainable Design',
          text: 'Environmental responsibility is integral to our practice. We prioritize sustainable materials, energy efficiency, and designs that minimize environmental impact while maximizing long-term value.',
        },
        attentionToDetail: {
          title: 'Attention to Detail',
          text: 'Excellence lies in the details. From initial concept to final construction, we maintain meticulous attention to every aspect of the project, ensuring quality and coherence throughout.',
        },
      },
      whatWeDo: {
        title: 'What We Do',
        residentialArchitecture: {
          title: 'Residential Architecture',
          text: 'Custom homes, renovations, and residential developments that reflect the unique lifestyle and aspirations of our clients.',
        },
        commercialDesign: {
          title: 'Commercial Design',
          text: 'Workspaces, retail environments, and commercial buildings designed to support business goals and enhance user experience.',
        },
        interiorDesign: {
          title: 'Interior Design',
          text: 'Complete interior design services, from space planning to material selection, creating cohesive and inspiring environments.',
        },
        consultation: {
          title: 'Consultation',
          text: 'Design consultation, feasibility studies, and project management services to guide clients through every stage of their project.',
        },
      },
      ourValues: {
        title: 'Our Values',
        innovation: {
          label: 'Innovation:',
          text: 'We embrace new ideas, technologies, and methodologies while respecting timeless design principles.',
        },
        integrity: {
          label: 'Integrity:',
          text: 'Honest communication, ethical practice, and commitment to delivering on our promises.',
        },
        excellence: {
          label: 'Excellence:',
          text: 'We strive for the highest standards in design, documentation, and project execution.',
        },
        clientFocus: {
          label: 'Client Focus:',
          text: 'Every project is unique, and we tailor our approach to meet the specific needs and vision of each client.',
        },
        community: {
          label: 'Community:',
          text: 'We believe architecture has the power to strengthen communities and improve quality of life.',
        },
      },
      stats: {
        label: 'In numbers',
        projects: 'Projects',
        years: 'Years of practice',
        disciplines: 'Disciplines, one team',
      },
    },
    
    // Contact Page
    contact: {
      title: 'Contact Us',
      subtitle: "Have a project in mind? We'd love to hear from you. Get in touch and let's create something amazing together.",
      writeToUs: 'Write to Us',
      email: 'Email',
      phone: 'Phone',
      officeHours: 'Office Hours',
      location: 'Location',
      mondayFriday: 'Monday - Friday: 9:00 AM - 6:00 PM',
      saturday: 'Saturday: 10:00 AM - 4:00 PM',
      form: {
        name: 'Name',
        email: 'Email',
        subject: 'Subject',
        message: 'Message',
        sendMessage: 'Send Message',
      },
      successMessage: 'Thank you for your message! We will get back to you soon.',
      label: 'Contact',
      sentTitle: 'Message sent',
      sendAnother: 'Send another message',
    },
    
    // Projects Page
    projects: {
      totalProjects: 'Total Projects',
      categories: 'Categories',
      activeYears: 'Active Years',
      allProjects: 'All Projects',
      noProjectsFound: 'No projects found in this category.',
      label: 'Work',
      title: 'Projects',
      intro: 'Homes, interiors and commercial buildings, each one designed, engineered and followed on site by the same team.',
      filterBy: 'Filter projects by type',
    },

    // Project status and services, shared by project pages
    status: {
      design: 'In design',
      construction: 'Under construction',
      completed: 'Completed',
    },
    serviceNames: {
      design: 'Design',
      structural: 'Structural',
      monitoring: 'Monitoring',
    },
    
    // Services Page
    services: {
      hero: {
        tagline: 'Peace of mind, built in',
        title: 'Hand-crafted, custom design built to last',
        subtitle: 'We are a team of experienced designers, with trained eyes and skilled hands, dedicated to creating custom designs that tell your story.',
      },
      intro: {
        subtitle: 'Our Custom Design Services',
        description: 'The Arch Studio design and build process proactively streamlines communication, bolsters team collaboration, tightens project timelines, and provides sound budget data early in the design process.',
      },
      pillarsLabel: 'End to end',
      includes: 'Includes',
      pillars: {
        design: ['Concept and feasibility', 'Architectural design', 'Interior design', 'Permit drawings', '3D visualisation'],
        structure: ['Structural analysis', 'Foundation design', 'Steel and concrete frames', 'Seismic assessment', 'Construction drawings'],
        monitor: ['Site supervision', 'Schedule and budget tracking', 'Quality control', 'Milestone reports', 'Handover and snagging'],
      },
      process: {
        title: 'Our Process',
        steps: [
          {
            number: '1',
            title: 'Planning',
            description: 'We start with a thorough understanding of your needs and perspectives. We remain open to interpretation while collaborating closely with you to capture the right character of every piece.',
          },
          {
            number: '2',
            title: 'Functionality',
            description: 'Our team works closely with designers to guarantee the functionality and compatibility of a project\'s design, materials, and space.',
          },
          {
            number: '3',
            title: 'Authenticity',
            description: 'We never replicate or mass produce. Each piece is custom-designed and crafted. Every project that comes through our studio is made for a specific space and a specific client.',
          },
          {
            number: '4',
            title: 'Refinement',
            description: 'Close attention is paid to the interactions of all components in our projects. We ensure the final piece harmonizes, connects, and elevates.',
          },
        ],
      },
      work: {
        title: 'Our Work',
        subtitle: 'Guided by your vision. Crafted with dedication.',
        viewAll: 'View all Projects',
      },
    },
    
    // Project Detail Page
    projectDetail: {
      backToProjects: '← Back to Projects',
      category: 'Category',
      year: 'Year',
      location: 'Location',
      area: 'Area',
      previousImage: 'Previous image',
      nextImage: 'Next image',
      status: 'Status',
      services: 'Services',
      gallery: 'Gallery',
      openImage: 'Open image',
      closeGallery: 'Close gallery',
      imageOf: 'Image {current} of {total}',
      nextProject: 'Next project',
      monitoring: {
        label: 'Monitoring',
        title: 'From sketch to handover',
        progress: 'Overall progress',
        current: 'Now',
      },
      phases: {
        concept: 'Concept',
        permits: 'Permits',
        structural: 'Structural design',
        construction: 'Construction',
        handover: 'Handover',
      },
    },
    
    // Project Categories
    categories: {
      residential: 'Residential',
      interior: 'Interior',
      commercial: 'Commercial',
    },

    // Copy-to-clipboard pill on email addresses and phone numbers
    copy: {
      email: 'Copy email',
      phone: 'Copy number',
      copied: 'Copied',
    },

    // Footer
    footer: {
      studio: 'Studio',
      contact: 'Contact',
      follow: 'Follow',
      sitemap: 'Sitemap',
      backToTop: 'Back to top',
      rights: 'All rights reserved.',
      tagline: 'Architecture, structure and monitoring, end to end.',
    },

    // 404 Page
    notFound: {
      title: 'Page not found',
      message: "The page you're looking for has moved or never existed.",
      backHome: 'Back to home',
    },
    
    // Project Data
    projectsData: {
      tower: {
        title: 'RESIDENTIAL',
        name: 'TOWER',
        description: 'A modern residential tower featuring innovative design and sustainable living spaces.',
        longDescription: 'Tower represents the pinnacle of modern residential architecture. This stunning development combines luxury living with sustainable design principles, creating a harmonious environment for residents. The project features state-of-the-art amenities, breathtaking views, and thoughtfully designed spaces that enhance daily living.',
      },
      'modern-house': {
        title: 'RESIDENTIAL',
        name: 'MODERN HOUSE',
        description: 'A beautiful modern house featuring clean lines and contemporary design.',
        longDescription: 'This modern house project embodies the essence of contemporary residential design. With its clean architectural lines, open floor plans, and seamless indoor-outdoor connections, this home creates a perfect balance between modern aesthetics and comfortable living. The design prioritizes natural light, sustainable materials, and functional spaces.',
      },
      'luxury-villa': {
        title: 'RESIDENTIAL',
        name: 'LUXURY VILLA',
        description: 'An exquisite luxury villa with premium finishes and expansive living spaces.',
        longDescription: 'The Luxury Villa project represents the ultimate in residential design and craftsmanship. This stunning property features expansive living spaces, premium finishes, and meticulous attention to detail throughout. The villa seamlessly blends indoor and outdoor living, creating a serene and luxurious environment for its residents.',
      },
      object: {
        title: 'PRODUCT',
        name: 'OBJECT DESIGN',
        description: 'Thoughtfully crafted object designs that blend artistry with functionality.',
        longDescription: 'Our object design project focuses on creating beautiful, functional pieces that enhance living spaces. Each object is meticulously designed with attention to detail, material selection, and user experience. The collection represents a fusion of traditional craftsmanship and modern design principles.',
      },
    },
  },
  
  shq: {
    // Navigation
    nav: {
      home: 'Kryefaqja',
      projects: 'Projektet',
      about: 'Rreth Nesh',
      contact: 'Kontakt',
      services: 'Shërbimet',
      switchLanguage: 'Ndrysho Gjuhën',
      menu: 'Menu',
      close: 'Mbyll',
      toggleTheme: 'Ndrysho mes modalitetit të ndritshëm dhe të errët',
      skipToContent: 'Kalo te përmbajtja',
      mainNavigation: 'Navigimi kryesor',
    },
    
    // Home Page
    home: {
      hero: {
        previous: 'Projekti i mëparshëm',
        next: 'Projekti tjetër',
        showProject: 'Shfaq projektin {n}: {name}',
      },
      statement: {
        label: 'Studio',
        text: 'Arch Studio projekton, llogarit dhe mbikëqyr ndërtesa nga skica e parë deri në ditën kur hyni brenda. Një ekip i vetëm për arkitekturën, konstruksionin dhe mbikëqyrjen në terren, që asgjë të mos humbasë mes vizatimit dhe betonit.',
        cta: 'Rreth nesh',
      },
      featured: {
        label: 'Të veçuara',
        title: 'Punë të përzgjedhura',
        viewAll: 'Të gjitha projektet',
      },
      process: {
        label: 'Si punojmë',
        cta: 'Shërbimet tona',
        steps: [
          {
            key: 'design',
            title: 'Dizajni',
            text: 'Koncepti, planimetritë dhe interieri. Fillimisht dëgjojmë, pastaj skicojmë, modelojmë dhe përsosim derisa ndërtesa t’i përshtatet terrenit, buxhetit dhe njerëzve që do ta jetojnë.',
          },
          {
            key: 'structure',
            title: 'Konstruksioni',
            text: 'Inxhinierët tanë e kthejnë projektin në një konstruksion të qëndrueshëm: llogaritje ngarkesash, themele dhe skelet, të koordinuara me arkitekturën që nga dita e parë.',
          },
          {
            key: 'monitor',
            title: 'Mbikëqyrja',
            text: 'Në terren deri në dorëzim. Ndjekim ecurinë, cilësinë dhe buxhetin, dhe ju raportojmë në çdo fazë, që ajo që ndërtohet të jetë ajo që u projektua.',
          },
        ],
      },
      categories: {
        label: 'Sipas llojit',
        all: 'Të gjitha projektet',
      },
      gallery: {
        label: 'Arkivi',
        title: 'Të gjitha projektet',
      },
    },

    // Contact call to action (shared by several pages)
    cta: {
      label: 'Nisni një projekt',
      title: 'Le të ndërtojmë diçka së bashku',
      text: 'Na tregoni për truallin, planet dhe afatet tuaja. Ju përgjigjemi brenda dy ditëve të punës.',
      button: 'Na kontaktoni',
      email: 'info@archstudio.com',
    },
    
    // About Page
    about: {
      title: 'Rreth Arch Studio',
      tagline: 'Krijimi i hapësirave që frymëzojnë, funksionojnë bukur dhe qëndrojnë me kalimin e kohës.',
      ourStory: {
        title: 'Historia Jonë',
        paragraph1: 'Arch Studio është një praktikë arkitekturore përparimtare e dedikuar për krijimin e hapësirave të jashtëzakonshme që përziejnë dizajnin inovativ me ekselencën funksionale. E themeluar mbi parimin që arkitektura duhet të përmirësojë përvojën njerëzore, ne i qasemi çdo projekti me perspektivë të re dhe respekt të thellë për mjedisin e ndërtuar.',
        paragraph2: 'Puna jonë përfshin dizajnin rezidencial, komercial dhe të brendshëm, gjithmonë me fokus në qëndrueshmëri, zanat dhe nevojat unike të klientëve tanë. Ne besojmë se arkitektura e madhe lind nga integrimi i menduar i formës, funksionit dhe ndjenjës.',
      },
      ourApproach: {
        title: 'Qasja Jonë',
        designPhilosophy: {
          title: 'Filozofia e Dizajnit',
          text: 'Ne krijojmë hapësira që nuk janë vetëm të bukura, por edhe kuptimplota. Çdo vendim i dizajnit është i qëllimshëm, duke shërbyer si qëllime estetike ashtu edhe praktike, duke respektuar mjedisin dhe kontekstin.',
        },
        collaborativeProcess: {
          title: 'Procesi Bashkëpunues',
          text: 'Arkitektura është një dialog. Ne punojmë ngushtë me klientët, konsulentët dhe zanafinjtë gjatë procesit të dizajnit dhe ndërtimit, duke siguruar që çdo zë të dëgjohet dhe çdo detaj të merret parasysh.',
        },
        sustainableDesign: {
          title: 'Dizajn i Qëndrueshëm',
          text: 'Përgjegjësia mjedisore është pjesë integrale e praktikës sonë. Ne prioritizojmë materialet e qëndrueshme, efikasitetin e energjisë dhe dizajnet që minimizojnë ndikimin mjedisor duke maksimizuar vlerën afatgjatë.',
        },
        attentionToDetail: {
          title: 'Vëmendje ndaj Detajeve',
          text: 'Ekselenca qëndron në detajet. Nga koncepti fillestar deri te ndërtimi përfundimtar, ne mbajmë vëmendje të saktë për çdo aspekt të projektit, duke siguruar cilësi dhe koherencë gjatë gjithë procesit.',
        },
      },
      whatWeDo: {
        title: 'Çfarë Bëjmë',
        residentialArchitecture: {
          title: 'Arkitekturë Rezidenciale',
          text: 'Shtëpi të personalizuara, rinovime dhe zhvillime rezidenciale që pasqyrojnë stilin e jetës dhe aspiratat unike të klientëve tanë.',
        },
        commercialDesign: {
          title: 'Dizajn Komercial',
          text: 'Hapësira pune, ambiente tregtare dhe ndërtesa komerciale të dizajnuara për të mbështetur qëllimet e biznesit dhe për të përmirësuar përvojën e përdoruesit.',
        },
        interiorDesign: {
          title: 'Dizajn i Brendshëm',
          text: 'Shërbime të plota dizajni të brendshëm, nga planifikimi i hapësirës deri te zgjedhja e materialeve, duke krijuar ambiente kohezive dhe frymëzuese.',
        },
        consultation: {
          title: 'Konsultim',
          text: 'Konsultim dizajni, studime fizibiliteti dhe shërbime menaxhimi projekti për të udhëhequr klientët nëpër çdo fazë të projektit të tyre.',
        },
      },
      ourValues: {
        title: 'Vlerat Tona',
        innovation: {
          label: 'Inovacion:',
          text: 'Ne përqafojmë ide të reja, teknologji dhe metodologji duke respektuar parimet e përjetshme të dizajnit.',
        },
        integrity: {
          label: 'Integritet:',
          text: 'Komunikim i sinqertë, praktikë etike dhe angazhim për të përmbushur premtimet tona.',
        },
        excellence: {
          label: 'Ekselencë:',
          text: 'Ne përpiqemi për standardet më të larta në dizajn, dokumentim dhe ekzekutim projekti.',
        },
        clientFocus: {
          label: 'Fokus në Klient:',
          text: 'Çdo projekt është unik, dhe ne e përshtasim qasjen tonë për të përmbushur nevojat dhe vizionin specifik të çdo klienti.',
        },
        community: {
          label: 'Komunitet:',
          text: 'Ne besojmë se arkitektura ka fuqinë për të forcuar komunitetet dhe për të përmirësuar cilësinë e jetës.',
        },
      },
      stats: {
        label: 'Në shifra',
        projects: 'Projekte',
        years: 'Vite praktike',
        disciplines: 'Disiplina, një ekip',
      },
    },
    
    // Contact Page
    contact: {
      title: 'Na Kontaktoni',
      subtitle: 'Keni një projekt në mendje? Do të donim të dëgjojmë nga ju. Kontaktoni dhe le të krijojmë diçka të mrekullueshme së bashku.',
      writeToUs: 'Na Shkruani',
      email: 'Email',
      phone: 'Telefon',
      officeHours: 'Orët e Zyrës',
      location: 'Vendndodhja',
      mondayFriday: 'E Hënë - E Premte: 9:00 - 18:00',
      saturday: 'E Shtunë: 10:00 - 16:00',
      form: {
        name: 'Emri',
        email: 'Email',
        subject: 'Subjekti',
        message: 'Mesazhi',
        sendMessage: 'Dërgo Mesazhin',
      },
      successMessage: 'Faleminderit për mesazhin tuaj! Do t\'ju kthehemi së shpejti.',
      label: 'Kontakt',
      sentTitle: 'Mesazhi u dërgua',
      sendAnother: 'Dërgo një mesazh tjetër',
    },
    
    // Projects Page
    projects: {
      totalProjects: 'Projekte Gjithsej',
      categories: 'Kategoritë',
      activeYears: 'Vite Aktive',
      allProjects: 'Të Gjitha Projektet',
      label: 'Punët',
      title: 'Projektet',
      intro: 'Shtëpi, interiere dhe ndërtesa komerciale, secila e projektuar, e llogaritur dhe e ndjekur në terren nga i njëjti ekip.',
      filterBy: 'Filtro projektet sipas llojit',
      noProjectsFound: 'Nuk u gjetën projekte në këtë kategori.',
    },

    // Project status and services, shared by project pages
    status: {
      design: 'Në projektim',
      construction: 'Në ndërtim',
      completed: 'I përfunduar',
    },
    serviceNames: {
      design: 'Dizajn',
      structural: 'Konstruksion',
      monitoring: 'Mbikëqyrje',
    },
    
    // Services Page
    services: {
      hero: {
        tagline: 'Qetësi mendore, e ndërtuar',
        title: 'Dizajn i personalizuar, i punuar me dorë, i ndërtuar për të zgjuar',
        subtitle: 'Ne jemi një ekip dizajnerësh me përvojë, me sy të trajnuar dhe duar të afta, të dedikuar për krijimin e dizajneve të personalizuara që tregojnë historinë tuaj.',
      },
      intro: {
        subtitle: 'Shërbimet Tona të Dizajnit të Personalizuar',
        description: 'Procesi i dizajnit dhe ndërtimit të Arch Studio rregullon proaktivisht komunikimin, forcon bashkëpunimin e ekipit, shtrëngon afatet e projektit dhe ofron të dhëna të mira buxheti në fillim të procesit të dizajnit.',
      },
      pillarsLabel: 'Nga fillimi në fund',
      includes: 'Përfshin',
      pillars: {
        design: ['Koncept dhe studim fizibiliteti', 'Projektim arkitektonik', 'Dizajn interieri', 'Vizatime për leje', 'Vizualizim 3D'],
        structure: ['Analizë strukturore', 'Projektim themelesh', 'Skelet çeliku dhe betoni', 'Vlerësim sizmik', 'Vizatime zbatimi'],
        monitor: ['Mbikëqyrje në terren', 'Ndjekje afatesh dhe buxheti', 'Kontroll cilësie', 'Raporte për çdo fazë', 'Dorëzim dhe kontroll përfundimtar'],
      },
      process: {
        title: 'Procesi Ynë',
        steps: [
          {
            number: '1',
            title: 'Planifikimi',
            description: 'Fillojmë me një kuptim të plotë të nevojave dhe perspektivave tuaja. Mbetemi të hapur ndaj interpretimit ndërsa bashkëpunojmë ngushtë me ju për të kapur karakterin e duhur të çdo pjese.',
          },
          {
            number: '2',
            title: 'Funksionaliteti',
            description: 'Ekipi ynë punon ngushtë me dizajnerët për të garantuar funksionalitetin dhe përputhshmërinë e dizajnit, materialeve dhe hapësirës së projektit.',
          },
          {
            number: '3',
            title: 'Autenticiteti',
            description: 'Ne kurrë nuk kopjojmë ose prodhojmë në masë. Çdo pjesë është e dizajnuar dhe e punuar me porosi. Çdo projekt që kalon nëpër studion tonë është bërë për një hapësirë dhe një klient specifik.',
          },
          {
            number: '4',
            title: 'Përmirësimi',
            description: 'Vëmendje e afërt i kushtohet ndërveprimeve të të gjitha komponentëve në projektet tona. Sigurojmë që pjesa përfundimtare të harmonizojë, lidhet dhe ngritet.',
          },
        ],
      },
      work: {
        title: 'Puna Jonë',
        subtitle: 'Udhëhequr nga vizioni juaj. I punuar me dedikim.',
        viewAll: 'Shiko të gjitha Projektet',
      },
    },
    
    // Project Detail Page
    projectDetail: {
      backToProjects: '← Kthehu te Projektet',
      category: 'Kategoria',
      year: 'Viti',
      location: 'Vendndodhja',
      area: 'Sipërfaqja',
      previousImage: 'Imazh i mëparshëm',
      nextImage: 'Imazh tjetër',
      status: 'Statusi',
      services: 'Shërbimet',
      gallery: 'Galeria',
      openImage: 'Hap imazhin',
      closeGallery: 'Mbyll galerinë',
      imageOf: 'Imazhi {current} nga {total}',
      nextProject: 'Projekti tjetër',
      monitoring: {
        label: 'Mbikëqyrja',
        title: 'Nga skica te dorëzimi',
        progress: 'Ecuria e përgjithshme',
        current: 'Tani',
      },
      phases: {
        concept: 'Koncepti',
        permits: 'Lejet',
        structural: 'Projekti konstruktiv',
        construction: 'Ndërtimi',
        handover: 'Dorëzimi',
      },
    },
    
    // Project Categories
    categories: {
      residential: 'Rezidenciale',
      interior: 'E Brendshme',
      commercial: 'Komerciale',
    },

    // Copy-to-clipboard pill on email addresses and phone numbers
    copy: {
      email: 'Kopjo emailin',
      phone: 'Kopjo numrin',
      copied: 'U kopjua',
    },

    // Footer
    footer: {
      studio: 'Studio',
      contact: 'Kontakt',
      follow: 'Na ndiqni',
      sitemap: 'Harta e faqes',
      backToTop: 'Kthehu lart',
      rights: 'Të gjitha të drejtat e rezervuara.',
      tagline: 'Arkitekturë, konstruksion dhe mbikëqyrje, nga fillimi në fund.',
    },

    // 404 Page
    notFound: {
      title: 'Faqja nuk u gjet',
      message: 'Faqja që po kërkoni është zhvendosur ose nuk ka ekzistuar kurrë.',
      backHome: 'Kthehu në kryefaqe',
    },
    
    // Project Data
    projectsData: {
      tower: {
        title: 'REZIDENCIALE',
        name: 'KULLA',
        description: 'Një kullë rezidenciale moderne me dizajn inovativ dhe hapësira jetese të qëndrueshme.',
        longDescription: 'Kulla përfaqëson kulmin e arkitekturës rezidenciale moderne. Ky zhvillim mahnitës kombinon jetesën luksoze me parimet e dizajnit të qëndrueshëm, duke krijuar një mjedis harmonik për banorët. Projekti përfshin lehtësira të teknologjisë së fundit, pamje mahnitëse dhe hapësira të dizajnuara me kujdes që përmirësojnë jetën e përditshme.',
      },
      'modern-house': {
        title: 'REZIDENCIALE',
        name: 'SHTËPIA MODERNE',
        description: 'Një shtëpi moderne e bukur me vija të pastra dhe dizajn bashkëkohor.',
        longDescription: 'Ky projekt i shtëpisë moderne përmbledh thelbin e dizajnit rezidencial bashkëkohor. Me vijat e saj arkitekturore të pastra, planet e hapura të katit dhe lidhjet e përsosura brenda-jashtë, kjo shtëpi krijon një balancë të përsosur midis estetikës moderne dhe jetesës komode. Dizajni prioritizon dritën natyrore, materialet e qëndrueshme dhe hapësirat funksionale.',
      },
      'luxury-villa': {
        title: 'REZIDENCIALE',
        name: 'VILLA LUKS',
        description: 'Një vilë luksoze e shkëlqyer me përfundime premium dhe hapësira jetese të gjera.',
        longDescription: 'Projekti i Villës Luksoze përfaqëson kulmin në dizajnin rezidencial dhe zanatin. Kjo pronë mahnitëse përfshin hapësira jetese të gjera, përfundime premium dhe vëmendje të saktë ndaj detajeve gjatë gjithë procesit. Vila përzi në mënyrë të përsosur jetesën brenda dhe jashtë, duke krijuar një mjedis qetësues dhe luksoz për banorët e saj.',
      },
      object: {
        title: 'PRODUKT',
        name: 'DIZAJN OBJEKTI',
        description: 'Dizajne objektesh të krijuara me kujdes që përziejnë artin me funksionalitetin.',
        longDescription: 'Projekti ynë i dizajnit të objekteve fokusohet në krijimin e pjesëve të bukura dhe funksionale që përmirësojnë hapësirat e jetesës. Çdo objekt është dizajnuar me kujdes me vëmendje ndaj detajeve, zgjedhjes së materialeve dhe përvojës së përdoruesit. Koleksioni përfaqëson një shkrirje të zanafisë tradicionale dhe parimeve të dizajnit modern.',
      },
    },
  },
};

// Helper function to get nested translation
export const getTranslation = (obj, path) => {
  return path.split('.').reduce((current, key) => current?.[key], obj);
};

export const initialProjects = [
  {
    id: "proj-1",
    title: "UniStudy AI — Adaptive Exam Prep & Lecture Mindmaps",
    description: "An intelligent student workspace that transforms university lecture slides and PDF handouts into interactive flashcards, spaced-repetition quizzes, and automated concept knowledge graphs.",
    category: "AI & Education",
    technologies: ["React 18", "Redux Toolkit", "FastAPI", "OpenAI API", "Tailwind CSS"],
    difficulty: "Intermediate",
    teamSize: 4,
    members: [
      {
        id: "user-1",
        name: "Manansh Goyal",
        role: "Lead Frontend Architect",
        avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80"
      },
      {
        id: "user-2",
        name: "Himanshu Sharma",
        role: "Backend & NLP Engineer",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
      },
      {
        id: "user-3",
        name: "Shreyansh Verma",
        role: "UI/UX Product Designer",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
      }
    ],
    requiredSkills: ["React 18", "State Architecture", "FastAPI / Python", "Prompt Engineering"],
    status: "In Progress",
    progress: 75,
    ownerId: "user-1",
    ownerName: "Manansh Goyal",
    createdAt: "2026-09-01",
    goal: "Ship a functional web application MVP to help 250+ engineering students prepare for mid-term exams.",
    additionalInfo: "Looking for 1 more frontend contributor to help develop the interactive flashcard deck and quiz scoring screen."
  },
  {
    id: "proj-2",
    title: "CampusPulse — Real-Time IoT Room Finder & Wayfinding",
    description: "Interactive campus navigation platform with real-time room occupancy heatmaps, quiet study zone locators, and wheelchair-accessible turn-by-turn indoor routing across university blocks.",
    category: "Campus Tech",
    technologies: ["React 18", "Leaflet.js", "WebSockets", "Node.js", "PostgreSQL"],
    difficulty: "Intermediate",
    teamSize: 4,
    members: [
      {
        id: "user-2",
        name: "Himanshu Sharma",
        role: "Project Lead & Backend",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
      },
      {
        id: "user-1",
        name: "Manansh Goyal",
        role: "Interactive Map UI Dev",
        avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80"
      },
      {
        id: "user-4",
        name: "Aarav Panjeta",
        role: "IoT Sensor Integration",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80"
      }
    ],
    requiredSkills: ["React", "Leaflet / GIS", "WebSockets", "IoT Hardware Basics"],
    status: "In Progress",
    progress: 60,
    ownerId: "user-2",
    ownerName: "Himanshu Sharma",
    createdAt: "2026-09-05",
    goal: "Deploy digital wayfinding kiosks and web app across campus central library, CS labs, and auditorium.",
    additionalInfo: "Hardware PIR sensors tested in laboratory. Need a teammate to refine mobile responsive floorplan maps."
  },
  {
    id: "proj-3",
    title: "HealthSync — Circadian Sleep & Student Burnout Prevention",
    description: "Personal student wellness dashboard combining screen fatigue alerts, sleep cycle tracking, Pomodoro focus audio, and automated burnout warnings before heavy assignment deadlines.",
    category: "Health & Fitness",
    technologies: ["React", "Chart.js", "Web Audio API", "IndexedDB", "CSS Variables"],
    difficulty: "Intermediate",
    teamSize: 3,
    members: [
      {
        id: "user-3",
        name: "Shreyansh Verma",
        role: "Design Lead & Founder",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
      },
      {
        id: "user-5",
        name: "Manu Gupta",
        role: "Frontend Analytics Dev",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80"
      }
    ],
    requiredSkills: ["React", "Chart.js", "Web Audio API", "UX Research"],
    status: "Open",
    progress: 35,
    ownerId: "user-3",
    ownerName: "Shreyansh Verma",
    createdAt: "2026-09-08",
    goal: "Help university peers balance academic rigor with physical health and consistent sleep hygiene.",
    additionalInfo: "Seeking 1 frontend developer interested in custom audio synthesizer timers and interactive data charts."
  },
  {
    id: "proj-4",
    title: "DevClash — 1v1 Peer Algorithmic Dueling Arena",
    description: "Real-time competitive programming sandbox where university classmates solve algorithmic challenges in synchronized side-by-side code editors with live test case verdicts and ELO ratings.",
    category: "Developer Tools",
    technologies: ["React", "Monaco Editor", "Socket.io", "Docker Sandbox", "Node.js"],
    difficulty: "Advanced",
    teamSize: 4,
    members: [
      {
        id: "user-5",
        name: "Manu Gupta",
        role: "Lead Architect",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80"
      },
      {
        id: "user-1",
        name: "Manansh Goyal",
        role: "Frontend & Code Editor UI",
        avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80"
      },
      {
        id: "user-2",
        name: "Himanshu Sharma",
        role: "Docker Sandbox Security",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
      }
    ],
    requiredSkills: ["React", "Monaco Editor", "Socket.io", "Data Structures"],
    status: "In Progress",
    progress: 80,
    ownerId: "user-5",
    ownerName: "Manu Gupta",
    createdAt: "2026-09-10",
    goal: "Host weekly campus hackathons and algorithmic speed-coding duels for the university ACM chapter.",
    additionalInfo: "Core WebSocket engine completed. Looking for a designer or frontend teammate for match victory animations."
  },
  {
    id: "proj-5",
    title: "EcoCampus — Smart Dining Hall Surplus & Hostel Pantry Share",
    description: "Sustainability web platform connecting university hostel dining halls, student canteens, and local shelters to log surplus meals in real-time and coordinate zero-waste food pickups.",
    category: "Sustainability",
    technologies: ["React", "Firebase", "Leaflet Maps", "Tailwind CSS", "Cloudinary"],
    difficulty: "Beginner",
    teamSize: 3,
    members: [
      {
        id: "user-4",
        name: "Aarav Panjeta",
        role: "Project Founder",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80"
      },
      {
        id: "user-6",
        name: "Priya Patel",
        role: "Frontend & Mobile UX",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80"
      }
    ],
    requiredSkills: ["React", "Firebase", "Mobile-First CSS", "Form Validation"],
    status: "Open",
    progress: 45,
    ownerId: "user-4",
    ownerName: "Aarav Panjeta",
    createdAt: "2026-09-12",
    goal: "Reduce daily campus dining food waste by over 40% through transparent surplus meal logging and community pickup.",
    additionalInfo: "Approved by university environmental board. Perfect starter project for 1st or 2nd year students."
  },
  {
    id: "proj-6",
    title: "ResearchMatch — Undergraduate Research Lab & Faculty Portal",
    description: "Centralized discovery portal matching undergraduate students with professors and research labs for funded research assistantships in Machine Learning, Robotics, and Renewable Energy.",
    category: "Academic Research",
    technologies: ["React 18", "Redux Toolkit", "Python", "PostgreSQL", "Tailwind CSS"],
    difficulty: "Intermediate",
    teamSize: 3,
    members: [
      {
        id: "user-6",
        name: "Priya Patel",
        role: "Project Lead",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80"
      },
      {
        id: "user-3",
        name: "Shreyansh Verma",
        role: "Design Systems & UX",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
      }
    ],
    requiredSkills: ["React 18", "Redux Toolkit", "REST APIs", "UI/UX Design"],
    status: "Open",
    progress: 30,
    ownerId: "user-6",
    ownerName: "Priya Patel",
    createdAt: "2026-09-15",
    goal: "Democratize undergraduate research access across engineering departments and automate lab assistant applications.",
    additionalInfo: "3 faculty research labs currently onboarding for pilot testing. Welcoming frontend contributors."
  }
];

export default initialProjects;

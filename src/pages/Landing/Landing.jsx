import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Search, Users, UserCheck, Hammer, LineChart, ArrowRight, ShieldCheck, Sparkles, FolderPlus } from 'lucide-react';
import { AppContext } from '../../context/AppContext';
import { Button } from '../../components/Button/Button';
import { ProjectCard } from '../../components/ProjectCard/ProjectCard';
import './Landing.css';

export const Landing = () => {
  const { projects } = useContext(AppContext);
  const featuredProjects = projects.slice(0, 3);

  const journeySteps = [
    { number: '01', title: 'DISCOVER', desc: 'Browse student project ideas across education, health, and campus tech.', icon: Search },
    { number: '02', title: 'MATCH', desc: 'Find classmates with complementary skills like React, Python, or UI Design.', icon: Users },
    { number: '03', title: 'TEAM UP', desc: 'Send join requests, build project teams, and define team roles.', icon: UserCheck },
    { number: '04', title: 'BUILD', desc: 'Organize tasks, assign priorities, and collaborate step-by-step.', icon: Hammer },
    { number: '05', title: 'TRACK', desc: 'Monitor task completions and auto-calculate overall project progress.', icon: LineChart }
  ];

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-badge">
            <Sparkles size={14} /> Student Collaboration Platform
          </div>
          <h1 className="hero-heading">
            Good ideas are better with the <span>right team.</span>
          </h1>
          <p className="hero-subtext">
            Discover meaningful projects, find teammates, and turn your ideas into something real. Built specifically for students to team up and track progress.
          </p>

          <div className="hero-ctas">
            <Link to="/explore">
              <Button variant="copper" size="lg" icon={Search}>
                Explore Projects
              </Button>
            </Link>
            <Link to="/sign-up">
              <Button variant="outline" size="lg" icon={FolderPlus}>
                Start Building
              </Button>
            </Link>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-num">{projects.length}+</span>
              <span className="stat-label">Active Student Projects</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-num">50+</span>
              <span className="stat-label">Registered Classmates</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-num">100%</span>
              <span className="stat-label">Student Project Ready</span>
            </div>
          </div>
        </div>
      </section>

      {/* Core Journey Section */}
      <section className="journey-section">
        <div className="container">
          <div className="section-header center">
            <span className="section-subtitle">THE STUDENT WORKFLOW</span>
            <h2 className="section-title">How BuildTogether Works</h2>
            <p className="section-desc">A simple, structured process from initial project idea to completed presentation.</p>
          </div>

          <div className="journey-grid">
            {journeySteps.map((step, idx) => {
              const StepIcon = step.icon;
              return (
                <div key={idx} className="journey-card card">
                  <div className="journey-step-badge">{step.number}</div>
                  <div className="journey-icon-wrap">
                    <StepIcon size={24} />
                  </div>
                  <h3 className="journey-title">{step.title}</h3>
                  <p className="journey-desc">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="featured-section">
        <div className="container">
          <div className="section-header flex-header">
            <div>
              <span className="section-subtitle">DISCOVER OPPORTUNITIES</span>
              <h2 className="section-title">Featured Projects Looking for Teammates</h2>
            </div>
            <Link to="/explore">
              <Button variant="outline" icon={ArrowRight}>
                View All Projects
              </Button>
            </Link>
          </div>

          <div className="grid-3">
            {featuredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Why BuildTogether Section */}
      <section className="why-section">
        <div className="container">
          <div className="why-box card">
            <div className="why-content">
              <span className="section-subtitle">WHY BUILD TOGETHER?</span>
              <h2>Designed for Student Success</h2>
              <p>
                Finding the right teammates in university can be challenging. BuildTogether simplifies project matching, task delegation, and progress tracking in one clean platform.
              </p>

              <div className="why-features">
                <div className="why-feature-item">
                  <ShieldCheck className="why-icon" size={20} />
                  <div>
                    <h4>No Backend Dependency</h4>
                    <p>Uses local storage and React state for fast, reliable performance.</p>
                  </div>
                </div>

                <div className="why-feature-item">
                  <ShieldCheck className="why-icon" size={20} />
                  <div>
                    <h4>Real-time Task Progress Calculation</h4>
                    <p>Dynamic completion percentages automatically calculated from completed tasks.</p>
                  </div>
                </div>

                <div className="why-feature-item">
                  <ShieldCheck className="why-icon" size={20} />
                  <div>
                    <h4>Clean Component Architecture</h4>
                    <p>Modular components, standard hooks (useState, useEffect), and clear state flow.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-card">
            <h2>Ready to start your next student project?</h2>
            <p>Join fellow students, share your project idea, or apply to join an existing team today.</p>
            <div className="cta-buttons">
              <Link to="/sign-up">
                <Button variant="copper" size="lg">
                  Create Account
                </Button>
              </Link>
              <Link to="/explore">
                <Button variant="outline" size="lg" className="btn-light-outline">
                  Browse Projects
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

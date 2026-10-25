import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Users, UserPlus, CheckSquare, TrendingUp, ArrowRight } from 'lucide-react';
import { Button } from '../../components/Button/Button';
import './HowItWorks.css';

export const HowItWorks = () => {
  const steps = [
    {
      number: '1',
      title: 'DISCOVER PROJECTS',
      icon: Search,
      summary: 'Explore student project ideas across multiple categories and technologies.',
      details: [
        'Browse open student projects created by your classmates.',
        'Filter by category (Education, Health, Productivity, Campus Life).',
        'Filter by required technologies (React, Python, Figma, HTML/CSS).',
        'Review project goals, difficulty ratings, and required team roles.'
      ]
    },
    {
      number: '2',
      title: 'FIND TEAMMATES & MATCH',
      icon: Users,
      summary: 'Search for classmates with complementary skills and availability.',
      details: [
        'Explore student profiles with verified skills and course backgrounds.',
        'View student availability (e.g. 10 hrs/week) and experience level.',
        'See what projects classmates have previously created or joined.',
        'Find developers, UI/UX designers, or project leads easily.'
      ]
    },
    {
      number: '3',
      title: 'TEAM UP & JOIN',
      icon: UserPlus,
      summary: 'Send project join requests and form balanced project teams.',
      details: [
        'Click "Request to Join" on any project looking for teammates.',
        'Receive instant notifications when join requests are accepted.',
        'Project owners can assign specific roles (Frontend Lead, Designer, etc.).',
        'Manage project member roster directly in the workspace.'
      ]
    },
    {
      number: '4',
      title: 'BUILD & MANAGE TASKS',
      icon: CheckSquare,
      summary: 'Break down project goals into actionable, prioritized tasks.',
      details: [
        'Add tasks with custom titles, priority levels, and assignees.',
        'Mark tasks as pending or completed with a single click.',
        'Keep everyone accountable with clear task ownership.',
        'Delete outdated or duplicate tasks anytime.'
      ]
    },
    {
      number: '5',
      title: 'TRACK PROJECT PROGRESS',
      icon: TrendingUp,
      summary: 'Monitor project completion percentages calculated in real-time.',
      details: [
        'Dynamic completion progress bar calculated as (Completed Tasks / Total Tasks) * 100.',
        'View active timeline events in the project activity feed.',
        'Demonstrate clear project milestones during viva evaluations.',
        'Keep project data persistent in your browser via localStorage.'
      ]
    }
  ];

  return (
    <div className="container how-it-works-page">
      <div className="page-header center">
        <span className="section-subtitle">THE COMPLETE WORKFLOW</span>
        <h1 className="page-title">How BuildTogether Works</h1>
        <p className="page-subtitle">
          A step-by-step guide to discovering projects, finding teammates, and completing student evaluation milestones.
        </p>
      </div>

      <div className="steps-container">
        {steps.map((s, index) => {
          const IconComp = s.icon;
          return (
            <div key={index} className="step-card card">
              <div className="step-badge-col">
                <div className="step-number-circle">{s.number}</div>
              </div>
              <div className="step-content-col">
                <div className="step-header">
                  <div className="step-icon">
                    <IconComp size={22} />
                  </div>
                  <h2>{s.title}</h2>
                </div>
                <p className="step-summary">{s.summary}</p>

                <ul className="step-details-list">
                  {s.details.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      <div className="how-cta-box card">
        <h3>Ready to experience the workflow?</h3>
        <p>Browse existing student projects or publish your own project idea right now.</p>
        <div className="how-cta-btns">
          <Link to="/explore">
            <Button variant="copper" icon={ArrowRight}>
              Explore Projects
            </Button>
          </Link>
          <Link to="/create-project">
            <Button variant="outline">
              Create a Project
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

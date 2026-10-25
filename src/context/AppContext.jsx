import React, { createContext, useState, useEffect } from 'react';
import { initialUsers } from '../data/users';
import { initialProjects } from '../data/projects';
import { initialTasks } from '../data/tasks';
import { initialNotifications } from '../data/notifications';

export const AppContext = createContext();

const REAL_USER_PROFILES = {
  'user-1': {
    name: 'Manansh Goyal',
    email: 'manansh.goyal@university.edu',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
  },
  'user-2': {
    name: 'Himanshu Sharma',
    email: 'himanshu.sharma@university.edu',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  },
  'user-3': {
    name: 'Shreyansh Verma',
    email: 'shreyansh.verma@university.edu',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
  },
  'user-4': {
    name: 'Aarav Panjeta',
    email: 'aarav.panjeta@university.edu',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
  },
  'user-5': {
    name: 'Manu Gupta',
    email: 'manu.gupta@university.edu',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
  },
  'user-6': {
    name: 'Priya Patel',
    email: 'priya.patel@university.edu',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
  },
};

const sanitizeUser = (u) => {
  if (!u) return u;
  if (REAL_USER_PROFILES[u.id]) {
    return {
      ...u,
      name: REAL_USER_PROFILES[u.id].name,
      email: REAL_USER_PROFILES[u.id].email,
      avatar: REAL_USER_PROFILES[u.id].avatar,
    };
  }
  // If user has an old cartoon avatar, upgrade to high quality portrait
  if (!u.avatar || u.avatar.includes('dicebear')) {
    return {
      ...u,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    };
  }
  return u;
};

const sanitizeProjects = (projList) => {
  return projList.map(p => ({
    ...p,
    members: (p.members || []).map(m => {
      const realProfile = REAL_USER_PROFILES[m.id];
      return {
        ...m,
        name: realProfile ? realProfile.name : m.name,
        avatar: realProfile ? realProfile.avatar : (m.avatar && !m.avatar.includes('dicebear') ? m.avatar : 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80')
      };
    })
  }));
};

export const AppProvider = ({ children }) => {
  // Initialize state from localStorage or mock datasets with animal cartoon avatar sanitization
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('bt_user');
      if (saved && saved !== 'null' && saved !== 'undefined') {
        const u = JSON.parse(saved);
        return u ? sanitizeUser(u) : null;
      }
    } catch (err) {
      console.error('Error loading stored user:', err);
    }
    return null; // Guest / Unauthenticated by default for a realistic workflow
  });

  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('bt_users');
    const list = saved ? JSON.parse(saved) : initialUsers;
    return list.map(sanitizeUser);
  });

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('bt_projects');
    const list = saved ? JSON.parse(saved) : initialProjects;
    return sanitizeProjects(list);
  });

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('bt_tasks');
    return saved ? JSON.parse(saved) : initialTasks;
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('bt_notifications');
    return saved ? JSON.parse(saved) : initialNotifications;
  });

  // Auto-upgrade legacy localStorage mock data if older cartoon or incomplete dataset is detected
  useEffect(() => {
    try {
      const storedProjects = localStorage.getItem('bt_projects');
      if (storedProjects && (storedProjects.includes('dicebear') || storedProjects.includes('PanjetaBoy') || !storedProjects.includes('proj-6'))) {
        setProjects(initialProjects);
        setTasks(initialTasks);
        setNotifications(initialNotifications);
        setUsers(initialUsers);
        localStorage.setItem('bt_projects', JSON.stringify(initialProjects));
        localStorage.setItem('bt_tasks', JSON.stringify(initialTasks));
        localStorage.setItem('bt_notifications', JSON.stringify(initialNotifications));
        localStorage.setItem('bt_users', JSON.stringify(initialUsers));
      }
    } catch (e) {
      console.error('Error during data upgrade:', e);
    }
  }, []);

  // Save to localStorage when state updates
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('bt_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('bt_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('bt_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('bt_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('bt_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('bt_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Recalculate project progress whenever tasks change
  useEffect(() => {
    setProjects(prevProjects => {
      let updated = false;
      const nextProjects = prevProjects.map(proj => {
        const projTasks = tasks.filter(t => t.projectId === proj.id);
        const total = projTasks.length;
        const completed = projTasks.filter(t => t.status === 'completed').length;
        const calcProgress = total > 0 ? Math.round((completed / total) * 100) : proj.progress;
        
        if (calcProgress !== proj.progress) {
          updated = true;
          return { ...proj, progress: calcProgress };
        }
        return proj;
      });
      return updated ? nextProjects : prevProjects;
    });
  }, [tasks]);

  // Email Format Validation Helper
  const isValidEmail = (email) => {
    if (!email || typeof email !== 'string') return false;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email.trim());
  };

  // User Actions
  const loginUser = (email, password) => {
    const cleanEmail = email ? email.trim().toLowerCase() : '';
    if (!cleanEmail) {
      return { success: false, message: 'Please enter your email address.' };
    }
    if (!isValidEmail(cleanEmail)) {
      return { success: false, message: 'Please enter a valid email format (e.g. student@university.edu).' };
    }
    if (!password) {
      return { success: false, message: 'Please enter your password.' };
    }

    const found = users.find(u => u.email.toLowerCase() === cleanEmail);
    if (!found) {
      return {
        success: false,
        message: 'No account found with this email. Please check your email address or Sign Up.'
      };
    }

    const expectedPassword = found.password || 'password123';
    if (password !== expectedPassword) {
      return {
        success: false,
        message: 'Incorrect password. Please verify your password and try again.'
      };
    }

    setCurrentUser(found);
    return { success: true, user: found };
  };

  const signupUser = (userData) => {
    const cleanEmail = (userData.email || '').trim().toLowerCase();
    if (!cleanEmail) {
      return { success: false, message: 'Email address is required.' };
    }
    if (!isValidEmail(cleanEmail)) {
      return { success: false, message: 'Please enter a valid email format (e.g. student@university.edu).' };
    }

    const existing = users.find(u => u.email.toLowerCase() === cleanEmail);
    if (existing) {
      return { success: false, message: 'An account with this email address already exists. Please sign in instead.' };
    }

    const realPortraits = [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80"
    ];
    const assignedAvatar = realPortraits[Math.floor(Math.random() * realPortraits.length)];

    const newUser = {
      id: "user-" + Date.now(),
      name: userData.name || "New Student",
      email: cleanEmail,
      phone: userData.phone || "9876543210",
      password: userData.password || "password123",
      avatar: assignedAvatar,
      course: userData.course || "Computer Science",
      year: userData.year || "2nd Year",
      bio: userData.bio || "Enthusiastic student builder.",
      skills: userData.skills || ["JavaScript", "React"],
      interests: userData.interests || ["Web Projects"],
      projectsCreated: [],
      projectsJoined: [],
      availability: "10 hrs/week",
      experienceLevel: "Beginner"
    };
    setCurrentUser(newUser);
    setUsers(prev => [...prev, newUser]);
    return { success: true, user: newUser };
  };

  const loginWithProvider = (provider) => {
    const providerName = provider === 'google' ? 'Google Student' : 'GitHub Student';
    const providerEmail = `${provider.toLowerCase()}.user@university.edu`;
    
    let existing = users.find(u => u.email.toLowerCase() === providerEmail);
    if (!existing) {
      existing = {
        id: `user-${provider}-${Date.now()}`,
        name: providerName,
        email: providerEmail,
        phone: "9876543210",
        password: "password123",
        avatar: provider === 'google' 
          ? 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80'
          : 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
        course: "Computer Science & Engineering",
        year: "2nd Year",
        bio: `Authenticated via ${provider.toUpperCase()}`,
        skills: ["React", "JavaScript", "Node.js"],
        interests: ["Open Source", "Web Apps"],
        projectsCreated: [],
        projectsJoined: [],
        availability: "10 hrs/week",
        experienceLevel: "Intermediate"
      };
      setUsers(prev => [...prev, existing]);
    }
    setCurrentUser(existing);
    return { success: true, user: existing };
  };

  const resetPassword = (email, newPassword) => {
    const cleanEmail = email ? email.trim().toLowerCase() : '';
    if (!cleanEmail || !isValidEmail(cleanEmail)) {
      return { success: false, message: 'Please enter a valid registered email address.' };
    }

    const found = users.find(u => u.email.toLowerCase() === cleanEmail);
    if (!found) {
      return { success: false, message: 'No account registered with this email address.' };
    }
    if (!newPassword || newPassword.length < 6) {
      return { success: false, message: 'New password must be at least 6 characters long.' };
    }

    const updatedUser = { ...found, password: newPassword };
    setUsers(prev => prev.map(u => u.id === found.id ? updatedUser : u));
    if (currentUser && currentUser.id === found.id) {
      setCurrentUser(updatedUser);
    }
    return { success: true, message: 'Password reset successfully! You can now log in with your new password.' };
  };

  const logoutUser = () => {
    setCurrentUser(null);
    localStorage.removeItem('bt_user');
  };

  const updateProfile = (updatedFields) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updatedFields };
    setCurrentUser(updated);
    setUsers(prev => prev.map(u => u.id === currentUser.id ? updated : u));
  };

  // Project Actions
  const addProject = (projectData) => {
    if (!currentUser) return null;
    const newId = "proj-" + Date.now();
    const newProj = {
      id: newId,
      title: projectData.title,
      description: projectData.description,
      category: projectData.category || "General",
      technologies: projectData.technologies || ["React", "JavaScript"],
      difficulty: projectData.difficulty || "Intermediate",
      teamSize: Number(projectData.teamSize) || 4,
      members: [
        {
          id: currentUser.id,
          name: currentUser.name,
          role: "Project Lead / Creator",
          avatar: currentUser.avatar
        }
      ],
      requiredSkills: projectData.requiredSkills || ["JavaScript", "UI Design"],
      status: projectData.status || "Open",
      progress: 0,
      ownerId: currentUser.id,
      ownerName: currentUser.name,
      createdAt: new Date().toISOString().split('T')[0],
      goal: projectData.goal || "Build a working prototype.",
      additionalInfo: projectData.additionalInfo || "Open to all enthusiastic team members."
    };

    setProjects(prev => [newProj, ...prev]);

    // Update current user created projects list
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        projectsCreated: [...(currentUser.projectsCreated || []), newId]
      };
      setCurrentUser(updatedUser);
      setUsers(prev => prev.map(u => u.id === currentUser.id ? updatedUser : u));
    }

    return newId;
  };

  const updateProject = (projectId, updatedFields) => {
    setProjects(prev => prev.map(p => p.id === projectId ? { ...p, ...updatedFields } : p));
  };

  const deleteProject = (projectId) => {
    setProjects(prev => prev.filter(p => p.id !== projectId));
    setTasks(prev => prev.filter(t => t.projectId !== projectId));
  };

  const joinProjectRequest = (projectId) => {
    const userToJoin = currentUser || users[0] || initialUsers[0];
    if (!currentUser) {
      setCurrentUser(userToJoin);
    }

    const proj = projects.find(p => p.id === projectId);
    if (!proj) return { success: false, message: "Project not found" };

    // Check if already member
    const alreadyMember = proj.members && proj.members.some(m => m.id === userToJoin.id);
    if (alreadyMember) return { success: true, alreadyMember: true };

    const newMember = {
      id: userToJoin.id,
      name: userToJoin.name,
      role: "Collaborator",
      avatar: userToJoin.avatar
    };

    const updatedProjects = projects.map(p => {
      if (p.id === projectId) {
        return {
          ...p,
          members: [...(p.members || []), newMember]
        };
      }
      return p;
    });

    setProjects(updatedProjects);

    // Update user joined projects list
    const updatedUser = {
      ...userToJoin,
      projectsJoined: Array.from(new Set([...(userToJoin.projectsJoined || []), projectId]))
    };

    setCurrentUser(updatedUser);
    setUsers(prev => prev.map(u => u.id === userToJoin.id ? updatedUser : u));

    // Create notification
    const newNotif = {
      id: "notif-" + Date.now(),
      title: "Joined Project",
      message: `You successfully joined '${proj.title}'!`,
      timestamp: "Just now",
      read: false,
      type: "project"
    };
    setNotifications(prev => [newNotif, ...prev]);

    return { success: true };
  };

  // Task Actions
  const addTask = (projectId, title, priority = "Medium", assignee = (currentUser ? currentUser.name : "Unassigned")) => {
    const newTask = {
      id: "task-" + Date.now(),
      projectId,
      title,
      status: "pending",
      priority,
      assignee
    };
    setTasks(prev => [...prev, newTask]);
  };

  const toggleTaskStatus = (taskId) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        const nextStatus = t.status === "completed" ? "pending" : "completed";
        return { ...t, status: nextStatus };
      }
      return t;
    }));
  };

  const deleteTask = (taskId) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  // Notification Actions
  const markNotificationRead = (notifId) => {
    setNotifications(prev => prev.map(n => n.id === notifId ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Viva Reset Tool
  const resetDemoData = () => {
    localStorage.removeItem('bt_user');
    localStorage.removeItem('bt_users');
    localStorage.removeItem('bt_projects');
    localStorage.removeItem('bt_tasks');
    localStorage.removeItem('bt_notifications');
    setCurrentUser(initialUsers[0]);
    setUsers(initialUsers);
    setProjects(initialProjects);
    setTasks(initialTasks);
    setNotifications(initialNotifications);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users,
        projects,
        tasks,
        notifications,
        loginUser,
        signupUser,
        loginWithProvider,
        resetPassword,
        logoutUser,
        updateProfile,
        addProject,
        updateProject,
        deleteProject,
        joinProjectRequest,
        addTask,
        toggleTaskStatus,
        deleteTask,
        markNotificationRead,
        markAllNotificationsRead,
        resetDemoData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

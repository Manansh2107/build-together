import React, { createContext, useState, useEffect } from 'react';
import { initialUsers } from '../data/users';
import { initialProjects } from '../data/projects';
import { initialTasks } from '../data/tasks';
import { initialNotifications } from '../data/notifications';

export const AppContext = createContext();

const getAnimalAvatar = (userId) => {
  switch (userId) {
    case 'user-1': return 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80';
    case 'user-2': return 'https://api.dicebear.com/7.x/open-peeps/svg?seed=HimanshuBoy&backgroundColor=ffd5dc';
    case 'user-3': return 'https://api.dicebear.com/7.x/open-peeps/svg?seed=ShreyanshBoy&backgroundColor=c0aede';
    case 'user-4': return 'https://api.dicebear.com/7.x/open-peeps/svg?seed=PanjetaBoy&backgroundColor=d1d4f9';
    case 'user-5': return 'https://api.dicebear.com/7.x/open-peeps/svg?seed=ManuBoy&backgroundColor=ffdfbf';
    default: return 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80';
  }
};

const sanitizeUser = (u) => {
  if (!u) return u;
  let updatedName = u.name;
  let updatedEmail = u.email;

  if (u.id === 'user-1') { updatedName = 'Manansh Goyal'; updatedEmail = 'manansh.goyal@university.edu'; }
  else if (u.id === 'user-2') { updatedName = 'Himanshu'; updatedEmail = 'himanshu@university.edu'; }
  else if (u.id === 'user-3') { updatedName = 'Shreyansh'; updatedEmail = 'shreyansh@university.edu'; }
  else if (u.id === 'user-4') { updatedName = 'Panjeta'; updatedEmail = 'panjeta@university.edu'; }
  else if (u.id === 'user-5') { updatedName = 'Manu'; updatedEmail = 'manu@university.edu'; }

  const avatar = getAnimalAvatar(u.id);
  return { ...u, name: updatedName, email: updatedEmail, avatar };
};

const sanitizeProjects = (projList) => {
  return projList.map(p => ({
    ...p,
    members: (p.members || []).map(m => ({
      ...m,
      avatar: getAnimalAvatar(m.id)
    }))
  }));
};

export const AppProvider = ({ children }) => {
  // Initialize state from localStorage or mock datasets with animal cartoon avatar sanitization
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('bt_user');
    const u = saved ? JSON.parse(saved) : initialUsers[0];
    return sanitizeUser(u);
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

  // Save to localStorage when state updates
  useEffect(() => {
    localStorage.setItem('bt_user', JSON.stringify(currentUser));
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

    const newUser = {
      id: "user-" + Date.now(),
      name: userData.name || "New Student",
      email: cleanEmail,
      phone: userData.phone || "9876543210",
      password: userData.password || "password123",
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${Date.now()}&backgroundColor=ffd5dc`,
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
          ? `https://api.dicebear.com/7.x/open-peeps/svg?seed=GoogleUser&backgroundColor=b6e3f4`
          : `https://api.dicebear.com/7.x/bottts/svg?seed=GithubUser&backgroundColor=c0aede`,
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
    const updated = { ...currentUser, ...updatedFields };
    setCurrentUser(updated);
    setUsers(prev => prev.map(u => u.id === currentUser.id ? updated : u));
  };

  // Project Actions
  const addProject = (projectData) => {
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
  const addTask = (projectId, title, priority = "Medium", assignee = currentUser.name) => {
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

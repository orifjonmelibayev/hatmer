import { useState, useEffect } from "react";
import {
  collection,
  doc,
  getDocs,
  updateDoc,
  onSnapshot,
  addDoc,
  Timestamp,
  writeBatch,
} from "firebase/firestore";
import { db } from "../utils/firebase";

export const useTasks = (projectId: any) => {
  const initialState: any[] = [];
  const [tasks, setTasks] = useState(initialState);

  useEffect(() => {
    // const projectRef = doc(db, "projects", selectedProject);
    const tasksRef = collection(db, "projects", projectId, "Tasks");
    const unsubscribe = onSnapshot(tasksRef, (snapshot) => {
      const newTasks: any[] = snapshot.docs.map((task) => ({
        id: task.id,
        ...task.data(),
      }));
      newTasks.sort((a,b) => a.order - b.order)
      console.log('tasks updated')
      setTasks(newTasks);
    });

    return () => unsubscribe();
  }, [projectId]);

  const updateTask = (taskId: string, updates: any) => {
    const update = async () => {
      const taskRef = doc(db, "projects", projectId, "Tasks", taskId);
      await updateDoc(taskRef, { ...updates });
    };
    update();
  };

  return { tasks, updateTask };
};

export const useProjects = () => {
  const initialState: any[] = [];
  const [projects, setProjects] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const reloadProjects = () => {
    setLoading(true);
    const fetchData = async () => {
      const projectsRef = collection(db, "projects");
      const pp = await getDocs(projectsRef);
      const allProjects = pp.docs.map((p) => ({
        id: p.id,
        ...p.data(),
      }));
      setProjects(allProjects);
    };
    fetchData();
    setLoading(false);
  }

  useEffect(() => {
    reloadProjects();
  }, []);


  const addProject = async (project: any) => {
    const projectsRef = collection(db, "projects");
    try {
      const tasks = project.tasks;
      delete project.tasks;
      project.dueDate = Timestamp.fromDate(new Date(project.dueDate))
      const projectRef = await addDoc(projectsRef, {
        ...project
      });
      const tasksRef = collection(projectRef, "Tasks");
      const batch = writeBatch(db);
      tasks.map( (task: any) => {
        const taskRef = doc(tasksRef)
        batch.set(taskRef, task)
      })
      await batch.commit()
      reloadProjects();
    } catch(error) {
      console.log(error)
    }
  };

  return { loading, projects, addProject };
};

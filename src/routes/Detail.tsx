import { EditIcon } from "@chakra-ui/icons";
import { Box, Button, Center, Heading, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "../components/Card";
import { CardContent } from "../components/Card/CardContent";
import { CardHeader } from "../components/Card/CardHeader";
import { TaskDetail } from "../components/Task/TaskDetail";
import { useTasks } from "../hooks";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../utils/firebase";

export default function Detail() {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState<any | null>(null);
  const projectId = params.id || "";

  useEffect(() => {
    const fetchData = async () => {
      const projectRef = doc(db, "projects", projectId);
      const snapshot = await getDoc(projectRef);
      if (snapshot.exists()) {
        setProject(snapshot.data());
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const { tasks, updateTask } = useTasks(params.id);

  return loading ? (
    <Center>
      <Spinner />
    </Center>
  ) : project === null ? (
    <Heading>Nothing here</Heading>
  ) : (
    //<Navigate to="/" />
    <Box as="section" py="12" px={{ md: "8" }}>
      <Card maxW="3xl" mx="auto">
        <CardHeader
          title={project.Name || "___"}
          subtitle={project.DueDate && 'Due to: ' + project.DueDate.toDate().toDateString('dd/MM/YYYY')}
          action={
            <Button variant="outline" minW="20" leftIcon={<EditIcon />}>
              Edit
            </Button>
          }
        />
        <CardContent>
          {tasks.map((task) => (
            <TaskDetail
              path={`${projectId}.${task.id}`}
              key={task.id}
              task={task}
              onUpdateTask={(update: any) => {
                updateTask(task.id, { ...update });
              }}
            />
          ))}
        </CardContent>
      </Card>
    </Box>
  );
}

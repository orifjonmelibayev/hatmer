import { Container, Center, Spinner } from '@chakra-ui/react';
import Card from '../pages/Home/Card';
import { useProjects } from '../hooks';
import { Grid } from '../components/Grid';
import { NewProjectModal } from '../pages/Home/NewProjectModal';
import { useAuthContext } from '../hooks/auth';


export default function TodoList() {
  const { projects, loading } = useProjects()
  const {user} = useAuthContext()

  return (
    <Container centerContent maxW={'5xl'}>
      {user && (<Container py={'3'}>
        <NewProjectModal />
      </Container>) }
      <Grid verticalAlign={'top'}>
        {loading ?
          <Center>
            <Spinner />
          </Center>
        : projects.map((i) => <Card todo={i} key={i.id} />)}
      </Grid>
    </Container>
  );
}

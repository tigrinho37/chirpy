import * as React from 'react';
import Head from 'next/head';

import { useCreateOneProjectMutation } from '$/generated/graphql';
import { useCurrentUser } from '$/hooks/useCurrentUser';
import { Button } from '$/components/buttons/Button';
import { List } from '$/components/List';
import { Heading } from '$/components/Heading';
import { Dialog, DialogFooter } from '$/components/Dialog';
import { TextField } from '$/components/TextField';
import { useRouter } from 'next/router';
import { Text } from '$/components/Text';
import { Layout } from '$/components/Layout';

export default function Dashboard(): JSX.Element {
  const { data, isLogin, refetch } = useCurrentUser();
  const [createProjectMutation] = useCreateOneProjectMutation();
  const handleCreateProject = React.useCallback(() => {
    setShowDialog(true);
  }, []);
  const [showDialog, setShowDialog] = React.useState(false);

  const handleCloseDialog = React.useCallback(() => {
    setShowDialog(false);
  }, []);
  const [projectName, setProjectName] = React.useState('');
  const [projectNameError, setProjectNameError] = React.useState('');
  const handleChangeProjectName = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      if (value.length > 64) {
        setProjectNameError('64 characters at most.');
      } else {
        setProjectNameError('');
      }
      setProjectName(value);
    },
    [],
  );
  const handleSubmit = React.useCallback(() => {
    createProjectMutation({
      variables: {
        projectName,
        userID: data!.currentUser!.id!,
      },
    }).then((data) => {
      setShowDialog(false);
      refetch?.();
      return data;
    });
  }, [projectName, createProjectMutation, data, refetch]);

  const router = useRouter();
  const timeout = React.useRef<number>();
  React.useEffect(() => {
    if (!isLogin) {
      timeout.current = window.setTimeout(() => {
        router.push('/login');
      }, 3000);
    } else {
      timeout.current && clearTimeout(timeout.current);
    }
  }, [router, isLogin]);

  if (!isLogin) {
    return (
      <div>
        <Heading as="h3">You are not login, redirecting to login page</Heading>
      </div>
    );
  }

  return (
    <Layout>
      <Head>
        <title>Dashboard</title>
      </Head>
      <main>
        <Heading as="h2">Welcome to dashboard.</Heading>
        <Text>userId - {data?.currentUser?.id}</Text>
        {data?.currentUser?.projects?.length ? (
          <List variant="unordered">
            {data.currentUser.projects.map((project) => (
              <List.Item key={project.id}>
                {project.id} - {project.name}
              </List.Item>
            ))}
          </List>
        ) : (
          <div className="py-6">
            <Text>No projects</Text>
          </div>
        )}
        <div className="space-x-2">
          <Button onClick={handleCreateProject}>Create a new project</Button>
          <Button className="mt-5">Integrate comment</Button>
        </div>
        <Dialog show={showDialog} title="Create a new project">
          <div className="flex flex-col w-full">
            <TextField
              placeholder="Project name"
              label="Project name"
              value={projectName}
              onChange={handleChangeProjectName}
              errorMessage={projectNameError}
            />

            <DialogFooter>
              <Button variant="borderless" onClick={handleCloseDialog} className="w-full sm:w-auto">
                Cancel
              </Button>
              <Button
                className="w-full sm:w-auto"
                disabled={!!projectNameError.length}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </DialogFooter>
          </div>
        </Dialog>
      </main>
    </Layout>
  );
}

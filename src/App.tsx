/** @jsxImportSource @emotion/react */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import tw, { theme } from "twin.macro";

import Button from "./components/elements/button";
import Input from "./components/form/input";
import Footer from "./components/layout/footer";
import Form from "./components/form";
import FormSpacer from "./components/form/spacer";
import Title from "./components/typography/title";
import MonoText from "./components/typography/monoText";
import Card from "./components/elements/card";
import Wrapper from "./components/layout/wrapper";
import BodyStyles from "./components/globalStyles/bodyStyles";
import Deployment from "./components/logic/deployment";

import { BeatLoader } from "react-spinners";

import { ChangeEvent, FormEvent, useState } from "react";
import { FetchDeploymentsProps, fetchDeployments } from "./app/api";
import git from "parse-github-url";
import { PaginatedList } from "react-paginated-list";

const App = () => {
  const [fetching, setFetching] = useState<boolean>(false);

  const [token, setToken] = useState<string | null>(null);
  const [repository, setRepository] = useState<string | null>(null);

  const [deployments, setDeployments] = useState<Array<
    Record<string, any>
  > | null>(null);

  const [
    parsedRepository,
    setParsedRepository,
  ] = useState<FetchDeploymentsProps | null>(null);

  const [formError, setFormError] = useState<string | null>(null);

  const handleTokenInput = (event: ChangeEvent<HTMLInputElement>) =>
    setToken(event.target.value);

  const handleRepositoryInput = (event: ChangeEvent<HTMLInputElement>) =>
    setRepository(event.target.value);

  const handleForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!token || !repository)
      return setFormError("Please fill out all fields.");

    const url = git(repository);
    if (!url || !url.owner || !url.name)
      return setFormError(
        "Please enter a valid repository name! (author/repository)"
      );

    setParsedRepository({
      owner: url.owner,
      name: url.name,
    });

    if (!parsedRepository) return;

    setFetching(true);

    try {
      const deployments = await fetchDeployments(parsedRepository, token);
      console.log(deployments.data);

      setFetching(false);
      setDeployments(deployments.data);
    } catch (e) {
      console.log(e);

      setFetching(false);
      return setFormError("An error has occurred while fetching deployments.");
    }

    setFormError(null);
  };

  const removeFromDeployments = (id: string) => {
    if (!deployments) return;
    for (let i = 0; i < deployments.length; i++) {
      if (!deployments[i]) continue;
      if (deployments[i].id === id) delete deployments[i];
    }
  };

  return (
    <>
      <BodyStyles />
      <Wrapper>
        <Card style={{ flexFlow: "column" }}>
          <div tw="text-center">
            <Title>GitHub Deployment Remover</Title>
            <MonoText>
              Since GitHub does not let you remove deployments via their UI, you
              need to do it using their API, which is too complicated. So I made
              this UI, enjoy!
            </MonoText>
          </div>

          {fetching ? (
            <div tw="mt-8 flex justify-center">
              <BeatLoader color={theme("colors.main-rgba.3")} />
            </div>
          ) : deployments ? (
            <div
              tw="mt-8 flex w-full items-center"
              style={{ flexFlow: "column" }}
            >
              <h2 tw="text-gray-300 text-base font-mono text-center">
                Select deployment
              </h2>
              <PaginatedList
                list={deployments}
                itemsPerPage={5}
                ControlItem={Button}
                controlItemClass="m-01"
                renderList={(list) => (
                  <>
                    {list.map((el, i) => (
                      <Deployment
                        deployment={el}
                        key={i}
                        githubKey={token}
                        repo={parsedRepository}
                        remove={removeFromDeployments}
                      />
                    ))}
                  </>
                )}
              />
            </div>
          ) : (
            <Form onSubmit={handleForm}>
              <Input
                type="text"
                required
                tw="text-center"
                placeholder="Your GitHub Token"
                onChange={handleTokenInput}
              />

              <FormSpacer>
                <Input
                  type="text"
                  required
                  tw="text-center"
                  placeholder="Repository (eg. facebook/react)"
                  onChange={handleRepositoryInput}
                />
              </FormSpacer>

              <FormSpacer>
                <Button>Fetch Deployments</Button>
              </FormSpacer>

              {formError && (
                <FormSpacer>
                  <p tw="text-red-500 text-sm">{formError}</p>
                </FormSpacer>
              )}
            </Form>
          )}
          <Footer />
        </Card>
      </Wrapper>
    </>
  );
};

export default App;

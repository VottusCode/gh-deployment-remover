/** @jsxImportSource @emotion/react */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import tw from "twin.macro";

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

import { ChangeEvent, FormEvent, useState } from "react";
import git from "parse-github-url";
import axios from "axios";

const App = () => {
  const [fetching, setFetching] = useState<boolean>(false);

  const [token, setToken] = useState<string | null>(null);
  const [repository, setRepository] = useState<string | null>(null);

  const [formError, setFormError] = useState<string | null>(null);

  const handleTokenInput = (event: ChangeEvent<HTMLInputElement>) =>
    setToken(event.target.value);

  const handleRepositoryInput = (event: ChangeEvent<HTMLInputElement>) =>
    setRepository(event.target.value);

  const fetchDeployments = async ({
    owner,
    name,
  }: {
    owner: string;
    name: string;
  }) => {
    setFetching(true);
    try {
      const res = await axios.request({
        method: "GET",
        url: `https://api.github.com/repos/${owner}/${name}/deployments`,
      });
      setFetching(false);
      return res;
    } catch (e) {
      setFetching(false);
      throw e;
    }
  };

  const handleForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!token || !repository)
      return setFormError("Please fill out all fields.");

    const url = git(repository);
    if (!url || !url.owner || !url.name)
      return setFormError(
        "Please enter a valid repository name! (author/repository)"
      );

    try {
      const deployments = await fetchDeployments({
        owner: url.owner,
        name: url.name,
      });
      console.log(deployments.data);
    } catch (e) {
      console.log(e);
      return setFormError("An error has occurred while fetching deployments.");
    }

    setFormError(null);
  };

  return (
    <>
      <BodyStyles />
      <Wrapper>
        <Card style={{ flexFlow: "column" }}>
          <div tw="text-center">
            <Title>GitHub Environment Remover</Title>
            <MonoText>
              Since GitHub does not let you remove deployments (environments)
              via their UI, you need to do it using their API, which is too
              complicated. So I made this UI, enjoy!
            </MonoText>
          </div>

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

          <Footer />
        </Card>
      </Wrapper>
    </>
  );
};

export default App;

/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { theme } from "twin.macro";
import {
  deleteDeployment as delDeployment,
  markDeploymentInactive,
  FetchDeploymentsProps,
} from "../../../app/api";

import Button from "../../elements/button";

interface DeploymentProps {
  githubKey: string | null;
  deployment: Record<string, any>;
  repo: FetchDeploymentsProps | null;
  remove: (id: string) => unknown;
}

const Deployment = ({
  githubKey,
  deployment: dep,
  repo,
  remove,
}: DeploymentProps) => {
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [deletionState, setDeletionState] = useState<
    "ACTIVE" | "INACTIVE" | "DELETED"
  >("ACTIVE");

  useEffect(() => {
    setDeletionState("ACTIVE");
    setError(null);
    setFetching(false);
  }, [dep, githubKey]);

  const deleteDeployment = async () => {
    if (!repo) return;

    setError(null);
    setFetching(true);

    try {
      await markDeploymentInactive(
        { ...repo, deploymentId: dep.id },
        githubKey
      );
      setFetching(false);
      setDeletionState("INACTIVE");

      await delDeployment({ ...repo, deploymentId: dep.id }, githubKey);
      setDeletionState("DELETED");

      remove(dep.id);
    } catch (e) {
      setDeletionState("ACTIVE");
      setFetching(false);

      console.log(e);
      return setError(
        `An error has occurred while deleting deployment ${dep.id}`
      );
    }

    setError(null);
  };

  return (
    <div>
      <div tw="flex justify-between px-3 py-2 bg-main-rgba-3 rounded-lg items-center mb-2">
        <div tw="text-xs font-mono">
          <div tw="text-gray-300">
            {dep.id} | Deployed: {new Date(dep.created_at).toLocaleString()}
          </div>
          <div tw="text-gray-400">On {dep.environment}</div>
        </div>
        <div tw="ml-3">
          {fetching ? (
            <BeatLoader color={theme("colors.main-rgba.3")} size="10" />
          ) : deletionState === "DELETED" ? (
            <div tw="text-red-500 m-2 text-xs uppercase font-mono">Deleted</div>
          ) : deletionState === "INACTIVE" ? (
            <div tw="text-red-500 m-2 text-xs uppercase font-mono">
              Inactive
            </div>
          ) : (
            <Button onClick={deleteDeployment}>Delete</Button>
          )}
        </div>
      </div>

      {error && (
        <div tw="mt-1">
          <p tw="text-red-500 text-xs m-0 mb-2">{error}</p>
        </div>
      )}
    </div>
  );
};

export default Deployment;

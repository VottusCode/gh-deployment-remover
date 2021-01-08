/**
 * GitHub API
 */

import axios from "axios";

export interface FetchDeploymentsProps {
  owner: string;
  name: string;
}

export type DeleteDeploymentProps = FetchDeploymentsProps & {
  deploymentId: string;
};

export const fetchDeployments = async (
  { owner, name }: FetchDeploymentsProps,
  token?: string | null
) => {
  try {
    const res = await axios.request({
      method: "GET",
      url: `https://api.github.com/repos/${owner}/${name}/deployments`,
      headers: {
        ...(token ? { Authorization: `token ${token}` } : {}),
        Accept: "application/vnd.github.v3+json",
      },
    });
    return res;
  } catch (e) {
    throw e;
  }
};

export const deleteDeployment = async (
  { owner, name, deploymentId }: DeleteDeploymentProps,
  token?: string | null
) => {
  try {
    const res = await axios.request({
      method: "DELETE",
      url: `https://api.github.com/repos/${owner}/${name}/deployments/${deploymentId}`,
      headers: {
        ...(token ? { Authorization: `token ${token}` } : {}),
        Accept: "application/vnd.github.v3+json",
      },
    });
    return res;
  } catch (e) {
    throw e;
  }
};

export const markDeploymentInactive = async (
  { owner, name, deploymentId }: DeleteDeploymentProps,
  token?: string | null
) => {
  try {
    const res = await axios.request({
      method: "POST",
      url: `https://api.github.com/repos/${owner}/${name}/deployments/${deploymentId}/statuses`,
      headers: {
        ...(token ? { Authorization: `token ${token}` } : {}),
        Accept: "application/vnd.github.ant-man-preview+json",
      },
      data: {
        state: "inactive",
      },
    });
    return res;
  } catch (e) {
    throw e;
  }
};

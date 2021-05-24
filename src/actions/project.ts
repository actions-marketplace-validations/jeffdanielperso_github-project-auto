import {GithubActionData} from '../triggers/github';
import {GitHub} from '@actions/github/lib/utils';
import {debugLog} from '../debug/debug';
import * as core from '@actions/core';

export async function runProjectAction(
  octokit: InstanceType<typeof GitHub>,
  actionData: GithubActionData
): Promise<void> {
  try {
    const projectName = core.getInput('project');
    const columnName = core.getInput('column');

    if (!projectName || !columnName) return;

    // Get projects
    const orgProjects = await octokit.rest.projects.listForOrg({
      org: 'org'
    });
    const repoProjects = await octokit.rest.projects.listForRepo({
      owner: actionData.owner,
      repo: actionData.repo
    });
    // const userProjects = await octokit.rest.projects.listForUser({
    //   username: actionData.owner
    // });

    debugLog(`org ${JSON.stringify(orgProjects)}`);
    debugLog(`repo ${JSON.stringify(repoProjects)}`);
    // debugLog(`user ${JSON.stringify(userProjects)}`);
  } catch (error) {
    debugLog(`[Error/project.ts] ${JSON.stringify(error)}`);
    throw error;
  }
}

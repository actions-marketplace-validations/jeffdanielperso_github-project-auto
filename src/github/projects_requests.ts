import {ActionContext} from '../context/context';
import {Logger} from '../logs/logger';
import {Cards, Column, OrgProjects, RepoProjects, UserProjects} from './types';

export class ProjectsRequests {
  //#region Projects
  static async getOrgProjects(context: ActionContext): Promise<OrgProjects> {
    try {
      const orgProjects = await context.octokit.rest.projects.listForOrg({
        org: context.owner
      });
      return orgProjects.data;
    } catch (error) {
      Logger.error(error);
      return [] as OrgProjects;
    }
  }

  static async getRepoProjects(context: ActionContext): Promise<RepoProjects> {
    try {
      const repoProjects = await context.octokit.rest.projects.listForRepo({
        owner: context.owner,
        repo: context.repository
      });
      return repoProjects.data;
    } catch (error) {
      Logger.error(error);
      return [] as RepoProjects;
    }
  }

  static async getUserProjects(context: ActionContext): Promise<UserProjects> {
    try {
      const userProjects = await context.octokit.rest.projects.listForUser({
        username: context.owner
      });
      return userProjects.data;
    } catch (error) {
      Logger.error(error);
      return [] as UserProjects;
    }
  }
  //#endregion

  //#region Cards
  static async getCards(
    context: ActionContext,
    column: Column
  ): Promise<Cards> {
    try {
      const response = await context.octokit.rest.projects.listCards({
        column_id: column.id
      });
      return response.data;
    } catch (error) {
      Logger.error(error);
      return [] as Cards;
    }
  }

  static async createCard(
    context: ActionContext,
    column: Column
  ): Promise<void> {
    try {
      await context.octokit.rest.projects.createCard({
        column_id: column.id,
        content_id: context.content?.id,
        content_type: context.content.type
      });
    } catch (error) {
      Logger.error(error);
    }
  }
  //#endregion
}
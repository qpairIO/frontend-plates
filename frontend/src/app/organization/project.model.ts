import {Resource, ResourceWithoutId} from '@tsmean/shared';

interface ProjecFields {
  id: number;
  appId: any;
  aws_access_key_id: any;
  aws_profile: any;
  aws_region: any;
  aws_secret_access_key: any;
  description: any;
  orgId: any;
  projectId: any;
  name: any;
  status: any;
  user_id: any;
}

export interface Project extends Resource, ProjecFields {}
//export interface ProjectListWithoutId extends ResourceWithoutId, ProjectListFields {}

import {
  DeploymentFrequencyAnalyticsResponse,
  UpdatedDeploymentFrequencyAnalyticsResponseV2
} from '@/types/resources';

const adaptManagerAnalytics = (
  data: UpdatedDeploymentFrequencyAnalyticsResponseV2['manager_analytics']
): DeploymentFrequencyAnalyticsResponse['manager_analytics'] => {
  return data.map((manager) => ({
    avg_deployment_frequency: getBadgeDetails(manager).avg_deployment_frequency,
    manager_id: manager.manager_id,
    team_ids: manager.team_ids,
    total_deployments: manager.total_deployments
  }));
};

const adaptTeamAnalytics = (
  data: UpdatedDeploymentFrequencyAnalyticsResponseV2['team_analytics']
): DeploymentFrequencyAnalyticsResponse['team_analytics'] => {
  return data.map((team) => ({
    avg_deployment_frequency: getBadgeDetails(team).avg_deployment_frequency,
    team_id: team.team_id,
    total_deployments: team.total_deployments
  }));
};

const getBadgeDetails = (
  data: Partial<UpdatedDeploymentFrequencyAnalyticsResponseV2>
): {
  avg_deployment_frequency: number;
  duration: 'day' | 'week' | 'month';
} => {
  if (data.avg_daily_deployment_frequency >= 1)
    return {
      avg_deployment_frequency: data.avg_daily_deployment_frequency,
      duration: 'day'
    };
  else if (data.avg_weekly_deployment_frequency >= 1)
    return {
      avg_deployment_frequency: data.avg_weekly_deployment_frequency,
      duration: 'week'
    };
  else
    return {
      avg_deployment_frequency: data.avg_monthly_deployment_frequency,
      duration: 'month'
    };
};

export const adaptDeploymentFrequencyAndGetBadge = (
  data: UpdatedDeploymentFrequencyAnalyticsResponseV2
): DeploymentFrequencyAnalyticsResponse & {
  duration: 'day' | 'week' | 'month';
} => {
  const badgeDetails = getBadgeDetails(data);
  return {
    ...data,
    ...badgeDetails,
    manager_analytics: adaptManagerAnalytics(data.manager_analytics),
    team_analytics: adaptTeamAnalytics(data.team_analytics),
    teams_map: data.teams_map,
    total_deployments: data.total_deployments,
    users_map: data.users_map
  };
};
export interface AppConfig {
  pageTitle: string;
  pageDescription: string;
  companyName: string;

  supportsChatInput: boolean;
  supportsVideoInput: boolean;
  supportsScreenShare: boolean;
  isPreConnectBufferEnabled: boolean;

  logo: string;
  startButtonText: string;
  accent?: string;
  logoDark?: string;
  accentDark?: string;

  // agent dispatch configuration
  agentName?: string;

  // LiveKit Cloud Sandbox configuration
  sandboxId?: string;
}

export const APP_CONFIG_DEFAULTS: AppConfig = {
  companyName: 'AlgoFlow AI',
  pageTitle: 'AlgoFlow AI — Interview Platform',
  pageDescription: 'AI-powered technical interview platform',

  supportsChatInput: false,
  supportsVideoInput: false,
  supportsScreenShare: false,
  isPreConnectBufferEnabled: true,

  logo: '/livecare-logo-light.svg',
  accent: '#22c55e',
  logoDark: '/livecare-logo-dark.svg',
  accentDark: '#4ade80',
  startButtonText: 'Start Interview',

  // agent dispatch configuration
  agentName: process.env.AGENT_NAME ?? 'Anam-Demo',

  // LiveKit Cloud Sandbox configuration
  sandboxId: undefined,
};

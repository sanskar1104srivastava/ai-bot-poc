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
  companyName: 'Algoflow AI',
  pageTitle: 'Sahai',
  pageDescription: 'Algoflow AI ka HIMS assistant',

  supportsChatInput: false,
  supportsVideoInput: false,
  supportsScreenShare: false,
  isPreConnectBufferEnabled: true,

  logo: '/sahai-logo-light.png',
  // Reference light blue. Kiosk is light-only, so both values match.
  accent: '#3a8fd1',
  logoDark: '/sahai-logo-dark.png',
  accentDark: '#3a8fd1',
  startButtonText: 'Sahai se baat karein',

  // agent dispatch configuration
  agentName: process.env.AGENT_NAME ?? 'Sahai-HIMS-Agent',

  // LiveKit Cloud Sandbox configuration
  sandboxId: undefined,
};

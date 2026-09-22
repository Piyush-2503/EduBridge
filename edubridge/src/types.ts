export type PortalType = 'student' | 'academia' | 'industry';

export type ActiveView = 'landing' | 'login-student' | 'login-academia' | 'login-industry';

export interface PortalConfig {
  id: PortalType;
  name: string;
  badge: string;
  tagline: string;
  actionText: string;
  loginTitle: string;
  idLabel: string;
  idPlaceholder: string;
  idHelp: string;
  demoId: string;
  demoPass: string;
}

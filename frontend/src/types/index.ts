export type UserRole = 'admin' | 'member' | 'viewer';

export interface Organization {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  organization_id: string;
  created_at: string;
  updated_at: string;
}

export type TriggerType = 'manual' | 'schedule' | 'webhook' | 'event';
export type WorkflowStatus = 'draft' | 'active' | 'archived';

export interface WorkflowDefinition {
  id: string;
  name: string;
  description: string;
  organization_id: string;
  trigger_type: TriggerType;
  status: WorkflowStatus;
  config: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export type TaskStatus = 'pending' | 'running' | 'completed' | 'failed' | 'waiting_approval' | 'cancelled';

export interface WorkflowRun {
  id: string;
  workflow_id: string;
  status: TaskStatus;
  started_at: string;
  completed_at: string | null;
  inputs: Record<string, any>;
  outputs: Record<string, any>;
  error: string | null;
}

export type AgentType = 'coordinator' | 'worker' | 'approver';

export interface AgentConfig {
  model: string;
  temperature: number;
  system_prompt: string;
  max_tokens: number;
}

export interface Task {
  id: string;
  workflow_run_id: string;
  name: string;
  description: string;
  agent_type: AgentType;
  agent_config: AgentConfig;
  status: TaskStatus;
  started_at: string;
  completed_at: string | null;
  result: any;
  error: string | null;
}

export type ApprovalStatus = 'pending' | 'approved' | 'rejected';
export type RiskLevel = 'low' | 'medium' | 'high';

export interface Approval {
  id: string;
  task_id: string;
  status: ApprovalStatus;
  risk_level: RiskLevel;
  requested_at: string;
  responded_at: string | null;
  responder_id: string | null;
  reason: string | null;
  context: Record<string, any>;
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  schema: Record<string, any>;
}

export interface ToolExecution {
  id: string;
  task_id: string;
  tool_name: string;
  inputs: Record<string, any>;
  outputs: Record<string, any>;
  error: string | null;
  started_at: string;
  completed_at: string;
}

export type KnowledgeSourceType = 'document' | 'webpage' | 'database';

export interface KnowledgeBase {
  id: string;
  organization_id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface KnowledgeChunk {
  id: string;
  kb_id: string;
  source_type: KnowledgeSourceType;
  source_id: string;
  content: string;
  metadata: Record<string, any>;
  embedding: number[];
}

export type ActorType = 'user' | 'system' | 'agent';

export interface AuditLog {
  id: string;
  organization_id: string;
  actor_type: ActorType;
  actor_id: string;
  action: string;
  resource_type: string;
  resource_id: string;
  details: Record<string, any>;
  created_at: string;
}

export interface LLMCall {
  id: string;
  task_id: string;
  model: string;
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
  cost: number;
  created_at: string;
}

export type IntegrationProvider = 'slack' | 'github' | 'jira' | 'google';
export type IntegrationStatus = 'active' | 'error' | 'disconnected';

export interface Integration {
  id: string;
  organization_id: string;
  provider: IntegrationProvider;
  status: IntegrationStatus;
  config: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  size: number;
}

export interface WorkflowNode {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: Record<string, any>;
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
}

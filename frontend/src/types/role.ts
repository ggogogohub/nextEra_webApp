export interface Role {
  id: string;
  name: string;
  permissions: string[];
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface RoleCreate {
  name: string;
  permissions: string[];
  description?: string;
}

export interface RoleUpdate {
  permissions?: string[];
  description?: string;
}

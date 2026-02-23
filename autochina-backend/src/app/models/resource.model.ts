export type ResourceType = 'BOOK' | 'VIDEO' | 'TEXT';

export interface Resource {
  id?: string;
  title: string;
  description?: string;
  type: ResourceType;
  url: string;
  category: string;
  createdAt?: Date;
  updatedAt?: Date;
}
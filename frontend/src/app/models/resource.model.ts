export interface Step {
  id?: number;
  title: string;
  description: string;
  time?: string;
}

export interface Resource {
  id: number | string;
  title: string;
  description?: string;
  fileUrl: string;
  type: string;
  category: string;
  geminiFileUri?: string;
  createdAt?: string | Date;
  steps?: Step[];
}
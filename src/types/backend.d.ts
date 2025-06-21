//write all type backend here (entity or responseDTO which backend throw back)
export interface IBackendRes<T> {
    error?: string | string[];
    message: string;
    statusCode: number | string;
    data?: T;
  }
export interface IModuleDTO {
  module: string;
  description?: string;
} 

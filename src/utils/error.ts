import { INetsRequestConfig, INetsResponseConfig } from "../types"

export class NetsError extends Error {
  isNetsError: boolean
  config: INetsRequestConfig
  code?: string | null
  request?: any
  response?: INetsResponseConfig
  constructor(message: string, config: INetsRequestConfig, code?: string | null, request?: any, response?: INetsResponseConfig) {
    super(message);


    this.code = code;
    this.config = config;
    this.request = request;
    this.response = response;


    this.isNetsError = true;

    // 解决ts的一个bug，
    Object.setPrototypeOf(this, Error.prototype);
  }
}

export function createError(message: string,
  config: INetsRequestConfig,
  code?: string | null,
  request?: any,
  response?: INetsResponseConfig) {
  return new NetsError(message, config, code, request, response)
}
import { isArray, isDate, isNull, isPlainObject, isUndefined } from "./deduce"

interface URLOrigin {
  protocol: string
  host: string
}

// 对url进行编码，转化后特殊字符和汉字
function encode(value: string): string {
  return encodeURIComponent(value)
    .replace(/%40/g, '@')
    .replace(/%3A/ig, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/ig, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/ig, '[')
    .replace(/%5D/ig, ']')
}

// 处理URL参数问题
export function buildUrl(url: string, params?: any, paramsSerializer?: (params: any) => string) {
  if (!params) {
    return url;
  }
  let serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params)
  } else {
    const parts: string[] = [];
    // 对params中参数进行遍历
    Object.keys(params).forEach(key => {
      const value = params[key];
      if (isNull(value) || isUndefined(value)) {
        return;
      }
      let values = [];
      // 将value统一转化为数组进行处理
      if (isArray(value)) {
        values = value;
        key += "[]";
      } else {
        values = [value];
      }
      values.forEach((value) => {
        if (isDate(value)) {
          value = value.toISOString();
        } else if (isPlainObject(value)) {
          value = JSON.stringify(value);
        }
        // 拼接参数
        parts.push(`${encode(key)}=${encode(value)}`)
      })
    })
    // 对参数进行合并
    serializedParams = parts.join("&");
  }

  // 如果params为{}，那么serializedParams就为""
  if (serializedParams) {
    // 判断是否存在hash
    const hashIndex = url.indexOf("#");
    if (hashIndex !== -1) {
      url = url.slice(0, hashIndex);
    }
    // 判断url之前是否存在参数
    url += (url.includes("?") ? "&" : "?") + serializedParams;
  }
  return url;
}

export function isFormData(value: any): value is FormData {
  return !isUndefined(value) && value instanceof FormData;
}

// 判断是否为同域请求
export function isURLSameOrigin(requestURL: string): boolean {
  const { protocol: toProtocol, host: toHost } = parserURL(requestURL);
  const { protocol: fromProtocol, host: fromHost } = parserURL(location.href)
  if (toHost === fromHost && toProtocol === fromProtocol) {
    return true;
  }
  return false
}

function parserURL(url: string): URLOrigin {
  const urlParsingNode = document.createElement("a");

  urlParsingNode.setAttribute("href", url)

  const { protocol, host } = urlParsingNode

  return {
    protocol, host
  }
}
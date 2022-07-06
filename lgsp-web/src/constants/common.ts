import { EEndpointType, EHttpMethod } from './../models/common';
import { EPolices } from 'src/models/common';
import { boolean } from 'yup';

export const TOKEN_KEY = 'auth-n-token';
export const USERNAME = 'auth-n-username';
export const PASSWORD = 'auth-n-password';
export const REMEMBER = 'auth-n-remember';

export const POLICES = [
  { label: 'Không giới hạn', value: EPolices.Unlimited },
  { label: '5000 yêu cầu mỗi phút', value: EPolices.Gold },
  { label: '2000 yêu cầu mỗi phút', value: EPolices.Silver },
  { label: '1000 yêu cầu mỗi phút', value: EPolices.Bronze },
];

export const HTTP_METHOD = [
  { label: EHttpMethod.GET, value: EHttpMethod.GET },
  { label: EHttpMethod.POST, value: EHttpMethod.POST },
  { label: EHttpMethod.PUT, value: EHttpMethod.PUT },
  { label: EHttpMethod.PATCH, value: EHttpMethod.PATCH },
  { label: EHttpMethod.DELETE, value: EHttpMethod.DELETE },
  { label: EHttpMethod.HEAD, value: EHttpMethod.HEAD },
  { label: EHttpMethod.OPTIONS, value: EHttpMethod.OPTIONS },
];
export interface Option<T, K> {
  label: T;
  value: K;
}

export const STATUS_API_MAP = new Map([
  ['CREATED', 'Tạo mới'],
  ['DEPLOYED', 'Đã triển khai'],
  ['PUBLISHED', 'Đã công khai'],
  ['RETIRED', 'Đã công khai'],
  ['REFUSED', 'Từ chối công khai'],
]);

export const PARAMS_TYPE: Option<string, string>[] = [
  { value: 'Query', label: 'Query' },
  { value: 'Header', label: 'Header' },
  { value: 'Cookie', label: 'Cookie' },
];

export const ENPOINT_TYPE: Option<string, EEndpointType>[] = [
  { value: EEndpointType.http, label: 'Không' },
  { value: EEndpointType.load_balancer, label: 'Cân bằng tải' },
  { value: EEndpointType.failover, label: 'failover' },
];

export const LEVEL_DEPLOYMENT: Option<string, string>[] = [
  { value: 'local', label: 'Địa phương' },
  { value: 'central', label: 'Trung ương' },
];

export const DATA_TYPE: Option<string, string>[] = [
  { value: 'Number', label: 'Number' },
  { value: 'Integer', label: 'Integer' },
  { value: 'String', label: 'String' },
  { value: 'Boolean', label: 'Boolean' },
];

export const FORMAT_STRING_DATA: Option<string, string>[] = [
  { value: '', label: 'Không có' },
  { value: 'Date', label: 'Date' },
  { value: 'Date - time', label: 'Date - time' },
  { value: 'Byte', label: 'Byte' },
  { value: 'Bynary', label: 'Bynary' },
  { value: 'Password', label: 'Password' },
];

export const FORMAT_INTEGER_DATA: Option<string, string>[] = [
  { value: '', label: 'Không có' },
  { value: 'int64', label: 'int64' },
  { value: 'int32', label: 'int32' },
];

export const FORMAT_NUMBER_DATA: Option<string, string>[] = [
  { value: '', label: 'Không có' },
  { value: 'Float', label: 'Float' },
  { value: 'Double', label: 'Double' },
];

export const ERRORS_CODE: Option<string, number>[] = [
  { value: 200, label: '200' },
  { value: 201, label: '201' },
  { value: 202, label: '202' },
  { value: 203, label: '203' },
  { value: 204, label: '204' },
  { value: 205, label: '205' },
  { value: 206, label: '206' },
  { value: 300, label: '300' },
  { value: 301, label: '301' },
  { value: 302, label: '302' },
  { value: 303, label: '303' },
  { value: 304, label: '304' },
  { value: 305, label: '305' },
  { value: 306, label: '306' },
  { value: 307, label: '307' },
  { value: 400, label: '400' },
  { value: 401, label: '401' },
  { value: 402, label: '402' },
  { value: 403, label: '403' },
  { value: 404, label: '404' },
  { value: 405, label: '405' },
  { value: 406, label: '406' },
  { value: 407, label: '407' },
  { value: 408, label: '408' },
  { value: 409, label: '409' },
  { value: 410, label: '410' },
  { value: 411, label: '411' },
  { value: 412, label: '412' },
  { value: 413, label: '413' },
  { value: 414, label: '414' },
  { value: 415, label: '415' },
  { value: 416, label: '416' },
  { value: 417, label: '417' },
  { value: 500, label: '500' },
  { value: 502, label: '502' },
  { value: 503, label: '503' },
  { value: 504, label: '504' },
  { value: 505, label: '505' },
];

export const RATE_LIMIT_LEVEL = [
  {
    id: '1',
    key: 'Toàn bộ phương thức',
    value: true,
  },
  {
    id: '2',
    key: 'Từng phương thức',
    value: false,
  },
];

export const GROUP_API_TYPE = [
  {
    id: 1,
    key: 'HTTP/Resfull Endpoints',
    value: true,
  },
  {
    id: 2,
    key: 'HTTP/SOAP Endpoints',
    value: false,
  },
];
export enum E_REST_API_TYPE {
  REST = 'REST',
  SOAP = 'SOAP',
  SOAP2REST = 'SOAPTOREST',
  HTTP = 'HTTP',
}

export enum E_WSDL_TYPE {
  FILE,
  URL,
}

export const validateNormalString = (text: string): boolean => {
  if (/^[a-zA-Z0-9_.-]*$/.test(text)) {
    return true;
  } else {
    return false;
  }
};
export const validateNormalStringGateway = (text: string): boolean => {
  if (/^[a-zA-Z0-9_-]*$/.test(text)) {
    return true;
  } else {
    return false;
  }
};

export const validateHostString = (text: string): boolean => {
  if (/^((([^-.])+([a-zA-Z0-9-.]{0,})+[$(a-zA-Z0-9)])|([a-zA-Z0-9]){1})$/.test(text)) {
    return true;
  } else {
    return false;
  }
};

export const validateNumber = (text: string): boolean => {
  if (/^[0-9]*$/.test(text)) {
    return true;
  } else {
    return false;
  }
};

export const validateNormalText = (text: string): boolean => {
  if (/^[a-zA-Z0-9]*$/.test(text)) {
    return true;
  } else {
    return false;
  }
};
export const validateQuery = (text: string): boolean => {
  if (/^[a-zA-Z0-9^-_`~!^#$%&*+='{}|?/<>()[\]\\.,;:\s@\"]*$/.test(text)) {
    return true;
  } else {
    return false;
  }
};

export const validatePath = (text: string): boolean => {
  const regex = /^[a-zA-Z0-9\/{}_-]*$/gi;
  if (regex.test(text)) {
    return true;
  } else {
    return false;
  }
};

export const validatePathURI = (text: string): boolean => {
  const regex = /^[\\\[\]a-zA-Z0-9+&@#/%?=~_|`&"*()-{()}<>!:,.;]*$/gi;
  if (regex.test(text)) {
    return true;
  } else {
    return false;
  }
};

export const validateUrl = (text: string): boolean => {
  return /((ftp|http|https):\/\/)[a-zA-Z0-9+&@#/%?=~_|`"*()-{}<>!:,.;\]\[]{3,}$/.test(text);
};

export const validateLDAPUrl = (text: string): boolean => {
  return /((ldap):\/\/)[a-zA-Z0-9+&@#/%?=~_|`"*()-{}<>!:,.;\]\[]{3,}$/.test(text);
};

export const validateUrlLDAP = (text: string): boolean => {
  if (/(([a-zA-Z0-9]):\/\/)[a-zA-Z0-9+&@#/%?=~_|`&"*()-{}<>!:,.;\/\]\[]{3,}$/.test(text)) {
    return true;
  } else {
    return false;
  }
};

export const validateUri = (text: string): boolean => {
  if (/^(\/):[a-z]+$/.test(text)) {
    return true;
  } else {
    return false;
  }
};

export const validatePassword = (text: string): boolean => {
  if (
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[:\[\]\\;".,|/+={}~`?!@'#$%<>^&*()_-])(?=.*[A-Z])(?=.*[a-z])[A-Za-z\d:\[\]\\;".,|/+={}~<>`?!@'#$%^&*()_-]{8,}$/.test(
      text,
    )
  ) {
    return true;
  } else {
    return false;
  }
};

export const validateEmail = (text: string): boolean => {
  if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(text)) {
    return true;
  } else {
    return false;
  }
};

export const validatePhoneNumber = (text: string): boolean => {
  if (/^\d+$/.test(text)) {
    // if (/^[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g.test(text)) {
    if (/(0[1-9])+([0-9]{8})\b/g.test(text)) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export const validateName = (text: string): boolean => {
  if (/[`~,.<>;':"/!@#$%^&*?<>[\]|{}()=_+-]/.test(text)) {
    return true;
  } else {
    return false;
  }
};

export const validateNameConnect = (text: string): boolean => {
  if (/^[a-zA-Z0-9^-_`~!^#$%{}&*+='|?/<>()[\]\\.,;:\s@\"]*$/.test(text)) {
    return true;
  } else {
    return false;
  }
};

export const checkTokenInvalidCode = (code: any): boolean => {
  if (code == undefined) {
    return false;
  }
  if (code == 177 || code == 11) {
    return false;
  }
  return true;
};

export const validateClientID = (text: string): boolean => {
  if (/^[a-zA-Z0-9+&@#/%?=~_|`&"*()-{()}<>!:,.;]*$/.test(text)) {
    return true;
  } else {
    return false;
  }
};

export const validateServerData = (text: string): boolean => {
  if (/^[a-zA-Z0-9_.\-:/]*$/.test(text)) {
    return true;
  } else {
    return false;
  }
};

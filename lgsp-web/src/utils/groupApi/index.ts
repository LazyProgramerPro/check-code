import { EHttpMethod } from "src/models/common";

export const formatResources = (operations: any) => {
  const paths = operations?.reduce((curr: any, next: any) => {
    if (curr[next?.target]) {
      curr[next?.target] = [...curr[next.target], next]
    } else {
      curr[next?.target] = [next];
    }
    return curr;
  }, {})
  return paths || {};
}

export const getColorByMethodHttp = (value: EHttpMethod) => {
  switch (value) {
    case EHttpMethod.GET:
      return 'blue';
    case EHttpMethod.PUT:
      return 'orange';
    case EHttpMethod.POST:
      return 'green';
    case EHttpMethod.DELETE:
      return 'red';
    case EHttpMethod.PATCH:
      return 'cyan';
    case EHttpMethod.HEAD:
      return 'purple';
    case EHttpMethod.OPTIONS:
      return 'geekblue';
  }
}

export const getBgColorByMethodHttp = (value: EHttpMethod) => {
  switch (value) {
    case EHttpMethod.GET:
      return '#DCF3FF';
    case EHttpMethod.PUT:
      return '#FFE8C6';
    case EHttpMethod.POST:
      return '#CCFFDB';
    case EHttpMethod.DELETE:
      return '#FFE0E0';
    case EHttpMethod.PATCH:
      return '#E1FFFA';
    case EHttpMethod.HEAD:
      return '#FCD6FF';
    case EHttpMethod.OPTIONS:
      return '#D9CBFF';
  }
}

import {GET} from "../../../../services";

export const generateTestKey = async (apiId: string): Promise<any> => {
  const response = (await GET(`core-svc/publisher-apis/${apiId}/generate-key-test`));
  return response;
};

export const getApiDefinition = async (apiId: string): Promise<any> => {
  return (await GET(`core-svc/publisher-apis/${apiId}/definition`));
};

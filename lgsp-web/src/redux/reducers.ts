import { combineReducers } from 'redux';
import connectResource, { ResourceModuleState } from 'src/modules/ConnectResource/redux/reducers';
import auth, { AuthModuleState } from '../modules/Auth/redux/reducers';
import dashboard, { DashboardModuleState } from '../modules/Dashboard/redux/reducers';
import dataService, { DataServiceModuleState } from '../modules/DataService/redux/reducers';
import dataSource, { DataSourceModuleState } from '../modules/DataServiceDetail/DataSource/redux/reducers';
import query, { QueryModuleState } from '../modules/DataServiceDetail/Query/redux/reducers';
import groupRestApi, { GroupRestApiModuleState } from '../modules/GroupApi/redux/reducers';
import { IGroupApiDetailState } from '../modules/GroupApiDetail/redux/models';
import GroupApiDetail from '../modules/GroupApiDetail/redux/reducers';
import { IGroupApiResourcesState } from '../modules/GroupApiResources/redux/models';
import groupApiResource from '../modules/GroupApiResources/redux/reducers';
import mainPage, { IMainPageState } from '../modules/Homepage/redux/reducers';
import { IModalState } from '../modules/Modal/redux/models';
import modal from '../modules/Modal/redux/reducers';
import restApi, { RestApiModuleState } from '../modules/RestApi/redux/reducers';
import systemInforManager, { ISystemInforManager } from '../modules/SystemInfoManager/redux/reducers';
import user, { UserModuleState } from '../modules/User/redux/reducers';
import servicePublic, { ServicePublicModuleState } from '../modules/ServicePublic/redux/reducers';
import serviceAccessLimit, { ServicesAccessLimitsModuleState } from '../modules/ServiceAccessLimits/redux/reducers';
import driverConnect, { DriverModuleState } from '../modules/DriverConnectRDBMS/redux/reducers';
import apiResource, { ApiResourceModuleState } from '../modules/ApiResources/redux/reducers';
import apiGeneralInformation, {
  ApiGeneralInformationModuleState,
} from '../modules/ApiGeneralInformation/redux/reducers';
import apiEndpointConfiguration, {
  ApiEndpointConfigurationModuleState,
} from '../modules/ApiEndpointConfig/redux/reducers';
import apiBusinessPlan, { ApiBusinessPlanModuleState } from '../modules/ApiBusinessPlan/redux/reducers';
import apiRuntimeConfiguration, {
  ApiRuntimeConfigurationModuleState,
} from '../modules/ApiRuntimeConfiguration/redux/reducers';
import apiDocument, { ApiDocumentModuleState } from '../modules/ApiDocument/redux/reducers';
import apiDeployment, { ApiDeploymentModuleState } from '../modules/ApiDeployment/redux/reducers';

import dataPublic, { DataPublicModuleState } from 'src/modules/DataPublic/redux/reducers';
import listDataService, { ListDataServicesModulesState } from 'src/modules/ManagerDataServiceList/redux/reducers';

import dataPublicDetail, { DataPublicDetailModuleState } from 'src/modules/DataPublicDetail/redux/reducers';
import taskRunPeriodically, { TaskRunPeriodicallyModulesState } from 'src/modules/TaskRunPeriodically/redux/reducers';

import createDataService, { CreateDataServiceModuleState } from 'src/modules/ManagerDataServiceAddNew/redux/reducers';
import dataGeneral, { DataGeneralModuleState } from 'src/modules/GeneralCofiguratuion/redux/reducers';
import dataCaching, { CachingModuleState } from 'src/modules/ManagerCaching/redux/reducers';
import apiDefinition, { ApiDefinitionModuleState } from 'src/modules/GroupApiConfigPage/redux/reducers';
import dataLog, { LogModuleState } from 'src/modules/SystemLog/redux/reducers';
import detailDataService, { DetailDataServiceModuleState } from 'src/modules/ManagerDataServiceDetails/redux/reducers';
import statisticalPageUser, { StatisticalPageModuleState } from 'src/modules/StatisticalPage/redux/reducers';
import dataGateway, { DataGatewayModuleState } from 'src/modules/DataGateway/redux/reducers';
import dataLDAP, { DataLDAPModuleState } from 'src/modules/ConfigurationLDAP/redux/reducers';
export interface RootState {
  auth: AuthModuleState;
  dashboard: DashboardModuleState;
  user: UserModuleState;
  groupRestApi: GroupRestApiModuleState;
  restApi: RestApiModuleState;
  dataService: DataServiceModuleState;
  dataSource: DataSourceModuleState;
  query: QueryModuleState;
  mainPage: IMainPageState;
  systemInforManager: ISystemInforManager;
  modal: IModalState;
  GroupApiDetail: IGroupApiDetailState;
  groupApiResource: IGroupApiResourcesState;
  apiResource: ApiResourceModuleState;
  apiEndpointConfiguration: ApiEndpointConfigurationModuleState;
  apiRuntimeConfiguration: ApiRuntimeConfigurationModuleState;
  apiDocument: ApiDocumentModuleState;
  apiGeneralInformation: ApiGeneralInformationModuleState;
  apiBusinessPlan: ApiBusinessPlanModuleState;
  apiDeployment: ApiDeploymentModuleState;
  dataPublic: DataPublicModuleState;
  dataPublicDetail: DataPublicDetailModuleState;
  servicePublic: ServicePublicModuleState;
  listDataService: ListDataServicesModulesState;
  createDataService: CreateDataServiceModuleState;
  driverConnect: DriverModuleState;
  dataGeneral: DataGeneralModuleState;
  taskRunPeriodically: TaskRunPeriodicallyModulesState;
  connectResource: ResourceModuleState;
  detailDataService: DetailDataServiceModuleState;
  serviceAccessLimit: ServicesAccessLimitsModuleState;
  dataCaching: CachingModuleState;
  apiDefinition: ApiDefinitionModuleState;
  dataLog: LogModuleState;
  statisticalPageUser: StatisticalPageModuleState;
  dataGateway: DataGatewayModuleState;
  dataLDAP: DataLDAPModuleState;
}

export default combineReducers<RootState>({
  auth,
  dashboard,
  user,
  groupRestApi,
  restApi,
  dataService,
  dataSource,
  dataPublic,
  dataPublicDetail,
  servicePublic,
  query,
  mainPage,
  systemInforManager,
  apiResource,
  apiGeneralInformation,
  apiBusinessPlan,
  apiEndpointConfiguration,
  apiDeployment,
  modal,
  GroupApiDetail,
  groupApiResource,
  listDataService,
  createDataService,
  driverConnect,
  apiDocument,
  apiRuntimeConfiguration,
  connectResource,
  taskRunPeriodically,
  detailDataService,
  serviceAccessLimit,
  dataGeneral,
  dataCaching,
  apiDefinition,
  dataLog,
  statisticalPageUser,
  dataGateway,
  dataLDAP,
});

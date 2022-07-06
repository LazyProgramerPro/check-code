import { all } from 'redux-saga/effects';
import authSaga from '../modules/Auth/redux/sagas';
import dashboardSaga from '../modules/Dashboard/redux/sagas';

//new
import userSaga from '../modules/User/redux/sagas';
import groupApiSaga from '../modules/GroupApi/redux/sagas';
import restApiSaga from '../modules/RestApi/redux/sagas';
import dataServiceSaga from '../modules/DataService/redux/sagas';
import dataSourceSaga from '../modules/DataServiceDetail/DataSource/redux/sagas';
import querySaga from '../modules/DataServiceDetail/Query/redux/sagas';
import mainPageSaga from '../modules/Homepage/redux/sagas';
import systemInforManager from '../modules/SystemInfoManager/redux/sagas';
import groupApiDetailSaga from '../modules/GroupApiDetail/redux/sagas';
import apiResourceSaga from '../modules/ApiResources/redux/sagas/';
import apiGeneralInformationSaga from '../modules/ApiGeneralInformation/redux/sagas';
import apiBusinessPlanSaga from '../modules/ApiBusinessPlan/redux/sagas';
import apiEndpointConfigurationSaga from '../modules/ApiEndpointConfig/redux/sagas';
import apiRuntimeConfigurationSaga from '../modules/ApiRuntimeConfiguration/redux/sagas';
import apiDocumentSaga from '../modules/ApiDocument/redux/sagas';
import dataPublicSaga from '../modules/DataPublic/redux/sagas';
import dataPublicDetailSaga from '../modules/DataPublicDetail/redux/sagas';
import listDataService from '../modules/ManagerDataServiceList/redux/sagas';
import createDataSource from '../modules/ManagerDataServiceAddNew/redux/sagas';
import taskRunPeriodically from '../modules/TaskRunPeriodically/redux/sagas';
import * as commonSaga from './common-saga';
import dataResourceSaga from '../modules/ConnectResource/redux/sagas';
import detailDataService from '../modules/ManagerDataServiceDetails/redux/sagas';
import servicePublicSaga from '../modules/ServicePublic/redux/sagas';
import serviceAccessLimit from '../modules/ServiceAccessLimits/redux/sagas';
import driverConnectSaga from '../modules/DriverConnectRDBMS/redux/sagas';
import generalSaga from '../modules/GeneralCofiguratuion/redux/saga';
import cachingSaga from '../modules/ManagerCaching/redux/sagas';
import apiDefinition from '../modules/GroupApiConfigPage/redux/saga';
import logSaga from '../modules/SystemLog/redux/sagas';
import statisticPageSaga from '../modules/StatisticalPage/redux/sagas';
import dataGatewaySaga from '../modules/DataGateway/redux/sagas';
import dataLDAPSaga from '../modules/ConfigurationLDAP/redux/sagas';
export default function* rootSaga() {
  yield all([
    authSaga(),
    dashboardSaga(),
    userSaga(),
    groupApiSaga(),
    restApiSaga(),
    dataServiceSaga(),
    dataSourceSaga(),
    dataResourceSaga(),
    querySaga(),
    dataPublicSaga(),
    dataPublicDetailSaga(),
    servicePublicSaga(),
    driverConnectSaga(),
    commonSaga.checkErrorAsync(),
    mainPageSaga(),
    systemInforManager(),
    groupApiDetailSaga(),
    apiResourceSaga(),
    apiGeneralInformationSaga(),
    apiBusinessPlanSaga(),
    listDataService(),
    createDataSource(),
    apiEndpointConfigurationSaga(),
    apiRuntimeConfigurationSaga(),
    apiDocumentSaga(),
    taskRunPeriodically(),
    detailDataService(),
    serviceAccessLimit(),
    generalSaga(),
    cachingSaga(),
    apiDefinition(),
    logSaga(),
    statisticPageSaga(),
    dataGatewaySaga(),
    dataLDAPSaga(),
  ]);
}

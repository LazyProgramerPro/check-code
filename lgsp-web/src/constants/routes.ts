import ChangePasswordAccount from 'src/modules/ChangePasswordAccount';
import ConfigurationLDAP from 'src/modules/ConfigurationLDAP';
import ConfigurationLDAPCreate from 'src/modules/ConfigurationLDAPCreate';
import ConnectResourcePage from 'src/modules/ConnectResource/components/ConnectResourcePage';
import ContactInformationSystem from 'src/modules/ContactInformationSystem';
import DataPublicPage from 'src/modules/DataPublic/components/DataPublicPage';
import DetailPage from 'src/modules/DataPublicDetail/components/DetailPage';
import DataServicePage from 'src/modules/DataService/components/DataServicePage';
import DataSourcePage from 'src/modules/DataServiceDetail/DataSource/components/DataSourcePage';
import QueryPage from 'src/modules/DataServiceDetail/Query/components/QueryPage';
import ForgotPassword from 'src/modules/ForgotPassword';
import GeneralPage from 'src/modules/GeneralCofiguratuion/components/GeneralPage';
import GroupApiPage from 'src/modules/GroupApi/components/GroupApiPage';
import GroupApiConfigPage from 'src/modules/GroupApiConfigPage';
import InteractionHistory from 'src/modules/InteractionHistory';
import CreateDataServiceForm from 'src/modules/ManagerDataServiceAddNew/CreateDataServiceForm';
import ManagerDataServiceDetails from 'src/modules/ManagerDataServiceDetails';
import ManagerDataServiceList from 'src/modules/ManagerDataServiceList';
import ManagerDataServiceUpdate from 'src/modules/ManagerDataServiceUpdate';
import Permissions from 'src/modules/Permissions';
import Questions from 'src/modules/Questions';
import QuestionsPublish from 'src/modules/QuestionsPublish';
import QuestionsWaiting from 'src/modules/QuestionsWaiting';
import ResetPassword from 'src/modules/ResetPassword';
import RestApiPage from 'src/modules/RestApi/components/RestApiPage';
import ServiceAccessLimits from 'src/modules/ServiceAccessLimits';
import ServicePublicPage from 'src/modules/ServicePublic/components/ServicePublicPage';
import SlideInformationSystem from 'src/modules/SlideInformationSystem.tsx';
import StatisticalPage from 'src/modules/StatisticalPage/components/StatisticalPage';
import SystemInfoManager from 'src/modules/SystemInfoManager';
import IntroductionContent from 'src/modules/SystemInfoManager/components/IntroductionContent';
import UpdateContent from 'src/modules/SystemInfoManager/components/UpdateContent';
import SystemLogPage from 'src/modules/SystemLog/components/SystemLogPage';
import TaskRunPeriodically from 'src/modules/TaskRunPeriodically';
import UserDetailPage from 'src/modules/User/components/UserDetailPage';
import UserPage from 'src/modules/User/components/UserPage';
import Login from '../modules/Auth/pages/login';
import DataGatewayPage from '../modules/DataGateway/components/DataGatewayPage';
import DriverConnectPage from '../modules/DriverConnectRDBMS/components/DriverConnectPage';
import ManagerCachingPage from '../modules/ManagerCaching/components/ManagerCachingPage';
import Register from '../modules/Register';
import ServicePage from '../modules/ServicePage';
import MyAccountPage from '../modules/User/components/MyAccountPage';
import NotFoundPage from '../modules/NotFound/NotFoundPage';
import UpdateLDAP from 'src/modules/ConfigurationLDAP/components/UpdateLDAP';
import Homepage from "../modules/Homepage/homepage";

export interface IRoute {
  name: string;
  path: string;
  component: React.ComponentType<any>;
  exact: boolean;
  subMenu?: string;
}

export const PUBLIC_ROUTES: IRoute[] = [
  {
    name: 'home',
    path: '/home',
    component: Homepage,
    exact: false,
  },
  {
    name: 'login',
    path: '/login',
    component: Login,
    exact: false,
  },
  {
    name: 'register',
    path: '/register',
    component: Register,
    exact: false,
  },
  {
    name: 'service',
    path: '/service',
    component: ServicePage,
    exact: false,
  },
  {
    name: 'forgot-password',
    path: '/forgot-password',
    component: ForgotPassword,
    exact: false,
  },
  {
    name: 'reset-password',
    path: '/reset-password/:token',
    component: ResetPassword,
    exact: false,
  },
];

export const PRIVATE_ROUTES: IRoute[] = [
  {
    name: 'users',
    path: '/manager-account/users',
    component: UserPage,
    exact: false,
  },
  {
    name: 'permissions',
    path: '/manager-account/permissions',
    component: Permissions,
    exact: false,
  },
  {
    name: 'interaction-history',
    path: '/manager-account/interaction-history',
    component: InteractionHistory,
    exact: false,
  },
  {
    name: 'group-api',
    path: '/manager-infor/group-api-config',
    component: GroupApiPage,
    exact: true,
  },
  {
    name: 'group-api-config',
    path: '/manager-infor/group-api-config/:apiId',
    component: GroupApiConfigPage,
    exact: false,
  },
  {
    name: '/group-rest-api-detail',
    path: '/group-rest-api-detail/:apiId',
    component: RestApiPage,
    exact: false,
  },
  {
    name: 'data-service',
    path: '/manager-infor/data-service',
    component: DataServicePage,
    exact: false,
  },
  {
    name: 'data-pulic-detail',
    path: '/manager-infor/data-public/detail/:id',
    component: DetailPage,
    exact: false,
  },
  {
    name: 'data-public',
    path: '/manager-infor/data-public',
    component: DataPublicPage,
    exact: false,
  },
  {
    name: 'data-service-detail',
    path: '/data-service-detail',
    component: DataSourcePage,
    exact: false,
  },
  {
    name: 'data-source-detail',
    path: '/data-source-detail/:dataSourceId',
    component: QueryPage,
    exact: false,
  },
  {
    name: 'contact-information-system',
    path: '/system-infor-manager/system-infor-manager/contact/:id',
    component: ContactInformationSystem,
    exact: false,
  },
  {
    name: 'information-system',
    path: '/system-infor-manager/system-infor-manager/slides/:id',
    component: SlideInformationSystem,
    exact: false,
  },
  {
    name: 'introduction-content',
    path: '/system-infor-manager/system-infor-manager/infor',
    component: IntroductionContent,
    exact: false,
  },
  {
    name: 'update-content',
    path: '/system-infor-manager/system-infor-manager/update-infor/:id',
    component: UpdateContent,
    exact: false,
  },
  {
    name: 'update-LDAP',
    path: '/detail-configuration-ldap/:id',
    component: UpdateLDAP,
    exact: false,
  },
  {
    name: 'system-infor-manager',
    path: '/system-infor-manager',
    component: SystemInfoManager,
    exact: false,
  },
  {
    name: 'update-data-service',
    path: '/manager-data-services/manager-data-services/update/:dataServiceId',
    component: ManagerDataServiceUpdate,
    exact: false,
  },
  {
    name: 'add-new-data-service',
    path: '/manager-data-services/manager-data-services/add-new',
    // component: ManagerDataServiceAddNew,
    component: CreateDataServiceForm,
    exact: false,
  },
  {
    name: 'manager-data-service-details',
    path: '/manager-data-services/manager-data-services/:dataServiceId',
    component: ManagerDataServiceDetails,
    exact: false,
  },
  {
    name: 'task-run-periodically',
    path: '/manager-data-services/task-run-periodically',
    component: TaskRunPeriodically,
    exact: false,
  },
  {
    name: 'manager-data-services',
    path: '/manager-data-services/manager-data-services',
    component: ManagerDataServiceList,
    exact: false,
  },
  {
    name: 'task-run-periodically',
    path: '/manager-data-services/task-run-periodically',
    component: TaskRunPeriodically,
    exact: false,
  },
  {
    name: 'data-gateway',
    path: '/configuration/data-gateway',
    component: DataGatewayPage,
    exact: false,
  },
  {
    name: 'driver-connect-resource',
    path: '/configuration/driver-connect-resource',
    component: ConnectResourcePage,
    exact: false,
  },
  {
    name: 'driver-connect-RDBMS',
    path: '/configuration/driver-connect-RDBMS',
    component: DriverConnectPage,
    exact: false,
  },
  {
    name: 'service-public',
    path: '/configuration/service-public',
    component: ServicePublicPage,
    exact: false,
  },
  {
    name: 'general',
    path: '/configuration/general',
    component: GeneralPage,
    exact: false,
  },

  {
    name: 'caching',
    path: '/configuration/caching',
    component: ManagerCachingPage,
    exact: false,
  },
  {
    name: 'system-log',
    path: '/system-log',
    component: SystemLogPage,
    exact: false,
  },
  {
    name: 'statistical',
    path: '/statistical',
    component: StatisticalPage,
    exact: false,
  },
  {
    name: 'service-access-limitsservice-access-limits',
    path: '/configuration/service-access-limits',
    component: ServiceAccessLimits,
    exact: false,
  },
  {
    name: 'user-detail',
    path: '/user-detail/:accountId',
    component: UserDetailPage,
    exact: false,
  },
  {
    name: 'my-account',
    path: '/my-account/:accountId',
    component: MyAccountPage,
    exact: false,
  },
  {
    name: 'change-password',
    path: '/change-password/:user',
    component: ChangePasswordAccount,
    exact: false,
  },
  {
    name: 'questions-publish',
    path: '/questions/questions-publish',
    component: QuestionsPublish,
    exact: false,
  },
  {
    name: 'questions-waiting',
    path: '/questions/questions-waiting',
    component: QuestionsWaiting,
    exact: false,
  },
  {
    name: 'questions',
    path: '/questions',
    component: Questions,
    exact: false,
  },
  {
    name: 'create-configuration-ldap',
    path: '/create-configuration-ldap',
    component: ConfigurationLDAPCreate,
    exact: false,
  },
  {
    name: 'configuration-ldap',
    path: '/configuration-ldap',
    component: ConfigurationLDAP,
    exact: false,
  },
  {
    name: 'not-found',
    path: '/not-found',
    component: NotFoundPage,
    exact: false,
  },
];

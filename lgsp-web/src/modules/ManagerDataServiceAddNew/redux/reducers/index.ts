import {combineReducers} from 'redux';
import {
  CreateDataServiceState,
  CreateDataSourceState,
  CreateOperationState,
  CreateQueryState,
  CreateResourceState,
} from '../models';
import {createDataServiceReducers} from './create_dataService';
import {createDataSourceReducers} from './create_dataSource';
import {createOperationReducers} from './create_operation';
import {createQueryReducers} from './create_query';
import {createResourceReducers} from './create_resource';



export interface CreateDataServiceModuleState {
  createDataSource: CreateDataSourceState;
  createQuery: CreateQueryState;
  createResource: CreateResourceState;
  createOperation: CreateOperationState;
  createDataService: CreateDataServiceState;
}

export default combineReducers<CreateDataServiceModuleState>({
  createDataSource: createDataSourceReducers,
  createQuery: createQueryReducers,
  createResource: createResourceReducers,
  createOperation: createOperationReducers,
  createDataService: createDataServiceReducers,
});

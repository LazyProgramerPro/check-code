import React, {useState} from 'react';
import {Button, Icon, Input, Popconfirm, Tree} from 'antd';
import {connect} from 'react-redux';
import Styled from '../styled/treeStyled';
import {
  deleteDepartment,
  getDepartments,
  startCreateDepartment,
  startUpdateDepartment,
} from '../../../actions/departmentAction';
import CreateDepartment from './CreateDepartment';
import UpdateDepartment from './UpdateDepartment';

const {TreeNode} = Tree;
const {Search} = Input;

interface IProps {
  data: any;
  onStartCreate: any;
  onStartEdit: any;
  onSelect: any;
  onDeleteDepartment: any;
}

interface IDepartment {
  parent_id: any;
  id?: string;
  name?: string;
  code?: string;
  onSelect?: any;
}

const Departments = (props: IProps) => {
  const [option, setOption] = useState({
    expandedKeys: [],
    searchValue: '',
    autoExpandParent: true,
    showEdit: false,
    showCreate: false,
    showAddUser: false,
  });

  const [department, setDepartment] = useState<IDepartment>({parent_id: null});

  const tree = (props.data && props.data.rows) || [];

  const onExpand = (expandedKeys: any) => {
    setOption({
      ...option,
      expandedKeys,
      autoExpandParent: false,
    });
  };

  const dataList: any = [];
  const generateList = (data: any) => {
    for (let i = 0; i < data.length; i++) {
      const node = data[i];
      const {name, id} = node;
      dataList.push({key: id, title: name});
      if (node.children) {
        generateList(node.children);
      }
    }
  };
  generateList(tree);

  const getParentKey = (key: any, tree: any) => {
    let parentKey: any;
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];
      if (node.children) {
        if (node.children.some((item: { id: any }) => item.id === key)) {
          parentKey = node.id;
        } else if (getParentKey(key, node.children)) {
          parentKey = getParentKey(key, node.children);
        }
      }
    }
    return parentKey;
  };

  const onChange = (e: any) => {
    const {value} = e.target;
    const expandedKeys = dataList
      .map((item: any) => {
        if (item.title.indexOf(value) > -1) {
          return getParentKey(item.key, tree);
        }
        return null;
      })
      .filter((item: any, i: any, self: any) => item && self.indexOf(item) === i);
    setOption({
      ...option,
      expandedKeys,
      searchValue: value,
      autoExpandParent: true,
    });
  };

  const showCreate = (e: any, data: IDepartment) => {
    props.onStartCreate();
    setOption({
      ...option,
      showCreate: true,
    });
    setDepartment({
      ...department,
      parent_id: data.parent_id,
    });
  };

  const showEdit = (e: any, data: IDepartment) => {
    props.onStartEdit();
    setOption({
      ...option,
      showEdit: true,
    });
    setDepartment({
      parent_id: data.parent_id,
      id: data.id,
      code: data.code,
      name: data.name,
    });
  };

  const createDepartmentDone = () => {
    setOption({
      ...option,
      showCreate: false,
    });
  };

  const updateDepartmentDone = () => {
    setOption({
      ...option,
      showEdit: false,
    });
  };
  const onSelect = (id: any) => {
    if (typeof props.onSelect === 'function') {
      props.onSelect(id);
    }
  };
  const text = 'Bạn chắc chắn muốn xóa đơn vị';

  const confirm = (id: string) => {
    props.onDeleteDepartment(id);
  };

  const {searchValue, expandedKeys, autoExpandParent} = option;
  const loop = (data: any) =>
    data.map((item: any) => {
      const index = item.name.indexOf(searchValue);
      const beforeStr = item.name.substr(0, index);
      const afterStr = item.name.substr(index + searchValue.length);
      const treeActions = (
        <div className="item-row-actions">
          <Button type={'default'} onClick={e => showCreate(e, {parent_id: item.id})}>
            <Icon type="plus"/>
          </Button>
          {item.parent_id && (
            <Popconfirm
              placement="top"
              title={text}
              onConfirm={() => confirm(item.id)}
              okText="Đồng Ý"
              cancelText="Hủy"
            >
              <Button type={'default'}>
                <Icon type="minus"/>
              </Button>
            </Popconfirm>
          )}
          <Button type={'default'} onClick={e => showEdit(e, item)}>
            <Icon type="edit"/>
          </Button>
        </div>
      );
      const title =
        index > -1 ? (
          <div className="item-row" onClick={() => onSelect(item.id)}>
            {beforeStr}
            <span className="filter-match">{searchValue}</span>
            {afterStr}
            {treeActions}
          </div>
        ) : (
          <div className="item-row" onClick={() => onSelect(item.id)}>
            {item.name}
            {treeActions}
          </div>
        );
      if (item.children) {
        return (
          <TreeNode key={item.id} title={title}>
            {loop(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.id} title={title}/>;
    });

  return (
    <Styled.Container>
      <div>
        <Search style={{marginBottom: 8}} placeholder="Search" onChange={onChange}/>
        <Tree
          onExpand={onExpand}
          defaultExpandAll={true}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
        >
          {loop(tree)}
        </Tree>
      </div>
      {option.showCreate && department.parent_id ? (
        <CreateDepartment department={department} onClose={() => createDepartmentDone()}/>
      ) : null}
      {option.showEdit && department.id ? (
        <UpdateDepartment department={department} onClose={() => updateDepartmentDone()}/>
      ) : null}
    </Styled.Container>
  );
};

const mapStateToProps = (state: any) => {
  return {
    loading: state.department.loading,
    data: state.department.data,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  onLoadDepartment: () => {
    return dispatch(getDepartments());
  },
  onStartCreate: () => {
    return dispatch(startCreateDepartment());
  },
  onStartEdit: () => {
    return dispatch(startUpdateDepartment());
  },
  onDeleteDepartment: (data: string) => {
    return dispatch(deleteDepartment(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Departments);

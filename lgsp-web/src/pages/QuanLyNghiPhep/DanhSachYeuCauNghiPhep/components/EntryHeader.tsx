import React, {Component} from 'react';
import {Button, Col, Icon, Row} from 'antd';
import RepuestForm from './RepuestForm';

class CollectionsPage extends Component<any, any> {
  state = {
    visible: false,
  };
  formRef: any;

  showModal = () => {
    this.setState({visible: true});
  };

  handleCancel = () => {
    this.setState({visible: false});
  };

  handleCreate = () => {
    const {form} = this.formRef.props;
    form.validateFields((err: any, values: any) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({visible: false});
    });
  };

  saveFormRef = (formRef: any) => {
    this.formRef = formRef;
  };

  render() {
    return (
      <div className="entryHeader">
        <Row>
          <Col md={16}>
            <div className="tmp-title-page-size20">Danh sách yêu cầu vắng mặt</div>
          </Col>
          <Col className="d-flex" md={8}>
            <div className="tmp-btn">
              <Button>
                <Icon type="check-circle"/> Duyệt tất cả
              </Button>
            </div>
            <div className="tmp-btn">
              <Button>
                <Icon type="delete"/> Xoá tất cả
              </Button>
            </div>
            <div className="tmp-btn">
              <div>
                <Button onClick={this.showModal}>
                  <Icon type="plus"/> Tạo yêu cầu
                </Button>
                <RepuestForm
                  wrappedComponentRef={this.saveFormRef}
                  visible={this.state.visible}
                  onCancel={this.handleCancel}
                  onCreate={this.handleCreate}
                />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default CollectionsPage;

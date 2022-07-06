import React, { useState, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import defaultPhoto from './images/employee.png';
import { RootState } from 'src/redux/reducers';
import env from 'src/configs/env';
import {
	Wrapper,
	Heading,
	Fullname,
	ImageBox,
	Details,
	InfoBox,
	InfoTitle,
	InfoValue
} from './styled';

const mapStateToProps = (rootState: RootState) => ({
	// userInfo: rootState.auth.auth.data,
	statisticByMonth: rootState.dashboard.statisticByMonth,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;


const Employee = ({ statisticByMonth }: PropsFromRedux) => {
	const urlDocuments = env.apiUri + "/hrmcoresvc/documents/";

	const [userPhoto, setUserPhoto] = useState('');
	const [fullName, setFullName] = useState('');
	const [employeeCode, setEmployeeCode] = useState('');
	const [jobTitle, setJobTitle] = useState('');
	const [department, setDepartment] = useState('');

	useEffect(() => {
		

		if (statisticByMonth && statisticByMonth.item) {
			const employee = statisticByMonth.item.employee;
			setUserPhoto(employee.photo);
			setFullName(employee.full_name);
			setEmployeeCode(employee.code);
			employee.jobTitle && setJobTitle(employee.jobTitle.name);
			employee.department && setDepartment(employee.department.name);
			// setDepartment(employee.department);
		}

	}, [statisticByMonth?.item]);


	return (
		<Wrapper>
			<Heading>Thông tin chung</Heading>

			<ImageBox photo={userPhoto ? userPhoto : defaultPhoto} />

			<Details>
				<Fullname>{fullName}</Fullname>
				<InfoBox>
					<InfoTitle>Mã nhân viên</InfoTitle>
					<InfoValue>{employeeCode}</InfoValue>
				</InfoBox>
				<InfoBox>
					<InfoTitle>Chức vụ</InfoTitle>
					<InfoValue>{jobTitle}</InfoValue>
				</InfoBox>
				<InfoBox>
					<InfoTitle>Đơn vị</InfoTitle>
					<InfoValue>{department}</InfoValue>
				</InfoBox>
			</Details>
		</Wrapper>
	);
};

export default connector(Employee);

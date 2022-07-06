import React from 'react';
import UserAccessServiceSearch from './UserAccessServiceSearch';
import UserAccessServiceDataTable from './UserAccessServiceDataTable';

const UserAccessServiceContent = () => {
  return (
    <div className="mt-4">
      {/* <UserAccessServiceSearch /> */}
      <UserAccessServiceDataTable />
    </div>
  );
};

export default UserAccessServiceContent;

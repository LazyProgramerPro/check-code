import React from 'react';
import { useParams } from 'react-router';
import UpdateDataServiceForm from "../ManagerDataServiceAddNew/UpdateDataServiceForm";

export default function ManagerDataServiceUpdate() {
  const params: any = useParams();

  return <UpdateDataServiceForm dataServiceId={params.dataServiceId} />;
}

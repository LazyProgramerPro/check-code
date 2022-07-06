import React, {useState} from 'react';
import { Button, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { dowloadAll } from '../redux/service/apis';
import Loading from "../../../components/Loading";


export default function DownDriver() {

  const [loading, setLoading] = useState(false);

  const turnOffLoading = () => {
    setLoading(false);
  }

  const handleDownloadAll = () => {
    setLoading(true);
    dowloadAll(null, turnOffLoading);
  };

  return (
    <>
      <>
        <Button icon="database" onClick={record => handleDownloadAll()}>
          Tải xuống toàn bộ driver
        </Button>
        {loading ? <Loading/> : null}
      </>
    </>
  );
}

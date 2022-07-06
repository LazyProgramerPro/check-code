import React, {useEffect} from "react";
import SwaggerUI from "swagger-ui-react";
import PropTypes from "prop-types";


interface IProps {
  spec: string,
  api?: string,
  accessTokenProvider?: string,
  authorizationHeader: string,
  onComplete?: ((e: any) => void) | undefined;
  schemaHiding?: boolean
}

const MySwaggerUI = (props: IProps) => {

  const disableAuthorizeAndInfoPlugin =  () => {
    if(props.schemaHiding == true){
      return {
        wrapComponents: {
          info: () => () => null,
          authorizeBtn: () => () => null,
          infoBasePath: () =>  null,
          topBar: () =>  null,
          servers: () => null,
          schema: () => null,
        },
      };
    }else {
      return {
        wrapComponents: {
          info: () => () => null,
          authorizeBtn: () => () => null
        },
      };
    }

  };

  const requestInterceptor = (req: any) => {
    if(props.accessTokenProvider){
      req.headers[props.authorizationHeader] = props.accessTokenProvider
    }

    return req;
  }

  return (
    <>
      <SwaggerUI
        spec={props.spec}
        defaultModelsExpandDepth={-1}
        defaultModelExpandDepth={-1}
        plugins={[disableAuthorizeAndInfoPlugin]}
        requestInterceptor={requestInterceptor}
        onComplete={props.onComplete}
      />
    </>
  );
}

MySwaggerUI.propTypes = {
  accessTokenProvider: PropTypes.func.isRequired,
  authorizationHeader: PropTypes.string.isRequired,
  api: PropTypes.shape({
    context: PropTypes.string.isRequired,
  }).isRequired,
  spec: PropTypes.string.isRequired,
};
export default MySwaggerUI;

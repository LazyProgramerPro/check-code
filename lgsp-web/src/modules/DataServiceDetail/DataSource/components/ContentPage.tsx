import React from "react";
import SearchBar from "./SearchBar";
import DataServiceInfo from "./DataServiceInfo";
import DataTable from "./DataTable";


export default function ContentPage(){

  return(
    <>
      <SearchBar/>
      <DataServiceInfo/>
      <DataTable/>
    </>
  )
}

import React from "react";
import SearchBar from "./SearchBar";
import DataSourceInfo from "./DataSourceInfo";
import DataTable from "./DataTable";

export default function ContentPage(){
  return(
    <>
      <SearchBar/>
      <DataSourceInfo/>
      <DataTable/>
    </>
  )
}

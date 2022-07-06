import React from "react";
import SearchBar from "./SearchBar";
import DataTable from "./DataTable";
import GroupDataInfo from "./GroupDataInfo";

export default function ContentPage(){
  return(
    <>
      <SearchBar/>
      <GroupDataInfo/>
      <DataTable/>
    </>
  )
}

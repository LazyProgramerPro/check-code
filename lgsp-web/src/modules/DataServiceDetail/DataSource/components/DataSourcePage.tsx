import React from "react";
import ListButtonControl from "./ListButtonControl";
import ContentPage from "./ContentPage";

export default function DataSourcePage(){
  return(
    <div className="contentPage">
      <ListButtonControl/>
      <ContentPage/>
    </div>
  )
}

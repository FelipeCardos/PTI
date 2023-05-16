import React from "react";
import Carrossel from "../Carrossel/Carrossel";
import FeedProducts from "../FeedProducts/FeedProducts";
import CategoryBar from "./CategoryBar";

export default function Home(props){
    return (
      <>
        <CategoryBar/>
        <Carrossel/>
        <FeedProducts/>        
      </>
      );
}
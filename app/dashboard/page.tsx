"use client"
import { useState } from "react";

import SearchSection from "./_components/SearchSection"
import TempleteList from "./_components/TempleteList";

export default function Dashboard() {
  const [userSearchInput, setuserSearchInput]=useState<string>()
    return (
      <>
        
        <SearchSection onSearchInput={(value:string)=>setuserSearchInput(value)
        }/>
        <TempleteList userSearchInput={userSearchInput} />
      </>
    );
  }
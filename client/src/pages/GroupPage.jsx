import React, { useEffect, useState } from 'react'
import { useLoaderData, useParams } from 'react-router-dom';
const GroupPage = () => {
    const {subpage} = useParams();
    const res = useLoaderData();
    const groupData = res.Groups[0];
    useEffect(() => {
      console.log(typeof (res.Groups));
      console.log(res.Groups);
      
      console.log(groupData);
    }, [res])
  return (
    <div className="flex h-full flex-col min-h-screen bg-cyan-600 text-white p-3 border border-white">
      <h1 className="flex text-4xl m-1 p-3 text-white justify-start self-center">{groupData.name}</h1>
      <div>
        <p className="flex flex-row font-bold">Created By&nbsp; <span className="flex underline font-thin">{groupData.createdBy.name}</span></p>
      </div>
      <div className="flex flex-row border p-2 border-b-2 border-t-0 border-r-0 border-l-0 border-b-slate-200">
        <p className="flex flex-row flex-nowrap w-full">Description :</p>
        <p className="justify-self-stretch">{groupData.description}</p>
      </div>
      <div className="flex flex-row border p-2 border-b-2 border-t-0 border-r-0 border-l-0 border-b-slate-200">
        <p className="flex flex-row flex-nowrap w-full">Rules :</p>
        <p className="justify-self-stretch">{groupData.rules}</p>
      </div>
      {/* 1. Members of the group and moderators  - books , bookshelves
          2. Discussions  
          3. Add a discussion   */}

        {subpage === "Group Troup" && <ProfilePage handleLogout={handleLogout}  />}
        {subpage === "Discussions" && <OrderPage  user={user} setUser={setUser} orders={orders} />}
        { subpage === "Start your discussions" && <CreateDiscussion/>}

    </div>
  )
}

export default GroupPage

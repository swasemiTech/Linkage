"use client";

import React, { useEffect } from 'react'
import UserLayout from '@/layout/UserLayout/page'
import DashboardLayout from '../../layout/DashboardLayout/page'
import { useSelector, useDispatch } from 'react-redux'
import { getAllUsers } from '@/config/redux/action/authAction'


export default function DiscoverPage() {

  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();


  useEffect(() => {
    if (!authState.all_profile_fetched) {
      dispatch(getAllUsers());
    }
  },[]);


  return (
    <UserLayout>
      <DashboardLayout>
        <h1>Discover</h1>
      </DashboardLayout>
    </UserLayout>
  )
}

"use client";

import React, { Children, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "@/config/redux/action/postAction";
import { getAboutUser } from "@/config/redux/action/authAction";
import UserLayout from '@/layout/UserLayout/page'
import DashboardLayout from '@/layout/DashboardLayout/page'

const Dashboard = () => {

    const router = useRouter();

    const dispatch = useDispatch();
    const authState = useSelector((state) => state.auth);


    //get all posts from the server logic
    useEffect(() => {
        if (authState.isTokenThere) {
            dispatch(getAllPosts());
            dispatch(getAboutUser({ token: localStorage.getItem("token") }));
        }
    }, [authState.isTokenThere]);

    return (
        <UserLayout>
            <DashboardLayout>
                <h1>Hii</h1>
            </DashboardLayout>
        </UserLayout>
    )
}

export default Dashboard;
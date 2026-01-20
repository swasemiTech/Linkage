"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "@/config/redux/action/postAction";
import { getAboutUser } from "@/config/redux/action/authAction";
import UserLayout from '@/layout/UserLayout/page'

const Dashboard = () => {

    const router = useRouter();

    const dispatch = useDispatch();
    const authState = useSelector((state) => state.auth);
    //use states
    const [isTokenThere, setIsTokenThere] = useState(false);

    //if the token not exists then redirect the user to the login page
    useEffect(() => {
        if (localStorage.getItem("token") == null) {
            router.push("/login");
        }
    }, []);

    //get all posts from the server logic
    useEffect(() => {
        dispatch(getAllPosts());
        dispatch(getAboutUser({ token: localStorage.getItem("token") }));
    }, []);

    return (
        <UserLayout>
            <h1>{authState.profileFetched &&
                <div>Hey, {authState.user.userId.name}</div>
            }</h1>
        </UserLayout>
    )
}

export default Dashboard;
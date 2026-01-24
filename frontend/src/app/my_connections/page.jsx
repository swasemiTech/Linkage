"use client";

import React from 'react'
import UserLayout from '@/layout/UserLayout/page'
import DashboardLayout from '../../layout/DashboardLayout/page'

export default function MyConnectionsPage() {
    return (
        <UserLayout>
            <DashboardLayout>
                <h1>My Connections</h1>
            </DashboardLayout>
        </UserLayout>
    )
}

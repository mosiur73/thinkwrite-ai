"use client"
import { useSession } from 'next-auth/react';
import React from 'react';

const UserInfo = () => {
    const session =useSession()
    return (
        <div>
            <p>{JSON.stringify(session)}</p>
        </div>
    );
};

export default UserInfo;
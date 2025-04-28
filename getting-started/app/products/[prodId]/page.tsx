"use client";
import { useParams, useRouter } from 'next/navigation';
import React from 'react'

const index = () => {
    const params = useParams();
    const router = useRouter();

    const {prodId} = params;
  return (
    <div>Product Id : {prodId}</div>
  )
}

export default index
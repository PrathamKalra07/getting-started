"use client";
import React, { useEffect, useState } from 'react'
// import createProdTable from '../api/products/route'
import axios from 'axios';



const Page = () => {

  const [records,setRecords]=useState<any[]>();
  const [fields,setFields]=useState<any[]>();
  const [createRecordsPopup,setCreateRecordsPopup]=useState<boolean>();

  const [name,setName]=useState<string>();
  const [description,setDescription]=useState<string>();
  const [price,setPrice]=useState<number>();
  const [quantity,setQuantity]=useState<number>();

  const createRecord =async ()=>{
    const res = await axios.post('/api/products',{name,description,price,quantity});
    if(res.status===200){
      window.alert('Record Added Successfully : '+res);
    }else{
      window.alert('Failed to add record : '+res);
    }
  }

  useEffect(()=>{
    
      const getProds =async ()=>{
        const res = await axios.get('/api/products');
        console.log("response of create table : ",res.data.message);
        if(res.data.message === 'success'){
          setRecords(res.data.records);
          setFields(Object.keys(res.data.records[0]));

        }else{
          window.alert("Error Fetching Products : "+res.data.message);
        }
        
      }

      getProds();

    
  },[])
  return (
    <div>
      <div>

      </div>
      <div className='flex justify-end'>
      <div className='bg-blue-400 rounded-full text-center my-5 mx-10 w-24' onClick={()=>{setCreateRecordsPopup(true)}}>
          Create Record
        </div>
      </div>
        <div className='text-black flex justify-evenly'>
          {fields?.map(item=>{
            return(
              <div key={item} >
                <h2 className='border-b-1 border-gray-400'>{item}</h2>
                {records?.map(record=>{
                  return(
                    <div key={record.id}>
                      {record[item]}
                    </div>
                  )
                })}
                <span>

                </span>
              </div>
            
              )
            })}
          <div>
          </div>
          
        </div>
        {createRecordsPopup &&
        <div className='absolute z-99 top-[50%] left-[50%] -ml-[50px]'>
          <div className='px-3 py-3 bg-slate-300 rounded-xl'>
            <h3>Create New Record</h3>
            <div className='my-3'>
              <input type="text" onChange={(e)=>{setName(e.target.value)}} name='Name' placeholder='Name' className='bg-white rounded-lg px-2 py-2' />
            </div>
            <div className='my-3'>
              <input type="text" onChange={(e)=>{setDescription(e.target.value)}} name='Description' placeholder='Description' className='bg-white rounded-lg px-2 py-2' />
            </div>
            <div className='my-3'>
              <input type="number" onChange={(e)=>{setPrice(Number(e.target.value))}} name='Price' placeholder='Price' className='bg-white rounded-lg px-2 py-2' />
            </div>
            <div className='my-3'>
              <input type="number" onChange={(e)=>{setQuantity(Number(e.target.value))}} name='Quantity' placeholder='Quantity' className='bg-white rounded-lg px-2 py-2' />
            </div>
          <div className='flex justify-center'>
            <div className='bg-blue-500 rounded-xl px-2 py-2 w-30 text-center' onClick={()=>{createRecord()}}>
              Create
            </div>
          </div>
          </div>
        </div>
        }

    </div>
  )
}

export default Page
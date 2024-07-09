import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Form(){

const [data, setData] = useState({name:"", email:"", address:"", phone:""})
const [information, setInformation] = useState([])
const [isUpdate, setIsUpdate] = useState(false)
const [index,setIndex]= useState("")
const [errors, setErrors] = useState({})
const [isError, setIsError] = useState(false)
const [nameFocus, setNameFocus] = useState(false)
const [emailFocus, setEmailFocus] = useState(false)
const [addressFocus, setAddressFocus] = useState(false)
const [phoneFocus, setPhoneFocus] = useState(false)
const navigate = useNavigate()

const validateForm = (formData) => {
    const dataErrors = {};
    if(!formData.name || !/^[a-zA-Z ]{2,30}$/.test(data.name)){
        dataErrors.name = "Username is invalid"
    }
    if(!formData.email || !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(data.email)){
        dataErrors.email = "Email is invalid"
    }
    if(!formData.address || !/^[a-zA-Z0-9\s,'']*$/.test(data.address)){
        dataErrors.address = "Address is invalid"
    }
    if(!formData.phone || !/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(data.phone)){
        dataErrors.phone = "Contact number is invalid"
    }
    setErrors(dataErrors)
    return dataErrors;  
}

function handleChange (e){
    setData({...data, [e.target.name]:e.target.value})
}

function dataNameFocus(){
    if(!data.name || !/^[a-zA-Z ]{2,30}$/.test(data.name)){
        errors.name = "Username is invalid"
        setIsError(true)
        setNameFocus(true)
    }
    else{
        errors.name = ""
        setIsError(false)
        setNameFocus(false)
    }
}

function dataEmailFocus(){
    if(!data.email || !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(data.email)){
        errors.email = "Email is invalid"
        setIsError(true)
        setEmailFocus(true)
    }
    else{
        errors.email = ""
        setIsError(false)
        setEmailFocus(false)
    }
}

function dataAddressFocus(){
    if(!data.address || !/^[a-zA-Z0-9\s,'']*$/.test(data.address)){
        errors.address = "Address is invalid"
        setIsError(true)
        setAddressFocus(true)
    }
    else{
        errors.address = ""
        setIsError(false)
        setAddressFocus(false)
    }
}

function dataPhoneFocus(){
    if(!data.phone || !/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(data.phone)){
        errors.phone = "Contact number is invalid"
        setIsError(true)
        setPhoneFocus(true)
    }
    else{
        errors.phone = ""
        setIsError(false)
        setPhoneFocus(false)
    }
}

const handleDelete = (index) => {
    setInformation(information.filter((v,i)=> i !== index))
}

const handleUpdate = (index) => {
    setIsUpdate(true)
    let row = [...information]
    let newValue=row[index]
    setData(newValue)
    setIndex(index)
}

function logoutUser(){
    localStorage.clear()
    navigate("/login")
}

function TableData({tableinfo}){
return(
    <>
    <table className="table mt-3 table-hover">
        <thead>
            <tr>
                <th>S. No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Contact</th>
                <th>Update</th>
                <th>Delete</th>
            </tr>
        </thead>
        <tbody>
            {
                tableinfo.map((info,index) => {
                    return(
                        <>
                    <tr key={index}>
                        <td >{index+1}</td>
                        <td >{info.name}</td>
                        <td >{info.email}</td>
                        <td >{info.address}</td>
                        <td >{info.phone}</td>
                        <td><button className="btn btn-success" onClick={()=>handleUpdate(index)}>Update</button></td>
                        <td><button className="btn btn-danger" onClick={()=>handleDelete(index)}>Delete</button></td>
                    </tr>
                    </>
                    )
                })
            }   
        </tbody>
    </table>
    </>
)
}

return(
    <>
    <div className="row">
    <div className="col-4"></div>
    <div className="col-4 text-center">
        <h3>FORM</h3>
    <form onSubmit={(e) => {
        e.preventDefault();
    
        if(!isUpdate) {
            const newErrors = validateForm(data)
            
            if(Object.keys(newErrors).length === 0){
                setInformation([...information, data])  
                setData({name:"",email:"",address:"",phone:"",})
                setNameFocus(false)
                setAddressFocus(false)
                setEmailFocus(false)
                setPhoneFocus(false)
            }
            else{
                setIsError(true)
            }
        }   
        else if(isUpdate){
            information[index] = data
            setIsUpdate(false)
            setData({name:"",email:"",address:"",phone:"",})
            setIndex("")
        }    
    }} className="form-control">

        <input 
            type="text" 
            name="name" 
            placeholder="Enter Name" 
            className="form-control mt-3" 
            value={data.name} 
            onKeyUp={dataNameFocus}
            style={{border: nameFocus ? '2px solid red' : '1px solid gray',}}
            onChange={handleChange} />
        {
          isError?
          <p className="text-danger" style={{fontSize:"12px", textAlign:"left"}}>{errors.name}</p>:<p></p>
        }
        <input 
            type="text"  
            name="email" 
            placeholder="Enter email"  
            className="form-control mt-3" 
            value={data.email} 
            onKeyUp={dataEmailFocus}
            style={{border: emailFocus ? '2px solid red' : '1px solid gray'}}
            onChange={handleChange} />
        {
            isError?
            <p className="text-danger" style={{fontSize:"12px", textAlign:"left"}}>{errors.email}</p>:<p></p>
        }
        <input 
            type="text"  
            name="address" 
            placeholder="Enter Address"  
            className="form-control mt-3" 
            onKeyUp={dataAddressFocus}
            style={{border: addressFocus ? '2px solid red' : '1px solid gray'}}
            value={data.address} 
            onChange={handleChange} />
        {
            isError?
            <p className="text-danger" style={{fontSize:"12px", textAlign:"left"}}>{errors.address}</p>:<p></p>
        }
        <input 
            type="text"  
            name="phone" 
            placeholder="Enter Phone Number"  
            className="form-control mt-3" 
            value={data.phone} 
            onKeyUp={dataPhoneFocus}
            style={{border: phoneFocus ? '2px solid red' : '1px solid gray'}}
            onChange={handleChange} />
        {
            isError?
            <p className="text-danger" style={{fontSize:"12px", textAlign:"left"}}>{errors.phone}</p>:<p></p>
        }
        {
            !isUpdate? 
            <button type="submit" className="btn btn-success form-control mt-3"> Submit </button>:
            <button type="submit" className="btn btn-danger form-control mt-3">Update</button>
        } 
    </form>
    </div>
    <div className="col-2"></div>
    <div className="col-2">
       
    </div>
    </div> 
    <div className="row mt-5">
        <div className="col-3"></div>
        <div className="col-6 text-center ">
        <h3>TABLE</h3>
        <TableData tableinfo={information}/>
        <button 
        className="btn btn-danger align-right"
        onClick={logoutUser}>Logout</button>
        </div>
    
        <div className="col-3"></div>
    </div>
    </>
)}
export default Form;
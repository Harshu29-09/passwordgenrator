import { useState,useCallback, useEffect, useRef } from "react";
function App() {
  const[length,setlength]=useState(8)
  const[numberAllowed,setNumberAllowed]=useState(false);
  const[charAllowed,setCharAllowed]=useState(false);
  const[password,setPassword]=useState("")
  let passwordRef=useRef(null)

  const passwordGenerator=useCallback(()=>{
    let pass=""
    let str="ASDFGHJKLZXCVBNMQWERTYUIOPasdfghjklqwertyuiopzxcvbnm"

  if(numberAllowed) str+="1234567890"
  if(charAllowed) str+="[]{};':,./<>? ";
  for(let i=1;i<=length;i++){
    let char=Math.floor(Math.random()*str.length+1)
    pass+=str.charAt(char);
 }
  setPassword(pass);
 },[length,numberAllowed,charAllowed,setPassword])
  const copyPassword=useCallback(()=>{
    passwordRef.current?.select()
    
    window.navigator.clipboard.writeText(password) },[password])
  useEffect(()=>{passwordGenerator()},[length,numberAllowed,charAllowed,passwordGenerator])
  return (
 <>
 <div className="w-screen h-screen m-0 p-0 overflow-hidden  bg-slate-800">
   <div className="w-full max-w-md mx-auto h-32 shadow-md rounded-lg px-4 p-4 my-8 text-orange-500 bg-gray-600 text-center"><h1>PASSWORDGENERATOR</h1>
    <div className="flex shadow rounded-lg w-full mt-8 overflow-hidden">
      <input className="w-full" type="text"
      value={password} 
        placeholder="Password"
        readOnly
        ref={passwordRef}
      />
      <button className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0" onClick={copyPassword}>COPY</button>
    </div>
<div className="flex text-sm gap-x-2">
  <div className="flex items-center gap-x-1">
    <input type="range"
    min={8}
    max={100}
    value={length}
    className="cursor-pointer"
    onChange={(e)=>{setlength(e.target.value)}} />
    <label htmlFor="length">Length:{length}</label>
  </div>
  <div className="flex items-center gap-x-1">
    <input type="checkbox"
    defaultChecked={numberAllowed}
    id="numberAllowed"
    onChange={()=>{setNumberAllowed((prev)=>!prev)}} />
    <label htmlFor="numberInput">Numbers</label>
  </div>
  <div className="flex items-center gap-x-1">
    <input type="checkbox"
    defaultChecked={charAllowed}
    id="charAllowed"
    onChange={()=>{setCharAllowed((prev)=>!prev)}} />
    <label htmlFor="characterInput">Character</label>
  </div>
</div>
 </div>
 </div>
 </>
  );
}
export default App;

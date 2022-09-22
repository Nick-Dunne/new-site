import {useState, useLayoutEffect} from 'react';



const useMedia768 = ()=>{
   
  const response = matchMedia('(max-width: 768px)');
  const [isLess576, setIsLess575] = useState(response.matches);
 

    const cons = ()=>{
    setIsLess575(response.matches) };
   
    
    useLayoutEffect(()=>{
    response.addEventListener('change', cons, {passive:true})
    return ()=>{response.removeEventListener('change', cons, {passive:true})}
  }, [])

  return isLess576;
}

export default useMedia768;
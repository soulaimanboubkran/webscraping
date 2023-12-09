"use client"
import React, { FormEvent, useState } from 'react'

const Searchbar = () => {
 const [formurl,setFormUrl] = useState('');
 const [isLoading, setIsLoading] = useState(false);
 const  isValidAmazonProductURL = (url:string)=>{
    try {
    const parsedURL = new URL(url);
    const hostname = parsedURL.hostname;
    if(
        hostname.includes('amazon.com') || 
        hostname.includes ('amazon.') || 
        hostname.endsWith('amazon')
      ) {
        return true;
      }
    } catch (error) {
      return false;
    }
  
    return false;

 }
    const handleSubmit =(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const isValidLink = isValidAmazonProductURL(formurl);

        if(!isValidLink) return alert('Please provide a valid Amazon link')
        try {
            setIsLoading(true);
      
            // Scrape the product page
          
          } catch (error) {
            console.log(error);
          } finally {
            setIsLoading(false);
          }
    }
  return (
    <form 
      className="flex flex-wrap gap-4 mt-12" 
      onSubmit={handleSubmit}
    >
      <input 
        type="text"
        value={formurl}
        onChange={(e)=>setFormUrl(e.target.value)}
        placeholder="Enter product link"
        className="searchbar-input"
      />

      <button 
        type="submit" 
        className="searchbar-btn"
    
      >
      {isLoading ? 'Searching...' : 'Search'}
      </button>
    </form>
  )
}

export default Searchbar

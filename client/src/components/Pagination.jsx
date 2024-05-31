
import React from 'react'

const Pagination = ({
 totalBooks , LIMIT  , curPage , setcurPage 
    
}) => {

  function pageArrayCalculator(totalBooks, LIMIT) {
    let pages = [];
    const final = Math.ceil(((totalBooks)) / LIMIT);
    console.log(final);
    for (let i = 1; i <= final; i++) {
      pages.push(i);
    }

    return pages;
  }

  const pages = pageArrayCalculator(totalBooks, LIMIT);
  const totalPages = pages.length;

return (
    <div className=" pb-2" >
       <ul className="flex decoration-transparent  justify-center items-center " >
          {
            <li className={`flex-auto shrink justify-center items-center cursor-pointer `} >
              <span className="flex w-auto  cursor-pointer justify-center" >
               <button onClick={() => curPage !== 1?setcurPage(curPage - 1):setcurPage(curPage)}>Prev</button> 
                </span>
              </li> 
            
          }
          {pages.map((page) => (
            <li key={page} className={`flex-auto shrink cursor-pointer ${page === curPage ? " dark:bg-red-600 bg-teal-300" : "bg-grey-300"} self-center  rounded-full justify-evenly h-6 w-12  text-center`} onClick={() => setcurPage(page)}>
             <p className="cursor-pointer">{page}</p> 
            </li>
          ))}
          {
            <li className="flex-auto shrink cursor-pointer justify-center items-center" >
              <span className="flex w-auto  cursor-pointer justify-center">
                <button  onClick={() =>curPage !== totalPages? setcurPage(curPage + 1):setcurPage(curPage)}>Next</button>
                </span>
            </li>
          }
        </ul>
    </div>
  )
}

export default Pagination

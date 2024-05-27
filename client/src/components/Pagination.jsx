
import React from 'react'

const Pagination = ({
 totalBooks , LIMIT , pageArrayCalculator , curPage , setcurPage
    
}) => {

return (
    <div >
       <ul className="flex decoration-transparent  justify-center items-center " >
          {
            <li className={`flex-auto shrink justify-center items-center cursor-pointer `} onClick={() => curPage !== 1? setcurPage(curPage - 1):setcurPage(curPage)}><div className="flex w-28 justify-evenly">Prev</div></li> 
            
          }
          {pageArrayCalculator(totalBooks, LIMIT).map((page) => (
            <li key={page} className={`flex-auto shrink cursor-pointer ${page === curPage ? "bg-red-200" : "bg-grey-300"} self-center  rounded-full justify-evenly h-6 w-12  text-center`} onClick={() => setcurPage(page)}>
              {page}
            </li>
          ))}
          {
            <li className="flex-auto shrink cursor-pointer justify-center items-center" onClick={() =>curPage !== pageArrayCalculator(totalBooks, LIMIT).length? setcurPage(curPage + 1):setcurPage(curPage)}>
              <div className="flex w-28 justify-evenly">Next</div>
            </li>
          }
        </ul>
    </div>
  )
}

export default Pagination

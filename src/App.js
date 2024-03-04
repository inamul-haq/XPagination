import './App.css';
import React,{useState, useEffect} from 'react';
import axios from 'axios';

function App() {
const [entries, setEntries] = useState([]);
const [currentPage, setCurrentPage] = useState(1);
const startIndex = (currentPage - 1) * 10;
const endIndex = startIndex + 10;
  useEffect(()=> {
    async function fetchData(){
      try{
        let response = await axios.get('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
        setEntries(response.data);
        console.log(response.data);
      }
      catch(e){
        console.log('Error : ' + e)
      }
      
    }
fetchData();
  },[])


const handleNextPage = (v) =>{

  if(currentPage<Math.ceil(entries.length/10)){
    setCurrentPage(currentPage+v)
  }

}


const handlePreviousPage = (v) =>{

  if(currentPage>1){
    setCurrentPage(currentPage+v)
  }

}

  return (
    <div className='outerContainer'>
      <div className="App">
          <h1>
            Employee Data Table
          </h1>
      </div>

      <table> 
          <thead>
              <tr className='tableHeadItems'> 
                <th>ID</th> 
                <th>Name</th> 
                <th>Email</th> 
                <th>Role</th>
              </tr>
          </thead>
          <tbody>
              {entries.slice(startIndex,endIndex).map((entry, index) => (
                <tr key={index} className='tableItems'> 
                  <td>{entry.id}</td> 
                  <td>{entry.name}</td> 
                  <td>{entry.email}</td>
                  <td>{entry.role}</td> 
                </tr>
              ))}
          </tbody>
          </table> 
          

            <div className='buttonContainer'>
              <button onClick={() => handlePreviousPage(-1)} value='previous' className='buttons'>Previous</button>
              <div className='pageNumber'>{currentPage}</div>
              <button onClick={() => handleNextPage(1)} className='buttons'>Next</button>
            </div>

      </div>
  );
}

export default App;

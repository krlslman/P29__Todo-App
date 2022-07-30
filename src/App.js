import { useState, useEffect } from "react";
import axios from "axios";
import { uid } from "uid";
import './App.css';

function App() {
  const [inputData, setInputData] = useState("");
  const [apiData, setApiData] = useState([]);

  const currentDate = new Date().toDateString() + " " + new Date().toLocaleTimeString();
  const u_uid = uid(4);

  useEffect(() => {
    getData();
  }, []) //dependency array. bu array initial array.

  // useEffect(() => {
  //   handlePostData();
  // }, [apiData]) //dependency array. bu array initial array.

  const handlePostData = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://62e2bac6b54fc209b87f6797.mockapi.io/todos', {
        id: u_uid,
        task: inputData,
        date: currentDate
      });
    } catch (error) {
      console.error(error);
    };
    getData();
  };

  const handleDeleteData = async (id) => {
    try {
      await axios.delete(`https://62e2bac6b54fc209b87f6797.mockapi.io/todos/${id}`);
    } catch (error) {
      console.error(error);
    }
    // console.log(id);
    getData();
  };

  const handleUpdateData = async (id) => {
    try {
      await axios.put(`https://62e2bac6b54fc209b87f6797.mockapi.io/todos/${id}`, {
        task: inputData,
        date: currentDate
      });

    } catch (error) {
      console.error(error);
    }
    setInputData("")
    getData();
  };

  async function getData() {
    try {
      const response = await axios.get('https://62e2bac6b54fc209b87f6797.mockapi.io/todos');
      setApiData(response.data);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <header className="App-header text-3xl mt-5 text-center  ">
        <h1 className="bg-blue-300 font-bold text-violet-900 text-4xl p-3" > TO DO APP</h1>
        <div className="inputsection text-center m-5 mb-9">
          <form action="" onSubmit={handlePostData}>
            <input
              type="text"
              className="p-2  rounded-lg border-2 mt-5"
              placeholder="Enter a todo..."
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            />

            <button
              className=" bg-green-500 text-2xl rounded-lg pt-2 pb-2 pr-2 pl-2 ml-5 "
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
        <div className="display text-center">
          {apiData?.map(
            (i, index) => <div key={index}> {i.inputData} </div>
          )}
        </div>

        <div className="display font-kanitT">
          {apiData?.map( //* ? işareti : dolu ise, opsiyonel. map hata vermemesi için.
            (i, index) => (
              <div className="display-map flex flex-row gap-2 mb-2 ml-96" key={index}>
                <div className="mr-5 text-base text-gray-400" > {i.id + " -  "} </div>
                <div className="bg-slate-100 w-96" onClick={() => setInputData(i.task)} > {i.task} </div>
                <div className="text-base text-gray-400 pt-1.5"> {i.date} </div>
                <button className="bg-red-500 rounded-xl p-2 ml-5 text-lg text-white" onClick={() => handleDeleteData(i.id)} >Delete</button>
                <button className="bg-blue-500 rounded-xl p-2 ml-5 text-lg text-white" onClick={() => handleUpdateData(i.id)} >Update</button>
              </div>
            )

          )}
        </div>



      </header>
    </div>
  );
}

export default App;

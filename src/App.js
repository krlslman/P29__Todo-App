import { useState, useEffect } from "react";
import axios from "axios";
import { uid } from "uid";

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
      <header className="App-header text-3xl mt-5 text-center">
        TO DO APP
        <div className="inputsection text-center">
          <form action="" onSubmit={handlePostData}>
            <input
              type="text"
              className="p-2  rounded-lg border-2 mt-5"
              placeholder="Enter a todo..."
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            />

            <button
              className=" bg-slate-700 m-5 rounded-lg pt-1 pb-1 pr-2 pl-2"
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
              <div className="display-map flex ml-5" key={index}>
                <div className="mr-5" onClick={() => setInputData(i.task)} > {i.id + " /  " + i.task + " /  " + i.date} </div>
                <button className="bg-red-500 text-purple-600 rounded-xl p-1" onClick={() => handleDeleteData(i.id)} >Delete</button>
                <button className="bg-blue-500 text-purple-600 rounded-xl p-1" onClick={() => handleUpdateData(i.id)} >Update</button>
              </div>
            )

          )}
        </div>



      </header>
    </div>
  );
}

export default App;

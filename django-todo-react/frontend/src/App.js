import React, { useState} from "react";
import Modal from "./components/Modal";
import axios from "axios";
import { useAlert } from 'react-alert'



const App = () => {
  const [viewCompleted, setViewCompleted] = useState(false);
  const [todoList, setTodoList] = useState([]);
  const [modal, setModal] = useState(false);
  const [how, setHow] = useState("");
  const [what, setWhat] = useState("");
  const [activeItem, setActiveItem] = useState({title: "", description: "", completed: false });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [description,setDescription] = useState("");
  const alert = useAlert()


  const componentDidMount = (props) => {
    props.refreshList();
  };

  const refreshList = (props) => {
    axios
      .get("http://localhost:8000/api/todos/")
      .then((res) => setTodoList({ todoList: res.data }))
      .catch((err) => console.log(err));
  };



const Act = (props) => {
 const alert = useAlert()

  return (
     <div id="overlay">
         <div id="modal" className="modall">
      <div>
        <form onSubmit={()=>{this.handleSubmit()}} >
          <p>E-mail</p>
          <input />
          <p>Message</p>
          <textarea />
          <input
            type='submit'
            value='submit'
          />
          <p>I am available at this moment!</p>
        <button onClick={props.onClick}>Close</button>
        <button onClick={() => {alert.show('Oh look, you done well an alert!')}}>
      Show Alert
    </button>

        </form>

      </div>
    </div>
     </div>

  )
}





  const toggle = () => {
    setModal(!modal);
  };



  const handleSubmit = (item, props) => {
    setModal(!modal);

        if (item.id) {
       axios
         .put(`http://localhost:8000/api/todos/${item.id}/`, item)
         .then(() => props.refreshList());
       return;
     }
     axios
       .post("http://localhost:8000/api/todos/", item)
       .then(() => refreshList());
  };

   const handleDelete = (item,props) => {
    axios
      .delete(`http://localhost:8000/api/todos/${item.id}/`)
      .then((res) => props.refreshList());
  };


  const createItem = (props) => {
    const item = { title: "", description: "", completed: false };
    setActiveItem(activeItem, item);
    setModal(!modal);
  };

  const editItem = (props,item) => {
    setActiveItem(activeItem, item);
    setModal(!modal);
  };

  const displayCompleted = (status,props) => {
    if (status) {
      return setViewCompleted({ viewCompleted: true });
    }

    return setViewCompleted({ viewCompleted: false });
  };


  const renderTabList = () => {
    return (
      <div className="nav nav-tabs">
        <span
          onClick={() => setViewCompleted(true)}
          className={viewCompleted ? "nav-link active" : "nav-link"}
        >
          Complete
        </span>
        <span
          onClick={() => setViewCompleted(false)}
          className={viewCompleted ? "nav-link" : "nav-link active"}
        >
          Incomplete
        </span>
      </div>
    );
  };

  const renderItems = (props) => {

  const newItems = todoList.filter(
       (item) => item.completed === viewCompleted
     );

     return newItems.map((item, props) => (
       <li
         key={item.id}
         className="list-group-item d-flex justify-content-between align-items-center"
       >
         <span
           className={`todo-title mr-2 ${viewCompleted ? "completed-todo" : ""
             }`}
           title={item.description}
         >
           {item.title}
         </span>
         <span>
           <button
             className="btn btn-secondary mr-2"
             onClick={() => props.editItem(item)}
           >
             Edit
           </button>
           <button
             className="btn btn-danger"
             onClick={() => props.handleDelete(item)}
           >
             Delete
           </button>
         </span>
       </li>
     ));
  };

  const whattodo = () => {
      setDescription("You can write any recommendations for language studies on the Description. anything is ok");
  }


  const howtodo = () => {
    setDescription("You should write the day and to whom you write on the Title.⇒(ex).title:7/7 for Hamuster");
  }


  const closeModal = () => {
    setIsModalOpen(false)
  }


  const openModal = () => {
    setIsModalOpen(true)
  }


  return (
    <main className="container">
      <div className="nav-container">


        <button
          className="navi white How btn btn-primary"
          onClick={howtodo}
        >
          How to use
        </button>

        <button
          className="navi What btn btn-primary"
          onClick={whattodo}
        >
          What to write
        </button>


        <button
          className="navi contact btn btn-primary"
          onClick={() => { openModal() }}
        >
          Contact
        </button>
      </div>

      {isModalOpen && <Act onClick={() => { closeModal() }} />}
      <p className="howtitle">{description}</p>
      <h1 className="text-uppercase text-center my-4">Todo app</h1>
      <div className="row">
        <div className="col-md-6 col-sm-10 mx-auto p-0">
          <div className="card p-3">
            <div className="mb-4">
              <button
                className="btn btn-primary"
                onClick={createItem}
              >
                Add
              </button>
            </div>
            {renderTabList()}
            <ul className="list-group list-group-flush border-top-0">
              {renderItems()}
            </ul>
          </div>
        </div>
      </div>
      {modal && (
        <Modal
          activeItem={activeItem}
          toggle={toggle}
          onSave={handleSubmit}
        />
      )}
    </main>
  )





}


export default App;
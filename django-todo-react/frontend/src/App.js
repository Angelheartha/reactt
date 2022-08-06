
import React, { Component, useState } from "react";
import Modal from "./components/Modal";
import axios from "axios";


function Act(props) {
  return (
     <div id="overlay">
         <div id="modal" className="modall">
      <div>
        <form onSubmit={()=>{this.handleSubmitt()}} >
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
        </form>

      </div>
    </div>
     </div>

  )
}


const App = () => {
  const[viewCompleted,zone]=useState(false);
  const[todoList,listlist]=useState([]);
  const[modal,model]=useState(false);
  const[how]=useState("");
  const[what]=useState("");
  const[activeItem,action]=useState([{title: "",description: "",completed: false}]);
  const[isSubmitted,sent]=useState(false);
  const[email]=useState("sample@gmail.com");
  const[hasEmailError]=useState(false);
  const[content]=useState("お問い合わせ内容");
  const[hasContactError]=useState(false);
  const[isModalOpen]=useState(false);




  const refreshList = () => {
    axios
      .get("http://localhost:8000/api/todos/")
      .then((res) => listlist({ todoList: res.data }))
      .catch((err) => console.log(err));
  };


  const componentDidMount = () => {
    refreshList();
  }

  const toggle = () => {
    model({ modal: !model(modal) });
  };

  const handleSubmit = (item) => {
    toggle();

    if (item.id) {
      axios
        .put(`http://localhost:8000/api/todos/${item.id}/`, item)
        .then((res) => refreshList());
      return;
    }
    axios
      .post("http://localhost:8000/api/todos/", item)
      .then((res) => refreshList());
  };

  const handleDelete = (item) => {
    axios
      .delete(`http://localhost:8000/api/todos/${item.id}/`)
      .then((res) => refreshList());
  };

  const createItem = () => {
    const item = { title: "", description: "", completed: false };

    action({ activeItem: item, modal: !model(modal) });
  };

  const editItem = (item) => {
    action({ activeItem: item, modal: !model(modal) });
  };

  const displayCompleted = (status) => {
    if (status) {
      return zone({ viewCompleted: true });
    }

    return zone({ viewCompleted: false });
  };




  const renderTabList = () => {
    return (
      <div className="nav nav-tabs">
        <span
          onClick={() => displayCompleted(true)}
          className={zone(viewCompleted) ? "nav-link active" : "nav-link"}
        >
          Complete
        </span>
        <span
          onClick={() => displayCompleted(false)}
          className={zone(viewCompleted) ? "nav-link" : "nav-link active"}
        >
          Incomplete
        </span>
      </div>
    );
  };

  const renderItems = () => {
    const { viewCompleted } = zone;
    const newItems = listlist(todoList).filter(
      (item) => item.completed === viewCompleted
    );








    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${zone(viewCompleted) ? "completed-todo" : ""
            }`}
          title={item.description}
        >
          {item.title}
        </span>
        <span>
          <button
            className="btn btn-secondary mr-2"
            onClick={() => editItem(item)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => handleDelete(item)}
          >
            Delete
          </button>
        </span>
      </li>
    ));
  };




  const whattodo = () => {
    this.setState({ how: "You can write any recommendations for language studies on the Description. anything is ok" });
  }


  const howtodo = () => {
    this.setState({ how: "You should write the day and to whom you write on the Title.⇒(ex).title:7/7 for Hamuster" });
  }


  const closeModal = () => {
    this.setState({isModalOpen: false})
  }


  const openModal = () => {
    this.setState({isModalOpen: true})
  }

  const handleSubmitt = () => {
    sent({isSubmitted:true})
  }



    return (
      <main className="container">
        <div className="nav-container">
          <button
            className="navi white How btn btn-primary"
            onClick={()=>{howtodo()}}
          >
            How to use
          </button>

          <button
            className="navi What btn btn-primary"
            onClick={()=>{whattodo()}}
          >
            What to write
          </button>


          <button
            className="navi contact btn btn-primary"
            onClick={() => {openModal()}}
          >
            Contact
          </button>
        </div>

        {this.state.isModalOpen ? <Act onClick={() => {closeModal()}} /> : ""}
        <p className="howtitle">{how}</p>
        <p className="howtitle">{what}</p>
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
        {model(modal) ? (
          <Modal
            activeItem={action(activeItem)}
            toggle={toggle}
            onSave={handleSubmit}
          />
        ) : null}




      </main>
    )





}


export default App;


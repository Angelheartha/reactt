import React, { Component,useState} from "react";
import Modal from "./components/Modal";
import axios from "axios";




function Act(props){


  return(
      <div id="modal" className="modall">
        <div>
          <p>モーダル</p>
          <button onClick={props.onClick}>閉じるボタン</button>
        </div>
      </div>
     )
}











class App extends Component{
///const[isModalOpen,setIsModalOpen]=useState(false)


  constructor(props){
    super(props);
    this.state = {
      viewCompleted: false,
      isModalOpen:false,
      setIsModalOpen:false,
      closeModal:false,
      todoList: [],
      modal: false,
      how:"",
      what:"",
      activeItem: {
        title: "",
        description: "",
        completed: false,
      },
      isSubmitted: false,
      email: "sample@gmail.com",
      hasEmailError: false,
      content: "お問い合わせ内容",
      hasContactError: false,
    };
    this.howtodo = this.howtodo.bind(this);
    this.whattodo = this.whattodo.bind(this);
  }


  closeModal(){

    this.setIsModalOpen(false);
  }


  openModal(){

    this.setIsModalOpen(true);
  }




  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get("http://localhost:8000/api/todos/")
      .then((res) => this.setState({ todoList: res.data }))
      .catch((err) => console.log(err));
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = (item) => {
    this.toggle();

    if (item.id) {
      axios
        .put(`http://localhost:8000/api/todos/${item.id}/`, item)
        .then((res) => this.refreshList());
      return;
    }
    axios
      .post("http://localhost:8000/api/todos/", item)
      .then((res) => this.refreshList());
  };

  handleDelete = (item) => {
    axios
      .delete(`http://localhost:8000/api/todos/${item.id}/`)
      .then((res) => this.refreshList());
  };

  createItem = () => {
    const item = { title: "", description: "", completed: false };

    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  displayCompleted = (status) => {
    if (status) {
      return this.setState({ viewCompleted: true });
    }

    return this.setState({ viewCompleted: false });
  };




  renderTabList = () => {
    return (
      <div className="nav nav-tabs">
        <span
          onClick={() => this.displayCompleted(true)}
          className={this.state.viewCompleted ? "nav-link active" : "nav-link"}
        >
          Complete
        </span>
        <span
          onClick={() => this.displayCompleted(false)}
          className={this.state.viewCompleted ? "nav-link" : "nav-link active"}
        >
          Incomplete
        </span>
      </div>
    );
  };

  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.todoList.filter(
      (item) => item.completed === viewCompleted
    );








    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${
            this.state.viewCompleted ? "completed-todo" : ""
          }`}
          title={item.description}
        >
          {item.title}
        </span>
        <span>
          <button
            className="btn btn-secondary mr-2"
            onClick={() => this.editItem(item)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => this.handleDelete(item)}
          >
            Delete
          </button>
        </span>
      </li>
    ));
  };


  render() {
    return (
      <main className="container">
      <div className="nav-container">
         <button
                  className="navi white How btn btn-primary"
                  onClick={this.howtodo}
                >
                  How to use
         </button>

         <button
                  className="navi What btn btn-primary"
                  onClick={this.whattodo}
                >
                  What to write
         </button>

         <button
                  className="navi contact btn btn-primary"
                  onClick={()=>{this.openModal()}}
                >
                  Contact
         </button>
          {this.isModalOpen? <Modal onClick={()=>{this.closeModal()}}/> :""}
      </div>
      <Act/>
      <p className="howtitle">{this.state.how}</p>
      <p className="howtitle">{this.state.what}</p>
        <h1 className="text-uppercase text-center my-4">Todo app</h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="mb-4">
                <button
                  className="btn btn-primary"
                  onClick={this.createItem}
                >
                  Add
                </button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush border-top-0">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
           {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}




      </main>
    );
  }
   howtodo(){
   this.setState({how:"You should write the day and to whom you write on the Title.⇒(ex).title:7/7 for Hamuster"});
   }

   whattodo(){
   this.setState({how:"You can write any recommendations for language studies on the Description. anything is ok"});
   }









}


export default App;



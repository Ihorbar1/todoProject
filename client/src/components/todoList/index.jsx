import React from 'react';
import Modal from 'react-modal'
import axios from "../../lib/api";
import { ItemText } from './styles'
import s from './styles.module.css'

class TodoList extends React.Component {
   state = {
      showModal: false,
      newTodo: {},
      todoItems: [],
   };

   getTodos = () => {
      axios({
         method: 'get',
         url: `/api/get-todos/${this.props.user.id}`,
      }).then((response) => {
         this.setState({ todoItems: response.data });
      }).catch((error) => {
         console.log(error);
      });
   };

   componentDidMount = () => this.getTodos();

   postTodo = (e) => {
      e.preventDefault();
      const newTodo = this.state.newTodo;
      axios({
         method: 'post',
         url: '/api/post-todo',
         data: newTodo,
      }).then(() => {
         this.getTodos();
         this.handleCloseModal();
      }).catch((error) => {
         console.log(error);
      });
   };

   deleteTodo = (id) => {
      axios({
         method: 'delete',
         url: `/api/delete-todo/${id}`,
      }).then(() => {
         this.getTodos();
      }).catch((error) => {
         console.log(error);
      });
   };

   toggleStatus = (id, status) => {
      axios({
         method: 'patch',
         url: `/api/update-todo/${id}`,
         data: { status: status },
      }).then(() => {
         this.getTodos();
      }).catch((error) => {
         console.log(error);
      });
   };

   handleOpenModal = () => this.setState({ showModal: true });
   handleCloseModal = () => this.setState({ showModal: false });

   createNewTodo = (e) => {
      const newTodo = { ...this.state.newTodo, [e.target.name]: e.target.value, userId: this.props.user.id };
      this.setState({ newTodo });
   };

   vueTodoItems = () => {
      const todoItems = this.state.todoItems.map((item) => {
         return (
            <div className={s.items} key={item.id}>
               <ItemText className={s.item} status={item.status}>
                  <p className="text">{item.text}</p>
                  <div className={s.buttonWrap}>
                     <button className="executed" onClick={() => this.toggleStatus(item.id, 'executed')}> &#10003;</button>
                     <button className="unfulfilled" onClick={() => this.toggleStatus(item.id, 'unfulfilled')}>-</button>
                     <button className="unfulfilled" onClick={() => this.toggleStatus(item.id, 'normal')}>Reset</button>
                     <button className="delete" onClick={() => this.deleteTodo(item.id)}>Delete</button>
                  </div>
               </ItemText>
            </div >
         );
      });
      return todoItems;
   };

   render() {
      return (
         <>
            <div className={s.wrap}>
               {!this.props.user.name
                  ? (<h2 className={s.todoH2}>Please log in or register</h2>)
                  : (<div className="addWrap">
                     <button onClick={this.handleOpenModal} className={s.createBtn}>ADD</button>
                     {this.vueTodoItems()}
                  </div>
                  )}
               <Modal
                  className={s.modal}
                  isOpen={this.state.showModal}
                  contentLabel="Minimal Modal Example"
                  onRequestClose={this.handleCloseModal}
               >
                  {Modal.setAppElement('#root')}
                  <div onClick={this.handleCloseModal} className={s.modalButton}>X</div>
                  <p>Create new todo</p>
                  <input
                     className={s.modalInput}
                     type="text"
                     name="text"
                     onChange={(e) => this.createNewTodo(e)}
                  />
                  <button onClick={(e) => this.postTodo(e)}>create</button>
               </Modal>
            </div>
         </>
      );
   };
};

export default TodoList;

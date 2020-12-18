import React from 'react';
import Modal from 'react-modal'
import axios from "../../lib/api";
import s from './styles.module.css'

class Login extends React.Component {
   state = {
      showModal: false,
      newUser: {}
   };

   createNewUser = () => {
      axios({
         method: 'post',
         url: '/api/registration',
         data: { name: this.state.newUser.name, password: this.state.newUser.password },
      }).then((response) => {
         console.log(response.data);
         this.handleCloseModal();
      }).catch((error) => {
         console.log(error);
      });
   };

   handleOpenModal = () => this.setState({ showModal: true });
   handleCloseModal = () => this.setState({ showModal: false });

   createUserData = (e) => {
      const newUser = { ...this.state.newUser, [e.target.name]: e.target.value };
      this.setState({ newUser });
   };

   signOut = () => {
      localStorage.setItem('user', JSON.stringify({ id: null, name: null }));
      this.props.handleUserInfo({ id: null, name: null });
   };



   render() {
      return (
         <>
            {this.props.user.name
               ? <button onClick={this.signOut} className={s.button}>Exit</button>
               : <button onClick={this.handleOpenModal} className={s.button}>REGISTRATION</button>
            }
            <Modal
               className={s.modal}
               isOpen={this.state.showModal}
               contentLabel="Minimal Modal Example"
               onRequestClose={this.handleCloseModal}
            >
               {Modal.setAppElement('#root')}
               <div onClick={this.handleCloseModal} className={s.modalButton}>X</div>
               <p>name</p>
               <input
                  className={s.modalInput}
                  type="text"
                  name="name"
                  onChange={(e) => this.createUserData(e)}
               />
               <p>password</p>
               <input
                  className={s.modalInput}
                  type="password"
                  name="password"
                  onChange={(e) => this.createUserData(e)}
               />
               <div className={s.modalButtonSend} onClick={this.createNewUser}>
                  <p>registration</p>
               </div>
            </Modal>
         </>
      );
   };
};

export default Login;

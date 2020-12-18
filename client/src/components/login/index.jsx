import React from 'react';
import Modal from 'react-modal'
import axios from "../../lib/api";
import s from './styles.module.css'

class Login extends React.Component {
   state = {
      showModal: false,
      user: {},
   };

   getUser = () => {
      axios({
         method: 'post',
         url: '/api/auth',
         data: {
            name: this.state.user.name,
            password: this.state.user.password,
         },
      }).then((response) => {
         localStorage.setItem('user', JSON.stringify({ id: response.data.id, name: response.data.name }));
         this.props.handleUserInfo(response.data);
         this.handleCloseModal();
      }).catch((error) => {
         console.log(error);
      });
   };

   handleOpenModal = () => this.setState({ showModal: true });
   handleCloseModal = () => this.setState({ showModal: false });

   createUserData = (e) => {
      const user = { ...this.state.user, [e.target.name]: e.target.value };
      this.setState({ user });
   };

   render() {
      return (
         <>
            {this.props.user.name !== null
               ? <p className={s.userName}>{this.props.user.name}</p>
               : <button onClick={this.handleOpenModal} className={s.button}>SIGN IN</button>}
            <Modal
               className={s.modal}
               isOpen={this.state.showModal}
               contentLabel="Minimal Modal Example"
               onRequestClose={this.handleCloseModal}
            >
               {Modal.setAppElement('#root')}
               <div onClick={this.handleCloseModal} className={s.modalButton}>X</div>
               <p>login</p>
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
               <div className={s.modalButtonSend} onClick={this.getUser}>
                  <p>sign in</p>
               </div>
            </Modal>
         </>
      );
   };
};

export default Login;

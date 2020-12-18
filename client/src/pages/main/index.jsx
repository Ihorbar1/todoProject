import React from 'react';
import Login from '../../components/login/'
import Registration from '../../components/registration/'
import TodoList from '../../components/todoList/'
import s from './styles.module.css'

class Main extends React.Component {
   state = {
      user: JSON.parse(localStorage.getItem('user'))
   };

   handleUserInfo = (userInfo) => this.setState({ user: userInfo });

   render() {
      return (
         <>
            <div className={s.header}>
               <p className={s.logo}>TODO APP</p>
               <div className={s.buttonWrap}>
                  <Login user={this.state.user} handleUserInfo={this.handleUserInfo} />
                  <Registration user={this.state.user} handleUserInfo={this.handleUserInfo} />
               </div>
            </div>
            <TodoList user={this.state.user} handleUserInfo={this.handleUserInfo} />
         </>
      )
   };
};

export default Main;

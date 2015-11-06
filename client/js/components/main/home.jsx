"use strict";

import React         from 'react';
import Firebase      from 'firebase';
import SettingsStore from '../../stores/settings';


export default class Home extends React.Component{

  constructor(){
    super();
    this.firebaseItemsUrl = `${SettingsStore.current().firebaseUrl}/items`;
    this.firebaseRef = new Firebase(this.firebaseItemsUrl);
    this.state = {
      items: {},
      text: ""
    };
  }

  componentWillMount(){
    // Firebase docs for 'on': https://www.firebase.com/docs/web/api/query/on.html
    this.firebaseRef.on("child_added", function(dataSnapshot) {
      this.state.items[dataSnapshot.key()] = dataSnapshot.val()
      this.setState({ items: this.state.items });
    }.bind(this));
    this.firebaseRef.on("child_removed", function(dataSnapshot) {
      delete this.state.items[dataSnapshot.key()];
      this.setState({ items: this.state.items });
    }.bind(this));
  }

  componentWillUnmount(){
    this.firebaseRef.off();
  }
  
  handleAdd(e){
    e.preventDefault();
    this.firebaseRef.push({
      text: this.refs.newItem.value
    });
  }

  handleDelete(e, id){
    e.preventDefault();
    var itemRef = new Firebase(`${this.firebaseItemsUrl}/${id}`);
    itemRef.remove();
  }

  render(){
    var items = _.map(this.state.items, (item, id) => {
      return <li key={id}>{item.text} <button onClick={(e) => {this.handleDelete(e, id);}}>Delete</button></li>;
    });
    return(<div>
      <input ref="newItem" type="text" />
      <button onClick={(e) => {this.handleAdd(e);}} >Add</button>      
      <ul>{items}</ul>
    </div>);
  }
};
import css from '../styles/app.module.css';
import { ContactForm } from './ContactForm';
import { ContactList } from './ContactList';
import { Filter } from './Filter';
import { nanoid } from 'nanoid';
import React, { Component } from 'react';

export class App extends Component {
  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: '',
  }

  onSubmit = (evt) => {
    evt.preventDefault(); 
    if (this.state.contacts.filter(el => el.name === this.state.name).length > 0) { 
        window.alert(`${this.state.name} is already in contacts`)
    } else { 
        this.setState((state) => {
        return {
          contacts: [...state.contacts, { name: state.name, number: state.number, id: nanoid(), }],
          name: '', 
          number: '',
          filter: ''
        }
      })
    }
  }

  onInput = (evt) => { 
    if (evt.target.getAttribute("name") === "name") {
      this.setState({ name: evt.target.value }); 
    } else if ((evt.target.getAttribute("name") === "number")) {
      this.setState({ number: evt.target.value }); 
    } else {
      this.setState({ filter: evt.target.value }); 
    }
  }
  
  onDelete = (evt) => {
    let deleteIndex; 
    this.state.contacts.forEach((el, i) => { 
      if (evt.target.previousElementSibling.textContent.includes(el.name)) {
          deleteIndex = i; 
      }
    })
    this.setState((state) => { 
      let counter = state.contacts.filter((el, i) => i !== deleteIndex)
      return { contacts: counter }
    })
  }

  render() {
    const { contacts, name, number, filter} = this.state; 

    return ( 
      <>
        <h1 className={css.title}>Phonebook</h1>
        <ContactForm
          onSubmit={this.onSubmit}
          onInput={this.onInput}
          textId={nanoid()}
          numberId={nanoid()}
          name={name}
          number={number}
        >
        </ContactForm>
        <div className={css['contacts-wrapper']}>
        <h2 className={css.title}>Contacts</h2>
        <Filter
          onInput={this.onInput}
          filterId={nanoid()}
          filter={filter}
        >
        </Filter>
        <ContactList
          onDelete={this.onDelete}
          contacts={contacts}
          filter={filter}
        >
        </ContactList>
        </div>
      </> 
    )
  }
};

import React, { Component } from 'react'
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import "./App.css";
import { NavbarComponent } from './components'
import { Home, Detail, ListMyPokemon } from './pages'

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
          <NavbarComponent />
          <main>
            <Switch>
              <Route  path="/" component={Home} exact/>
              <Route  path="/detail/:name" component={Detail} exact/>
              <Route  path="/mypokemon" component={ListMyPokemon} exact/>
            </Switch>
          </main>
      </BrowserRouter>
    )
  }
}

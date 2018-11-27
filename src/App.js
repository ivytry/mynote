import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import store from './store';
import Header from './common/header';
import Login from './pages/login';
import Home from './pages/home';
import Detail from './pages/detail/loadable';
import Write from './pages/write';
import Diarys from './pages/diarys';
import Notes from './pages/notes';
import Finance from './pages/finance';
import Account from './pages/account';
import Wnote from './pages/wnote';
import { GlobalStyle } from './style';

class App extends PureComponent {
	render(){
		return (
			<Provider store={store}>
				<BrowserRouter>
					<div>
						<Header />
						<Route exact path="/login" component={Login} />
						<Route exact path="/write" component={Write} />
						<Route exact path="/wnote" component={Wnote} />
						<Route exact path="/diarys" component={Diarys} />
						<Route exact path="/notes" component={Notes} />
						<Route exact path="/finance" component={Finance} />
						<Route exact path="/account" component={Account} />
						<Route exact path="/" component={Home} />
						<Route exact path="/detail/:id" component={Detail} />
						<Route exact path="/wnote/:id" component={Wnote} />
						<GlobalStyle whiteColor />
					</div>
				</BrowserRouter>
			</Provider>
		)
	}
}

export default App
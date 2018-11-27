import { combineReducers } from 'redux-immutable';
import { reducer as headerReducer } from '../common/header/store';
import { reducer as homeReducer } from '../pages/home/store';
import { reducer as detailReducer } from '../pages/detail/store';
import { reducer as loginReducer } from '../pages/login/store';
import { reducer as writeReducer } from '../pages/write/store';
import { reducer as diarysReducer } from '../pages/diarys/store';
import { reducer as FinanceReducer } from '../pages/finance/store';
import { reducer as NotesReducer } from '../pages/notes/store';
import { reducer as wnoteReducer } from '../pages/wnote/store';

const reducer = combineReducers({
	header: headerReducer,
	home: homeReducer,
	detail: detailReducer,
	login: loginReducer,
	write: writeReducer,
	diarys: diarysReducer,
	finance: FinanceReducer,
	notes: NotesReducer,
	wnote: wnoteReducer
})

export default reducer
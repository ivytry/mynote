import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { DtailWrapper, Header, Content } from './style';
import { connect } from 'react-redux';
import { actionCreator } from './store';

class Detail extends PureComponent{
	render(){
		const { pubtime, weather, mood, content, title, id } = this.props
		return (
			<DtailWrapper>
				<Header>
					<h4>{title}</h4>
					<p>
						<i className="iconfont" dangerouslySetInnerHTML = {{ __html: weather }} ></i>
						<i className="iconfont" dangerouslySetInnerHTML = {{ __html: mood }} ></i>
						<span>{pubtime}</span>
					</p>
					<a href={"/write/"+id}><i className="iconfont">&#xe615;</i></a>
				</Header>
				<Content dangerouslySetInnerHTML={{__html:content}} />
			</DtailWrapper>
		)
	}
	
	componentDidMount(){
		this.props.getDtail(this.props.match.params.id)
	}
}

const mapState = (state) => ({
	title: state.getIn(["detail", "title"]),
	content: state.getIn(["detail", "content"]),
	mood: state.getIn(["detail", "mood"]),
	weather: state.getIn(["detail", "weather"]),
	pubtime: state.getIn(["detail", "pubtime"]),
	id: state.getIn(["detail", "id"])
})

const mapDispatch = (dispatch) => ({
	getDtail: (id) => {
		dispatch(actionCreator.getDtailData(id))
	}
})

export default connect(mapState, mapDispatch)(withRouter(Detail))
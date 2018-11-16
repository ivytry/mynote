import styled from 'styled-components';

export const DtailWrapper = styled.div`
	width: 620px;
	margin: 0 auto;
	overflow: hidden;
`;

export const Header = styled.div`
	position:relative;
	padding:30px 0 10px 0;
	text-align:center;
	border-bottom:1px dashed #f0f0f0;
	h4{
		font-weight:bold;
		font-size:20px;
		color:#666;
	}
	p{
		.iconfont{
			margin-right:15px;
		}
		span{
			margin-right:15px;
		}
	}
	a{
		position:absolute;
		bottom:0;
		right:0;
		color:#ccc;
		text-decoration:underline;
	}
`;

export const Content = styled.div`
	padding:20px 0;
	img{
		width:100%;
		margin-bottom:30px;
	}
	p{
		padding:15px 0;
		text-indent:2em;
	}
`;

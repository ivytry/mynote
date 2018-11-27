import styled from 'styled-components';

export const LoginWrapper = styled.div`
	width:100%;
	height:100%;
	margin: 0 auto;
`;

export const LoginBox = styled.div`
	width: 960px;
	margin: 0 auto;
    padding: 10px 50px 30px;
    box-sizing: border-box;
    .w-e-text{
        overflow-y: auto;
    }
    .btn{
        float:right;
        padding:5px 5px 0 0;
        font-size:16px;
        margin-right:6px;
        &.cancel{
            color:#666;
        }
    }
    h4{
    	font-size: 18px;
    	font-weight: 400;
    	color: #969696;
    	a{
    		text-decoration: none;
    		color: #969696;
    		padding: 10px;
    		font-weight: 700;
            color: #ea6f5a;
    	}
    }
`;


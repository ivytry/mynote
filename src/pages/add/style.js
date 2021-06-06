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
    background-color: #fff;
    vertical-align: middle;
    display:block;
    box-sizing: border-box;
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
    .calendar{
        position:relative;
        .today{
            position: absolute;
            top:11px;
            right:240px;
            cursor: pointer;
            height: 24px;
            padding:0 7px;
            line-height: 22px;
        }
    }
    .editable-row .ant-form-explain {
        position: absolute;
        font-size: 12px;
        margin-top: -4px;
    }
`;


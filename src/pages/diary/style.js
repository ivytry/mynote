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
    .top{
        overflow:hidden;
        h4{
            font-size: 18px;
            font-weight: 400;
            color: #969696;
            float:left;
            padding: 10px;
            font-weight: 700;
            color: #ea6f5a;
        }
        .write{
            float:right;
            margin-top:10px;
            border:0;
        }
    }
    .body{
        h4{
            font-size: 16px;
            color: #969696;
            a{
                text-decoration: none;
                color: #ea6f5a;
                padding:0;
            }
        }
        .ant-list-item-extra{
            padding-left:48px;
        }
    }
    .demo-loadmore-list {
        min-height: 350px;
    }
`;


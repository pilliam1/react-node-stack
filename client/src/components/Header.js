import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';


class Header extends Component {

    //inspect this.props.auth and depending on its value, return jsx
    renderContent(){
        //user model already being fetched
        switch(this.props.auth){
            case null:
                return;
            case false:
                return (
                    <li><a href="/auth/google">Login with Google</a></li>
                );
            default:
                return [
                <li key="1"><Payments/></li>,
                <li key="3" style={{ margin: '0 10px'}}>
                    Credits: {this.props.auth.credits}
                </li>,
                <li key="2"><a href="/api/logout">Logout</a></li>
                ];
        }
    }

    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link 
                        to={this.props.auth ? '/surveys' : '/'} 
                        className="left brand-logo"
                    >
                        Feed-Backer
                    </Link>
                    <ul className="right">
                        {this.renderContent()}  
                    </ul>
                </div>
            </nav>
        )
    }
}

//gives entire state object out of the redux store as props
function mapStateToProps(state){
    return { auth: state.auth };
}

export default connect(mapStateToProps)(Header);
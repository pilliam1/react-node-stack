import React, { Component } from 'react';
import { connect } from 'react-redux';


class Header extends Component {

    //inspect this.props.auth and depending on its value, return jsx
    renderContent(){
        switch(this.props.auth){
            case null:
                return;
            case false:
                return (
                    <li>
                        <a href="/auth/google">Login with Google</a>
                    </li>
                );
            default:
                return <li><a>Logout</a></li>;
        }
    }

    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <a className="left brand-logo">
                        Feed-Backer
                    </a>
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
import React, { PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import DashboardIcon from 'material-ui/svg-icons/action/dashboard';
import { navigator } from '../routes';
import * as styles from '../styles/element-styles';

class AppLayoutComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
        this.openDrawer = this._getDrawerHandler(true);
        this.closeDrawer = this._getDrawerHandler(false);
        this.gotoHome = this._getNavigateHandler('/');
        this.gotoDashboard = this._getNavigateHandler('/dashboard');
        this.titleStyle = styles.ClickableElement;
        this.logoStyle = styles.LogoStyle;
        this.titleSectionStyle = styles.TitleSectionStyle;
    }

    _getDrawerHandler(isOpen) {
        return () => this.setState({
            isOpen
        });
    }

    _getNavigateHandler(url) {
        return () => {
            navigator.goto(url);
            this.closeDrawer();
        };
    }

    render() {
        return (
            <div>
              <AppBar
                      title={ <div>
                                <div style={ this.titleSectionStyle.style } ><img style={ this.logoStyle.style } src="/img/logo.png"></img></div>
                                <div style={ this.titleSectionStyle.style } >{ this.props.title }</div>
                              </div> }
                      titleStyle={ this.titleStyle.style }
                      onLeftIconButtonTouchTap={ this.openDrawer }
                      onTitleTouchTap={ this.gotoHome }
                      iconElementRight={ <IconButton onClick={ this.gotoDashboard }>
                                           <DashboardIcon />
                                         </IconButton> } />
              <Drawer open={ this.state.isOpen } docked={ false } onRequestChange={ (isOpen) => this.setState({
                                                                                        isOpen
                                                                                    }) }>
                <AppBar
                        title={ <div>
                                  <div style={ this.titleSectionStyle.style } ><img style={ this.logoStyle.style } src="/img/logo.png"></img></div>
                                  <div style={ this.titleSectionStyle.style } >{ this.props.shortTitle || this.props.title }</div>
                                </div> }
                        iconElementLeft={ <div /> }
                        onTitleTouchTap={ this.closeDrawer }
                        iconElementRight={ <IconButton onClick={ this.closeDrawer }>
                                             <CloseIcon />
                                           </IconButton> } />
                { this.props.sidebarNav.map((item, index) => (
                      <MenuItem key={ index } onTouchTap={ this._getNavigateHandler(item.url) } primaryText={ item.title } />
                  )) }
              </Drawer>
              <div>
                { this.props.children }
              </div>
            </div>
            );
    }
}

AppLayoutComponent.propTypes = {
    shortTitle: PropTypes.string,
    title: PropTypes.string.isRequired,
    sidebarNav: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired
    }).isRequired).isRequired,
    children: PropTypes.element.isRequired
};

export default AppLayoutComponent;

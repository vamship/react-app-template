import React, { PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import DashboardIcon from 'material-ui/svg-icons/action/dashboard';
import { hashHistory } from 'react-router';

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
    }

    _getDrawerHandler(isOpen) {
        return () => this.setState({
            isOpen
        });
    }

    _getNavigateHandler(url) {
        return () => {
            hashHistory.push(url);
            this.closeDrawer();
        };
    }

    render() {
        return (
            <div>
              <AppBar
                      title={ this.props.title }
                      titleStyle={ { cursor: 'pointer' } }
                      onLeftIconButtonTouchTap={ this.openDrawer }
                      onTitleTouchTap={ this.gotoHome }
                      iconElementRight={ <IconButton onClick={ this.gotoDashboard }>
                                           <DashboardIcon />
                                         </IconButton> } />
              <Drawer open={ this.state.isOpen } docked={ false } onRequestChange={ (isOpen) => this.setState({
                                                                                        isOpen
                                                                                    }) }>
                <AppBar
                        title={ this.props.title }
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
    title: PropTypes.string.isRequired,
    sidebarNav: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired
    }).isRequired).isRequired,
    children: PropTypes.element.isRequired
};

export default AppLayoutComponent;

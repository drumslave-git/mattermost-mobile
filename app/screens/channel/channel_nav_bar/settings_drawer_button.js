// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
    TouchableOpacity,
    View,
} from 'react-native';

import {getTheme} from '@mm-redux/selectors/entities/preferences';

import CompassIcon from '@components/compass_icon';
import {preventDoubleTap} from '@utils/tap';
import {makeStyleSheetFromTheme} from '@utils/theme';

class SettingDrawerButton extends PureComponent {
    static propTypes = {
        openSidebar: PropTypes.func.isRequired,
        theme: PropTypes.object,
    };

    static defaultProps = {
        theme: {},
    };

    handlePress = preventDoubleTap(() => {
        this.props.openSidebar();
    });

    render() {
        const {theme} = this.props;
        const style = getStyleFromTheme(theme);

        const icon = (
            <CompassIcon
                name='dots-vertical'
                size={25}
                color={theme.sidebarHeaderTextColor}
            />
        );

        return (
            <TouchableOpacity
                onPress={this.handlePress}
                style={style.container}
            >
                <View style={style.wrapper}>
                    {icon}
                </View>
            </TouchableOpacity>
        );
    }
}

const getStyleFromTheme = makeStyleSheetFromTheme((theme) => {
    return {
        container: {
            width: 44,
        },
        wrapper: {
            alignItems: 'center',
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            marginLeft: 8,
        },
        mention: {
            color: theme.mentionColor,
            fontSize: 10,
        },
    };
});

function mapStateToProps(state) {
    return {
        theme: getTheme(state),
    };
}

export default connect(mapStateToProps)(SettingDrawerButton);

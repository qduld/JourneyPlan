import React, { Component } from 'react';
import { Modal, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Header, Item, Icon, Input, Button, Text } from 'native-base'
import PropTypes from 'prop-types';


export class ActionSheetCus extends Component {
  static defaultProps = {
    animationType: 'slide',
    title: '',
  };
  static propTypes = {
    animationType: PropTypes.string, //模态弹出效果
    ActionItem: PropTypes.element, //动作名称数组的形式
    ActionArray: PropTypes.array,
    showAction: PropTypes.bool,
    cancel: PropTypes.func, // 取消操作
    title: PropTypes.string, //头部
    titleTextStyle: PropTypes.object, //标题样式
    children: PropTypes.element,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {
      animationType,
      showAction,
      title,
      titleTextStyle,
      cancel,
    } = this.props;

    return (
      <Modal
        animationType={"slide"}
        transparent={true}
        onRequestClose={() => {}}
        visible={showAction}>
        <TouchableOpacity
          style={styles.modelView}
          onPress={cancel}
          activeOpacity={0.9}>
          <View style={styles.bottomView}>
            {title ? (
              <View style={styles.TitleView}>
                <Text style={[styles.titleText, titleTextStyle]}>{title}</Text>
                <TouchableOpacity style={styles.closeView} onPress={cancel}>
                  <Text style={styles.close}>&#xe68c;</Text>
                </TouchableOpacity>
              </View>
            ) : null}
            {this.props.children}
            <TouchableOpacity
              style={[styles.items, styles.cancl]}
              onPress={cancel}>
              <Text style={styles.itemsText}>取消</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }
}

export class ActionHeaderCus extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
           searchStr:''
        };
    }
    static propTypes = {
        onPress: PropTypes.func,
    };

    render() {
        const { onPress } = this.props;
        return (
            <Header searchBar rounded>
            <Item>
                <Input placeholder="Search"
                    onChangeText={(inputText)=>{
                       this.setState({
                           searchStr:inputText
                       })
                    }}
                />
                <TouchableOpacity onPress={()=>{onPress(this.state.searchStr)}}>
                    <Icon name="ios-search" />
                </TouchableOpacity>
            </Item>
            <Button transparent>
                <Text>Search</Text>
            </Button>
            </Header>
        );
    }
}

export class ActionDomCus extends Component {
  static defaultProps = {
    actionName: '按钮一',
  };
  static propTypes = {
    actionName: PropTypes.string, //模态弹出效果
    onPress: PropTypes.func,
  };
  render() {
    const { actionName, onPress } = this.props;
    return (
      <TouchableOpacity style={styles.items} onPress={onPress}>
        <Text style={styles.itemsText}>{actionName}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  modelView: {
    flex: 1,
    backgroundColor: 'rgba(40,40,40,0.4)',
    justifyContent:"center",
    alignItems:"center",
  },
  bottomView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
  },
  TitleView: {
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingTop: 10,
    paddingBottom: 10,
  },
  titleText: {
    fontSize: 14,
    color: '#aaa',
  },
  closeView: {
    position: 'absolute',
    right: 15,
    top: 8,
  },
  close: {
    fontFamily: 'iconfont',
    fontSize: 20,
    color: '#ccc',
  },
  items: {
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  cancl: {
    borderTopWidth: 4,
    borderTopColor: '#eee',
  },
  itemsText: {
    fontSize: 15,
    color: '#333',
  },
});

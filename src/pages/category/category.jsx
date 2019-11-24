import React, { Component } from 'react';
import { Card, Table, Button, Icon, message } from 'antd';

import { reqCategorys } from '../../api';
import LinkButton from '../../components/link-button';

export default class Category extends Component {

    state = {
        categorys: [
            {
                "_id": "f1",
                "name": "aa"
            },
            {
                "_id": "f2",
                "name": "aa"
            },
            {
                "_id": "f3",
                "name": "aa"
            },
            {
                "_id": "f4",
                "name": "aa"
            },
            {
                "_id": "f5",
                "name": "aa"
            },
        ],
    }

    //初始化table的所有列信息的数组
    initColumns = () => {
        this.columns = [
            {
              title: '分类的名称',
              dataIndex: 'name',
            },
            {
              title: '操作',
              width: 300,
              render: () => <LinkButton>修改分类</LinkButton>
            },
        ];
    }

    //异步获取分类列表显示
    // getCategorys = async () => {
    //     //发异步ajax请求
    //     const result = await reqCategorys()
    //     if(result.status === 0) { //成功了
    //         //更新状态categorys数据
    //         const categorys = result.data
    //         this.setState({
    //             categorys
    //         })
    //     } else {
    //         message.error('获取分类列表失败了')
    //     }
    // }

    componentWillMount() {
        this.initColumns()
    }

    // componentDidMount() {
    //     this.getCategorys()
    // }

    render() {
        //取出状态数据
        const { categorys } = this.state
        //card右上角结构
        const extra = (
            <Button type="primary">
                <Icon type="plus"/>
                添加
            </Button>
        )
        return ( 
            <Card extra={extra}>
                <Table
                    bordered={true}
                    rowKey="_id"
                    columns={this.columns}
                    dataSource={categorys}
                    pagination={{defaultPageSize: 3, showQuickJumper: true}}
                />
            </Card>
        );
    }
}
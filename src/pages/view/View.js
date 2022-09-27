import React from 'react';
import {ResizeColumn} from '../../components/ResizableSider/ResizeColumn';
import {Outline} from "../outline";
import {Article} from "../article";
import { articleDataSource } from '../../mock/articleDataSource';

const View = () => {
    return (
        <ResizeColumn
            columnMinWidth={150}
            leftColumn={<Outline dataSource={articleDataSource}/>}
            rightColumn={<Article dataSource={articleDataSource}/>}
        />
    );
};

export { View };
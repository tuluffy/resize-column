import React from 'react';
import './styles.css';

const Title = ({content = ''}) => {
    return (
        <div>{content}</div>
    );
};

const Text = ({content = ''}) => {
    return (
        <div>{content}</div>
    );
};

const Panel = ({id, title, text}) => {
    return (
        <div
            className="panel"
            id={id}
        >
            <Title content={title} />
            <Text content={text} />
        </div>
    );
};

const Article = (props) => {
    const { dataSource = [] } = props;
    return (
        <div>
            {
                dataSource.map((data = []) => {
                    const {id, title, text} = data;
                    
                    return (
                        <Panel key={id} id={id} title={title} text={text} />
                    );
                })
            }
        </div>
    );
};

export { Article };
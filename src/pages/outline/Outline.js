import React from 'react';
import './styles.css';

const ListItem = ({id, title}) => {
    return (
        <a className="list-item" href={`#${id}`}>{title}</a>
    );
};

const Outline = ({dataSource = []}) => {
    return (
        <div className="outline">
            {
                dataSource.map((data = {}) => {
                    const {id, title} = data;

                    return (
                        <ListItem key={id} id={id} title={title}/>
                    );
                })
            }
        </div>
    );
};

export { Outline };
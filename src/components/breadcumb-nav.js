import React from 'react';
import { Breadcrumb } from 'react-bootstrap'

const NavBreadcumb = ({ path }) => {

    return (
        <Breadcrumb>
            {path.map((item, i) => <Breadcrumb.Item key={i} href="#">{item}</Breadcrumb.Item>)}
        </Breadcrumb>
    )
}

export default NavBreadcumb;

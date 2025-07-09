import React from 'react';
import { Card, Placeholder } from 'react-bootstrap';

const SkeletonCard = () => (
    <Card className="h-100 product-card shadow-sm">
        <div className="product-card-img bg-light" />
        <Card.Body>
            <Placeholder as={Card.Title} animation="glow"><Placeholder xs={8} /></Placeholder>
            <Placeholder as={Card.Text} animation="glow">
                <Placeholder xs={10} /> <Placeholder xs={6} />
            </Placeholder>
            <Placeholder.Button variant="primary" xs={5} />
        </Card.Body>
    </Card>
);

export default SkeletonCard;
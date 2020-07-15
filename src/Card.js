import React, {useState} from 'react';

function Card({url}) {
    return (
        <div className="Card">
            <img className="Card-Img" src={url} alt='' />
        </div>
    );
}

export default Card;
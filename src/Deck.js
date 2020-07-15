import React, {useState, useEffect, useRef} from 'react';
import Card from './Card';
import './Deck.css';
import axios from "axios";


function Deck() {
    const [deck, setDeck] = useState([]);
    const [drawing, setDrawing] = useState(false);

    let deckId = useRef();
    let timerId = useRef();

    useEffect(() => {
        async function getDeck() {
            const res = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/");
            deckId.current = res.data.deck_id;
        }
        getDeck();
    },[]);
    
    useEffect(() => {
        if(drawing){
            drawCard();
            timerId.current = setInterval(() => {
              drawCard();
            }, 1000);
        
            return () => {
              clearInterval(timerId.current)
            }
        }
    }, [drawing]);
       
    async function drawCard() {
        try {
            const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId.current}/draw/`);
            if (res.data.remaining === 0) {
                setDrawing(false);
                throw new Error("Error: no cards remaining!");
            }
            const {image, code} = res.data.cards[0];
            setDeck(oldDeck => [...oldDeck, {image, code}]);
        } catch (e) {
            alert(e);
        }
    }

    function toggleDrawing() {
        setDrawing(drawing => !drawing);
    }

    const renderedDeck = deck.map(card => <Card key={card.code} url={card.image}/>);
    
    return (
        <div className="Deck">
            <button className="Deck-Btn" onClick={() => toggleDrawing()}>{drawing ? "Stop drawing" : "Start drawing"}</button>
            {renderedDeck}
        </div>
    );
}

export default Deck;
import React, {useState, useEffect, useRef} from 'react';
import Card from './Card';
import './Deck.css';
import axios from "axios";


function Deck() {
    const [deck, setDeck] = useState([]);

    let deckId = useRef();

    useEffect(() => {
        async function getDeck() {
            const res = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/");
            deckId.current = res.data.deck_id;
        }
        getDeck();
    },[]);

    
    async function drawCard() {
        if(deck.length >= 52){
            return alert("Error: no cards remaining!");
        }
        try {
            console.log('drawing card...');
            const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId.current}/draw/`);
            const {image, code} = res.data.cards[0];
            setDeck(oldDeck => [...oldDeck, {image, code}]);
        } catch (e) {
            console.log("Error drawing card");
        }
        
    }

    const renderedDeck = deck.map(card => <Card key={card.code} url={card.image}/>);
    
    return (
        <div className="Deck">
            <button className="Deck-Btn" onClick={() => drawCard()}>Give me a card!</button>
            {renderedDeck}
        </div>
    );
}

export default Deck;
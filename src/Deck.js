import React, {useState, useEffect, useRef} from 'react';
import Card from './Card';
import axios from "axios";


function Deck() {
    const [deck, setDeck] = useState([]);

    let deckId = useRef();

    useEffect(() => {
        async function getDeck() {
            const res = await axios.get("https://deckofcardsapi.com/api/deck/new/");
            deckId.current = res.deck_id;
        }
        getDeck();
    },[]);

    const renderedDeck = () => {
        deck.map(card => <Card key={card.code} url={card.url}/>);
    }

    async function drawCard() {
        try {
            console.log('drawing card...');
            const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId.current}/draw/`);
            setDeck([...deck, {url: res.cards.image, code: res.cards.code}]);
        } catch (e) {
            console.log("Error drawing card");
        }

    }

    return (
        <div>
            {deck.length < 52 && <button onClick={() => drawCard()}>Give me a card!</button>}
            {renderedDeck}
        </div>
    );
}

export default Deck;
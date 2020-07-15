import React, {useState, useEffect, useRef} from 'react';

function Deck() {
    [deck, setDeck] = useState([]);

    let deckId = useRef();

    useEffect(() => {
        async function getDeck() {
            const res = await axios.get("https://deckofcardsapi.com/api/deck/new/");
            deckId.current = res.deck_id;
        }
        getDeck();
    },[]);

    const renderedDeck = () => {
        deck.map(img => <Card img={img}/>);
    }

    async function drawCard() {
        try {
            const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId.current}/draw/`);
            setDeck([...deck, res.cards.image]);
        } catch (e) {
            console.log("Error drawing card");
        }

    }

    return (
        <div>
            {deck.length <= 52 && <button onClick={() => drawCard()}>Give me a card!</button>}
            {renderedDeck}
        </div>
    );
}

export default Deck;
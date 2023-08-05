import { useEffect, useState } from "react";

function Controls(OriginalComponent) {

    function ComponentsWithControls({ items }) {

        const [filteredItems, setFilteredItems] = useState([]);
        const [isSorted, setIsSorted] = useState(false);
        const [filteredText, setFilteredText] = useState('');

        useEffect(() => {
            setFilteredItems(items);
        }, [items])

        const reset = () => {
            setIsSorted(false);
            setFilteredItems(items);
            setFilteredText('');
        }

        useEffect(() => {
            update();
        }, [filteredText, isSorted])

        const update = () => {

            let arr = items;
            if (filteredText) {
                arr = arr.filter(name => name.includes(filteredText));
            }
            if (isSorted) {
                if (arr === filteredItems)
                    arr = arr.slice();
                arr.sort();
            }
            setFilteredItems(arr);
        }

        return < OriginalComponent reset={reset} sort={setIsSorted} isSorted={isSorted} filter={setFilteredText} filteredText={filteredText} items={filteredItems} />

    }

    return ComponentsWithControls;

}

export default Controls;
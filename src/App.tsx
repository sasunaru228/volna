import {StoreProvider} from "./stores/StoreContext.tsx"
import MainComponent from "./components/MainComponent/MainComponent.tsx"


window.addEventListener('load', function() {
    // Прокрутка на 1 пиксель вниз для скрытия строки поиска
    window.scrollTo(0, 1);
});

function App() {

    return (
        <StoreProvider>
            <MainComponent/>
        </StoreProvider>
    )
}

export default App

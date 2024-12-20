import {StoreProvider} from "./stores/StoreContext.tsx";
import MainComponent from "./components/MainComponent.tsx";

function App() {

    return (
        <StoreProvider>
            <MainComponent/>
        </StoreProvider>
    )
}

export default App

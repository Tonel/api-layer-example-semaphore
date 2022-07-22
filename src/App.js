import { useEffect, useState } from "react"
import { PokemonAPI } from "./apis/PokemonAPI"
import { Card, Radio, Spin } from "antd"

function App() {
    const [pokemonListLoading, setPokemonListLoading] = useState(false)
    const [pokemonList, setPokemonList] = useState([])
    const [selectedPokemonName, setSelectedPokemonName] = useState()
    const [selectedPokemon, setSelectedPokemon] = useState()

    useEffect(() => {
        setPokemonListLoading(true)

        PokemonAPI.getPaginated({
            limit: 20,
            offset: 0,
        })
            .then((pokemonList) => {
                setPokemonList(pokemonList)
                setSelectedPokemonName(pokemonList[0]?.name)
            })
            .finally(() => {
                setPokemonListLoading(false)
            })
    }, [])

    useEffect(() => {
        if (selectedPokemonName) {
            // enabling request cancellation
            PokemonAPI.get(selectedPokemonName, true).then((pokemon) => {
                setSelectedPokemon(pokemon)
            })
        }
    }, [selectedPokemonName])

    return (
        <div style={{ textAlign: "center", maxWidth: "600px", margin: "auto" }}>
            <Spin spinning={pokemonListLoading}>
                <div>
                    <Radio.Group
                        value={selectedPokemonName}
                        buttonStyle="solid"
                        onChange={(e) => {
                            setSelectedPokemonName(e.target.value)
                        }}
                    >
                        {pokemonList.map((pokemon) => {
                            return (
                                <Radio.Button value={pokemon.name} key={pokemon.name}>
                                    {pokemon.name}
                                </Radio.Button>
                            )
                        })}
                    </Radio.Group>
                    {selectedPokemon && (
                        <Card style={{ marginTop: "20px" }} title={selectedPokemon.name}>
                            {selectedPokemon.sprites.front_default && (
                                <img src={selectedPokemon.sprites.front_default} alt={selectedPokemon.name} />
                            )}
                        </Card>
                    )}
                </div>
            </Spin>
        </div>
    )
}

export default App

export default function PokemonCard(props) {
    const { pokemon } = props

    return <>{pokemon?.name}</>
}
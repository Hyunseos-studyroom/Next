export default function MovieDetail({
    params: { id }
                                    }: {
    params: { id: string }
}) {
    return <h1>Movies {id}</h1>
}
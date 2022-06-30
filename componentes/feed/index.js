import { useEffect, useState } from "react"
import Postagem from "./Postagem"

export function Feed ({ usuarioLogado }) {
    const [listaDePostagens, setListaDePostagens] = useState([])

    useEffect(() => {
        console.log('carregar o feed')
        setListaDePostagens([
            {
                id: '1',
                usuario: {
                    id: '1',
                    nome: 'Gabriel',
                    avatar: null
                },
                fotoDoPost: 'https://a-static.mlcdn.com.br/800x560/papel-de-parede-personalizado-rei-leao-final-decor/viniciushenriquedresserbonometto/5057p/068513b7b100e51ebe0503fffe73dcdc.jpg',
                descricao: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make',
                curtidas: [],
                comentarios: [
                    {
                        nome: 'Fulano',
                        mensagem: 'Muito legal'
                    }
                ]
            }
        ])
    }, [usuarioLogado])
    
    return (
        <div className="feedContainer largura30pctDesktop">
            {listaDePostagens.map(dadosPostagem =>(
                <Postagem 
                    key={dadosPostagem.id} 
                    {...dadosPostagem} 
                    usuarioLogado={usuarioLogado}
                    />
            ))}
        </div>
    )
}
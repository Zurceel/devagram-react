import Link from "next/link";
import Image from "next/image";
import Avatar from "../avatar";
import imgCurtir from '../../public/imagens/curtir.svg'
import imgCurtido from '../../public/imagens/curtido.svg'
import imgComentarioAtivo from '../../public/imagens/comentarioAtivo.svg'
import imgComentarioCinza from '../../public/imagens/comentarioCinza.svg'
import { useState } from "react";
import { FazerComentario } from "./FazerComentario";
import FeedService from "../../services/FeedService";

const tamanhoLimiteDescricao = 90;
const feedService = new FeedService();

export default function Postagem({
    id,
    usuario,
    fotoDoPost,
    descricao,
    comentarios,
    usuarioLogado,
    curtidas
}) {
    const [curtidasPostagem, setCurtidasPostagem] = useState(curtidas);
    const [comentariosPostagem, setComentariosPostagem] = useState(comentarios);
    const [deveExibirSecaoParaComentar, setDeveExibirSecaoParaComentar] = useState(false)

    const [tamanhoAtualDaDescricao, setTamanhoAtualDaDescricao] = useState(
        tamanhoLimiteDescricao
    );

    const exibirDescricaoCompleta = () => {
        setTamanhoAtualDaDescricao(Number.MAX_SAFE_INTEGER)
    }

    const descricaoMaiorQueLimite = () => {
        return descricao.length > tamanhoAtualDaDescricao;
    }

    const obterDescricao = () => {
        let mensagem = descricao.substring(0, tamanhoAtualDaDescricao);
        if (descricaoMaiorQueLimite) {
            mensagem += '...';
        }
        return mensagem;
    }

    const obterImagemComentario = () => {
        return deveExibirSecaoParaComentar
            ? imgComentarioAtivo
            : imgComentarioCinza;
    }

    const comentar = async (comentario) => {
        console.log('fazer comentário')

        try {
            await feedService.adicionarComentario(id, comentario);
            setDeveExibirSecaoParaComentar(false);
            setComentariosPostagem([
                ...comentariosPostagem,
                {
                    nome: usuarioLogado.nome,
                    mensagem: comentario
                }
            ]);
        } catch (e) {
            alert(`Erro ao fazer comentário!` + (e?.response?.data?.erro || ''));
        }
    }

    const usurioLogadoCurtiuPostagem = () => {
        return curtidasPostagem.includes(usuarioLogado.id);
    }

    const alterarCurtida = async () => {
        try {
            await feedService.alterarCurtida(id);
            const estaCurtido = curtidasPostagem.includes(usuarioLogado.id);
            if (usurioLogadoCurtiuPostagem()) {
                setCurtidasPostagem(
                    curtidasPostagem.filter(idUsuarioQueCurtiu => idUsuarioQueCurtiu !== usuarioLogado.id)
                );
            }else {
                setCurtidasPostagem([
                    ...curtidasPostagem,
                    usuarioLogado.id
                ])
            }
        } catch (e) {
            alert(`Erro ao alterar a curtida!` + (e?.response?.data?.erro || ''));
        }
    }

    const obterImagemCurtida = () => {
        return usurioLogadoCurtiuPostagem()
        ? imgCurtido
        : imgCurtir;
    }

    return (
        <div className="postagem">
            <Link href={`/perfil/${usuario.id}`}>
                <section className="cabecalhoPostagem">
                    <Avatar src={usuario.avatar} />
                    <strong>{usuario.nome}</strong>
                </section>
            </Link>

            <div className="fotoDaPostagem">
                <img src={fotoDoPost} alt='foto da postagem' />
            </div>

            <div className="rodapeDaPostagem">
                <div className="acoesDaPostagem">
                    <Image
                        src={obterImagemCurtida()}
                        alt='icone curtir'
                        width={20}
                        height={20}
                        onClick={alterarCurtida}
                    />

                    <Image
                        src={obterImagemComentario}
                        alt='icone comentar'
                        width={20}
                        height={20}
                        onClick={() => setDeveExibirSecaoParaComentar(!deveExibirSecaoParaComentar)}
                    />

                    <span className="quantidadeCurtidas">
                        Curtido por <strong> {curtidasPostagem.length} pessoas</strong>
                    </span>
                </div>

                <div className="descricaoDaPostagem">
                    <strong className="nomeUsuario">{usuario.nome}</strong>
                    <p className="descricao">
                        {obterDescricao()}
                        {descricaoMaiorQueLimite() && (
                            <span 
                                onClick={exibirDescricaoCompleta}
                                className="exibirDescricaoCompleta">
                                mais
                            </span>
                        )}
                    </p>
                </div>
                <div className="comentarioDaPublicacao">
                    {comentariosPostagem.map((comentario, i) => (
                        <div className="comentario" key={i}>
                            <strong className="nomeUsuario">{comentario.nome}</strong>
                            <p className="descricao">{comentario.mensagem}</p>
                        </div>
                    ))}
                </div>
            </div>

            {deveExibirSecaoParaComentar && 
                <FazerComentario comentar={comentar} usuarioLogado={usuarioLogado} />
            }
        </div>
    )
}
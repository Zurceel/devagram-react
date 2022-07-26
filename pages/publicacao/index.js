import { useState } from "react";
import { useRouter } from 'next/router'
import CabecalhoComAcoes from "../../componentes/cabecalhoComAcoes";
import UploadImagem from "../../componentes/uploadImagem";
import comAutorizacao from "../../hoc/comAutorizacao"
import imagemPublicacao from '../../public/imagens/imagemPublicacao.svg'
import imagemSetaEsquerda from '../../public/imagens/setaEsquerda.svg'
import Botao from "../../componentes/botao";
import FeedService from "../../services/FeedService";

const limiteDaDescricao = 255;
const descricaoMinima = 3;
const feedService = new FeedService();

function Publicacao() {
    const [imagem, setImagem] = useState();
    const [descricao, setDescricao] = useState('');
    const [inputImagem, setInputImagem] = useState();
    const [estapaAtual, setEtapaAtual] = useState(1);
    const router = useRouter();

    const estNaEstapaUm = () => estapaAtual === 1;

    const obterTextoEsquerdaCabecalho = () => {
        if (estNaEstapaUm() && imagem) {
            return 'Cancelar';
        }

        return '';
    }

    const obterTextoDireitaCabecalho = () => {
        if (!imagem) {
            return '';
        }

        if (estNaEstapaUm()) {
            return 'Avançar'
        }

        return 'Compartilhar';
    }

    const aoCliarAcaoEsquerdaCabecalho = () => {
        if (estNaEstapaUm()) {
            inputImagem.value = null;
            setImagem(null);
            return;
        }
        setEtapaAtual(1);
    }

    const aoCliarAcaoDireitaCabecalho = () => {
        if (estNaEstapaUm()) {
            setEtapaAtual(2);
            return;
        }
        publicar();
    }

    const escreverDescricao = (e) => {
        const valorAtual = e.target.value;
        if (valorAtual.length >= limiteDaDescricao) {
            return;
        }

        setDescricao(valorAtual);
    }

    const obterClassNameCabecalho = () => {
        if (estNaEstapaUm()) {
            return 'primeriaEtapa';
        }

        return 'segundaEtapa';
    }

    const publicar = async () => {
        try {
            if (!validarFormulario()) {
                alert('A descrição precisa de pelo menos 3 caractéres!')
                return;
            }

            const corpoPublicacao = new FormData();
            corpoPublicacao.append('descricao', descricao);
            corpoPublicacao.append('file', imagem.arquivo);

            await feedService.fazerPublicacao(corpoPublicacao);
            router.push('/')
        } catch (error) {
            alert('Erro ao salvar publicação!');
            console.log(error)
        }
    }

    const validarFormulario = () => {
        return (
            descricao.length >= descricaoMinima
            && imagem?.arquivo
        );
    }

    return (
        <div className="paginaPublicacao largura30pctDesktop">
            <CabecalhoComAcoes
                className={obterClassNameCabecalho}
                iconeEsquerda={estNaEstapaUm() ? null : imagemSetaEsquerda}
                textoEsquerda={obterTextoEsquerdaCabecalho()}
                aoCliarAcaoEsquerda={aoCliarAcaoEsquerdaCabecalho}
                elementoDireita={obterTextoDireitaCabecalho()}
                aoClicarElementoDireita={aoCliarAcaoDireitaCabecalho}
                titulo='Nova Publicação'
            />

            <hr className='linhaDivisoria' />

            <div className="conteudoPaginaPublicacao">
                {estNaEstapaUm()
                    ? (
                        <div className="primeiraEtapa">
                            <UploadImagem
                                setImagem={setImagem}
                                aoSetarAreferencia={setInputImagem}
                                imagemPreviewClassName={!imagem ? 'previewImagemPublicacao' : 'previewImagemSelecionada'}
                                imagemPreview={imagem?.preview || imagemPublicacao.src}
                            />

                            <span className="desktop textoDragAndDrop">Arraste sua foto aqui!</span>

                            <Botao
                                texto='Selecone uma imagem'
                                manipularClique={() => inputImagem?.click()}
                            />
                        </div>
                    ) : (
                        <>
                            <div className="segundaEtapa">
                                <UploadImagem
                                    setImagem={setImagem}
                                    imagemPreview={imagem?.preview}
                                />

                                <textarea
                                    rows={5}
                                    value={descricao}
                                    placeholder='Escreva uma legenda...'
                                    onChange={escreverDescricao}
                                ></textarea>
                            </div>
                            <hr className='linhaDivisoria' />
                        </>
                    )}
            </div>
        </div>
    )
}

export default comAutorizacao(Publicacao)
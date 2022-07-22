import imgSetaEsquerda from '../../public/imagens/setaEsquerda.svg';
import CabecalhoComAcoes from '../../componentes/cabecalhoComAcoes';
import Avatar from '../avatar';
import Botao from '../botao';
import { useEffect, useState } from 'react';
import UsuarioService from '../../services/UsuarioService';
import {useRouter} from 'next/router';

const usuarioService = new UsuarioService()

export default function CabecalhoPerfil({
    usuario,
    estaNoPerfilPessoal
}) {

    const [estaSeguindoOUsuario, setEstaSeguindoOUsuario] = useState(false);
    const [quantidadeSeguidores, setQuantidadeSeguidores] = useState(0);
    const router = useRouter();

    useEffect(() => {
        if (!usuario){
            return;
        }

        setEstaSeguindoOUsuario(usuario.segueEsseUsuario);
        setQuantidadeSeguidores(usuario.seguidores)
    }, [usuario]);

    const obterTextoBotaoSeguir = () => {
        if (estaNoPerfilPessoal){
            return 'Editar perfil';
        }

        if (estaSeguindoOUsuario) {
            return 'Deixar de Seguir';
        }

        return 'Seguir'
    }

    const obterCorDoBotaoSeguir = () => {
        if (estaSeguindoOUsuario || estaNoPerfilPessoal) {
            return 'invertido';
        }

        return 'primaria';
    }

    const manipularCliqueBotaoSeguir = async () => {
        try {
            await usuarioService.alternarSeguir(usuario._id);
            setQuantidadeSeguidores(
                estaSeguindoOUsuario 
                ? (quantidadeSeguidores - 1)
                : (quantidadeSeguidores + 1) 
            );
            setEstaSeguindoOUsuario(!estaSeguindoOUsuario)
        } catch (error) {
            alert(`Erro ao seguir/deixar de seguir!`)
        }
    }

    const aoClicarSetaEsquerda = () => {
        router.back();
    }

    return (
        <div className='cabecalhoPerfil largura30pctDesktop'>
            <CabecalhoComAcoes
                    iconeEsquerda={imgSetaEsquerda}
                    aoCliarAcaoEsquerda={aoClicarSetaEsquerda}
                    titulo={usuario.nome}
            />

            <hr className='bordaCabecalhoPerfil' />

            <div className='statusPerfil'>
                <Avatar src={usuario.avatar} />
                <div className='informacoesPerfil'>
                    <div className='statusContainer'>
                        <div className='status'>
                            <strong>{usuario.publicacoes}</strong>
                            <span>Publicações</span>
                        </div>

                        <div className='status'>
                            <strong>{quantidadeSeguidores}</strong>
                            <span>Seguidores</span>
                        </div>

                        <div className='status'>
                            <strong>{usuario.seguindo}</strong>
                            <span>Seguindo</span>
                        </div>
                    </div>

                    <Botao 
                        texto={obterTextoBotaoSeguir()}
                        cor={obterCorDoBotaoSeguir()}
                        manipularClique={manipularCliqueBotaoSeguir}
                    />
                </div>
            </div>
        </div>
    )
}
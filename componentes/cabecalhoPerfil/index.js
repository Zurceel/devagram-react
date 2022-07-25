import imgSetaEsquerda from '../../public/imagens/setaEsquerda.svg';
import imgLogout from '../../public/imagens/logout.svg';
import CabecalhoComAcoes from '../../componentes/cabecalhoComAcoes';
import Avatar from '../avatar';
import Botao from '../botao';
import { useEffect, useState } from 'react';
import UsuarioService from '../../services/UsuarioService';
import { useRouter } from 'next/router';
import Image from 'next/image'

const usuarioService = new UsuarioService()

export default function CabecalhoPerfil({
    usuario,
    estaNoPerfilPessoal
}) {

    const [estaSeguindoOUsuario, setEstaSeguindoOUsuario] = useState(false);
    const [quantidadeSeguidores, setQuantidadeSeguidores] = useState(0);
    const router = useRouter();

    useEffect(() => {
        if (!usuario) {
            return;
        }

        setEstaSeguindoOUsuario(usuario.segueEsseUsuario);
        setQuantidadeSeguidores(usuario.seguidores)
    }, [usuario]);

    const obterTextoBotaoPrincipal = () => {
        if (estaNoPerfilPessoal) {
            return 'Editar perfil';
        }

        if (estaSeguindoOUsuario) {
            return 'Deixar de Seguir';
        }

        return 'Seguir'
    }

    const obterCorDoBotaoPrincipal = () => {
        if (estaSeguindoOUsuario || estaNoPerfilPessoal) {
            return 'invertido';
        }

        return 'primaria';
    }

    const manipularCliqueBotaoPrincipal = async () => {
        if (estaNoPerfilPessoal) {
            return router.push('/perfil/editar');
        }

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

    const logout = () =>{
        usuarioService.logout();
        router.push('/')
    }

    const obterelemnetoDireitaCabecalho = () => {
        if (estaNoPerfilPessoal) {
            return (
                <Image
                        src={imgLogout}
                        alt='incone logout'
                        onClick={logout}
                        width={23}
                        height={23}
                    />   
            )
        }

        return null;
    }

    return (
        <div className='cabecalhoPerfil largura30pctDesktop'>
            <CabecalhoComAcoes
                iconeEsquerda={estaNoPerfilPessoal ? null : imgSetaEsquerda}
                aoCliarAcaoEsquerda={aoClicarSetaEsquerda}
                titulo={usuario.nome}
                elementoDireita={obterelemnetoDireitaCabecalho()}
            />

            <hr className='linhaDivisoria' />

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
                        texto={obterTextoBotaoPrincipal()}
                        cor={obterCorDoBotaoPrincipal()}
                        manipularClique={manipularCliqueBotaoPrincipal}
                    />
                </div>
            </div>
        </div>
    )
}
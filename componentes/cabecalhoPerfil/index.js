import imgSetaEsquerda from '../../public/imagens/setaEsquerda.svg';
import CabecalhoComAcoes from '../../componentes/cabecalhoComAcoes';
import Avatar from '../avatar';
import Botao from '../botao';
import { useEffect, useState } from 'react';

export default function CabecalhoPerfil({
    usuario
}) {

    const [estaSeguindoOUsuario, setEstaSeguindoOUsuario] = useState(false);

    useEffect(() => {
        if (!usuario){
            return;
        }

        setEstaSeguindoOUsuario(usuario.segueEsseUsuario);
    }, [usuario]);

    const obterTextoBotaoSeguir = () => {
        if (estaSeguindoOUsuario) {
            return 'Deixar de Seguir';
        }

        return 'Seguir'
    }

    const obterCorDoBotaoSeguir = () => {
        if (estaSeguindoOUsuario) {
            return 'invertido';
        }

        return 'primaria';
    }

    return (
        <div className='cabecalhoPerfil largura30pctDesktop'>
            <CabecalhoComAcoes
                    iconeEsquerda={imgSetaEsquerda}
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
                            <strong>{usuario.seguidores}</strong>
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
                    />
                </div>
            </div>
        </div>
    )
}
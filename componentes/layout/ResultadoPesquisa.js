import Avatar from '../avatar';

export default function resultadoPesquisa({ nome, email, avatar, onClick, id }) {
    return (
        <div className="resultadoPesquisa" onClick={() => onClick(id)}>
            <Avatar src={avatar} />
            <div className='informacoesUsuario'>
                <strong>{nome}</strong>
                <span>{email}</span>
            </div>

        </div>
    );
}
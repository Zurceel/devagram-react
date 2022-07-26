import { useEffect, useRef } from "react";

export default function UploadImagem({
    className = '',
    setImagem,
    imagemPreview,
    imagemPreviewClassName = '',
    aoSetarAreferencia
}) {
    const referenciaInput = useRef(null);

    useEffect(() => {
        if (!aoSetarAreferencia) {
            return;
        }

        aoSetarAreferencia(referenciaInput?.current)
    }, [referenciaInput?.current]);

    const abrirSeletordeArquivos = () => {
        referenciaInput?.current?.click();
    }

    const aoAlterarImagem = () => {
        if (!referenciaInput?.current?.files?.length) {
            return;
        }

        const arquivo = referenciaInput?.current?.files[0];
        obterUrlDaImagemEAtualizarEstado(arquivo);
    }

    const aoSoltarAImagem = (e) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const arquivo = e.dataTransfer.files[0];
            obterUrlDaImagemEAtualizarEstado(arquivo);
        }
    }

    const obterUrlDaImagemEAtualizarEstado = (arquivo) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(arquivo);
        fileReader.onloadend = () => {
            setImagem({
                preview: fileReader.result,
                arquivo
            });
        }
    }

    return (
        <div className={`uploadImagemContainer`} 
        onClick={abrirSeletordeArquivos}
        onDragOver={e => e.preventDefault()}
        onDrop={aoSoltarAImagem}
        >
            {imagemPreview && (
                <div className="imagemPreviewContainer">
                    <img
                        src={imagemPreview}
                        alt='Imagem Preview'
                        className={imagemPreviewClassName}
                    />
                </div>
            )}
            <input
                type='file'
                className='oculto'
                accept="image/*"
                ref={referenciaInput}
                onChange={aoAlterarImagem}
            />
        </div>
    );
}
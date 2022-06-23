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
        <div className={`uploadImagemContainer`} onClick={abrirSeletordeArquivos}>
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
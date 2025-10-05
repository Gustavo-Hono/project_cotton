import QRCode  from 'qrcode';

export default async function gerarQrCode(id: number) {
    try {
        const id_fardo = String(id);
        const qrCodeUrl = await QRCode.toDataURL(id_fardo, {errorCorrectionLevel: 'H'})
        return qrCodeUrl
    } catch (error) {
        console.log('Erro ao gerar o qr code')
        throw new Error("Não foi possível gerar o QR Code.");
    }
}
export default interface Steps {
    id: number;
    name_step: ISteps;
}
// Rastrear por fase
enum ISteps {
    COLHEITA = 'COLHEITA',
    TRASPORTE = 'TRASPORTE',
    ARMAZENAMENTO = 'ARMAZENAMENTO'
}
export default interface Trade {
  id: string | undefined;
  entryDate: number | undefined; // timestamp
  entryPrice: number | undefined;
  exitDate: number | undefined; // timestamp
  exitPrice: number | undefined;
}

import calculateInstallmentFee from "../../../lib/calculateInstallmentFee";
export default function handler(req, res) {
  const fee = calculateInstallmentFee([92500], 36, 700);

  res.status(200).json({
    fee: fee.fee / 100,
    fStnd: fee.fSt / 100,
    fInst: fee.firstInstallment / 100,
  });
}

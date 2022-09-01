export default function PurchaseSuccess({ itemsFromServer }) {
  return (
    <div>
      <h1>Purchase Success</h1>
      <p>{JSON.stringify(itemsFromServer)}</p>
    </div>
  );
}

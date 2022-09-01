export default function PurchaseSuccess({ itemsFromServer }) {
  return (
    <div>
      <h1>Purchase Failed</h1>
      <p>{JSON.stringify(itemsFromServer)}</p>
    </div>
  );
}

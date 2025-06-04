import { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getOrderById, getProductsByOrder } from "../constants/fetchMethods";
import { FetchAPI } from "../components/methods/fetch";
import DisplayError from "../components/Error/DisplayError";
import { OrderType, ProductType } from "../constants/types";

export default function Order() {
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [order, setOrder] = useState<OrderType | null>(null);
  const [products, setProducts] = useState<ProductType[]>([]);
  const { id } = useParams<{ id: string }>();

  const fetchData = useCallback(async () => {
    if (!id) {
      setIsError(true);
      setErrorMessage("Aucune commande sélectionnée");
      return;
    }

    try {
      // Récupérer la commande
      const jsonResponse = (await FetchAPI(getOrderById(id))) as { order: OrderType };
      setOrder(jsonResponse.order); // Stocke directement l'objet Order

      // Récupérer les produits
      const productsResponse = (await FetchAPI(getProductsByOrder(id))) as ProductType[];
      setProducts(productsResponse);
    } catch (error) {
      setIsError(true);
      setErrorMessage(error instanceof Error ? error.message : "Une erreur inconnue s'est produite.");
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="p-8">
      <h1 className="text-3xl dark:text-neutral-400 py-4">Détails de la commande {id}</h1>

      {isError ? (
        <DisplayError errorMessage={errorMessage} />
      ) : order ? (
        <>
          <h2 className="text-xl">Commande :</h2>
          <div>
            <h2>Commande n°{order.id_order}</h2>
            <p>Client : {order.id_client}</p>
            <p>Site : {order.site_name}</p>
            <p>Adresse : {order.site_address}</p>
            <p>Date : {order.ordered_at}</p>
          </div>

          <h2 className="text-xl mt-4">Produits :</h2>
          <pre>{JSON.stringify(products, null, 2)}</pre>
        </>
      ) : (
        <span>Chargement...</span>
      )}
    </div>
  );
}
